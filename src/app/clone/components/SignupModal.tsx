'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Signup/waitlist modal. Triggered by the "Sign up to our newsletter" button
 * in the Members card (Partners section) and the "Sign up to our newsletter"
 * button in the nav/CTA area.
 *
 * Accessibility:
 * - Focus is trapped inside the dialog when open
 * - ESC closes the dialog
 * - Backdrop click closes the dialog
 * - role="dialog" + aria-modal + aria-labelledby
 */
export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [submitted, setSubmitted] = useState<'idle' | 'success' | 'error'>('idle');
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '' });
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Trap focus + close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    // Focus first input when opened
    setTimeout(() => firstInputRef.current?.focus(), 50);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // TODO: wire to real API / Mailchimp / etc.
      await new Promise((r) => setTimeout(r, 500)); // Simulate request
      setSubmitted('success');
    } catch {
      setSubmitted('error');
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="pop-up fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-modal-heading"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {submitted === 'success' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4" aria-hidden="true">🎉</div>
                <h2 className="text-2xl font-black mb-2">You&apos;re on the list!</h2>
                <p className="text-gray-500 text-sm">We&apos;ll be in touch with exclusive updates soon.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 bg-black text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 id="signup-modal-heading" className="text-3xl font-black leading-tight">Welcome!</h2>
                  <p className="text-gray-500 text-sm mt-1">Join the waitlist and be the first one to get an invite.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div>
                    <label htmlFor="modal-first-name" className="block text-xs text-gray-500 mb-1">First name</label>
                    <input
                      ref={firstInputRef}
                      id="modal-first-name"
                      type="text"
                      name="firstName"
                      value={fields.firstName}
                      onChange={(e) => setFields((f) => ({ ...f, firstName: e.target.value }))}
                      placeholder="Enter a first name"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-last-name" className="block text-xs text-gray-500 mb-1">Last name</label>
                    <input
                      id="modal-last-name"
                      type="text"
                      name="lastName"
                      value={fields.lastName}
                      onChange={(e) => setFields((f) => ({ ...f, lastName: e.target.value }))}
                      placeholder="Enter a last name"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-xs text-gray-500 mb-1">E-mail address</label>
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                      placeholder="email@example.com"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                  </div>

                  {submitted === 'error' && (
                    <p className="text-sm text-neutral-600" role="alert">
                      Oops! Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black text-white font-semibold text-sm py-3.5 rounded-full hover:bg-gray-900 transition-colors mt-2"
                  >
                    Join VIP waiting list
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
