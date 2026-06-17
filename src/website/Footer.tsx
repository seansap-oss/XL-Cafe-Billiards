export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span
              className="text-2xl font-bold block mb-4"
              style={{ fontFamily: "'Cinzel', serif", color: '#d4a04a', letterSpacing: '0.05em' }}
            >
              XL
            </span>
            <p className="text-xs leading-relaxed mb-6" style={{ color: 'rgba(245,240,232,0.3)' }}>
              Where music, billiards, and culture converge.
              Three spaces. One experience.
            </p>
            <div className="flex gap-3">
              {['IG', 'FB', 'G'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center text-[9px] tracking-wider no-underline transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,240,232,0.3)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#d4a04a'; e.currentTarget.style.color = '#d4a04a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(245,240,232,0.3)'; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
              Quick Links
            </span>
            <div className="space-y-2">
              {['Venue', 'Events', 'Gallery', 'Rewards', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-xs no-underline transition-colors duration-300"
                  style={{ color: 'rgba(245,240,232,0.3)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#f5f0e8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.3)'; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
              Contact
            </span>
            <div className="space-y-2 text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
              <p>123 Venue Street</p>
              <p>Entertainment District</p>
              <p>+1 (234) 567-890</p>
              <p>hello@xlcafebilliards.com</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-[10px] tracking-wider" style={{ color: 'rgba(245,240,232,0.15)' }}>
            &copy; 2026 XL Cafe & Billiards. All rights reserved.
          </p>
          <div className="flex gap-6">
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
        </div>
      </div>
    </footer>
  );
}
