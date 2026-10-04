import { useState, useEffect } from 'react';
import './App.css';

// WhatsApp Configuration
const WA_PHONE = '6281234567890';
const createWaUrl = (message) => `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;

// Product Data
const PRODUCTS = [
  {
    id: 1,
    name: 'Nasi Ayam Sambal Nusantara',
    category: 'Makanan Utama',
    desc: 'Nasi hangat dengan ayam goreng gurih dan sambal khas nusantara pedas nikmat.',
    price: 'Rp18.000',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Seblak Pedas',
    category: 'Camilan Pedas',
    desc: 'Olahan kerupuk kenyal dengan bumbu kencur pedas gurih khas Jawa Barat.',
    price: 'Rp15.000',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Mie Goreng Kampung',
    category: 'Makanan Utama',
    desc: 'Mie goreng bumbu rempah tradisional dengan taburan telur dan sayur segar.',
    price: 'Rp14.000',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Es Kopi Gula Aren',
    category: 'Minuman',
    desc: 'Perpaduan kopi susu segar dan manis legit gula aren asli nusantara.',
    price: 'Rp12.000',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Es Teh Nusantara',
    category: 'Minuman',
    desc: 'Seduhan daun teh pilihan dengan aroma melati wangi dan menyegarkan dahaga.',
    price: 'Rp6.000',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Pisang Cokelat',
    category: 'Camilan',
    desc: 'Pisang manis berbalut cokelat lumer renyah di setiap gigitan hangat.',
    price: 'Rp10.000',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  },
];

// Keunggulan Data
const ADVANTAGES = [
  {
    id: 1,
    title: 'Bahan Berkualitas',
    desc: 'Hanya menggunakan bahan baku segar, rempah alami pilihan, dan daging berkualitas setiap hari.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Harga Terjangkau',
    desc: 'Porsi mengenyangkan dan lezat dengan harga ramah kantong untuk mahasiswa hingga keluarga.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Dibuat Higienis',
    desc: 'Diproses di dapur bersih dengan standar kebersihan ketat untuk menjaga keamanan konsumsi keluarga.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Mendukung UMKM Lokal',
    desc: 'Bekerja sama dengan petani dan pedagang pasar lokal untuk memberdayakan ekonomi nusantara.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
        <path d="M2 7h20"/>
      </svg>
    ),
  },
];

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Mahasiswa Pontianak',
    comment: 'Nasi Ayam Sambal Nusantara beneran nagih! Sambalnya pedas mantap dan ayamnya empuk meresap.',
    avatar: 'B',
  },
  {
    id: 2,
    name: 'Rina Wijaya',
    role: 'Karyawan Swasta',
    comment: 'Cocok banget untuk makan siang kantor. Porsinya pas, harganya terjangkau, dan Es Teh Nusantaranya segar pol!',
    avatar: 'R',
  },
  {
    id: 3,
    name: 'Hendra Kusuma',
    role: 'Pelanggan Keluarga',
    comment: 'Pesan via WhatsApp gampang dan responnya kilat. Makanan tiba dalam kondisi hangat dan bersih.',
    avatar: 'H',
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Sticky Navbar Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Filter Products
  const filteredProducts = activeCategory === 'Semua' 
    ? PRODUCTS 
    : PRODUCTS.filter((item) => {
        if (activeCategory === 'Makanan Utama') return item.category === 'Makanan Utama';
        if (activeCategory === 'Camilan') return item.category.includes('Camilan');
        if (activeCategory === 'Minuman') return item.category === 'Minuman';
        return true;
      });

  return (
    <div className="app-root">
      {/* =====================================================================
          1. NAVBAR (STICKY)
          ===================================================================== */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container navbar-container">
          <a href="#beranda" className="brand-logo" aria-label="Rasa Nusantara Beranda">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v2a8 8 0 0 0 16 0V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"/>
                <path d="M6 12h12"/>
              </svg>
            </div>
            <span>Rasa Nusantara</span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Menu Utama">
            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="navMenu">
              <li><a href="#beranda" className="nav-link" onClick={closeMobileMenu}>Beranda</a></li>
              <li><a href="#tentang-kami" className="nav-link" onClick={closeMobileMenu}>Tentang Kami</a></li>
              <li><a href="#produk" className="nav-link" onClick={closeMobileMenu}>Produk</a></li>
              <li><a href="#keunggulan" className="nav-link" onClick={closeMobileMenu}>Keunggulan</a></li>
              <li><a href="#kontak" className="nav-link" onClick={closeMobileMenu}>Kontak</a></li>
              <li className="mobile-menu-cta" style={{ display: 'none', width: '100%' }}>
                <a
                  href={createWaUrl('Halo Rasa Nusantara, saya ingin memesan makanan.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={closeMobileMenu}
                >
                  Pesan Sekarang
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a
              href={createWaUrl('Halo Rasa Nusantara, saya ingin memesan makanan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Pesan Sekarang
            </a>

            <button
              className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
              id="mobileToggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ===================================================================
            2. HERO SECTION
            =================================================================== */}
        <section className="hero" id="beranda">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
                <span>Kuliner UMKM Pilihan Indonesia</span>
              </div>

              <h1 className="hero-headline">
                Rasa Lokal, <span>Kualitas Istimewa</span>
              </h1>

              <p className="hero-subheadline">
                Nikmati berbagai makanan dan minuman khas Nusantara yang dibuat dengan bahan pilihan dan cita rasa autentik.
              </p>

              <div className="hero-cta-group">
                <a
                  href={createWaUrl('Halo Rasa Nusantara, saya ingin memesan makanan.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large"
                >
                  <span>Pesan Sekarang</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <a href="#produk" className="btn btn-secondary btn-large">
                  <span>Lihat Produk</span>
                </a>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-food-card">
                <div className="hero-food-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                    alt="Hidangan Kuliner Otentik Rasa Nusantara"
                    width="800"
                    height="600"
                  />
                </div>
                <div className="hero-float-tag">
                  <div className="float-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div className="float-text">
                    <strong>Resep Autentik</strong>
                    <span>Cita rasa khas rempah nusantara</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. ABOUT SECTION
            =================================================================== */}
        <section className="about-section" id="tentang-kami">
          <div className="container about-grid">
            <div className="about-image-card">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                alt="Dapur Pengolahan Makanan Rasa Nusantara"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>

            <div className="about-content">
              <span className="section-badge">Tentang Kami</span>
              <h2 className="about-title">Tentang Rasa Nusantara</h2>
              <p className="about-text">
                Rasa Nusantara adalah UMKM kuliner yang menghadirkan makanan dan minuman khas Indonesia dengan bahan berkualitas, harga terjangkau, dan cita rasa yang dibuat dengan penuh perhatian.
              </p>

              <div className="about-points-grid">
                <div className="about-point-item">
                  <div className="about-point-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span className="about-point-label">Berdiri sejak 2022</span>
                </div>

                <div className="about-point-item">
                  <div className="about-point-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <span className="about-point-label">Bahan berkualitas</span>
                </div>

                <div className="about-point-item">
                  <div className="about-point-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                  </div>
                  <span className="about-point-label">Dibuat secara higienis</span>
                </div>

                <div className="about-point-item">
                  <div className="about-point-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </div>
                  <span className="about-point-label">Mendukung produk lokal</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. PRODUCT SECTION
            =================================================================== */}
        <section className="products-section" id="produk">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Daftar Menu</span>
              <h2 className="section-title">Produk Favorit Kami</h2>
              <p className="section-subtitle">
                Pilihan menu makanan lezat, camilan renyah, dan minuman segar dengan harga terjangkau.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="category-filter-tabs">
              {['Semua', 'Makanan Utama', 'Camilan', 'Minuman'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-img-box">
                    <img src={product.image} alt={product.name} loading="lazy" width="600" height="400" />
                    <span className="product-category-badge">{product.category}</span>
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.desc}</p>
                    <div className="product-footer">
                      <div className="product-price-box">
                        <span className="product-price-label">Harga</span>
                        <span className="product-price">{product.price}</span>
                      </div>
                      <a
                        href={createWaUrl(`Halo Rasa Nusantara, saya ingin memesan ${product.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-product-pesan"
                        aria-label={`Pesan ${product.name} via WhatsApp`}
                      >
                        Pesan
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. KEUNGGULAN SECTION
            =================================================================== */}
        <section className="advantages-section" id="keunggulan">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Nilai Kami</span>
              <h2 className="section-title">Kenapa Pilih Kami?</h2>
              <p className="section-subtitle">
                Komitmen kami menyajikan kuliner bercita rasa terbaik dan terpercaya bagi Anda.
              </p>
            </div>

            <div className="advantages-grid">
              {ADVANTAGES.map((item) => (
                <div key={item.id} className="advantage-card">
                  <div className="advantage-icon-wrapper">{item.icon}</div>
                  <h3 className="advantage-title">{item.title}</h3>
                  <p className="advantage-text">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. TESTIMONIAL SECTION
            =================================================================== */}
        <section className="testimonials-section" id="testimoni">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Ulasan Pembeli</span>
              <h2 className="section-title">Kata Pelanggan</h2>
              <p className="section-subtitle">
                Pengalaman nyata dari mereka yang telah mencicipi kelezatan sajian Rasa Nusantara.
              </p>
            </div>

            <div className="testimonials-grid">
              {TESTIMONIALS.map((testi) => (
                <div key={testi.id} className="testimonial-card">
                  <div>
                    <div className="star-rating" aria-label="Rating 5 dari 5 bintang">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <p className="testimonial-comment">"{testi.comment}"</p>
                  </div>
                  <div className="customer-profile">
                    <div className="customer-avatar">{testi.avatar}</div>
                    <div>
                      <div className="customer-name">{testi.name}</div>
                      <div className="customer-desc">{testi.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            7. LOCATION / CONTACT SECTION
            =================================================================== */}
        <section className="contact-section" id="kontak">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Hubungi Kami</span>
              <h2 className="section-title">Kunjungi Kami</h2>
              <p className="section-subtitle">
                Temukan lokasi kedai kami atau hubungi kami langsung untuk pemesanan cepat via WhatsApp.
              </p>
            </div>

            <div className="contact-grid">
              {/* Alamat */}
              <div className="contact-card">
                <div className="contact-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="contact-label">Alamat</h3>
                <p className="contact-info-text">Jl. Contoh No. 123, Pontianak</p>
                <p className="contact-info-text" style={{ fontSize: '0.8125rem', marginTop: '4px' }}>Kalimantan Barat</p>
              </div>

              {/* WhatsApp */}
              <div className="contact-card">
                <div className="contact-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h3 className="contact-label">WhatsApp</h3>
                <a href={createWaUrl('Halo Rasa Nusantara, saya ingin bertanya tentang menu.')} target="_blank" rel="noopener noreferrer" className="contact-info-text contact-link">
                  0812-3456-7890
                </a>
                <p className="contact-info-text" style={{ fontSize: '0.8125rem', marginTop: '4px' }}>Pemesanan & konsultasi</p>
              </div>

              {/* Instagram */}
              <div className="contact-card">
                <div className="contact-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <h3 className="contact-label">Instagram</h3>
                <a href="https://instagram.com/rasanusantara" target="_blank" rel="noopener noreferrer" className="contact-info-text contact-link">
                  @rasanusantara
                </a>
                <p className="contact-info-text" style={{ fontSize: '0.8125rem', marginTop: '4px' }}>Promo & update menu</p>
              </div>

              {/* Jam Buka */}
              <div className="contact-card">
                <div className="contact-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 className="contact-label">Jam Buka</h3>
                <p className="contact-info-text">Senin–Sabtu</p>
                <p className="contact-info-text" style={{ fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
                  09.00–21.00 WIB
                </p>
              </div>
            </div>

            <div className="contact-cta-wrapper">
              <a
                href={createWaUrl('Halo Rasa Nusantara, saya ingin memesan makanan.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-chat-wa"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.676.15s-.777.98-.952 1.18c-.176.201-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.798-1.501-1.784-1.677-2.085s-.019-.464.132-.614c.135-.134.301-.35.451-.526s.201-.3.301-.501.05-.376-.025-.526c-.075-.15-.676-1.63-.927-2.231-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.508 1.078 2.909 1.228 3.11c.15.201 2.12 3.238 5.137 4.542.718.311 1.278.497 1.714.636.721.229 1.378.197 1.898.119.579-.088 1.78-.727 2.03-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.201-.577-.351z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.168L2 22l4.982-1.393A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.614 0-3.123-.46-4.409-1.254l-.316-.195-2.96.827.842-2.883-.207-.329A8.13 8.13 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167s8.167 3.664 8.167 8.167-3.664 8.167-8.167 8.167z"/>
                </svg>
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          8. FOOTER
          ===================================================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#beranda" className="brand-logo" aria-label="Rasa Nusantara">
                <div className="logo-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v2a8 8 0 0 0 16 0V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"/>
                    <path d="M6 12h12"/>
                  </svg>
                </div>
                <span>Rasa Nusantara</span>
              </a>
              <p className="footer-desc">
                UMKM kuliner yang menghadirkan makanan dan minuman khas Indonesia dengan bahan berkualitas, harga terjangkau, dan cita rasa autentik.
              </p>
              <div className="footer-socials">
                <a href="https://instagram.com/rasanusantara" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="Instagram Rasa Nusantara">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href={createWaUrl('Halo Rasa Nusantara')} target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="WhatsApp Rasa Nusantara">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.676.15s-.777.98-.952 1.18c-.176.201-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.798-1.501-1.784-1.677-2.085s-.019-.464.132-.614c.135-.134.301-.35.451-.526s.201-.3.301-.501.05-.376-.025-.526c-.075-.15-.676-1.63-.927-2.231-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.508 1.078 2.909 1.228 3.11c.15.201 2.12 3.238 5.137 4.542.718.311 1.278.497 1.714.636.721.229 1.378.197 1.898.119.579-.088 1.78-.727 2.03-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.201-.577-.351z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.168L2 22l4.982-1.393A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.614 0-3.123-.46-4.409-1.254l-.316-.195-2.96.827.842-2.883-.207-.329A8.13 8.13 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167s8.167 3.664 8.167 8.167-3.664 8.167-8.167 8.167z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-nav">
              <h4 className="footer-heading">Navigasi</h4>
              <ul className="footer-nav-list">
                <li><a href="#beranda">Beranda</a></li>
                <li><a href="#tentang-kami">Tentang Kami</a></li>
                <li><a href="#produk">Produk</a></li>
                <li><a href="#keunggulan">Keunggulan</a></li>
                <li><a href="#kontak">Kontak</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-heading">Kontak</h4>
              <div className="footer-contact-details">
                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>0812-3456-7890</span>
                </div>
                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>@rasanusantara</span>
                </div>
                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Jl. Contoh No. 123, Pontianak</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Rasa Nusantara. Hak Cipta Dilindungi Undang-Undang.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href={createWaUrl('Halo Rasa Nusantara, saya ingin memesan makanan.')}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Hubungi WhatsApp Rasa Nusantara"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.676.15s-.777.98-.952 1.18c-.176.201-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.798-1.501-1.784-1.677-2.085s-.019-.464.132-.614c.135-.134.301-.35.451-.526s.201-.3.301-.501.05-.376-.025-.526c-.075-.15-.676-1.63-.927-2.231-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.508 1.078 2.909 1.228 3.11c.15.201 2.12 3.238 5.137 4.542.718.311 1.278.497 1.714.636.721.229 1.378.197 1.898.119.579-.088 1.78-.727 2.03-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.201-.577-.351z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.168L2 22l4.982-1.393A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.614 0-3.123-.46-4.409-1.254l-.316-.195-2.96.827.842-2.883-.207-.329A8.13 8.13 0 0 1 3.833 12c0-4.503 3.664-8.167 8.167-8.167s8.167 3.664 8.167 8.167-3.664 8.167-8.167 8.167z"/>
        </svg>
      </a>
    </div>
  );
}
