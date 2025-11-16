import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('/newsletter', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 
        'Error subscribing. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div 
          className="footer-content"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          <div className="footer-section">
            <h3 className="text-white mb-4">Aurora Fine Arts</h3>
            <p className="text-gray mb-2">Curating contemporary works &copy; {new Date().getFullYear()}</p>
            <p className="text-gray mb-2">123 Gallery District, Arts Quarter</p>
            <p className="text-gray">Metropolis, 10001</p>
          </div>

          <div className="footer-section">
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  to="/exhibitions" 
                  className="footer-link"
                  style={{
                    color: '#999',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#999';
                  }}
                >
                  Exhibitions
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  to="/artists" 
                  className="footer-link"
                  style={{
                    color: '#999',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#999';
                  }}
                >
                  Artists
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link 
                  to="/contact" 
                  className="footer-link"
                  style={{
                    color: '#999',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#999';
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-white mb-4">Stay Updated</h4>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="form-control"
                  required
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-secondary"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <div 
                  className={`newsletter-message ${message.includes('Error') ? 'error' : 'success'}`}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    backgroundColor: message.includes('Error') ? 'rgba(139, 0, 0, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                    color: message.includes('Error') ? '#ff6b6b' : 'var(--secondary)',
                    border: `1px solid ${message.includes('Error') ? '#ff6b6b' : 'var(--secondary)'}`
                  }}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div 
          className="footer-bottom"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1rem'
          }}
        >
          <p className="text-gray text-center">
            &copy; {new Date().getFullYear()} Aurora Fine Arts. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1.5fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;