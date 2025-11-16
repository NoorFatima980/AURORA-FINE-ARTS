import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'react-feather';

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get('/exhibitions');
      setExhibitions(response.data);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
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
          <h1>Exhibitions</h1>
          <p>Explore our current and upcoming exhibitions</p>
        </div>

        <div className="exhibition-grid">
          {exhibitions.map((exhibition) => (
            <div key={exhibition._id} className="card fade-in">
              <img 
                src={exhibition.image} 
                alt={exhibition.title}
                className="card-image"
              />
              <div className="card-body">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-navy text-xl flex-1 mr-2">{exhibition.title}</h3>
                  <span className={`badge badge-${exhibition.status}`}>
                    {exhibition.status}
                  </span>
                </div>
                <p className="text-gray mb-4">
                  {new Date(exhibition.startDate).toLocaleDateString()} - {' '}
                  {new Date(exhibition.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-dark mb-4">
                  {exhibition.description.substring(0, 150)}...
                </p>
                <p className="text-gray mb-4">
                  <strong>Location:</strong> {exhibition.location}
                </p>
                <p className="text-gray mb-4">
                  <strong>Admission:</strong> {exhibition.admission}
                </p>
                <Link 
                  to={`/exhibitions/${exhibition._id}`}
                  className="btn btn-outline"
                >
                  Learn More
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {exhibitions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray text-lg">No exhibitions found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Exhibitions;