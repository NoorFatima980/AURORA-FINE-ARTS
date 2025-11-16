import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'react-feather';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/exhibitions', label: 'Exhibitions' },
    { path: '/artists', label: 'Artists' },
    { path: '/contact', label: 'Contact' }
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="logo"
            onClick={closeMobileMenu}
          >
            <h2 className="text-navy m-0">Aurora Fine Arts</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="flex gap-8">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    style={{
                      textDecoration: 'none',
                      color: location.pathname === link.path ? 'var(--primary)' : 'var(--navy)',
                      fontWeight: '600',
                      transition: 'var(--transition)',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== link.path) {
                        e.target.style.color = 'var(--navy)';
                      }
                    }}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <span style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '0',
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--primary)'
                      }}></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--navy)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'var(--transition)',
              display: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(30, 58, 95, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'var(--cream)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: '1001',
          display: isMobileMenuOpen ? 'block' : 'none'
        }}
      >
        <div 
          className="mobile-menu-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid rgba(30, 58, 95, 0.1)'
          }}
        >
          <h3 className="text-navy m-0">Aurora Fine Arts</h3>
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--navy)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'var(--transition)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(30, 58, 95, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
            }}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav" style={{ padding: '2rem' }}>
          <ul style={{ listStyle: 'none' }}>
            {navLinks.map(link => (
              <li key={link.path} style={{ marginBottom: '1rem' }}>
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                  style={{
                    display: 'block',
                    padding: '1rem',
                    textDecoration: 'none',
                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--navy)',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    borderRadius: '4px',
                    transition: 'var(--transition)',
                    borderLeft: `4px solid ${location.pathname === link.path ? 'var(--primary)' : 'transparent'}`,
                    background: location.pathname === link.path ? 'rgba(139, 0, 0, 0.05)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.color = 'var(--primary)';
                      e.target.style.background = 'rgba(139, 0, 0, 0.05)';
                      e.target.style.borderLeftColor = 'var(--primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.color = 'var(--navy)';
                      e.target.style.background = 'transparent';
                      e.target.style.borderLeftColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;