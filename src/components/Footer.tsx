import type { MorphState } from '../types';
import { useInView } from '../hooks';

interface FooterProps {
  morphState: MorphState;
}

export function Footer({ morphState }: FooterProps) {
  const { phase } = morphState;
  const [ref, inView] = useInView(0.1);

  const isVisible = phase === 'content-entrance';
  if (!isVisible) return null;

  return (
    <footer
      ref={ref}
      className="relative border-t"
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    >
      {/* Newsletter band */}
      <div
        className="py-16 px-6 md:px-12"
        style={{
          background: 'linear-gradient(180deg, rgba(212,160,74,0.02) 0%, transparent 100%)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Stay in the Loop
          </h3>
          <p
            className="text-sm mb-8"
            style={{ color: 'rgba(245,240,232,0.35)' }}
          >
            First access to events, exclusive offers, and venue updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#f5f0e8',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,160,74,0.3)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
            <button
              className="px-6 py-3 rounded-full text-xs tracking-[0.15em] uppercase font-semibold cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
                color: '#0a0a0c',
                border: 'none',
                fontFamily: "'Cinzel', serif",
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,160,74,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div
        className="py-16 px-6 md:px-12"
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#d4a04a',
                letterSpacing: '0.05em',
              }}
            >
              XL
            </div>
            <p
              className="text-xs leading-relaxed mb-6"
              style={{ color: 'rgba(245,240,232,0.3)' }}
            >
              Where music, billiards, and culture converge.
              Three spaces. One experience.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {['IG', 'TW', 'FB', 'TK'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] tracking-wider"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(245,240,232,0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,160,74,0.3)';
                    e.currentTarget.style.color = '#d4a04a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(245,240,232,0.3)';
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Spaces */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: '#d4a04a', fontFamily: "'Cinzel', serif" }}
            >
              Spaces
            </h4>
            <ul className="space-y-3">
              {['XL Live', 'XL Billiards', 'XL Cafe', 'VIP Lounge', 'Private Events'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm"
                    style={{
                      color: 'rgba(245,240,232,0.35)',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#f5f0e8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)'; }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: '#d4a04a', fontFamily: "'Cinzel', serif" }}
            >
              Visit
            </h4>
            <ul className="space-y-3">
              {[
                'Mon–Thu: 4PM – 1AM',
                'Fri–Sat: 12PM – 3AM',
                'Sun: 12PM – 12AM',
                'Kitchen until 11PM',
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm"
                  style={{ color: 'rgba(245,240,232,0.35)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: '#d4a04a', fontFamily: "'Cinzel', serif" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-sm" style={{ color: 'rgba(245,240,232,0.35)' }}>
                123 Venue Street
              </li>
              <li className="text-sm" style={{ color: 'rgba(245,240,232,0.35)' }}>
                Entertainment District
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm"
                  style={{
                    color: 'rgba(245,240,232,0.35)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#f5f0e8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)'; }}
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@xlvenue.com"
                  className="text-sm"
                  style={{
                    color: 'rgba(245,240,232,0.35)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#f5f0e8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.35)'; }}
                >
                  hello@xlvenue.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p
          className="text-[10px] tracking-wider"
          style={{ color: 'rgba(245,240,232,0.15)' }}
        >
          &copy; 2025 XL Cafe & Billiards. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Accessibility'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[10px] tracking-wider"
              style={{
                color: 'rgba(245,240,232,0.15)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,240,232,0.15)'; }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
