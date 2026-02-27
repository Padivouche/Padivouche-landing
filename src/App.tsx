import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════
   Scroll To Top Hook
   ═══════════════════════════════════════════════════════════════════ */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   Components
   ═══════════════════════════════════════════════════════════════════ */

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='container nav-container'>
        <Link to='/' className='logo-text'>
          Padi<span className='hi'>vouch</span>
        </Link>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <header className='hero coming-soon-hero'>
      <div className='container coming-soon-inner'>
        <h1 className='coming-soon-title'>
          Padi<span className='gradient-text'>vouch</span>
        </h1>

        <p className='coming-soon-tagline'>Changing the Event's Landscape</p>

        <div className='coming-soon-badge'>
          <span className='pulse-dot' />
          Coming Soon
        </div>
      </div>
    </header>
  );
}

function PrivacyPolicy() {
  return (
    <div className='privacy-page container'>
      <div
        className='privacy-content glass'
        style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}
      >
        <h1>Privacy Policy — Padivouch</h1>
        <div className='last-updated'>Last updated: February 24, 2026</div>

        <p>
          Padivouch ("we", "us") is operated by Padivouch Limited ("Company").
          This Privacy Policy explains how we collect, use, and share
          information when you use our website and mobile application (the
          "Services").
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account information:</strong> name, email, phone number (if
            provided)
          </li>
          <li>
            <strong>Profile information:</strong> information you choose to
            provide (e.g., photo, Instagram handle)
          </li>
          <li>
            <strong>Content you submit:</strong> in the app (e.g., event
            details, vendor details, vouches, written feedback, photos)
          </li>
          <li>
            <strong>Device and usage data:</strong> (e.g., device identifiers,
            app interactions) for product improvement and debugging
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>Provide and operate the Services</li>
          <li>Improve reliability, user experience, and safety</li>
          <li>Communicate with you about your account and service updates</li>
          <li>Prevent fraud, abuse, and unauthorized access</li>
        </ul>

        <h2>How we share information</h2>
        <ul>
          <li>
            With service providers who help us run the Services (hosting,
            analytics, communications)
          </li>
          <li>
            If required by law, or to protect the rights and safety of users and
            the Company
          </li>
        </ul>

        <p>
          <strong>We do not sell your personal information.</strong>
        </p>

        <h2>Data retention</h2>
        <p>
          We retain information as long as needed to provide the Services and
          comply with legal obligations.
        </p>

        <h2>Your choices</h2>
        <p>
          You may request access, correction, or deletion of your personal
          information by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          Padivouch Limited
          <br />
          Email:{' '}
          <a
            href='mailto:hello@padivouch.com'
            style={{ color: 'var(--primary-light)' }}
          >
            hello@padivouch.com
          </a>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className='footer'>
      <div className='container footer-bottom'>
        <p>
          &copy; {new Date().getFullYear()} Padivouch Limited. All rights
          reserved.
          {' · '}
          <Link to='/privacy' style={{ color: 'var(--primary-light)' }}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   App Router
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='glow glow-1' />
      <div className='glow glow-2' />
      <div className='glow glow-3' />

      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
