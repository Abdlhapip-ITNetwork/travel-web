import React, { useState } from 'react';
import './Auth.css';

// Data Mock Destinasi Nusantara
const DESTINATIONS = [
  {
    id: 1,
    title: 'Candi Borobudur',
    category: 'Budaya',
    location: 'Magelang, Jawa Tengah',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80',
    description: 'Candi Buddha terbesar di dunia yang dibangun pada abad ke-8. Memiliki relief yang megah serta panorama matahari terbit yang sangat memukau di antara perbukitan Menoreh.',
    price: 'Rp 50.000 / orang'
  },
  {
    id: 2,
    title: 'Raja Ampat',
    category: 'Wisata Alam',
    location: 'Papua Barat Daya',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80',
    description: 'Kepulauan dengan keanekaragaman hayati laut terkaya di dunia. Gugusan pulau karang dan air laut jernih menjadikannya surga bagi para penyelam global.',
    price: 'Rp 500.000 (Ijin Kawasan)'
  },
  {
    id: 3,
    title: 'Desa Penglipuran',
    category: 'Budaya & Desa',
    location: 'Bangli, Bali',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    description: 'Salah satu desa terbersih di dunia yang tetap mempertahankan tata ruang tradisional Bali dan kearifan lokal secara turun-temurun.',
    price: 'Rp 25.000 / orang'
  },
  {
    id: 4,
    title: 'Kuliner Gudeg Yu Djum',
    category: 'Kuliner',
    location: 'Yogyakarta',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    description: 'Kuliner khas Yogyakarta berbahan dasar nangka muda yang dimasak dengan santan dan gula aren asli, disajikan lengkap dengan krecek dan telur pindang.',
    price: 'Rp 35.000 / porsi'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth'); // 'auth' | 'home' | 'detail'
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUser({ username: username || 'User Demo' });
    setCurrentPage('home');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setUser({ username: username || 'User Baru' });
    setCurrentPage('home');
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div>
      {/* TAMPILAN 1: AUTH (LOGIN & REGISTER DARI TEMPLATE ANDA) */}
      {currentPage === 'auth' && (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-login">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-xs-6">
                      <a 
                        href="#login" 
                        className={authTab === 'login' ? 'active' : ''} 
                        onClick={(e) => { e.preventDefault(); setAuthTab('login'); }}
                      >
                        Login
                      </a>
                    </div>
                    <div className="col-xs-6">
                      <a 
                        href="#register" 
                        className={authTab === 'register' ? 'active' : ''} 
                        onClick={(e) => { e.preventDefault(); setAuthTab('register'); }}
                      >
                        Register
                      </a>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      {/* FORM LOGIN */}
                      {authTab === 'login' && (
                        <form onSubmit={handleLoginSubmit} role="form">
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Username" 
                              value={username} 
                              onChange={(e) => setUsername(e.target.value)} 
                              required 
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="password" 
                              className="form-control" 
                              placeholder="Password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              required 
                            />
                          </div>
                          <div className="form-group text-center">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember"> Remember Me</label>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-sm-offset-3">
                                <input type="submit" className="form-control btn btn-login" value="Log In" />
                              </div>
                            </div>
                          </div>
                          <div className="form-group text-center">
                            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                          </div>
                        </form>
                      )}

                      {/* FORM REGISTER */}
                      {authTab === 'register' && (
                        <form onSubmit={handleRegisterSubmit} role="form">
                          <div className="form-group">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Username" 
                              value={username} 
                              onChange={(e) => setUsername(e.target.value)} 
                              required 
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="email" 
                              className="form-control" 
                              placeholder="Email Address" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              required 
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="password" 
                              className="form-control" 
                              placeholder="Password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              required 
                            />
                          </div>
                          <div className="form-group">
                            <input 
                              type="password" 
                              className="form-control" 
                              placeholder="Confirm Password" 
                              required 
                            />
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-sm-offset-3">
                                <input type="submit" className="form-control btn btn-register" value="Register Now" />
                              </div>
                            </div>
                          </div>
                        </form>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAMPILAN 2: HALAMAN UTAMA (HOME) */}
      {currentPage === 'home' && (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '40px' }}>
          {/* Navbar */}
          <nav className="navbar navbar-default" style={{ borderRadius: 0, backgroundColor: '#0f172a', borderColor: '#0f172a' }}>
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#" style={{ color: '#fff', fontWeight: 'bold' }}>🧭 Nusantara Guide</a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li><p className="navbar-text" style={{ color: '#94a3b8' }}>Halo, <strong>{user?.username}</strong></p></li>
                <li><a href="#" onClick={() => { setUser(null); setCurrentPage('auth'); }} style={{ color: '#ff6b6b' }}>Logout</a></li>
              </ul>
            </div>
          </nav>

          <div className="container">
            <div className="jumbotron text-center" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h2>Eksplorasi Keindahan Indonesia</h2>
              <p>Temukan destinasi wisata alam, budaya, dan kuliner terbaik di nusantara.</p>
            </div>

            <div className="row">
              {DESTINATIONS.map(item => (
                <div className="col-md-3 col-sm-6" key={item.id} style={{ marginBottom: '24px' }}>
                  <div className="thumbnail" style={{ padding: 0, overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <div className="caption" style={{ padding: '16px' }}>
                      <span className="label label-info">{item.category}</span>
                      <h4 style={{ fontWeight: 'bold', marginTop: '10px' }}>{item.title}</h4>
                      <p style={{ color: '#64748b', fontSize: '12px' }}>📍 {item.location}</p>
                      <p style={{ color: '#eab308', fontWeight: 'bold' }}>⭐ {item.rating} / 5.0</p>
                      <p>
                        <button 
                          className="btn btn-primary btn-block" 
                          onClick={() => { setSelectedDest(item); setCurrentPage('detail'); }}
                        >
                          Lihat Detail
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAMPILAN 3: HALAMAN DETAIL */}
      {currentPage === 'detail' && selectedDest && (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '40px' }}>
          <nav className="navbar navbar-default" style={{ borderRadius: 0, backgroundColor: '#0f172a', borderColor: '#0f172a' }}>
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#" style={{ color: '#fff', fontWeight: 'bold' }}>🧭 Nusantara Guide</a>
              </div>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={() => setCurrentPage('home')} style={{ color: '#fff' }}>← Kembali</a></li>
              </ul>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="panel panel-default" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={selectedDest.image} alt={selectedDest.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                  <div className="panel-body" style={{ padding: '30px' }}>
                    <span className="label label-success">{selectedDest.category}</span>
                    <h2 style={{ fontWeight: 'bold', marginTop: '10px' }}>{selectedDest.title}</h2>
                    <p style={{ color: '#64748b' }}>📍 {selectedDest.location}</p>
                    <p><strong>Rating:</strong> ⭐ {selectedDest.rating} | <strong>Tiket/Biaya:</strong> {selectedDest.price}</p>
                    <hr />
                    <h4>Deskripsi Destinasi</h4>
                    <p style={{ lineHeight: '1.8', color: '#334155' }}>{selectedDest.description}</p>
                    <div style={{ marginTop: '24px' }}>
                      <button 
                        className={`btn ${favorites.includes(selectedDest.id) ? 'btn-danger' : 'btn-default'}`} 
                        onClick={() => toggleFavorite(selectedDest.id)}
                        style={{ marginRight: '10px' }}
                      >
                        {favorites.includes(selectedDest.id) ? '❤️ Hapus dari Favorit' : '🤍 Simpan ke Favorit'}
                      </button>
                      <button className="btn btn-primary" onClick={() => setCurrentPage('home')}>
                        Kembali ke Katalog
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}