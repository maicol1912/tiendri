'use client';

import { useState } from 'react';

// CTA Section — "Don't miss out on what's next"
// Ticker: CSS keyframe animation (marqueeLeft 30s). Form: controlled React state.

const tickerStyle = `
  @keyframes ticker-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .cta-ticker {
    display: flex;
    animation: ticker-left 30s linear infinite;
    width: max-content;
  }
`;

const TICKER_ITEMS = 26; // 13 + 13 duplicate for seamless loop

function TickerBelt() {
  return (
    <div className="w-full overflow-hidden mt-12">
      <style>{tickerStyle}</style>
      <div className="cta-ticker">
        {[...Array(TICKER_ITEMS)].map((_, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-black font-semibold text-lg pr-8 whitespace-nowrap"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
          >
            Join the waitlist{" "}
            <span style={{ color: "rgb(140,138,255)" }}>*</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export interface CTAProps {
  onOpenSignup?: () => void;
}

export function CTA({ onOpenSignup: _onOpenSignup }: CTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      // TODO: wire to real newsletter API
      await new Promise((r) => setTimeout(r, 500));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className="bg-white py-24 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end gap-12">

          {/* Left: heading */}
          <div className="flex-1">
            <p className="text-neutral-500 text-sm font-medium mb-4">
              Subscribe to learn more about us
            </p>
            <h2
              id="cta-heading"
              className="font-black text-black leading-tight"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              Don&apos;t miss out<br />on what&apos;s next
            </h2>
          </div>

          {/* Right: email form */}
          <div className="flex-1 max-w-md">
            {status === 'success' ? (
              <p className="text-green-600 font-medium" role="status">
                Thank you! Your submission has been received!
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={handleSubmit}
                aria-label="Subscribe to newsletter"
              >
                <label htmlFor="cta-email" className="sr-only">Email address</label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="flex-1 px-5 py-4 border border-neutral-200 rounded-full text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors bg-white"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-6 py-4 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm mt-2" role="alert">
                Oops! Something went wrong while submitting the form.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Scrolling ticker belt */}
      <TickerBelt />

      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(141,138,255,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
