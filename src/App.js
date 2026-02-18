import React, { useState } from 'react';
import './NWRSWebsite.css';

function NWRSWebsite() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);

		// Simulate form submission
		// In production, integrate with your backend or service like Formspree, Netlify Forms, etc.
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
			<div
				className='hero'
				style={{
					backgroundImage:
						'linear-gradient(135deg, rgba(10, 14, 39, 0.85) 0%, rgba(26, 31, 66, 0.85) 100%), url(/images/hero.webp)',
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
						Premium rehearsal spaces in the heart of Portland, Oregon. Professional-grade acoustics,
						top-tier equipment, and the creative environment your music deserves.
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
							Fully-equipped studios with professional PA systems, drum kits, amps, and backline.
							Everything you need to focus on your craft.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>🔊</div>
						<h3>Acoustic Excellence</h3>
						<p>
							Soundproofed rooms with custom acoustic treatment designed for optimal sound quality
							and isolation.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>📍</div>
						<h3>Prime Location</h3>
						<p>
							Conveniently located in Portland with easy access, parking, and a creative community
							atmosphere.
						</p>
					</div>
					<div className='feature-card'>
						<div className='feature-icon'>⚡</div>
						<h3>Flexible Booking</h3>
						<p>
							Hourly, daily, or monthly rental options available. Book the time that works for your
							schedule and budget.
						</p>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className='gallery' id='gallery'>
				<h2 className='section-title' style={{ color: 'white' }}>
					Our Studios
				</h2>
				<div className='gallery-grid'>
					<div className='gallery-item'>
						<img src='/images/studio1.jpg' alt='Rehearsal Studio Room 1' />
					</div>
					<div className='gallery-item'>
						<img src='/images/studio2.jpg' alt='Rehearsal Studio Room 2' />
					</div>
					<div className='gallery-item'>
						<img src='/images/studio3.jpg' alt='Rehearsal Studio Room 3' />
					</div>
					<div className='gallery-item'>
						<img src='/images/studio4.jpg' alt='Rehearsal Studio Room 4' />
					</div>
					<div className='gallery-item'>
						<img src='/images/studio5.jpg' alt='Rehearsal Studio Room 5' />
					</div>
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

					<form className='contact-form' onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='name'>Name *</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='email'>Email *</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='phone'>Phone</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='message'>Message *</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={handleChange}
								placeholder='Tell us about your project, preferred times, or any questions you have...'
								required></textarea>
						</div>

						<button type='submit' className='submit-button' disabled={submitting}>
							{submitting ? 'Sending...' : 'Send Message'}
						</button>

						{submitted && (
							<div className='success-message'>
								Thanks for reaching out! We'll be in touch soon.
							</div>
						)}
					</form>
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
