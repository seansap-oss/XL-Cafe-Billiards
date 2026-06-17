export function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "'Cinzel', serif", color: '#d4a04a', letterSpacing: '0.05em' }}
            >
              XL
            </span>
            <span className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.2)' }}>
              Cafe & Billiards
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] tracking-wider no-underline transition-colors duration-300"
                style={{ color: 'rgba(245,240,232,0.15)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.15)'; }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[10px] tracking-wider" style={{ color: 'rgba(245,240,232,0.1)' }}>
            &copy; 2026 XL Cafe & Billiards
          </p>
        </div>
      </div>
    </footer>
  );
}
