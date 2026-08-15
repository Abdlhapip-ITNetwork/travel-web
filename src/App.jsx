import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';

const API_BASE_URL = 'https://travel-backend-navy.vercel.app';

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth'); // 'auth' | 'home' | 'detail'
  const [authTab, setAuthTab] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user_data');
    if (token) {
      if (savedUser) setUser(JSON.parse(savedUser));
      setCurrentPage('home');
    }
  }, []);

  // 1. HANDLER REGISTER
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

  // 2. HANDLER LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_data', JSON.stringify(res.data.user));
      setUser(res.data.user);
      alert('Login Berhasil!');
      setCurrentPage('home');
    } catch (err) {
      alert(err.response?.data?.error || 'Login gagal. Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    setUser(null);
    setCurrentPage('auth');
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div>
      {/* 1. HALAMAN AUTH / LOGIN & REGISTER */}
      {currentPage === 'auth' && (
        <div style={authWrapperStyle}>
          <div style={authCardStyle}>
            <div style={tabContainerStyle}>
              <button 
                type="button" 
                style={tabBtnStyle(authTab === 'login')} 
                onClick={() => setAuthTab('login')}
              >
                Login
              </button>
              <button 
                type="button" 
                style={tabBtnStyle(authTab === 'register')} 
                onClick={() => setAuthTab('register')}
              >
                Register
              </button>
            </div>

            {authTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input 
                    type="email" 
                    placeholder="nama@email.com" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                </div>
                <button type="submit" style={submitBtnStyle} disabled={loading}>
                  {loading ? 'Memproses...' : 'Log In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Nama Anda" 
                    value={regName} 
                    onChange={e => setRegName(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input 
                    type="email" 
                    placeholder="nama@email.com" 
                    value={regEmail} 
                    onChange={e => setRegEmail(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input 
                    type="password" 
                    placeholder="Minimal 6 karakter" 
                    value={regPassword} 
                    onChange={e => setRegPassword(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Konfirmasi Password</label>
                  <input 
                    type="password" 
                    placeholder="Ulangi password" 
                    value={regConfirmPassword} 
                    onChange={e => setRegConfirmPassword(e.target.value)} 
                    required 
                    style={inputStyle} 
                  />
                </div>
                <button type="submit" style={{ ...submitBtnStyle, backgroundColor: '#10b981' }} disabled={loading}>
                  {loading ? 'Mendaftarkan...' : 'Register Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. HALAMAN BERANDA / HOME */}
      {currentPage === 'home' && (
        <Home 
          user={user}
          onLogout={handleLogout}
          onSelectDestination={(dest) => { setSelectedDest(dest); setCurrentPage('detail'); }}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* 3. HALAMAN DETAIL DESTINASI */}
      {currentPage === 'detail' && selectedDest && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
          <nav className="navbar navbar-dark bg-dark py-3" style={{ background: '#040e27' }}>
            <div className="container d-flex justify-content-between align-items-center">
              <a className="navbar-brand text-white font-weight-bold" href="#back" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
                ← Kembali ke Katalog
              </a>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Logout</button>
            </div>
          </nav>
          <div className="container mt-4" style={{ maxWidth: '900px' }}>
            <div className="card shadow-sm border-0 rounded overflow-hidden bg-white" style={{ borderRadius: '12px' }}>
              <img src={selectedDest.image} alt={selectedDest.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              <div className="card-body p-4 p-md-5">
                <span className="badge badge-primary px-3 py-2 mb-2" style={{ backgroundColor: '#2563eb' }}>{selectedDest.category}</span>
                <h1 className="font-weight-bold mt-2" style={{ fontSize: '32px' }}>{selectedDest.title}</h1>
                <p className="text-muted"><i className="fa fa-map-marker text-danger mr-2"></i>{selectedDest.location}</p>
                <p className="text-warning font-weight-bold" style={{ fontSize: '18px' }}>
                  ⭐ {selectedDest.rating} / 5.0 | <span className="text-dark">Estimasi Tiket: {selectedDest.price}</span>
                </p>
                <hr style={{ margin: '24px 0' }} />
                <h4 className="font-weight-bold mb-3">Deskripsi Lengkap</h4>
                <p style={{ lineHeight: '1.8', color: '#4a5568', fontSize: '16px' }}>{selectedDest.description}</p>
                <div className="mt-4 d-flex" style={{ gap: '12px' }}>
                  <button 
                    className={`btn ${favorites.includes(selectedDest._id || selectedDest.id) ? 'btn-danger' : 'btn-outline-primary'} px-4 py-2`}
                    onClick={() => toggleFavorite(selectedDest._id || selectedDest.id)}
                  >
                    {favorites.includes(selectedDest._id || selectedDest.id) ? '❤️ Hapus dari Favorit' : '🤍 Simpan ke Favorit'}
                  </button>
                  <button className="btn btn-secondary px-4 py-2" onClick={() => setCurrentPage('home')}>
                    Kembali ke Beranda
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

// Styling Form
const authWrapperStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', padding: '20px' };
const authCardStyle = { width: '100%', maxWidth: '440px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' };
const tabContainerStyle = { display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' };
const tabBtnStyle = (active) => ({ flex: 1, padding: '12px', border: 'none', background: 'transparent', fontSize: '16px', fontWeight: '700', color: active ? '#2563eb' : '#94a3b8', borderBottom: active ? '3px solid #2563eb' : 'none', cursor: 'pointer', outline: 'none' });
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' };
const submitBtnStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' };