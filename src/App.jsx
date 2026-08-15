import React, { useState } from 'react';
import axios from 'axios';
import Home from './pages/Home';

const API_BASE_URL = 'https://travel-backend-navy.vercel.app';

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth'); // 'auth' | 'home' | 'detail'
  const [authTab, setAuthTab] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);

  // Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

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
      alert(err.response?.data?.error || 'Registrasi gagal. Cek koneksi MongoDB Atlas.');
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
      setUser(res.data.user);
      setCurrentPage('home');
    } catch (err) {
      alert(err.response?.data?.error || 'Login gagal. Email atau password salah.');
    } finally {
      setLoading(false);
    }
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
          onSelectDestination={(dest) => { setSelectedDest(dest); setCurrentPage('detail'); }}
        />
      )}

      {/* 3. HALAMAN DETAIL */}
      {currentPage === 'detail' && selectedDest && (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <img src={selectedDest.image || '/images/destination-1.jpg'} alt={selectedDest.title} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <div style={{ padding: '30px' }}>
              <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                {selectedDest.category || 'Wisata'}
              </span>
              <h1 style={{ fontSize: '28px', marginTop: '15px', fontWeight: 'bold' }}>{selectedDest.title}</h1>
              <p style={{ color: '#64748b' }}>📍 {selectedDest.location}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#eab308' }}>⭐ {selectedDest.rating || 5.0} / 5.0 | <span style={{ color: '#0f172a' }}>{selectedDest.price || 'Rp 50.000'}</span></p>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
              <p style={{ lineHeight: '1.8', color: '#334155' }}>{selectedDest.description || 'Destinasi wisata unggulan di Indonesia dengan keindahan panorama alam serta kekayaan budaya lokal yang memukau para wisatawan.'}</p>
              <button onClick={() => setCurrentPage('home')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                ← Kembali ke Katalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Styling Mandiri
const authWrapperStyle = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', padding: '20px' };
const authCardStyle = { width: '100%', maxWidth: '440px', backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' };
const tabContainerStyle = { display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '24px' };
const tabBtnStyle = (active) => ({ flex: 1, padding: '12px', border: 'none', background: 'transparent', fontSize: '16px', fontWeight: '700', color: active ? '#2563eb' : '#94a3b8', borderBottom: active ? '3px solid #2563eb' : 'none', cursor: 'pointer', outline: 'none' });
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none', boxSizing: 'border-box' };
const submitBtnStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' };