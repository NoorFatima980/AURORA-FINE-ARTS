import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'react-feather';

const ExhibitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExhibitionDetail();
  }, [id]);

  const fetchExhibitionDetail = async () => {
    try {
      setLoading(true);
      console.log('Fetching exhibition with ID:', id);
      const response = await axios.get(`/exhibitions/${id}`);
      console.log('Exhibition data:', response.data);
      setExhibition(response.data);
    } catch (err) {
      console.error('Error fetching exhibition:', err);
      console.error('Error details:', err.response);
      setError('Exhibition not found');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'badge-upcoming';
      case 'current': return 'badge-current';
      case 'past': return 'badge-past';
      default: return 'badge-upcoming';
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="spinner"></div>
          <p className="text-center mt-4 text-gray">Loading exhibition details...</p>
        </div>
      </section>
    );
  }

  if (error || !exhibition) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-navy mb-4">Exhibition Not Found</h2>
            <p className="text-gray mb-8">The exhibition you're looking for doesn't exist or there was an error loading it.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="btn btn-outline"
              >
                Go Back
              </button>
              <Link to="/exhibitions" className="btn btn-primary">
                View All Exhibitions
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="exhibition-detail">
      {/* Hero Section */}
      <section className="exhibition-hero">
        <div className="exhibition-hero-image">
          <img 
            src={exhibition.image} 
            alt={exhibition.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x600/F5F5F0/1E3A5F?text=Exhibition+Image';
            }}
          />
          <div className="exhibition-hero-overlay"></div>
        </div>
        
        <div className="container">
          <div className="exhibition-hero-content">
            <button 
              onClick={() => navigate(-1)}
              className="back-button"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            
            <div className="exhibition-header">
              <span className={`badge ${getStatusColor(exhibition.status)}`}>
                {exhibition.status.charAt(0).toUpperCase() + exhibition.status.slice(1)}
              </span>
              <h1 className="exhibition-title">{exhibition.title}</h1>
              
              <div className="exhibition-meta">
                <div className="meta-item">
                  <Calendar size={20} />
                  <span>
                    {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                  </span>
                </div>
                
                <div className="meta-item">
                  <MapPin size={20} />
                  <span>{exhibition.location}</span>
                </div>
                
                <div className="meta-item">
                  <Clock size={20} />
                  <span>Open Tuesday - Sunday, 10AM - 6PM</span>
                </div>
                
                <div className="meta-item">
                  <Users size={20} />
                  <span>Admission: {exhibition.admission}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Content */}
      <section className="py-16">
        <div className="container">
          <div className="exhibition-content">
            <div className="exhibition-description">
              <h2 className="section-title">About the Exhibition</h2>
              <div className="description-text">
                {exhibition.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-dark mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="exhibition-sidebar">
              <div className="info-card">
                <h3 className="info-card-title">Exhibition Details</h3>
                
                <div className="info-item">
                  <strong>Dates:</strong>
                  <span>{formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}</span>
                </div>
                
                <div className="info-item">
                  <strong>Location:</strong>
                  <span>{exhibition.location}</span>
                </div>
                
                <div className="info-item">
                  <strong>Admission:</strong>
                  <span>{exhibition.admission}</span>
                </div>
                
                <div className="info-item">
                  <strong>Status:</strong>
                  <span className={`status ${exhibition.status}`}>
                    {exhibition.status.charAt(0).toUpperCase() + exhibition.status.slice(1)}
                  </span>
                </div>

                <div className="info-item">
                  <strong>Hours:</strong>
                  <span>Tuesday - Sunday: 10:00 AM - 6:00 PM<br />Monday: Closed</span>
                </div>
              </div>

              <div className="action-card">
                <h3 className="action-card-title">Plan Your Visit</h3>
                <p className="action-card-text">
                  Ready to experience this exhibition? Plan your visit to Aurora Fine Arts Gallery.
                </p>
                <div className="action-buttons">
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    Contact Us
                  </Link>
                  <button className="btn btn-outline">
                    Share Exhibition
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Information */}
      <section className="py-16 bg-gray-light">
        <div className="container">
          <h2 className="section-title text-center">Visitor Information</h2>
          
          <div className="info-grid">
            <div className="info-item-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <h3>Location & Directions</h3>
              <p>
                Aurora Fine Arts Gallery<br />
                123 Gallery District<br />
                Arts Quarter, City Center<br />
                Metropolis, 10001
              </p>
            </div>
            
            <div className="info-item-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <h3>Opening Hours</h3>
              <p>
                Tuesday - Sunday: 10:00 AM - 6:00 PM<br />
                Monday: Closed<br />
                Special hours may apply during events
              </p>
            </div>
            
            <div className="info-item-card">
              <div className="info-icon">
                <Users size={24} />
              </div>
              <h3>Admission & Tickets</h3>
              <p>
                {exhibition.admission}<br />
                No advance booking required<br />
                Group visits: Please contact in advance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16">
        <div className="container">
          <div className="navigation-buttons">
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Exhibitions
            </button>
            
            <Link to="/contact" className="btn btn-primary">
              Contact Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExhibitionDetail;