import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Ganti URL dengan URL backend Anda yang sudah dihosting nanti
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login Berhasil!');
      navigate('/api/auth/register'); // Arahkan ke halaman utama
    } catch (err) {
      alert(err.response.data.error || 'Terjadi Kesalahan');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Login Travel Guide</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}
export default Login;