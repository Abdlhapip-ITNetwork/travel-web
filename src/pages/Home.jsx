import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://travel-backend-navy.vercel.app';

// Data cadangan jika database MongoDB di backend masih kosong
const FALLBACK_DESTINATIONS = [
  {
    _id: '1',
    title: 'Candi Borobudur',
    category: 'Budaya',
    location: 'Magelang, Jawa Tengah',
    rating: 4.9,
    price: 'Rp 50.000',
    image: '/images/destination-1.jpg'
  },
  {
    _id: '2',
    title: 'Raja Ampat',
    category: 'Wisata Alam',
    location: 'Papua Barat Daya',
    rating: 5.0,
    price: 'Rp 500.000',
    image: '/images/destination-2.jpg'
  },
  {
    _id: '3',
    title: 'Desa Penglipuran',
    category: 'Budaya',
    location: 'Bangli, Bali',
    rating: 4.8,
    price: 'Rp 25.000',
    image: '/images/destination-3.jpg'
  }
];

export default function Home({ onSelectDestination }) {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Ambil data langsung dari API backend Vercel
    axios.get(`${API_BASE_URL}/api/destinations`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data && res.data.length > 0) {
        setDestinations(res.data);
      } else {
        setDestinations(FALLBACK_DESTINATIONS);
      }
    })
    .catch(() => {
      setDestinations(FALLBACK_DESTINATIONS);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filteredDestinations = destinations.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar" style={{ top: 0, position: 'sticky', background: '#040e27', zIndex: 100 }}>
        <div className="container">
          <a className="navbar-brand" href="#home" onClick={(e) => e.preventDefault()}>Pacific<span>Travel Guide</span></a>
          <div className="collapse navbar-collapse show" id="ftco-nav">
            <ul className="navbar-nav ml-auto d-flex align-items-center flex-row" style={{ gap: '15px' }}>
              <li className="nav-item active"><a href="#home" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="#destination-section" className="nav-link">Destination</a></li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm py-1 px-3" style={{ borderRadius: '20px' }}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <div className="hero-wrap js-fullheight" style={{ backgroundImage: "url('/images/bg_5.jpg')", minHeight: '500px', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(4, 14, 39, 0.5)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px' }}>
          <div className="row no-gutters slider-text align-items-center">
            <div className="col-md-8 text-left text-white">
              <span className="subheading" style={{ fontFamily: 'Arizonia, cursive', fontSize: '36px', color: '#f15b43' }}>Welcome to Nusantara</span>
              <h1 className="mb-4 text-white" style={{ fontSize: '42px', fontWeight: '800' }}>Discover Your Favorite Place with Us</h1>
              <p style={{ fontSize: '16px' }}>Jelajahi keindahan budaya, alam, dan kuliner nusantara langsung dari database cloud.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR */}
      <section className="ftco-section ftco-no-pb ftco-no-pt" style={{ marginTop: '-40px', position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 bg-white shadow-sm rounded">
                <div className="form-group mb-0 d-flex align-items-center border rounded px-3 py-2">
                  <span className="fa fa-search mr-2 text-muted"></span>
                  <input
                    type="text"
                    className="form-control border-0 p-0 shadow-none"
                    placeholder="Cari destinasi atau lokasi wisata..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN DESTINATION LIST (API DATA) */}
      <section className="ftco-section bg-light py-5" id="destination-section">
        <div className="container">
          <div className="row justify-content-center pb-4">
            <div className="col-md-12 heading-section text-center">
              <span className="subheading" style={{ color: '#f15b43', fontWeight: '600' }}>Rekomendasi</span>
              <h2 className="mb-4">Daftar Destinasi Wisata</h2>
            </div>
          </div>
          <div className="row">
            {filteredDestinations.map(item => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="project-wrap bg-white shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  <div
                    className="img position-relative"
                    style={{ backgroundImage: `url(${item.image || '/images/destination-1.jpg'})`, height: '220px', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <span className="badge badge-primary p-2 position-absolute" style={{ top: '15px', left: '15px' }}>
                      {item.price || 'Rp 50.000'}
                    </span>
                    <button
                      onClick={() => toggleFavorite(item._id)}
                      className="btn btn-sm btn-light position-absolute shadow"
                      style={{ top: '15px', right: '15px', borderRadius: '50%', width: '36px', height: '36px' }}
                    >
                      {favorites.includes(item._id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="text p-4">
                    <span className="badge badge-secondary mb-2">{item.category || 'Wisata'}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>
                      <a href="#detail" onClick={(e) => { e.preventDefault(); onSelectDestination && onSelectDestination(item); }} className="text-dark">
                        {item.title}
                      </a>
                    </h3>
                    <p className="location text-muted mb-2">
                      <span className="fa fa-map-marker text-danger mr-1"></span> {item.location}
                    </p>
                    <p className="text-warning font-weight-bold mb-3">⭐ {item.rating || 5.0} / 5.0</p>
                    <button
                      className="btn btn-primary btn-block py-2"
                      onClick={() => onSelectDestination && onSelectDestination(item)}
                    >
                      Lihat Detail Wisata
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}