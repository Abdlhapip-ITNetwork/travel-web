import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://travel-backend-navy.vercel.app';

const FALLBACK_DESTINATIONS = [
  {
    id: 1,
    title: 'Candi Borobudur',
    category: 'Budaya',
    location: 'Magelang, Jawa Tengah',
    rating: 4.9,
    price: 'Rp 50.000 / orang',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80',
    description: 'Candi Buddha terbesar di dunia yang dibangun pada abad ke-8 dengan panorama matahari terbit memukau.'
  },
  {
    id: 2,
    title: 'Kepulauan Raja Ampat',
    category: 'Wisata Alam',
    location: 'Papua Barat Daya',
    rating: 5.0,
    price: 'Rp 500.000 (PIN Masuk)',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80',
    description: 'Gugusan pulau karang eksotis dengan keanekaragaman terumbu karang dan biota laut terkaya di dunia.'
  },
  {
    id: 3,
    title: 'Desa Tradisional Penglipuran',
    category: 'Budaya',
    location: 'Bangli, Bali',
    rating: 4.8,
    price: 'Rp 25.000 / orang',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    description: 'Salah satu desa terbersih di dunia yang tetap mempertahankan adat istiadat dan arsitektur tradisional Bali.'
  },
  {
    id: 4,
    title: 'Sentra Kuliner Gudeg Yu Djum',
    category: 'Kuliner',
    location: 'Yogyakarta',
    rating: 4.7,
    price: 'Rp 35.000 / porsi',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    description: 'Makanan khas Yogyakarta berbahan dasar nangka muda yang dimasak kental dengan santan dan gula aren asli.'
  }
];

export default function Home({ user, onLogout, onSelectDestination, favorites = [], onToggleFavorite }) {
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_BASE_URL}/api/destinations`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setDestinations(res.data);
        }
      })
      .catch(() => {
        // Tetap gunakan fallback data jika API destinasi kosong
      });
    }
  }, []);

  const filteredDestinations = destinations.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark" style={{ background: '#040e27', padding: '16px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-white font-weight-bold" href="#home" style={{ fontSize: '22px' }}>
            🧭 Pacific <span>Travel Guide</span>
          </a>
          <div className="d-flex align-items-center" style={{ gap: '15px' }}>
            <span className="text-warning font-weight-bold d-none d-sm-inline">
              Halo, {user?.name || user?.email || 'Traveler'}
            </span>
            <button onClick={onLogout} className="btn btn-outline-danger btn-sm" style={{ borderRadius: '20px' }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <div style={{ 
        backgroundImage: "linear-gradient(rgba(4, 14, 39, 0.6), rgba(4, 14, 39, 0.6)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')",
        minHeight: '480px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '24px', color: '#f15b43', fontWeight: 'bold' }}>Welcome to Nusantara</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '16px 0' }}>Discover Your Favorite Place in Indonesia</h1>
          <p style={{ fontSize: '18px', color: '#e2e8f0' }}>Jelajahi keindahan budaya, alam, kuliner, dan penginapan terbaik dari berbagai daerah di Indonesia.</p>
        </div>
      </div>

      {/* 3. SEARCH BAR */}
      <div className="container" style={{ marginTop: '-35px', position: 'relative', zIndex: 10 }}>
        <div className="p-3 bg-white shadow rounded d-flex flex-column flex-md-row" style={{ gap: '12px', border: '1px solid #e2e8f0' }}>
          <input 
            type="text"
            className="form-control"
            placeholder="Cari candi, pantai, kuliner, lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '12px' }}
          />
          <div className="d-flex" style={{ gap: '8px' }}>
            {['All', 'Budaya', 'Wisata Alam', 'Kuliner'].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                style={{ borderRadius: '20px', padding: '8px 16px', fontWeight: '600' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. KATALOG DESTINASI */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="text-primary font-weight-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Katalog Rekomendasi</span>
          <h2 className="font-weight-bold mt-2">Daftar Destinasi Wisata Unggulan</h2>
        </div>

        <div className="row">
          {filteredDestinations.map(item => (
            <div className="col-md-4 mb-4" key={item._id || item.id}>
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <span className="badge badge-primary position-absolute" style={{ top: '12px', left: '12px', backgroundColor: '#2563eb', padding: '6px 12px' }}>
                    {item.price}
                  </span>
                  <button 
                    onClick={() => onToggleFavorite(item._id || item.id)}
                    className="btn btn-sm btn-light position-absolute shadow"
                    style={{ top: '12px', right: '12px', borderRadius: '50%', width: '36px', height: '36px' }}
                  >
                    {favorites.includes(item._id || item.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <span className="badge badge-secondary mb-2" style={{ width: 'fit-content' }}>{item.category}</span>
                  <h4 className="font-weight-bold">{item.title}</h4>
                  <p className="text-muted small mb-2"><i className="fa fa-map-marker text-danger mr-1"></i> {item.location}</p>
                  <p className="text-warning font-weight-bold mb-3">⭐ {item.rating} / 5.0</p>
                  <button 
                    className="btn btn-primary btn-block mt-auto" 
                    style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                    onClick={() => onSelectDestination(item)}
                  >
                    Lihat Detail Wisata
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FOOTER */}
      <footer className="bg-dark text-white py-4 mt-5" style={{ background: '#040e27' }}>
        <div className="container text-center text-muted small">
          <p className="mb-1 text-white">Specialized Platform Travel Guide Indonesia</p>
          <p className="mb-0">&copy; 2026 Academic Final Project. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}