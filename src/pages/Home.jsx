import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    axios.get('https://DOMAIN-BACKEND-VERCEL-ANDA/api/destinations', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setDestinations(res.data))
    .catch(() => navigate('/'));
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Destinasi Wisata Indonesia</h1>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} style={{ marginBottom: '20px' }}>Logout</button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {destinations.map(d => (
          <div key={d._id} style={{ border: '1px solid #eee', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>{d.title}</h3>
            <p style={{ color: '#666' }}>{d.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}