// Shared NOVA / Claude UI primitives. Exported on window for cross-script use.

const { useState, useEffect, useRef, useMemo } = React;

// ------- Phone frame -------
function PhoneFrame({ children, island, dark = false }) {
  return (
    <div
      className="relative"
      style={{
        width: 390,
        height: 844,
        background: '#1A1A1A',
        borderRadius: 44,
        padding: 8,
        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
      }}
    >
      <div
        className="relative overflow-hidden phone-scroll"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 36,
          background: dark ? '#1E2433' : '#F7F5F0',
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5 px-3"
          style={{
            top: 10,
            width: 'auto',
            minWidth: 110,
            height: 32,
            background: '#000',
            borderRadius: 999,
            color: 'white',
            fontSize: 10,
            letterSpacing: 0.1,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            maxWidth: 280,
          }}
        >
          {island}
        </div>
        {/* status bar */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7"
          style={{ height: 50, color: dark ? 'rgba(255,255,255,0.85)' : '#1A1A1A', fontSize: 13, fontWeight: 600 }}
        >
          <span>9:41</span>
          <span className="opacity-0">.</span>
          <span style={{ fontSize: 11 }}>•••• 5G</span>
        </div>
        {/* content */}
        <div className="relative pt-[52px] pb-[28px] h-full">
          {children}
        </div>
        {/* home indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: 8,
            width: 80,
            height: 3,
            borderRadius: 999,
            background: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
          }}
        />
      </div>
    </div>
  );
}

// ------- Dynamic island content helpers -------
function IslandDot({ color = '#0A8F6E' }) {
  return <span style={{ width: 6, height: 6, borderRadius: 999, background: color, display: 'inline-block' }} />;
}
function IslandIcon({ kind = 'wallet' }) {
  const stroke = 'rgba(255,255,255,0.9)';
  if (kind === 'wallet') {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2.5" stroke={stroke} strokeWidth="1.6" />
        <path d="M3 10h18" stroke={stroke} strokeWidth="1.6" />
        <circle cx="17" cy="14.5" r="1.1" fill={stroke} />
      </svg>
    );
  }
  if (kind === 'spark') {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.2 5.3L20 10l-5 3.6L16.5 20 12 16.8 7.5 20 9 13.6 4 10l5.8-1.7L12 3z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

// ------- NOVA inside-screen header -------
function NovaHeader() {
  return (
    <div className="flex items-baseline justify-between px-6 pt-1 pb-2" style={{ whiteSpace: 'nowrap' }}>
      <div className="flex items-baseline gap-1.5" style={{ whiteSpace: 'nowrap' }}>
        <span className="font-editorial" style={{ fontSize: 13, fontWeight: 700, color: '#0A8F6E', whiteSpace: 'nowrap' }}>
          NOVA<span className="not-italic" style={{ color: '#0A8F6E', fontWeight: 400, margin: '0 4px' }}>|</span>BANQ
        </span>
        <span style={{ fontSize: 9, color: '#6B6B6B', marginLeft: 2, whiteSpace: 'nowrap' }}>for Business</span>
      </div>
      <span style={{ fontSize: 10, color: '#6B6B6B', whiteSpace: 'nowrap' }}>NL · <span style={{ color: '#1A1A1A', fontWeight: 600 }}>EN</span></span>
    </div>
  );
}

// ------- Progress + step label -------
function ProgressRow({ pct, stepLabel }) {
  return (
    <div className="px-6 pb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 mr-3" style={{ height: 2, background: '#E2DED8', borderRadius: 2 }}>
          <div style={{ height: 2, width: `${pct}%`, background: '#0A8F6E', borderRadius: 2, transition: 'width 360ms ease-out' }} />
        </div>
        <span style={{ fontSize: 11, color: '#6B6B6B', whiteSpace: 'nowrap' }}>{stepLabel}</span>
      </div>
    </div>
  );
}

// ------- Companion line -------
function Companion({ children }) {
  return (
    <div className="px-6 pb-4 flex items-start gap-2">
      <span
        style={{
          width: 8, height: 8, borderRadius: 999, background: '#0A8F6E',
          marginTop: 6, flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'italic',
          fontSize: 13,
          lineHeight: 1.45,
          color: '#0A8F6E',
        }}
      >
        {children}
      </p>
    </div>
  );
}

// ------- Source chip -------
function SourceChip({ children }) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        background: '#F0F7F4',
        border: '1px solid rgba(10,143,110,0.4)',
        color: '#0A8F6E',
        fontSize: 11,
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: 12,
        lineHeight: 1.2,
      }}
    >
      {children}
    </span>
  );
}

// ------- Card -------
function Card({ children, className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        background: 'white',
        border: '1px solid #E2DED8',
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ------- Primary CTA -------
function PrimaryButton({ children, onClick, disabled = false, icon = null }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
      style={{
        height: 52,
        borderRadius: 12,
        background: disabled ? '#C4D6CF' : '#0A8F6E',
        color: 'white',
        fontSize: 15,
        fontWeight: 600,
        boxShadow: disabled ? 'none' : '0 1px 0 rgba(0,0,0,0.04), 0 6px 16px rgba(10,143,110,0.25)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function SecondaryLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="block mx-auto"
      style={{
        marginTop: 8,
        fontSize: 12,
        color: '#6B6B6B',
        background: 'transparent',
      }}
    >
      {children} <span style={{ marginLeft: 2 }}>→</span>
    </button>
  );
}

// ------- Footer CTA holder (always at bottom of NOVA screen body) -------
function CtaArea({ children }) {
  return (
    <div className="px-6 mt-auto" style={{ paddingTop: 10, paddingBottom: 20 }}>
      {children}
    </div>
  );
}

// ------- Screen wrapper for NOVA screens -------
function NovaScreen({ island, pct, step, companion, children, badge = null }) {
  return (
    <PhoneFrame island={island}>
      <div className="flex flex-col h-full">
        <NovaHeader />
        <ProgressRow pct={pct} stepLabel={step} />
        <Companion>{companion}</Companion>
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </PhoneFrame>
  );
}

// ------- Icons (lightweight inline) -------
const Icon = {
  Check: ({ size = 14, color = '#0A8F6E', stroke = 2.4 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ArrowRight: ({ size = 14, color = '#1A1A1A' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Chevron: ({ size = 14, color = '#6B6B6B' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Building: ({ size = 18, color = '#1A1A1A' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke={color} strokeWidth="1.6" />
      <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Wallet: ({ size = 18, color = '#0A8F6E' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke={color} strokeWidth="1.8" />
      <path d="M3 10h18" stroke={color} strokeWidth="1.8" />
      <circle cx="17" cy="14.5" r="1.3" fill={color} />
    </svg>
  ),
  Shield: ({ size = 16, color = '#0A8F6E' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 5-3.5 8.4-8 9-4.5-.6-8-4-8-9V6l8-3z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Sparkle: ({ size = 14, color = '#0A8F6E' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.8 4.4L18 9l-4.2 1.6L12 15l-1.8-4.4L6 9l4.2-1.6L12 3z" fill={color} />
    </svg>
  ),
  Info: ({ size = 14, color = '#6B6B6B' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" />
      <path d="M12 11v5M12 8v.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

// expose to other babel scripts
Object.assign(window, {
  PhoneFrame, IslandDot, IslandIcon, NovaHeader, ProgressRow, Companion,
  SourceChip, Card, PrimaryButton, SecondaryLink, CtaArea, NovaScreen, Icon,
});
