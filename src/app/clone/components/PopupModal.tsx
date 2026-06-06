'use client';

import { useEffect, useRef, useState } from 'react';

// Popup Modal — "Join VIP waiting list"
// Controlled by isOpen prop. Traps focus, closes on ESC + backdrop click.

export interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PopupModal({ isOpen, onClose }: PopupModalProps) {
  const [fields, setFields] = useState({ firstName: '', lastName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstInputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  }

  if (!isOpen) return null;

  return (
    <div
      id="popupModal"
      className="flex fixed inset-0 z-[9999] items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="popup-modal-heading"
    >
      {/* Semi-transparent overlay */}
      <div
        id="closePopupBg"
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 bg-white rounded-3xl p-10 w-full max-w-md mx-4 shadow-2xl">

        {/* Close button */}
        <button
          id="closePopup"
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <p className="text-2xl font-black mb-2">You&apos;re on the list!</p>
            <p className="text-neutral-500 text-sm">We&apos;ll be in touch soon.</p>
            <button type="button" onClick={onClose} className="mt-6 px-8 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors">Close</button>
          </div>
        ) : (
          <form id="popup-form" className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {/* Heading */}
            <div className="mb-2">
              <h2
                id="popup-modal-heading"
                className="font-black text-black leading-tight mb-2"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                Welcome!
              </h2>
              <p className="text-neutral-500 text-sm">
                Join the waitlist and be the first one to get an invite.
              </p>
            </div>

            {/* First name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-first-name" className="text-neutral-500 text-sm font-medium">First name</label>
              <input
                ref={firstInputRef}
                id="popup-first-name"
                name="First-Name"
                type="text"
                value={fields.firstName}
                onChange={(e) => setFields((f) => ({ ...f, firstName: e.target.value }))}
                placeholder="Enter a first name"
                required
                className="px-4 py-3 border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Last name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-last-name" className="text-neutral-500 text-sm font-medium">Last name</label>
              <input
                id="popup-last-name"
                name="Last-Name"
                type="text"
                value={fields.lastName}
                onChange={(e) => setFields((f) => ({ ...f, lastName: e.target.value }))}
                placeholder="Enter a last name"
                required
                className="px-4 py-3 border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="popup-email" className="text-neutral-500 text-sm font-medium">E-mail address</label>
              <input
                id="popup-email"
                name="email-2"
                type="email"
                value={fields.email}
                onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                placeholder="email@example.com"
                required
                className="px-4 py-3 border border-neutral-200 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors mt-2"
            >
              Join VIP waiting list
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
