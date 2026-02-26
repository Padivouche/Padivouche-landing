import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════
   SVG Icons (inline for zero-dependency)
   ═══════════════════════════════════════════════════════════════════ */
const SearchIcon = () => (
  <svg
    width='22'
    height='22'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21 21L16.65 16.65'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
  </svg>
);

const PinIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
    <circle cx='12' cy='10' r='3' />
  </svg>
);

const GradientDefs = () => (
  <svg width='0' height='0' style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id='iconGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#F97316' />
        <stop offset='100%' stopColor='#F59E0B' />
      </linearGradient>
    </defs>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════════ */
const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
];

interface Vendor {
  name: string;
  img: string;
  category: string;
  catClass: string;
  vouches: number;
  price: string;
  location: string;
  mutualAvatars: string[];
  mutualText: string;
}

const VENDORS: Vendor[] = [
  {
    name: 'DJ Maestro Mix',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    category: 'DJ & Audio',
    catClass: 'dj',
    vouches: 142,
    price: 'From $800',
    location: 'Metropolitan Area',
    mutualAvatars: [AVATARS[0], AVATARS[1]],
    mutualText: 'Sarah and 3 mutuals',
  },
  {
    name: 'Luxe Bites Catering',
    img: 'https://images.unsplash.com/photo-1555244162-803834f87a41?q=80&w=800&auto=format&fit=crop',
    category: 'Catering',
    catClass: 'cater',
    vouches: 89,
    price: 'Custom',
    location: 'Downtown & Suburbs',
    mutualAvatars: [AVATARS[2]],
    mutualText: 'David',
  },
  {
    name: 'Lumina Studios',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    category: 'Photography',
    catClass: 'photo',
    vouches: 215,
    price: 'From $1.2k',
    location: 'Willing to travel',
    mutualAvatars: [AVATARS[0], AVATARS[3], AVATARS[1]],
    mutualText: '8 mutuals',
  },
];

const FEATURES = [
  {
    title: 'Network Intelligence',
    desc: 'See which vendors your friends and mutual connections have hired and vouched for.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='url(#iconGrad)'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
    ),
  },
  {
    title: 'Verified Excellence',
    desc: 'Only real clients can vouch. Our dual-verification system drops bad actors instantly.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='url(#iconGrad)'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='20 6 9 17 4 12' />
      </svg>
    ),
  },
  {
    title: 'Secure Booking',
    desc: 'Milestone-based payments keep your money safe until the job is done right.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='url(#iconGrad)'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
        <path d='M7 11V7a5 5 0 0 1 10 0v4' />
      </svg>
    ),
  },
];

const STATS = [
  { num: '30K+', label: 'On The Waitlist' },
  { num: '5,000+', label: 'Registered Pros' },
  { num: '100%', label: 'Transparency' },
  { num: 'Beta', label: 'Launch Phase' },
];

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
   useReveal — IntersectionObserver for scroll animations
   ═══════════════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════════
   Components
   ═══════════════════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className='container nav-container'>
          <Link to='/' className='logo-text'>
            Padi<span className='hi'>vouch</span>
          </Link>

          <ul className='nav-links'>
            <li>
              <a href='/#how-it-works'>How it Works</a>
            </li>
            <li>
              <a href='/#vendors'>Preview Vendors</a>
            </li>
            <li>
              <a href='/#trust'>Our Promise</a>
            </li>
          </ul>

          <div className='nav-actions'>
            <button className='btn btn-outline sm'>Host Login</button>
            <button className='btn btn-outline sm'>Vendor Login</button>
          </div>

          <button
            className='mobile-toggle'
            aria-label='Menu'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
        <a href='/#how-it-works' onClick={() => setMenuOpen(false)}>
          How it Works
        </a>
        <a href='/#vendors' onClick={() => setMenuOpen(false)}>
          Preview Vendors
        </a>
        <a href='/#trust' onClick={() => setMenuOpen(false)}>
          Our Promise
        </a>
        <button
          className='btn btn-primary lg'
          onClick={() => setMenuOpen(false)}
        >
          Join Waitlist
        </button>
      </div>
    </>
  );
}

function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <header className='hero'>
      <div className='container hero-inner'>
        <div className='badge'>✨ Early Access Waitlist Open</div>

        <h1 className='hero-title'>
          The New Standard for Hiring
          <br />
          Event Vendors You Can <span className='gradient-text'>Trust</span>
        </h1>

        <p className='hero-sub'>
          We're replacing fake reviews with a robust vouching system powered by
          people you know. Join the waitlist to get early access before we
          launch to the public.
        </p>

        <form className='waitlist-form' onSubmit={handleJoin}>
          <input
            type='email'
            placeholder='Enter your email address...'
            className='waitlist-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status !== 'idle'}
            required
          />
          <button
            type='submit'
            className='btn btn-primary waitlist-btn'
            disabled={status !== 'idle'}
          >
            {status === 'idle' && 'Join Waitlist'}
            {status === 'loading' && 'Joining...'}
            {status === 'success' && "You're On The List! 🎉"}
          </button>
        </form>

        <div className='social-proof'>
          <div className='avatars'>
            {AVATARS.map((src, i) => (
              <img key={i} src={src} alt='User' />
            ))}
          </div>
          <p>
            Join <strong>30,000+</strong> hosts and vendors on the waitlist.
          </p>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const ref = useReveal();

  return (
    <section className='section' id='how-it-works'>
      <div className='container'>
        <div className='section-hdr'>
          <h2 className='section-title'>
            Built on <span className='gradient-text'>Reputation</span>
          </h2>
          <p className='section-sub'>
            A sneak peek into how we're building the most reliable event vendor
            platform.
          </p>
        </div>

        <div className='features-grid reveal' ref={ref}>
          {FEATURES.map((f, i) => (
            <div className='feature-card glass' key={i}>
              <div className='icon-wrap'>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VendorCard({ v }: { v: Vendor }) {
  return (
    <div className='vendor-card glass'>
      <div className='vendor-img'>
        <img src={v.img} alt={v.name} loading='lazy' />
        <span className={`vendor-cat ${v.catClass}`}>{v.category}</span>
        <span className='vouch-badge'>
          <StarIcon /> {v.vouches} Vouches
        </span>
      </div>
      <div className='vendor-info'>
        <div className='vendor-top'>
          <h3>{v.name}</h3>
          <span className='price'>{v.price}</span>
        </div>
        <p className='location'>
          <PinIcon /> {v.location}
        </p>
        <div className='mutuals'>
          <div className='avatars sm'>
            {v.mutualAvatars.map((src, i) => (
              <img key={i} src={src} alt='Mutual' />
            ))}
          </div>
          <span>Vouched by {v.mutualText}</span>
        </div>
      </div>
    </div>
  );
}

function Vendors() {
  const ref = useReveal();

  return (
    <section className='section' id='vendors'>
      <div className='container'>
        <div className='section-hdr left'>
          <div>
            <h2 className='section-title'>
              Coming Soon: <span className='gradient-text'>Verified Pros</span>
            </h2>
            <p className='section-sub' style={{ margin: 0 }}>
              Discover the pros setting the standard right now in our private
              beta.
            </p>
          </div>
        </div>

        <div className='vendor-grid reveal' ref={ref}>
          {VENDORS.map((v, i) => (
            <VendorCard key={i} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useReveal();

  return (
    <section className='section' id='trust'>
      <div className='container'>
        <div className='section-hdr'>
          <h2 className='section-title'>
            The Wait Is <span className='gradient-text'>Almost Over</span>
          </h2>
          <p className='section-sub'>
            We are meticulously onboarding the best vendors to ensure your first
            experience is flawless.
          </p>
        </div>

        <div className='stats-row reveal' ref={ref}>
          {STATS.map((s, i) => (
            <div className='stat-card' key={i}>
              <div className='stat-num gradient-text'>{s.num}</div>
              <div className='stat-label'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useReveal();

  return (
    <section className='cta-section'>
      <div className='container'>
        <div className='cta-glass reveal' ref={ref}>
          <div className='cta-glow' />
          <h2>Don't miss the launch.</h2>
          <p>
            Get priority access to book the best vendors or get listed as a
            founding pro before we open to the public.
          </p>
          <div className='cta-btns'>
            <button
              className='btn btn-primary lg'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Join the Waitlist
            </button>
            <button className='btn btn-outline white lg'>
              Apply as Vendor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className='footer'>
      <div className='container footer-grid'>
        <div className='footer-brand'>
          <div className='logo-text'>
            Padi<span className='hi'>vouch</span>
          </div>
          <p>
            Curated excellence for your events, backed by real-world
            reputations.
          </p>
        </div>
        <div className='footer-links'>
          <div className='link-col'>
            <h4>Platform</h4>
            <a href='/#how-it-works'>How it Works</a>
            <a href='/#vendors'>Preview Vendors</a>
            <a href='#'>Apply as Pro</a>
          </div>
          <div className='link-col'>
            <h4>Company</h4>
            <a href='#'>About Us</a>
            <a href='#'>Careers</a>
            <a href='#'>Contact</a>
          </div>
          <div className='link-col'>
            <h4>Legal</h4>
            <Link to='/privacy'>Privacy Policy</Link>
            <a href='#'>Terms of Service</a>
            <a href='#'>Trust &amp; Safety</a>
          </div>
        </div>
      </div>
      <div className='container footer-bottom'>
        <p>
          &copy; {new Date().getFullYear()} Padivouch Limited. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Vendors />
      <Stats />
      <CTA />
    </>
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
          Padivouch (“we”, “us”) is operated by Padivouch Limited (“Company”).
          This Privacy Policy explains how we collect, use, and share
          information when you use our website and mobile application (the
          “Services”).
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

/* ═══════════════════════════════════════════════════════════════════
   App Router
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GradientDefs />
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
