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
import AvailabilityCalendar from './components/AvailabilityCalendar';

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
				className='hero'
				style={{
					backgroundImage: `linear-gradient(135deg, rgba(10, 14, 39, 0.85) 0%, rgba(26, 31, 66, 0.85) 100%), url(${process.env.PUBLIC_URL}/images/hero.webp)`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}>
				<div className='hero-content'>
					<h1>
						Noteworthy
						<span>Rehearsal Studios</span>
					</h1>
					<p>
						Premium shared rehearsal space in the St John's area of Portland, Oregon.
						Professional-grade acoustics, top-tier equipment, and the creative environment your
						music deserves.
					</p>
					<button className='cta-button' onClick={scrollToContact}>
						Get Studio Info
					</button>
				</div>
			</div>

			{/* Features Section */}
			<section id='features'>
				<h2 className='section-title'>Why Choose Us</h2>
				<div className='features-grid'>
					<div className='feature-card'>
						<div className='feature-icon'>🎸</div>
						<h3>Pro Equipment</h3>
						<p>
							Fully-equipped studio with professional PA system, drum kit, amps, and backline.
							Everything you need to focus on your craft.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>🔊</div>
						<h3>Acoustic Excellence</h3>
						<p>
							200 sq ft soundproof room with custom acoustic treatment designed for optimal sound
							quality and isolation.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>📍</div>
						<h3>Prime Location</h3>
						<p>
							Conveniently located in St John's with easy access, indoor parking, and a creative
							community atmosphere.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>✅</div>
						<h3>Safe & Secure</h3>
						<p>
							All tenants must pass a background check, ensuring a safe and professional environment
							for everyone.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>⚡</div>
						<h3>Flexible Booking</h3>
						<p>
							$300 for one day per week, $350 for two days per week. $150 non-refundable deposit
							required upon signup.
						</p>
					</div>
				</div>
			</section>

			{/* Amenities Section */}
			<section id='amenities' style={{ background: 'var(--bg)', padding: '5rem 2rem' }}>
				<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
					<h2 className='section-title'>Studio Amenities</h2>
					<div className='features-grid'>
						<div className='feature-card'>
							<div className='feature-icon'>🎤</div>
							<h3>Included Gear</h3>
							<p>
								PA system with mics and stands, 5-piece drum set, and 50W guitar amp (clone of
								Soldano SLO 100). Ready to plug in and play.
							</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>🚗</div>
							<h3>Easy Load-In</h3>
							<p>
								Drive right up to the front door for super easy load-in and load-out. Indoor parking
								available.
							</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>🔐</div>
							<h3>24/7 Access</h3>
							<p>
								Keypad locks provide secure access any time, day or night. Security cameras keep the
								space safe.
							</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>🌡️</div>
							<h3>Climate Controlled</h3>
							<p>
								A/C and heat keep you comfortable year-round, no matter how long your session runs.
							</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>💡</div>
							<h3>RGB Lighting</h3>
							<p>
								Control the vibe with customizable RGB LED lighting. Set the mood for your rehearsal
								or recording.
							</p>
						</div>
						<div className='feature-card'>
							<div className='feature-icon'>🍕</div>
							<h3>Food & Amenities</h3>
							<p>
								On-site brewery and restaurant (Occidental Brewing). Kitchen with fridge/freezer,
								microwave, and oven. Free WiFi and restrooms.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className='gallery' id='gallery'>
				<h2 className='section-title' style={{ color: 'white' }}>
					Our Studio
				</h2>
				<div className='gallery-grid'>
					<div className='gallery-item'>
						<img
							src={`${process.env.PUBLIC_URL}/images/studio1.jpg`}
							alt='Rehearsal Studio Room 1'
						/>
					</div>
					<div className='gallery-item'>
						<img
							src={`${process.env.PUBLIC_URL}/images/studio2.jpg`}
							alt='Rehearsal Studio Room 2'
						/>
					</div>
					<div className='gallery-item'>
						<img
							src={`${process.env.PUBLIC_URL}/images/studio3.jpg`}
							alt='Rehearsal Studio Room 3'
						/>
					</div>
					<div className='gallery-item'>
						<img
							src={`${process.env.PUBLIC_URL}/images/studio4.jpg`}
							alt='Rehearsal Studio Room 4'
						/>
					</div>
					<div className='gallery-item'>
						<img
							src={`${process.env.PUBLIC_URL}/images/studio5.jpg`}
							alt='Rehearsal Studio Room 5'
						/>
					</div>
				</div>
			</section>

			{/* Calendar Section */}
			<section id='availability' style={{ background: 'var(--bg)', padding: '5rem 2rem' }}>
				<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
					<h2 className='section-title'>Check Availability</h2>
					<p
						style={{
							fontSize: '1.2rem',
							color: 'var(--text-light)',
							marginBottom: '2rem',
							maxWidth: '800px',
						}}>
						Browse our studio schedule below to see what times are available. Green slots are open
						for booking - red slots are already reserved. Ready to reserve your time? Use the
						contact form below!
					</p>
					<AvailabilityCalendar />
				</div>
			</section>

			{/* Contact Section */}
			<section className='contact-section' id='contact'>
				<div className='contact-container'>
					<h2 className='section-title'>Get In Touch</h2>
					<p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
						Ready to book your session or want to learn more? Fill out the form below and we'll get
						back to you within 24 hours.
					</p>

					<div className='contact-form'>
						<iframe
							className='checkcherry-autoresize-frame'
							src='https://noteworthy-djs.checkcherry.com/contact/18444?iframe=true&props=%7B%22labelsAsPlaceholders%22%3Afalse%2C%22wideSubmitButtons%22%3Afalse%2C%22buttonBackgroundColor%22%3A%22%22%2C%22buttonForegroundColor%22%3A%22%22%2C%22maxWidth%22%3A%22100%25%22%2C%22fontFamily%22%3A%22Montserrat%22%7D'
							style={{
								margin: 0,
								padding: 0,
								border: 'none',
								maxWidth: '100%',
								width: '100%',
								height: '600px',
							}}
							scrolling='auto'
							allowTransparency='true'
							title='Contact Form'
						/>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer>
				<div className='footer-content'>
					<h3>Noteworthy Rehearsal Studios</h3>
					<div className='footer-info'>
						<span>Portland, Oregon</span>
						<a href='mailto:info@nwrs.space'>info@nwrs.space</a>
						<span>© 2025 NWRS</span>
					</div>
				</div>
			</footer>
		</>
	);
}

export default NWRSWebsite;
