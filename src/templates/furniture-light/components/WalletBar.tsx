// Furniture Light — Wallet Bar (mobile only)
// Dark gradient bar with wallet/points/vouchers. Unique to this template.
// ZERO hardcoded colors

interface WalletBarProps {
  walletBalance?: number;
  loyaltyPoints?: number;
  voucherCount?: number;
}

export function WalletBar({ walletBalance = 0, loyaltyPoints = 0, voucherCount = 0 }: WalletBarProps) {
  const items = [
    {
      label: "Billetera",
      value: `$${new Intl.NumberFormat("es-CO").format(walletBalance)}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      label: "Puntos",
      value: new Intl.NumberFormat("es-CO").format(loyaltyPoints),
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      label: "Cupones",
      value: voucherCount.toString(),
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v10H4V12" />
          <path d="M22 7H2v5h20V7z" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="lg:hidden mx-5 mb-4 overflow-hidden"
      style={{ borderRadius: "var(--t-radius-card)" }}
    >
      {/* Gradient background using wallet-bg token */}
      <div
        className="px-4 py-3"
        style={{
          background: "linear-gradient(135deg, var(--t-wallet-bg) 0%, var(--t-secondary) 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          {items.map((item, idx) => (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-white/80">
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
              <span className="text-sm font-bold text-white">{item.value}</span>
              {idx < items.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
