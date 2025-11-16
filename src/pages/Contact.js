import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Clock, Phone, Mail } from 'react-feather';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('/contact', formData);
      setMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="section-title">
          <h1>Contact Us</h1>
          <p>Get in touch with Aurora Fine Arts Gallery</p>
        </div>

        <div className="contact-grid">
          <div>
            <h2 className="text-navy mb-6">Visit Our Gallery</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="flex items-start">
                <MapPin size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h3 className="text-gray-dark mb-2">Location</h3>
                  <p className="text-gray">
                    123 Gallery District<br />
                    Arts Quarter, City Center<br />
                    Metropolis, 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h3 className="text-gray-dark mb-2">Opening Hours</h3>
                  <p className="text-gray">
                    Tuesday - Sunday: 10:00 AM - 6:00 PM<br />
                    Monday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone size={24} className="text-primary mr-4 mt-1" />
                <div>
                  <h3 className="text-gray-dark mb-2">Contact</h3>
                  <p className="text-gray">
                    +1 (555) 123-ARTE<br />
                    info@aurorafinearts.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-gray-dark mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'var(--navy)',
                    color: 'var(--white)',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--navy)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Mail size={20} />
                </a>
                <a 
                  href="#" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'var(--navy)',
                    color: 'var(--white)',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--navy)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <form 
              onSubmit={handleSubmit} 
              style={{
                background: 'var(--white)',
                padding: '2rem',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {message && (
                <div 
                  className={`message ${message.includes('Thank you') ? 'success' : 'error'}`}
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    fontWeight: '600',
                    backgroundColor: message.includes('Thank you') ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                    color: message.includes('Thank you') ? '#2e7d32' : '#c62828',
                    border: `1px solid ${message.includes('Thank you') ? '#4caf50' : '#f44336'}`
                  }}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;