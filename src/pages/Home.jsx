import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://travel-backend-navy.vercel.app';

const FEATURED_PLACES = [
  {
    id: 1,
    title: 'Candi Borobudur',
    category: 'Budaya & Heritage',
    location: 'Magelang, Jawa Tengah',
    rating: 4.9,
    price: 'Rp 50.000 / org',
    days: '1 Hari Wisata',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    description: 'Candi Buddha terbesar di dunia peninggalan wangsa Syailendra dengan relief megah dan stupa berlatar Menoreh.'
  },
  {
    id: 2,
    title: 'Kepulauan Raja Ampat',
    category: 'Wisata Bahari',
    location: 'Papua Barat Daya',
    rating: 5.0,
    price: 'Rp 500.000 (PIN)',
    days: '5 Hari Wisata',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
    description: 'Gugusan pulau karang eksotis dengan 75% spesies karang dunia hidup di perairannya.'
  },
  {
    id: 3,
    title: 'Desa Tradisional Penglipuran',
    category: 'Desa Budaya',
    location: 'Bangli, Bali',
    rating: 4.8,
    price: 'Rp 25.000 / org',
    days: '1 Hari Wisata',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Salah satu desa terbersih di dunia yang menjaga tata ruang arsitektur tradisional Bali.'
  },
  {
    id: 4,
    title: 'Sentra Kuliner Gudeg Yu Djum',
    category: 'Kuliner Nusantara',
    location: 'Yogyakarta',
    rating: 4.7,
    price: 'Rp 35.000 / porsi',
    days: 'Kuliner Trip',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Kuliner manis gurih khas Yogyakarta berbahan dasar nangka muda dan krecek bumbu rempah.'
  }
];

export default function Home({ user, onLogout, onSelectDestination, favorites = [], onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('tour');

  const filteredPlaces = FEATURED_PLACES.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>
      
      {/* 1. NAVBAR TRANSPARAN KHAS PACIFIC */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '24px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container d-flex justify-content-between align-items-center">
          <a href="#home" style={{ textDecoration: 'none', color: '#fff', fontSize: '24px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Pacific <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#f15b43', letterSpacing: '3px' }}>Travel Guide</span>
          </a>
          
          <div className="d-flex align-items-center" style={{ gap: '20px' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>
              Halo, <strong style={{ color: '#f15b43' }}>{user?.name || 'Traveler'}</strong>
            </span>
            <button 
              onClick={onLogout} 
              style={{
                backgroundColor: '#f15b43', color: '#fff', border: 'none',
                padding: '8px 20px', borderRadius: '30px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION DENGAN FONT ARIZONIA */}
      <div style={{
        backgroundImage: "linear-gradient(rgba(4, 14, 39, 0.45), rgba(4, 14, 39, 0.45)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        minHeight: '750px', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
      }}>
        <div className="container text-center text-white" style={{ paddingTop: '100px' }}>
          <span style={{ fontFamily: "'Arizonia', cursive", fontSize: '48px', color: '#f15b43', display: 'block', marginBottom: '10px' }}>
            Welcome to Pacific
          </span>
          <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.2', maxWidth: '850px', margin: '0 auto 20px', color: '#fff' }}>
            Discover Your Favorite Place with Us
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto 30px' }}>
            Travel to any corner of Nusantara, without going around in circles
          </p>
        </div>
      </div>

      {/* 3. FLOATING SEARCH TABS FORM */}
      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', backgroundColor: '#f8fafc', borderBottom: '1px solid #edf2f7' }}>
            <button 
              onClick={() => setActiveTab('tour')}
              style={{
                padding: '16px 30px', border: 'none', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase',
                backgroundColor: activeTab === 'tour' ? '#f15b43' : 'transparent',
                color: activeTab === 'tour' ? '#fff' : '#64748b', cursor: 'pointer'
              }}
            >
              Search Tour
            </button>
            <button 
              onClick={() => setActiveTab('hotel')}
              style={{
                padding: '16px 30px', border: 'none', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase',
                backgroundColor: activeTab === 'hotel' ? '#f15b43' : 'transparent',
                color: activeTab === 'hotel' ? '#fff' : '#64748b', cursor: 'pointer'
              }}
            >
              Hotel & Stay
            </button>
          </div>

          <div style={{ padding: '24px' }}>
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-6 mb-3 mb-lg-0">
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Destination / Key</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 14px' }}>
                  <i className="fa fa-search text-muted mr-2"></i>
                  <input 
                    type="text" 
                    placeholder="Search place, temple, beach..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Category Filter</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['All', 'Budaya', 'Bahari', 'Kuliner'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        flex: 1, padding: '9px 10px', fontSize: '13px', borderRadius: '6px', border: '1px solid #e2e8f0',
                        backgroundColor: selectedCategory === cat ? '#040e27' : '#fff',
                        color: selectedCategory === cat ? '#fff' : '#475569', fontWeight: '600', cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-lg-3 col-md-12">
                <label style={{ fontSize: '12px', opacity: 0 }}>Action</label>
                <button 
                  style={{
                    width: '100%', padding: '12px', backgroundColor: '#f15b43', color: '#fff', border: 'none',
                    borderRadius: '6px', fontWeight: '700', fontSize: '15px', textTransform: 'uppercase', cursor: 'pointer'
                  }}
                >
                  Find Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SERVICES SECTION (4 KOTAK ICON SEPERTI PACIFIC) */}
      <section style={{ padding: '90px 0 60px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center mb-4 mb-md-0">
              <div>
                <span style={{ fontFamily: "'Arizonia', cursive", fontSize: '36px', color: '#f15b43' }}>Welcome to Pacific</span>
                <h2 style={{ fontSize: '38px', fontWeight: '800', color: '#040e27', margin: '10px 0 20px' }}>
                  It's time to start your adventure
                </h2>
                <p style={{ lineHeight: '1.8', color: '#777' }}>
                  Jelajahi berbagai pilihan destinasi wisata alam, warisan cagar budaya, serta cita rasa kuliner tradisional nusantara yang kaya akan keberagaman dan keindahan.
                </p>
                <a 
                  href="#destinations" 
                  style={{
                    display: 'inline-block', backgroundColor: '#f15b43', color: '#fff', padding: '14px 28px',
                    borderRadius: '30px', textDecoration: 'none', fontWeight: '600', marginTop: '10px'
                  }}
                >
                  Search Destination
                </a>
              </div>
            </div>

            <div className="col-md-6">
              <div className="row">
                {[
                  { icon: 'fa-globe', title: 'Activities', bg: '#f15b43', desc: 'Ragam aktivitas seru mulai dari diving hingga mendaki gunung.' },
                  { icon: 'fa-map', title: 'Arrangements', bg: '#10b981', desc: 'Pengaturan jadwal wisata yang terstruktur dan fleksibel.' },
                  { icon: 'fa-user-circle', title: 'Private Guide', bg: '#3b82f6', desc: 'Pemandu lokal berpengalaman mendampingi liburan Anda.' },
                  { icon: 'fa-compass', title: 'Location Manager', bg: '#8b5cf6', desc: 'Titik rute lokasi terverifikasi dengan navigasi akurat.' }
                ].map((s, idx) => (
                  <div className="col-sm-6 mb-4" key={idx}>
                    <div style={{
                      backgroundColor: '#fff', padding: '30px 20px', borderRadius: '8px', border: '1px solid #edf2f7',
                      textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '50%', backgroundColor: s.bg, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '22px'
                      }}>
                        <i className={`fa ${s.icon}`}></i>
                      </div>
                      <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#040e27' }}>{s.title}</h4>
                      <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOUR DESTINATION GRID */}
      <section id="destinations" style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontFamily: "'Arizonia', cursive", fontSize: '32px', color: '#f15b43' }}>Destination</span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#040e27' }}>Tour Destination</h2>
          </div>

          <div className="row">
            {filteredPlaces.map(item => (
              <div className="col-lg-3 col-md-6 mb-4" key={item.id}>
                <div style={{
                  backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)', transition: 'transform 0.2s'
                }}>
                  <div style={{
                    backgroundImage: `url(${item.image})`, height: '220px', backgroundSize: 'cover',
                    backgroundPosition: 'center', position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute', bottom: '15px', left: '15px', backgroundColor: '#f15b43',
                      color: '#fff', fontSize: '13px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px'
                    }}>
                      {item.price}
                    </span>
                    <button 
                      onClick={() => onToggleFavorite(item.id)}
                      style={{
                        position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px',
                        borderRadius: '50%', border: 'none', backgroundColor: '#fff', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      {favorites.includes(item.id) ? '❤️' : '🤍'}
                    </button>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#f15b43', textTransform: 'uppercase' }}>
                      {item.days}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '6px 0', color: '#040e27' }}>
                      <a href="#detail" onClick={(e) => { e.preventDefault(); onSelectDestination(item); }} style={{ color: '#040e27', textDecoration: 'none' }}>
                        {item.title}
                      </a>
                    </h3>
                    <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px' }}>
                      <i className="fa fa-map-marker text-danger mr-1"></i> {item.location}
                    </p>
                    
                    <button 
                      onClick={() => onSelectDestination(item)}
                      style={{
                        width: '100%', padding: '10px', backgroundColor: '#040e27', color: '#fff',
                        border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER THEMEWAGON STYLE */}
      <footer style={{ backgroundColor: '#040e27', color: 'rgba(255,255,255,0.7)', padding: '70px 0 30px' }}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4 mb-4 mb-md-0">
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>Pacific Agency</h2>
              <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
                Platform penjelajah destinasi wisata nusantara berbasis Cloud & Web, dirancang untuk memudahkan para wisatawan menemukan pengalaman terbaik di Indonesia.
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>Quick Links</h2>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                <li><a href="#home" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</a></li>
                <li><a href="#destinations" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Tour Destinations</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>Have Questions?</h2>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}><i className="fa fa-map-marker mr-2 text-danger"></i> Tangerang Selatan, Banten</p>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}><i className="fa fa-envelope mr-2 text-danger"></i> info@pacifictravel.ac.id</p>
            </div>
          </div>
          <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '13px' }}>
            <p className="mb-0">Copyright &copy; 2026 Pacific Travel Guide. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}