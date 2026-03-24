import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navLinks = [
  { href: '/students', label: 'Students' },
  { href: '/parents', label: 'Parents' },
  { href: '/solopreneur', label: 'Solopreneur' },
  { href: '/creators', label: 'Creators' },
  { href: '/pricing', label: 'Pricing' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-black text-light flex flex-col scanline">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
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
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                  location.pathname === href
                    ? 'text-gold'
                    : 'text-muted hover:text-light'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/supporter"
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-gold/40 text-gold text-xs tracking-[0.15em] uppercase font-body hover:bg-gold/10 hover:border-gold transition-all duration-200"
          >
            Try Free
            <span className="text-green">→</span>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-muted hover:text-gold transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav bottom line */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </nav>

      {/* Page content */}
      <main className="flex-1 pt-20">
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
      <footer className="border-t border-gold/10 px-6 md:px-12 py-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-gold/40 rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-gold/60" />
            </div>
            <span className="font-display text-xs tracking-[0.2em] uppercase text-muted">
              NEO GENTS AI
            </span>
          </div>
          <p className="font-body text-xs text-muted text-center">
            Pain-point-first AI consultancy. We audit bottlenecks, install AI teams, and stack solutions.
          </p>
          <div className="flex gap-6">
            {navLinks.slice(0, 3).map(({ href, label }) => (
              <Link key={href} to={href} className="font-body text-xs text-muted hover:text-gold transition-colors uppercase tracking-widest">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-gold/5 flex justify-center">
          <p className="font-mono text-xs text-gold/20 tracking-widest">
            © 2026 NEO GENTS — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  )
}
