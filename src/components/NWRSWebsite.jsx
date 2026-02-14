import React, { useState } from 'react';
import './NWRSWebsite.css';

function NWRSWebsite() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // TODO: Integrate with your backend or service like Formspree, Netlify Forms, etc.
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
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
              amps, and backline.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Acoustic Treatment</h3>
            <p>
              Purpose-built rooms with superior sound isolation and professional 
              acoustic design.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Prime Location</h3>
            <p>
              Conveniently located in Portland with easy access and ample parking 
              for your gear.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🕐</div>
            <h3>Flexible Hours</h3>
            <p>
              Book the time you need with hourly, daily, and monthly options 
              available.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <h2 className="section-title">Our Studios</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <div className="placeholder-image">
              <span>Studio A</span>
            </div>
          </div>
          <div className="gallery-item">
            <div className="placeholder-image">
              <span>Studio B</span>
            </div>
          </div>
          <div className="gallery-item">
            <div className="placeholder-image">
              <span>Equipment</span>
            </div>
          </div>
          <div className="gallery-item">
            <div className="placeholder-image">
              <span>Lounge</span>
            </div>
          </div>
        </div>
        <p className="gallery-note">
          📸 Replace these placeholders with your actual studio photos
        </p>
      </section>

      {/* Contact Form */}
      <section id="contact">
        <h2 className="section-title">Get More Information</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Talk</h3>
            <p>
              Interested in booking a rehearsal session? Have questions about our 
              facilities? Get in touch and we'll help you find the perfect space 
              for your music.
            </p>
            <div className="info-item">
              <strong>📍 Location</strong>
              <p>Portland, Oregon</p>
            </div>
            <div className="info-item">
              <strong>📧 Email</strong>
              <p>info@nwrs.space</p>
            </div>
            <div className="info-item">
              <strong>📞 Phone</strong>
              <p>(503) XXX-XXXX</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="success-message">
                <h3>✓ Thanks for reaching out!</h3>
                <p>We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3>Noteworthy Rehearsal Studios</h3>
          <p>Portland's premier rehearsal space for serious musicians</p>
          <p className="copyright">
            © 2024 Noteworthy Rehearsal Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default NWRSWebsite;
