import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'react-feather';

const ExhibitionCarousel = ({ exhibitions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const nextSlide = () => {
    if (currentIndex < exhibitions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.children[0]?.offsetWidth || 0;
      const gap = 32;
      const translateX = -currentIndex * (cardWidth + gap);
      trackRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [currentIndex, exhibitions]);

  if (!exhibitions || exhibitions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray text-lg">No upcoming exhibitions at the moment.</p>
        <p className="text-gray">Check back soon for new exhibitions!</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="carousel-container">
      <div className="carousel">
        <div 
          ref={trackRef}
          className="carousel-track"
        >
          {exhibitions.map((exhibition) => (
            <div key={exhibition._id} className="carousel-item">
              <div className="card">
                <img 
                  src={exhibition.image} 
                  alt={exhibition.title}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/F5F5F0/1E3A5F?text=Exhibition+Image';
                  }}
                />
                <div className="card-body">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-navy text-2xl flex-1 mr-2">{exhibition.title}</h3>
                    <span className={`badge badge-${exhibition.status}`}>
                      {exhibition.status}
                    </span>
                  </div>
                  <p className="text-gray mb-4">
                    {new Date(exhibition.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} - {new Date(exhibition.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-dark mb-4">{exhibition.description}</p>
                  <Link 
                    to={`/exhibitions/${exhibition._id}`}
                    className="btn btn-outline"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {exhibitions.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="carousel-btn prev"
              aria-label="Previous exhibition"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentIndex >= exhibitions.length - 1}
              className="carousel-btn next"
              aria-label="Next exhibition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      
      {exhibitions.length > 1 && (
        <div 
          className="carousel-indicators"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            gap: '0.5rem'
          }}
        >
          {exhibitions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to exhibition ${index + 1}`}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? 'var(--primary)' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.target.style.background = 'var(--primary-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.target.style.background = '#ddd';
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExhibitionCarousel;