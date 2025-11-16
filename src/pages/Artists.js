import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'react-feather';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('/artists');
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="section-title">
          <h1>Our Artists</h1>
          <p>Meet the talented artists who bring contemporary art to life</p>
        </div>

        <div className="artist-grid">
          {artists.map((artist) => (
            <div key={artist._id} className="artist-card fade-in">
              <img 
                src={artist.image} 
                alt={artist.name}
                className="artist-image"
              />
              <div className="artist-overlay">
                <h3 className="text-white mb-2">{artist.name}</h3>
                <p className="text-gray-light mb-4">{artist.specialty}</p>
                <p className="text-gray-light text-sm mb-4">
                  {artist.bio.substring(0, 100)}...
                </p>
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

        {artists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray text-lg">No artists found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Artists;