import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenApp: () => void;
}

export function Header({ onOpenApp }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Venue', href: '#venue' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Rewards', href: '#rewards' },
    { label: 'Contact', href: '#enquire' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,10,12,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 no-underline">
            <span
              className="text-xl lg:text-2xl font-bold"
              style={{ fontFamily: "'Cinzel', serif", color: '#d4a04a', letterSpacing: '0.05em' }}
            >
              XL
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase no-underline transition-colors duration-300"
                style={{ color: 'rgba(245,240,232,0.4)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a04a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)'; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+1234567890"
              className="hidden lg:block text-[10px] tracking-wider no-underline transition-colors duration-300"
              style={{ color: 'rgba(245,240,232,0.3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a04a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.3)'; }}
            >
              +1 (234) 567-890
            </a>

            <button
              onClick={onOpenApp}
              className="hidden lg:block px-5 py-2 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-500"
              style={{
                background: 'transparent',
                border: '1px solid rgba(212,160,74,0.3)',
                color: '#d4a04a',
                fontFamily: "'Cinzel', serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#d4a04a'; e.currentTarget.style.color = '#0a0a0c'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4a04a'; }}
            >
              Open App
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              style={{ background: 'none', border: 'none', width: 32, height: 32 }}
            >
              <span className="block w-5 h-[1px] transition-all duration-300" style={{ background: menuOpen ? '#d4a04a' : 'rgba(245,240,232,0.5)', transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none' }} />
              <span className="block w-5 h-[1px] transition-all duration-300" style={{ background: menuOpen ? 'transparent' : 'rgba(245,240,232,0.5)' }} />
              <span className="block w-5 h-[1px] transition-all duration-300" style={{ background: menuOpen ? '#d4a04a' : 'rgba(245,240,232,0.5)', transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-6 pb-8"
          style={{ background: 'rgba(10,10,12,0.98)' }}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-wider uppercase no-underline py-2"
                style={{ color: 'rgba(245,240,232,0.4)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+1234567890"
              className="text-xs tracking-wider no-underline py-2"
              style={{ color: 'rgba(245,240,232,0.3)' }}
            >
              +1 (234) 567-890
            </a>
            <button
              onClick={() => { setMenuOpen(false); onOpenApp(); }}
              className="mt-2 px-5 py-3 text-[10px] tracking-[0.2em] uppercase cursor-pointer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(212,160,74,0.3)',
                color: '#d4a04a',
                fontFamily: "'Cinzel', serif",
              }}
            >
              Open App
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
