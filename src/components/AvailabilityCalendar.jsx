import React, { useState, useEffect } from 'react';
import './AvailabilityCalendar.css';

const AvailabilityCalendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(getMonday(new Date()));
  const [busySlots, setBusySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'AIzaSyBiwkJQmPKnVCamRAgeiVJNFf1mb6ZkLSo';
  const CALENDAR_ID = 'nwrehearsalcalendar@gmail.com';

  // Get Monday of current week
  function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // Format date for API (RFC3339)
  function formatDateForAPI(date) {
    return date.toISOString();
  }

  // Fetch busy times from Google Calendar
  useEffect(() => {
    const fetchBusyTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const weekStart = new Date(currentWeekStart);
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        weekEnd.setHours(23, 59, 59, 999);

        const timeMin = formatDateForAPI(weekStart);
        const timeMax = formatDateForAPI(weekEnd);

        const url = `https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timeMin: timeMin,
            timeMax: timeMax,
            items: [{ id: CALENDAR_ID }]
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch calendar data');
        }

        const data = await response.json();
        const busy = data.calendars[CALENDAR_ID]?.busy || [];
        setBusySlots(busy);
        setLoading(false);
      } catch (err) {
        console.error('Calendar fetch error:', err);
        setError('Unable to load availability. Please try again later.');
        setLoading(false);
      }
    };

    fetchBusyTimes();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchBusyTimes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [currentWeekStart]);

  // Check if a time slot is busy
  const isSlotBusy = (date, hour) => {
    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);
    const slotEnd = new Date(date);
    slotEnd.setHours(hour + 1, 0, 0, 0);

    return busySlots.some(busy => {
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      
      // Check if slot overlaps with any busy period
      return (
        (slotStart >= busyStart && slotStart < busyEnd) ||
        (slotEnd > busyStart && slotEnd <= busyEnd) ||
        (slotStart <= busyStart && slotEnd >= busyEnd)
      );
    });
  };

  // Navigate weeks
  const previousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Hours to display (8am - 11pm)
  const hours = Array.from({ length: 16 }, (_, i) => i + 8);

  // Format hour for display
  const formatHour = (hour) => {
    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    if (hour < 12) return `${hour}am`;
    return `${hour - 12}pm`;
  };

  // Format date for header
  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${days[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Format week range
  const formatWeekRange = () => {
    const start = currentWeekStart;
    const end = new Date(currentWeekStart);
    end.setDate(end.getDate() + 6);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
  };

  if (loading && busySlots.length === 0) {
    return (
      <div className="availability-calendar">
        <div className="calendar-loading">Loading availability...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="availability-calendar">
        <div className="calendar-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="availability-calendar">
      <div className="calendar-header">
        <button onClick={previousWeek} className="nav-button" aria-label="Previous week">
          ← Previous
        </button>
        <h3 className="week-range">{formatWeekRange()}</h3>
        <button onClick={nextWeek} className="nav-button" aria-label="Next week">
          Next →
        </button>
      </div>

      <div className="calendar-grid-container">
        <div className="calendar-grid">
          {/* Day headers */}
          <div className="time-column"></div>
          {weekDates.map((date, i) => (
            <div key={i} className="day-header">
              {formatDate(date)}
            </div>
          ))}

          {/* Time slots */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="time-label">{formatHour(hour)}</div>
              {weekDates.map((date, i) => {
                const isBusy = isSlotBusy(date, hour);
                return (
                  <div
                    key={`${hour}-${i}`}
                    className={`time-slot ${isBusy ? 'busy' : 'available'}`}
                    title={isBusy ? 'Booked' : 'Available'}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color available"></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-color busy"></span>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
