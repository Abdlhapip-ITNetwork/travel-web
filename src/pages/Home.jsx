import React, { useState } from 'react';

export default function Home({ user, onLogout, onSelectDestination, destinations, favorites, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDestinations = destinations.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="home-page">
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar" style={{ top: 0, position: 'sticky', background: '#040e27' }}>
        <div className="container">
          <a className="navbar-brand" href="#home" onClick={(e) => { e.preventDefault(); }}>Pacific<span>Travel Guide</span></a>
          <div className="collapse navbar-collapse show" id="ftco-nav">
            <ul className="navbar-nav ml-auto d-flex align-items-center flex-row" style={{ gap: '15px' }}>
              <li className="nav-item active"><a href="#home" className="nav-link">Home</a></li>
              <li className="nav-item"><a href="#destination-section" className="nav-link">Destination</a></li>
              <li className="nav-item"><a href="#services-section" className="nav-link">Services</a></li>
              <li className="nav-item pl-lg-3">
                <span className="nav-link text-warning" style={{ fontWeight: '600' }}>Halo, {user?.name || user?.email || 'Traveler'}</span>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn btn-outline-danger btn-sm py-1 px-3" style={{ borderRadius: '20px' }}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <div className="hero-wrap js-fullheight" style={{ backgroundImage: "url('/images/bg_5.jpg')", minHeight: '650px', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(4, 14, 39, 0.5)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '150px' }}>
          <div className="row no-gutters slider-text align-items-center">
            <div className="col-md-8 text-left text-white">
              <span className="subheading" style={{ fontFamily: 'Arizonia, cursive', fontSize: '36px', color: '#f15b43' }}>Welcome to Nusantara</span>
              <h1 className="mb-4 text-white" style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1.2 }}>Discover Your Favorite Place in Indonesia</h1>
              <p className="caps" style={{ fontSize: '18px' }}>Jelajahi keindahan alam, warisan budaya, dan kuliner khas dari Sabang sampai Merauke.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR SECTION */}
      <section className="ftco-section ftco-no-pb ftco-no-pt" style={{ marginTop: '-60px', position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ftco-search d-flex justify-content-center p-4 bg-white shadow-sm" style={{ borderRadius: '10px' }}>
                <div className="row w-100 align-items-center">
                  <div className="col-md-8 mb-2 mb-md-0">
                    <div className="form-group mb-0">
                      <div className="form-field d-flex align-items-center border rounded px-3 py-2">
                        <span className="fa fa-search mr-2 text-muted"></span>
                        <input 
                          type="text" 
                          className="form-control border-0 p-0 shadow-none" 
                          placeholder="Cari candi, pantai, kuliner, lokasi destinasi..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex" style={{ gap: '8px' }}>
                      {['All', 'Budaya', 'Wisata Alam', 'Kuliner'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                          style={{ borderRadius: '20px', flex: 1 }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES / KEUNGGULAN */}
      <section className="ftco-section services-section py-5" id="services-section">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 order-md-last heading-section pl-md-5 d-flex align-items-center">
              <div className="w-100">
                <span className="subheading" style={{ color: '#f15b43', fontWeight: '600' }}>Keunggulan Layanan</span>
                <h2 className="mb-4">Saatnya Memulai Petualangan Wisata Anda</h2>
                <p>Platform Travel Guide Nusantara menghadirkan panduan komprehensif destinasi lokal yang telah terverifikasi, lengkap dengan rute lokasi, estimasi biaya, dan ulasan komunitas.</p>
                <p><a href="#destination-section" className="btn btn-primary py-3 px-4" style={{ borderRadius: '30px' }}>Eksplorasi Destinasi</a></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="services p-4 text-center border rounded shadow-sm h-100 bg-white">
                    <div className="icon mb-3"><span className="fa fa-map-signs fa-2x text-primary"></span></div>
                    <h3 className="heading mb-2" style={{ fontSize: '18px' }}>Rute Wisata</h3>
                    <p className="small text-muted mb-0">Panduan titik lokasi dan navigasi peta yang terstruktur ke lokasi wisata.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="services p-4 text-center border rounded shadow-sm h-100 bg-white">
                    <div className="icon mb-3"><span className="fa fa-cutlery fa-2x text-primary"></span></div>
                    <h3 className="heading mb-2" style={{ fontSize: '18px' }}>Kuliner Lokal</h3>
                    <p className="small text-muted mb-0">Rekomendasi ragam makanan khas nusantara yang otentik dan higienis.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="services p-4 text-center border rounded shadow-sm h-100 bg-white">
                    <div className="icon mb-3"><span className="fa fa-bed fa-2x text-primary"></span></div>
                    <h3 className="heading mb-2" style={{ fontSize: '18px' }}>Penginapan</h3>
                    <p className="small text-muted mb-0">Informasi hotel dan homestay di sekitar lokasi destinasi favorit.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="services p-4 text-center border rounded shadow-sm h-100 bg-white">
                    <div className="icon mb-3"><span className="fa fa-heart fa-2x text-primary"></span></div>
                    <h3 className="heading mb-2" style={{ fontSize: '18px' }}>Simpan Favorit</h3>
                    <p className="small text-muted mb-0">Simpan destinasi impian Anda ke daftar favorit pribadi hanya dalam satu klik.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KATALOG DESTINASI (MAIN LIST) */}
      <section className="ftco-section bg-light py-5" id="destination-section">
        <div className="container">
          <div className="row justify-content-center pb-4">
            <div className="col-md-12 heading-section text-center">
              <span className="subheading" style={{ color: '#f15b43', fontWeight: '600' }}>Katalog Pilihan</span>
              <h2 className="mb-4">Daftar Destinasi Wisata Populer</h2>
            </div>
          </div>
          <div className="row">
            {filteredDestinations.map(item => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="project-wrap bg-white shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                  <div 
                    className="img position-relative" 
                    style={{ backgroundImage: `url(${item.image})`, height: '230px', backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <span className="price badge badge-primary p-2" style={{ position: 'absolute', top: '15px', left: '15px', fontSize: '13px' }}>
                      {item.price}
                    </span>
                    <button 
                      onClick={() => onToggleFavorite(item.id)}
                      className="btn btn-sm btn-light position-absolute shadow"
                      style={{ top: '15px', right: '15px', borderRadius: '50%', width: '36px', height: '36px' }}
                    >
                      {favorites.includes(item.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="text p-4">
                    <span className="badge badge-secondary mb-2">{item.category}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>
                      <a href="#detail" onClick={(e) => { e.preventDefault(); onSelectDestination(item); }} className="text-dark">
                        {item.title}
                      </a>
                    </h3>
                    <p className="location text-muted mb-2">
                      <span className="fa fa-map-marker text-danger mr-1"></span> {item.location}
                    </p>
                    <p className="mb-3 text-warning font-weight-bold">⭐ {item.rating} / 5.0</p>
                    <button 
                      className="btn btn-primary btn-block py-2" 
                      style={{ borderRadius: '6px' }}
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
      </section>

      {/* 6. FOOTER */}
      <footer className="ftco-footer bg-dark py-5 text-white" style={{ background: '#040e27' }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4 mb-4">
              <h2 className="footer-heading text-white h5">Tentang Pacific</h2>
              <p className="text-muted small">Specialized Platform Travel Guide Indonesia yang dikembangkan menggunakan React.js, Express.js, dan MongoDB.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="footer-heading text-white h5">Navigasi</h2>
              <ul className="list-unstyled small">
                <li><a href="#home" className="text-muted py-1 d-block">Home</a></li>
                <li><a href="#destination-section" className="text-muted py-1 d-block">Destination Catalog</a></li>
                <li><a href="#services-section" className="text-muted py-1 d-block">Services</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="footer-heading text-white h5">Kontak Pengembang</h2>
              <p className="text-muted small mb-1"><i className="fa fa-map-marker mr-2"></i> Tangerang Selatan, Banten, Indonesia</p>
              <p className="text-muted small mb-1"><i className="fa fa-envelope mr-2"></i> student@binus.ac.id</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center text-muted small border-top pt-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="mb-0">Copyright &copy; 2026 Specialized Platform Development. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}