import { useState } from 'react';
import { useInView } from '../hooks';

export function Contact() {
  const [headerRef, headerInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="enquire" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #0a0a0c 0%, rgba(212,160,74,0.02) 50%, #0a0a0c 100%)',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <div
              ref={headerRef}
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
                Contact
              </span>
              <h2
                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
              >
                Let&apos;s<br />Talk
              </h2>
              <p
                className="text-sm leading-relaxed mb-10 max-w-sm"
                style={{ color: 'rgba(245,240,232,0.4)' }}
              >
                Whether it&apos;s a private function, corporate event, or a night out with friends — we&apos;ll make it unforgettable.
              </p>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: '#d4a04a' }}>
                    Location
                  </span>
                  <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    123 Venue Street<br />
                    Entertainment District
                  </p>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: '#d4a04a' }}>
                    Hours
                  </span>
                  <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    Mon – Thu: 4PM – 1AM<br />
                    Fri – Sat: 12PM – 3AM<br />
                    Sun: 12PM – 12AM
                  </p>
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: '#d4a04a' }}>
                    Get In Touch
                  </span>
                  <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
                    +1 (234) 567-890<br />
                    hello@xlcafebilliards.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            ref={formRef}
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
                  Enquiry Sent
                </h3>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent text-sm outline-none transition-colors duration-300"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      color: '#f5f0e8',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#d4a04a'; }}
                    onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent text-sm outline-none transition-colors duration-300"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      color: '#f5f0e8',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#d4a04a'; }}
                    onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent text-sm outline-none transition-colors duration-300"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      color: '#f5f0e8',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#d4a04a'; }}
                    onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider uppercase block mb-2" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent text-sm outline-none resize-none transition-colors duration-300"
                    style={{
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      color: '#f5f0e8',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderBottomColor = '#d4a04a'; }}
                    onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 mt-4 text-xs tracking-[0.25em] uppercase font-semibold cursor-pointer transition-all duration-500"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(212,160,74,0.4)',
                    color: '#d4a04a',
                    fontFamily: "'Cinzel', serif",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#d4a04a'; e.currentTarget.style.color = '#0a0a0c'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4a04a'; }}
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
