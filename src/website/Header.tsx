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
    { label: 'Venues', href: '#venues' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Rewards', href: '#rewards' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,12,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
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
            <span className="text-[10px] tracking-wider uppercase hidden sm:block" style={{ color: 'rgba(245,240,232,0.3)' }}>
              Cafe & Billiards
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-wider uppercase no-underline transition-colors duration-300"
                style={{ color: 'rgba(245,240,232,0.4)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a04a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)'; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenApp}
              className="px-4 py-2 rounded-full text-[10px] tracking-wider uppercase cursor-pointer hidden sm:block"
              style={{
                background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
                color: '#0a0a0c',
                border: 'none',
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
              }}
            >
              Open App
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              style={{ background: 'none', border: 'none' }}
            >
              <span className="block w-5 h-[1px]" style={{ background: menuOpen ? '#d4a04a' : 'rgba(245,240,232,0.5)', transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none', transition: 'all 0.3s ease' }} />
              <span className="block w-5 h-[1px]" style={{ background: menuOpen ? 'transparent' : 'rgba(245,240,232,0.5)', transition: 'all 0.3s ease' }} />
              <span className="block w-5 h-[1px]" style={{ background: menuOpen ? '#d4a04a' : 'rgba(245,240,232,0.5)', transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none', transition: 'all 0.3s ease' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-6 pb-6"
          style={{ background: 'rgba(10,10,12,0.98)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-wider uppercase no-underline py-2"
                style={{ color: 'rgba(245,240,232,0.4)' }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onOpenApp(); }}
              className="mt-2 px-4 py-3 rounded-full text-xs tracking-wider uppercase cursor-pointer w-full"
              style={{
                background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
                color: '#0a0a0c',
                border: 'none',
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
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
