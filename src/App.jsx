import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import Home from './pages/Home';

const API_BASE_URL = 'https://travel-backend-navy.vercel.app';

const DESTINATIONS_DATA = [
  {
    id: 1,
    title: 'Candi Borobudur',
    category: 'Budaya',
    location: 'Magelang, Jawa Tengah',
    rating: 4.9,
    image: '/images/destination-1.jpg',
    description: 'Candi Buddha terbesar di dunia yang dibangun pada abad ke-8. Memiliki relief megah dan stupa ikonik berlatar pemandangan pegunungan Menoreh.',
    price: 'Rp 50.000 / orang'
  },
  {
    id: 2,
    title: 'Kepulauan Raja Ampat',
    category: 'Wisata Alam',
    location: 'Papua Barat Daya',
    rating: 5.0,
    image: '/images/destination-2.jpg',
    description: 'Gugusan pulau karang eksotis dengan keanekaragaman biota laut tertinggi di dunia, menjadikannya surga menyelam internasional.',
    price: 'Rp 500.000 (Ijin PIN)'
  },
  {
    id: 3,
    title: 'Desa Tradisional Penglipuran',
    category: 'Budaya',
    location: 'Bangli, Bali',
    rating: 4.8,
    image: '/images/destination-3.jpg',
    description: 'Desa adat yang dinobatkan sebagai salah satu desa terbersih di dunia dengan tata ruang arsitektur Bali yang khas dan asri.',
    price: 'Rp 25.000 / orang'
  },
  {
    id: 4,
    title: 'Sentra Gudeg Yu Djum',
    category: 'Kuliner',
    location: 'Yogyakarta',
    rating: 4.7,
    image: '/images/destination-4.jpg',
    description: 'Kuliner tradisional khas Yogyakarta berbahan baku nangka muda yang dimasak kental dengan santan dan gula aren khas.',
    price: 'Rp 35.000 / porsi'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth'); // 'auth' | 'home' | 'detail'
  const [authTab, setAuthTab] = useState('login');
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS_DATA[0]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: regName,
        email: regEmail,
        password: regPassword
      });
      alert(res.data.message || 'Registrasi berhasil! Silakan login.');
      setAuthTab('login');
      setLoginEmail(regEmail);
    } catch (err) {
      alert(err.response?.data?.error || 'Registrasi gagal.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setCurrentPage('home');
    } catch (err) {
      alert(err.response?.data?.error || 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div>
      {/* 1. HALAMAN AUTH (LOGIN & REGISTER DENGAN BOOTSTRAP TAB) */}
      {currentPage === 'auth' && (
        <div className="container" style={{ paddingTop: '80px' }}>
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="panel panel-login shadow">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6 text-center">
                      <a href="#login" className={authTab === 'login' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setAuthTab('login'); }}>Login</a>
                    </div>
                    <div className="col-xs-6 text-center">
                      <a href="#register" className={authTab === 'register' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setAuthTab('register'); }}>Register</a>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="panel-body">
                  {authTab === 'login' ? (
                    <form onSubmit={handleLoginSubmit}>
                      <div className="form-group mb-3">
                        <input type="email" className="form-control" placeholder="Email Address" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                      </div>
                      <div className="form-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                      </div>
                      <input type="submit" className="form-control btn btn-login" value={loading ? "Memproses..." : "Log In"} disabled={loading} />
                    </form>
                  ) : (
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="form-group mb-2">
                        <input type="text" className="form-control" placeholder="Nama Lengkap" value={regName} onChange={e => setRegName(e.target.value)} required />
                      </div>
                      <div className="form-group mb-2">
                        <input type="email" className="form-control" placeholder="Email Address" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                      </div>
                      <div className="form-group mb-2">
                        <input type="password" className="form-control" placeholder="Password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
                      </div>
                      <div className="form-group mb-3">
                        <input type="password" className="form-control" placeholder="Confirm Password" value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} required />
                      </div>
                      <input type="submit" className="form-control btn btn-register" value={loading ? "Mendaftarkan..." : "Register Now"} disabled={loading} />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. HALAMAN UTAMA (TEMPLATE PACIFIC) */}
      {currentPage === 'home' && (
        <Home 
          user={user}
          onLogout={() => { localStorage.removeItem('token'); setUser(null); setCurrentPage('auth'); }}
          onSelectDestination={(dest) => { setSelectedDest(dest); setCurrentPage('detail'); }}
          destinations={DESTINATIONS_DATA}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* 3. HALAMAN DETAIL DESTINASI */}
      {currentPage === 'detail' && selectedDest && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
          <nav className="navbar navbar-dark bg-dark py-3" style={{ background: '#040e27' }}>
            <div className="container">
              <a className="navbar-brand text-white font-weight-bold" href="#back" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
                ← Kembali ke Katalog
              </a>
            </div>
          </nav>
          <div className="container mt-4">
            <div className="card shadow-sm border-0 rounded overflow-hidden">
              <img src={selectedDest.image} alt={selectedDest.title} style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
              <div className="card-body p-4 p-md-5">
                <span className="badge badge-primary px-3 py-2 mb-2">{selectedDest.category}</span>
                <h1 className="font-weight-bold">{selectedDest.title}</h1>
                <p className="text-muted"><i className="fa fa-map-marker text-danger mr-2"></i>{selectedDest.location}</p>
                <p className="text-warning font-weight-bold">⭐ {selectedDest.rating} / 5.0 | <span className="text-dark">Estimasi Tiket: {selectedDest.price}</span></p>
                <hr />
                <h4 className="font-weight-bold mb-3">Deskripsi Lengkap</h4>
                <p style={{ lineHeight: '1.8', color: '#4a5568', fontSize: '16px' }}>{selectedDest.description}</p>
                <div className="mt-4">
                  <button 
                    className={`btn ${favorites.includes(selectedDest.id) ? 'btn-danger' : 'btn-outline-primary'} mr-3 px-4 py-2`}
                    onClick={() => toggleFavorite(selectedDest.id)}
                  >
                    {favorites.includes(selectedDest.id) ? '❤️ Hapus dari Favorit' : '🤍 Tambah ke Favorit'}
                  </button>
                  <button className="btn btn-secondary px-4 py-2" onClick={() => setCurrentPage('home')}>
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}