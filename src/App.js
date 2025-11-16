import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Exhibitions from './pages/Exhibitions';
import ExhibitionDetail from './pages/ExhibitionDetail';
import Contact from './pages/Contact';

import './App.css';

function App() {
  const [artists, setArtists] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedData();
  }, []);

  const fetchFeaturedData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [artistsRes, exhibitionsRes] = await Promise.all([
        axios.get('/artists/featured'),
        axios.get('/exhibitions/upcoming')
      ]);
      
      setArtists(artistsRes.data);
      setExhibitions(exhibitionsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="text-center mt-4 text-navy font-semibold">Loading Aurora Fine Arts...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          {error && (
            <div className="error-message">
              <strong>Error: </strong>
              {error}
              <button onClick={fetchFeaturedData} className="btn btn-primary ml-4">
                Retry
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={
              <Home artists={artists} exhibitions={exhibitions} />
            } />
            <Route path="/artists" element={<Artists />} />
            <Route path="/exhibitions" element={<Exhibitions />} />
            <Route path="/exhibitions/:id" element={<ExhibitionDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;