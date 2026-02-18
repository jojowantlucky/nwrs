/**
 * Noteworthy Rehearsal Studios Website Component
 * 
 * IMPORTANT NOTE FOR APP.JS:
 * When importing this component in App.js, use:
 * import './components/NWRSWebsite.css';
 * 
 * This ensures the CSS is loaded correctly from the components directory.
 */

import React, { useState, useEffect } from 'react';
import './components/NWRSWebsite.css';

function NWRSWebsite() {
  
  useEffect(() => {
    // Load CheckCherry iframe script
    const script = document.createElement('script');
    script.src = 'https://noteworthy-djs.checkcherry.com/api/checkcherry_widgets/iframe';
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <div 
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 14, 39, 0.85) 0%, rgba(26, 31, 66, 0.85) 100%), url(${process.env.PUBLIC_URL}/images/hero.webp)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-content">
          <h1>
            Noteworthy
            <span>Rehearsal Studios</span>
          </h1>
          <p>
            Premium rehearsal spaces in the heart of Portland, Oregon. 
            Professional-grade acoustics, top-tier equipment, and the creative 
            environment your music deserves.
          </p>
          <button className="cta-button" onClick={scrollToContact}>
            Get Studio Info
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section id="features">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎸</div>
            <h3>Pro Equipment</h3>
            <p>
              Fully-equipped studios with professional PA systems, drum kits, 
              amps, and backline. Everything you need to focus on your craft.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔊</div>
            <h3>Acoustic Excellence</h3>
            <p>
              Soundproofed rooms with custom acoustic treatment designed for 
              optimal sound quality and isolation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Prime Location</h3>
            <p>
              Conveniently located in Portland with easy access, parking, 
              and a creative community atmosphere.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Flexible Booking</h3>
            <p>
              Hourly, daily, or monthly rental options available. Book the time 
              that works for your schedule and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <h2 className="section-title" style={{color: 'white'}}>Our Studios</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/images/studio1.jpg`} alt="Rehearsal Studio Room 1" />
          </div>
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/images/studio2.jpg`} alt="Rehearsal Studio Room 2" />
          </div>
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/images/studio3.jpg`} alt="Rehearsal Studio Room 3" />
          </div>
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/images/studio4.jpg`} alt="Rehearsal Studio Room 4" />
          </div>
          <div className="gallery-item">
            <img src={`${process.env.PUBLIC_URL}/images/studio5.jpg`} alt="Rehearsal Studio Room 5" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <h2 className="section-title">Get In Touch</h2>
          <p style={{fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem'}}>
            Ready to book your session or want to learn more? Fill out the form 
            below and we'll get back to you within 24 hours.
          </p>
          
          <div className="contact-form">
            <iframe 
              className="checkcherry-autoresize-frame" 
              src="https://noteworthy-djs.checkcherry.com/contact/18444?iframe=true&props=%7B%22labelsAsPlaceholders%22%3Afalse%2C%22wideSubmitButtons%22%3Afalse%2C%22buttonBackgroundColor%22%3A%22%22%2C%22buttonForegroundColor%22%3A%22%22%2C%22maxWidth%22%3A%22100%25%22%2C%22fontFamily%22%3A%22Montserrat%22%7D" 
              style={{
                margin: 0, 
                padding: 0, 
                border: 'none', 
                maxWidth: '100%', 
                width: '100%', 
                height: '600px'
              }} 
              scrolling="auto" 
              allowTransparency="true"
              title="Contact Form"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3>Noteworthy Rehearsal Studios</h3>
          <div className="footer-info">
            <span>Portland, Oregon</span>
            <a href="mailto:info@nwrs.space">info@nwrs.space</a>
            <span>© 2025 NWRS</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default NWRSWebsite;
