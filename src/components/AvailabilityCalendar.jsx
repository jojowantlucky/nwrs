import React, { useState, useEffect } from 'react';
import './AvailabilityCalendar.css';

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [busySlots, setBusySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'AIzaSyBiwkJQmPKnVCamRAgeiVJNFf1mb6ZkLSo';
  const CALENDAR_ID = 'nwrehearsalcalendar@gmail.com';

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
        // Get first and last day of current month, plus buffer
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        monthStart.setDate(monthStart.getDate() - 7); // Buffer for prev month days
        
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        monthEnd.setDate(monthEnd.getDate() + 7); // Buffer for next month days
        monthEnd.setHours(23, 59, 59, 999);

        const timeMin = formatDateForAPI(monthStart);
        const timeMax = formatDateForAPI(monthEnd);

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
  }, [currentMonth]);

  // Check if a time slot is busy
  const isSlotBusy = (date, hour) => {
    const slotStart = new Date(date);
    slotStart.setHours(hour, 0, 0, 0);
    const slotEnd = new Date(date);
    slotEnd.setHours(hour + 1, 0, 0, 0);

    return busySlots.some(busy => {
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      
      return (
        (slotStart >= busyStart && slotStart < busyEnd) ||
        (slotEnd > busyStart && slotEnd <= busyEnd) ||
        (slotStart <= busyStart && slotEnd >= busyEnd)
      );
    });
  };

  // Check if a day has any bookings
  const dayHasBookings = (date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    return busySlots.some(busy => {
      const busyStart = new Date(busy.start);
      const busyEnd = new Date(busy.end);
      
      return (
        (busyStart >= dayStart && busyStart <= dayEnd) ||
        (busyEnd >= dayStart && busyEnd <= dayEnd) ||
        (busyStart <= dayStart && busyEnd >= dayEnd)
      );
    });
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  // Generate calendar grid
  const generateMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month days to complete the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  // Format month/year
  const formatMonthYear = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  };

  // Format date for day view header
  const formatDayHeader = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Hours to display (8am - 11pm)
  const hours = Array.from({ length: 16 }, (_, i) => i + 8);

  // Format hour for display
  const formatHour = (hour) => {
    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    if (hour < 12) return `${hour}am`;
    return `${hour - 12}pm`;
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Check if dates are the same day
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
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

  // Day detail view
  if (selectedDay) {
    return (
      <div className="availability-calendar">
        <div className="calendar-header">
          <button onClick={() => setSelectedDay(null)} className="back-button">
            ← Back to Month
          </button>
          <h3 className="day-header">{formatDayHeader(selectedDay)}</h3>
        </div>

        <div className="day-schedule">
          {hours.map((hour) => {
            const isBusy = isSlotBusy(selectedDay, hour);
            return (
              <div key={hour} className="schedule-row">
                <div className="schedule-time">{formatHour(hour)}</div>
                <div className={`schedule-slot ${isBusy ? 'busy' : 'available'}`}>
                  {isBusy ? 'Booked' : 'Available'}
                </div>
              </div>
            );
          })}
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
  }

  // Month view
  const monthDays = generateMonthDays();

  return (
    <div className="availability-calendar">
      <div className="calendar-header">
        <button onClick={previousMonth} className="nav-button" aria-label="Previous month">
          ← Previous
        </button>
        <h3 className="month-year">{formatMonthYear()}</h3>
        <button onClick={nextMonth} className="nav-button" aria-label="Next month">
          Next →
        </button>
      </div>

      <div className="month-grid">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
        
        {/* Calendar days */}
        {monthDays.map((day, index) => {
          const hasBookings = dayHasBookings(day.date);
          const todayClass = isToday(day.date) ? 'today' : '';
          const currentMonthClass = day.isCurrentMonth ? 'current-month' : 'other-month';
          
          return (
            <div
              key={index}
              className={`calendar-day ${currentMonthClass} ${todayClass} ${hasBookings ? 'has-bookings' : ''}`}
              onClick={() => day.isCurrentMonth && setSelectedDay(day.date)}
            >
              <div className="day-number">{day.date.getDate()}</div>
              {hasBookings && <div className="booking-indicator"></div>}
            </div>
          );
        })}
      </div>

      <div className="month-legend">
        <div className="legend-item">
          <div className="legend-dot has-bookings"></div>
          <span>Days with bookings (click to view details)</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot today"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
