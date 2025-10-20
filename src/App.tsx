import React, { useState, useEffect } from 'react';
import './App.css';
import emailjs from '@emailjs/browser';

export default function App() {
  // Initialiser EmailJS avec variables d'environnement
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Envoi au client (Nicolas)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_DEVIS,
        {
          name: formData.nom,
          email: formData.email,
          phone: formData.telephone,
          message: formData.message
        }
      );

      // Confirmation au visiteur
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION,
        {
          name: formData.nom,
          email: formData.email
        }
      );

      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      setFormData({ nom: '', email: '', telephone: '', message: '' });
    } catch (error) {
      console.error('Erreur envoi email:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const services = [
    {
      icon: "/images/elagage.png",
      title: "Taille & Élagage",
      description: "Taille professionnelle d'arbres, arbustes et haies pour un jardin harmonieux et en bonne santé."
    },
    {
      icon: "/images/tonte.png",
      title: "Entretien de Jardins",
      description: "Tonte, débroussaillage et entretien régulier de vos espaces verts toute l'année."
    },
    {
      icon: "/images/cration.png",
      title: "Création Paysagère",
      description: "Conception et aménagement de jardins sur mesure adaptés à vos envies et à votre terrain."
    },
    {
      icon: "/images/plantation.png",
      title: "Plantation",
      description: "Sélection et plantation d'arbres, arbustes, vivaces et massifs pour un jardin fleuri."
    },
    {
      icon: "/images/arrosage.png",
      title: "Arrosage Automatique",
      description: "Installation de systèmes d'arrosage intelligents pour un jardin économe en eau."
    },
    {
      icon: "/images/cloture.png",
      title: "Clôtures & Terrasses",
      description: "Pose de clôtures, terrasses bois et aménagements extérieurs durables et esthétiques."
    }
  ];
   
 

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav-container">
          <div className="logo-container">
            <img src="/images/grandyot-logo.png" alt="Grandyot Garden Nature" className="logo" />
            <div className="logo-text">
              <h1>Grandyot Garden Nature</h1>
              <p>Aménagement Paysager</p>
            </div>
          </div>

          <ul className={`nav-menu ${menuOpen ? 'mobile-active' : ''}`}>
            <li><a onClick={() => scrollToSection('hero')} className="nav-link">Accueil</a></li>
            <li><a onClick={() => scrollToSection('services')} className="nav-link">Services</a></li>
            <li><a onClick={() => scrollToSection('realisations')} className="nav-link">Réalisations</a></li>
            <li><a onClick={() => scrollToSection('apropos')} className="nav-link">À propos</a></li>
            <li><a onClick={() => scrollToSection('contact')} className="nav-link btn-contact">Contact</a></li>
          </ul>

          <div className={`nav-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-background">
          <img 
            src="/images/hero-garden.png"
            alt="Jardin paysager" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Votre jardin mérite le meilleur</h1>
          <p className="hero-subtitle">
            Professionnel de l'aménagement paysager à Ablis, je transforme vos espaces verts en véritables havres de paix
          </p>
          <div className="hero-cta">
            <a href="tel:+33637453282" className="btn btn-primary">
              📞 Devis Gratuit
            </a>
            <button onClick={() => scrollToSection('services')} className="btn btn-secondary">
              Découvrir nos services
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services">
        <div className="container">
          <div className="section-header fade-in">
            <h2 className="section-title">Nos Services</h2>
            <p className="section-subtitle">
              Une gamme complète de prestations pour l'entretien et l'embellissement de vos espaces verts
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <img src={service.icon} alt={service.title} className="service-icon" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réalisations Section */}
      <section id="realisations" className="section">
        <div className="container">
          <div className="section-header fade-in">
            <h2 className="section-title">Nos Réalisations</h2>
            <p className="section-subtitle">
              Découvrez nos projets d'aménagement paysager en vidéo
            </p>
          </div>

          <div className="fade-in" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 248, 240, 0.8))',
            backdropFilter: 'blur(15px)',
            padding: '2rem',
            borderRadius: '25px',
            boxShadow: '0 15px 50px rgba(255, 140, 66, 0.25)',
            border: '2px solid rgba(255, 179, 71, 0.3)'
          }}>
            <video 
              autoPlay
              muted
              loop
              playsInline
              controls 
              style={{
                width: '100%',
                borderRadius: '18px',
                boxShadow: '0 10px 40px rgba(255, 140, 66, 0.3)'
              }}
            >
              <source src="/images/realisations/rea.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      </section>

      {/* À Propos Section */}
      <section id="apropos" className="section">
        <div className="container">
          <div className="section-header fade-in">
            <h2 className="section-title">À propos</h2>
          </div>

          <div className="contact-content">
            <div className="contact-info fade-in">
              <h3>Notre Expertise</h3>
              <p style={{marginBottom: '1.5rem', lineHeight: '1.8', fontWeight: '500'}}>
                <strong style={{color: '#FF8C42'}}>Nicolas Grandyot</strong>, créateur de Grandyot Garden Nature, met son expertise au service 
                de vos projets d'aménagement paysager dans la région d'Ablis et des Yvelines.
              </p>
              <p style={{marginBottom: '2rem', lineHeight: '1.8', fontWeight: '500'}}>
                Passionné par la nature et le travail bien fait, j'accompagne particuliers et professionnels 
                dans la création et l'entretien d'espaces verts harmonieux et durables.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '0.8rem',
                  background: 'rgba(255, 140, 66, 0.1)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{color: '#FF8C42', fontSize: '1.5rem'}}>✓</span>
                  <span style={{fontWeight: '600'}}>Entrepreneur individuel certifié</span>
                </div>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '0.8rem',
                  background: 'rgba(255, 140, 66, 0.1)',
                  borderRadius: '10px'
                }}>
                  <span style={{color: '#FF8C42', fontSize: '1.5rem'}}>✓</span>
                  <span style={{fontWeight: '600'}}>Devis gratuit et sans engagement</span>
                </div>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '0.8rem',
                  background: 'rgba(255, 140, 66, 0.1)',
                  borderRadius: '10px'
                }}>
                  <span style={{color: '#FF8C42', fontSize: '1.5rem'}}>✓</span>
                  <span style={{fontWeight: '600'}}>Interventions rapides et soignées</span>
                </div>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '0.8rem',
                  background: 'rgba(255, 140, 66, 0.1)',
                  borderRadius: '10px'
                }}>
                  <span style={{color: '#FF8C42', fontSize: '1.5rem'}}>✓</span>
                  <span style={{fontWeight: '600'}}>Respect de l'environnement</span>
                </div>
              </div>
            </div>

            <div className="contact-info fade-in" style={{animationDelay: '0.2s'}}>
              <h3>Informations légales</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <p style={{fontWeight: '500'}}><strong style={{color: '#FF8C42'}}>Raison sociale :</strong> GRANDYOT NICOLAS</p>
                <p style={{fontWeight: '500'}}><strong style={{color: '#FF8C42'}}>Nom commercial :</strong> GRANDYOT GARDEN NATURE</p>
                <p style={{fontWeight: '500'}}><strong style={{color: '#FF8C42'}}>SIREN :</strong> 924 046 972</p>
                <p style={{fontWeight: '500'}}><strong style={{color: '#FF8C42'}}>TVA :</strong> FR44924046972</p>
                <p style={{fontWeight: '500'}}><strong style={{color: '#FF8C42'}}>Code NAF :</strong> 81.30Z</p>
                <p style={{fontWeight: '500'}}><strong style={{color: '#FF8C42'}}>Création :</strong> 02/10/2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header fade-in">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">Une question ? Un projet ? N'hésitez pas à nous contacter</p>
          </div>

          <div className="contact-content">
            <div className="contact-info fade-in">
              <h3>Coordonnées</h3>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Téléphone</strong><br/>
                  <a href="tel:+33637453282">06 37 45 32 82</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <strong>Email</strong><br/>
                  <a href="mailto:contact@grandyot-garden.fr">contact@grandyot-garden.fr</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Adresse</strong><br/>
                  2 Rue de la Mairie<br/>78660 Ablis
                </div>
              </div>
              <div style={{
                marginTop: '2rem', 
                padding: '1.5rem', 
                background: 'linear-gradient(135deg, rgba(255, 140, 66, 0.2), rgba(255, 179, 71, 0.15))',
                borderRadius: '15px',
                border: '2px solid rgba(255, 140, 66, 0.3)',
                boxShadow: '0 5px 20px rgba(255, 140, 66, 0.2)'
              }}>
                <strong style={{
                  color: '#FF8C42',
                  fontSize: '1.2rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>🌍 Zone d'intervention</strong>
                <p style={{marginTop: '0.5rem', fontWeight: '600'}}>Ablis et communes environnantes dans les Yvelines (78)</p>
              </div>
            </div>

            <form className="contact-form fade-in" onSubmit={handleSubmit} style={{animationDelay: '0.2s'}}>
              <h3>Demande de devis</h3>
              
              {formSubmitted && (
                <div style={{
                  background: 'rgba(255, 140, 66, 0.15)',
                  border: '2px solid #FF8C42',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{color: '#FF8C42', fontSize: '1.5rem'}}>✓</span>
                  <span style={{color: '#FF8C42', fontWeight: '600'}}>Message envoyé avec succès !</span>
                </div>
              )}

              <div className="form-group">
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Votre téléphone"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <img src="/images/grandyot-logo.png" alt="Grandyot Garden Nature" className="footer-logo" />
            <strong style={{fontSize: '1.1rem'}}>Grandyot Garden Nature</strong>
          </div>
          <nav className="footer-links">
            <a onClick={() => scrollToSection('hero')} className="footer-link">Accueil</a>
            <a onClick={() => scrollToSection('services')} className="footer-link">Services</a>
            <a onClick={() => scrollToSection('realisations')} className="footer-link">Réalisations</a>
            <a onClick={() => scrollToSection('apropos')} className="footer-link">À propos</a>
            <a onClick={() => scrollToSection('contact')} className="footer-link">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p style={{fontWeight: '500'}}>Services d'aménagement paysager - Ablis 78660</p>
          <p style={{fontWeight: '600'}}>© {new Date().getFullYear()} Grandyot Garden Nature - Tous droits réservés</p>
          <p style={{marginTop: '0.5rem', fontWeight: '500'}}>SIREN: 924 046 972 - TVA: FR44924046972</p>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a href="tel:+33637453282" className="floating-call" title="Appelez-nous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>
    </div>
  );
}