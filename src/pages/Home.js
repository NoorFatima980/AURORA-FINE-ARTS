import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'react-feather';
import ExhibitionCarousel from '../components/ExhibitionCarousel';

const Home = ({ artists, exhibitions }) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <img 
          src="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Gallery Exhibition Space" 
          className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          <h1 className="text-white mb-6">Discover Contemporary Art That Inspires</h1>
          <p className="text-white text-xl mb-8 opacity-90">
            Where creativity meets elegance in every masterpiece
          </p>
          <Link to="/exhibitions" className="btn btn-primary btn-lg">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Featured Artists</h2>
            <p>Discover the visionary creators shaping today's contemporary art landscape</p>
          </div>
          
          {artists && artists.length > 0 ? (
            <div className="artist-grid">
              {artists.map((artist, index) => (
                <div 
                  key={artist._id} 
                  className="artist-card fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="artist-image"
                  />
                  <div className="artist-overlay">
                    <h3 className="text-white mb-2">{artist.name}</h3>
                    <p className="text-gray-light mb-4">{artist.specialty}</p>
                    <Link 
                      to={`/artists/${artist._id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: 'var(--secondary)',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--secondary-hover)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--secondary)';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      View Profile
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray text-lg">No featured artists available at the moment.</p>
            </div>
          )}
          
          <div className="text-center mt-12 fade-in">
            <Link to="/artists" className="btn btn-outline">
              View All Artists
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Exhibitions */}
      <section className="py-20 bg-gray-light">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Upcoming Exhibitions</h2>
            <p>Immerse yourself in our curated exhibitions showcasing groundbreaking contemporary art</p>
          </div>
          
          <ExhibitionCarousel exhibitions={exhibitions} />
          
          <div className="text-center mt-12 fade-in">
            <Link to="/exhibitions" className="btn btn-primary">
              View All Exhibitions
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Space */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <img 
                src="https://images.unsplash.com/photo-1577720643277-2c0136a54d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Aurora Fine Arts Gallery Interior" 
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
            </div>
            <div className="fade-in">
              <h2 className="text-navy mb-6">Our Gallery Space</h2>
              <p className="text-gray-dark text-lg mb-6">
                Step into Aurora Fine Arts, where contemporary masterpieces find their home in an architecturally 
                designed space that celebrates both art and viewer. Our gallery features soaring ceilings, 
                carefully curated lighting, and intimate viewing areas that create an immersive experience.
              </p>
              <p className="text-gray-dark text-lg mb-8">
                Founded on the principle that art should be accessible yet extraordinary, we provide a tranquil 
                environment where each piece can speak for itself. Our vision is to bridge the gap between emerging 
                artists and discerning collectors in a space that feels both sophisticated and welcoming.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="flex items-center text-gray-dark">
                  <Clock size={20} className="mr-3 text-primary" />
                  <span className="font-semibold">Open Tuesday - Sunday, 10AM - 6PM</span>
                </div>
                <div className="flex items-center text-gray-dark">
                  <MapPin size={20} className="mr-3 text-primary" />
                  <span className="font-semibold">123 Gallery District, Arts Quarter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;