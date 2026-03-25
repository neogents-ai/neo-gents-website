import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import CaveBackground from './CaveBackground'

const navLinks = [
  { href: '/students',    label: 'Students',    hud: '01' },
  { href: '/parents',     label: 'Parents',     hud: '02' },
  { href: '/solopreneur', label: 'Solopreneur', hud: '03' },
  { href: '/creators',    label: 'Creators',    hud: '04' },
  { href: '/agents',      label: 'Agents',      hud: '05' },
  { href: '/pricing',     label: 'Pricing',     hud: '06' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-black text-light flex flex-col scanline-green relative">
      {/* Cave background — global */}
      <CaveBackground />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-gold/60 rotate-45 flex items-center justify-center group-hover:border-gold transition-colors duration-300">
              <div className="w-3 h-3 bg-gold rotate-0" />
            </div>
            <span className="font-display font-700 text-sm tracking-[0.2em] uppercase text-gold">
              NEO GENTS
            </span>
          </Link>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label, hud }) => (
              <Link
                key={href}
                to={href}
                className={`font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 flex items-center gap-1.5 ${
                  location.pathname === href
                    ? 'text-green'
                    : 'text-muted hover:text-light'
                }`}
              >
                <span className="font-mono text-[9px] text-muted/40">{hud}/</span>
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/supporter"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border text-[10px] tracking-[0.15em] uppercase font-body transition-all duration-200"
            style={{
              borderColor: 'rgba(0,179,89,0.4)',
              color: '#00B359',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,179,89,0.08)'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#00B359'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = ''
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,179,89,0.4)'
            }}
          >
            ENTER HQ →
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-muted hover:text-green transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav bottom line — green */}
        <div
          className="mt-4 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,179,89,0.3), transparent)' }}
        />
      </nav>

      {/* Page content */}
      <main className="flex-1 pt-20 relative z-10">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t px-6 md:px-12 py-10 mt-16" style={{ borderColor: 'rgba(0,179,89,0.1)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand col */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border border-gold/40 rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-gold/60" />
              </div>
              <span className="font-display text-xs tracking-[0.2em] uppercase text-gold">
                NEO GENTS AI
              </span>
            </div>
            <p className="font-body text-xs text-muted leading-relaxed max-w-xs">
              Pain-point-first AI consultancy. We audit bottlenecks, install AI teams, and stack solutions.
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(0,179,89,0.35)' }}>
              neogents.io
            </p>
          </div>

          {/* Tracks col */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted/40">Tracks</span>
            <div className="flex flex-col gap-2">
              {navLinks.map(({ href, label, hud }) => (
                <Link
                  key={href}
                  to={href}
                  className="font-body text-xs text-muted hover:text-green transition-colors flex items-center gap-2"
                >
                  <span className="font-mono text-[9px] text-muted/30">{hud}/</span>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal + Company col */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted/40">Company</span>
            <div className="flex flex-col gap-2">
              {[
                { href: '/faq',      label: 'FAQ' },
                { href: '/careers',  label: 'Careers' },
                { href: '/contact',  label: 'Contact' },
                { href: '/privacy',  label: 'Privacy Policy' },
                { href: '/terms',    label: 'Terms of Service' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className="font-body text-xs text-muted hover:text-green transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderColor: 'rgba(0,179,89,0.05)' }}>
          <p className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(0,179,89,0.2)' }}>
            © 2026 NEO GENTS — ALL RIGHTS RESERVED
          </p>
          <p className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(0,179,89,0.15)' }}>
            52 AGENTS ACTIVE
          </p>
        </div>
      </footer>
    </div>
  )
}
