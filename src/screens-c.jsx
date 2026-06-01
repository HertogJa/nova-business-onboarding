// Screens 9-11: Address preference, Live activation, Operating relationship

// ---------- Screen 9 ----------
function Screen9({ selectedAddress, setSelectedAddress, setActiveScreen }) {
  return (
    <NovaScreen
      island={<><IslandIcon kind="spark" /><span>NOVA · Final preference</span></>}
      pct={82}
      step="Step 8 of 10"
      companion="One small preference before activation. Veris has a registered address and a correspondence address. Your legal address stays unchanged."
    >
      <div className="px-6 flex-1 flex flex-col">
        <h1 className="font-editorial mb-3" style={{ fontSize: 22, lineHeight: 1.1 }}>
          One small preference.
        </h1>

        <Card>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: '#1A1A1A', marginBottom: 12 }}>
            Where should NOVA send operational letters?
          </p>

          <div className="flex flex-col gap-2.5">
            <AddressRow
              selected={selectedAddress === 'registered'}
              onClick={() => setSelectedAddress('registered')}
              label="Registered address"
              addr="Herengracht 182, 1016 BS Amsterdam"
            />
            <AddressRow
              selected={selectedAddress === 'correspondence'}
              onClick={() => setSelectedAddress('correspondence')}
              label="Correspondence address"
              addr="Prinsengracht 94, 1017 KZ Amsterdam"
            />
          </div>

          {selectedAddress === 'registered' && (
            <p style={{ fontSize: 12, color: '#0A8F6E', fontStyle: 'italic', marginTop: 12, lineHeight: 1.5 }} className="soft-rise">
              Done. We'll send operational mail to the registered address.
            </p>
          )}
          {selectedAddress === 'correspondence' && (
            <p style={{ fontSize: 12, color: '#0A8F6E', fontStyle: 'italic', marginTop: 12, lineHeight: 1.5 }} className="soft-rise">
              Done. Your official registered address stays Herengracht 182. We'll send operational mail to Prinsengracht.
            </p>
          )}
        </Card>

        <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5, marginTop: 14 }}>
          When something needs a closer look, one of our colleagues helps you through it. You never start over.
        </p>
      </div>

      <CtaArea>
        {selectedAddress ? (
          <PrimaryButton onClick={() => setActiveScreen(10)}>Continue to activation</PrimaryButton>
        ) : (
          <div style={{ height: 52 }} />
        )}
      </CtaArea>
    </NovaScreen>
  );
}

function AddressRow({ selected, onClick, label, addr }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-colors"
      style={{
        background: selected ? '#F0F7F4' : 'white',
        border: selected ? '2px solid #0A8F6E' : '1px solid #E2DED8',
        borderRadius: 12,
        padding: selected ? '11px 13px' : '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: 999,
        border: `2px solid ${selected ? '#0A8F6E' : '#C8C5BD'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: 999, background: '#0A8F6E' }} />}
      </div>
      <div className="flex-1">
        <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{label}</div>
        <div style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.4, marginTop: 1 }}>{addr}</div>
      </div>
    </button>
  );
}

// ---------- Screen 10 ----------
function Screen10({ setActiveScreen }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <NovaScreen
      island={<><IslandDot /><span>NOVA · Veris is live</span></>}
      pct={91}
      step="Step 9 of 10"
      companion="Veris is live. Account, cards, approvals and accounting are now active together."
    >
      <div className="px-6 flex-1 flex flex-col overflow-y-auto phone-scroll">
        <div style={{ fontSize: 10.5, color: '#0A8F6E', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          Welcome to NOVA Business
        </div>
        <h1 className="font-editorial" style={{ fontSize: 30, lineHeight: 1.02, color: '#1A1A1A', marginTop: 2 }}>
          Veris is live.
        </h1>

        {/* Virtual card stack — the money shot */}
        <div style={{ position: 'relative', marginTop: 18, height: 224 }}>
          {/* Bram (behind, lower, scaled) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 38,
              transform: phase
                ? 'translateX(-50%) scale(0.92)'
                : 'translateX(-50%) scale(0.92) translateY(12px)',
              opacity: phase ? 1 : 0,
              transition: 'opacity 480ms ease-out 220ms, transform 480ms ease-out 220ms',
              zIndex: 1,
            }}
          >
            <VirtualCard name="Bram de Vries" last4="3894" />
          </div>
          {/* Mira (on top) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: phase
                ? 'translateX(-50%) translateY(0)'
                : 'translateX(-50%) translateY(12px)',
              opacity: phase ? 1 : 0,
              transition: 'opacity 480ms ease-out 80ms, transform 480ms ease-out 80ms',
              zIndex: 2,
            }}
          >
            <VirtualCard name="Mira Hendriks" last4="4721" topCard />
          </div>
        </div>

        {/* Activation pills */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#5A4200',
            background: '#FFD23F', padding: '4px 10px', borderRadius: 999,
            letterSpacing: 0.2,
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}>Virtual: active</span>
          <span style={{
            fontSize: 10, fontWeight: 600, color: '#6B6B6B',
            background: '#EEEAE2', padding: '4px 10px', borderRadius: 999,
            border: '1px solid #E2DED8',
          }}>Physical: on the way</span>
        </div>

        {/* What's active — compact rows directly below */}
        <div style={{ marginTop: 18 }}>
          <div className="space-y-1.5">
            <ActiveRow label="Account" value="NL91 NOVA 0123 4567 89" />
            <ActiveRow value="Virtual cards for Mira and Bram" />
            <ActiveRow value="Payments across Europe" />
            <ActiveRow value="Exact Online connected" />
            <ActiveRow value="Mira and Bram as approvers" />
            <ActiveRow value="Selected company updates enabled" />
          </div>
        </div>

        <p style={{ fontSize: 11, color: '#6B6B6B', marginTop: 14, lineHeight: 1.5 }}>
          The credit option is prepared. No credit review has started.
        </p>
      </div>

      <CtaArea>
        <PrimaryButton onClick={() => setActiveScreen(11)}>Open Veris dashboard</PrimaryButton>
      </CtaArea>
    </NovaScreen>
  );
}

function VirtualCard({ name, last4, topCard = false }) {
  return (
    <div
      style={{
        width: 280,
        height: 168,
        borderRadius: 16,
        background: 'linear-gradient(135deg, #0A8F6E 0%, #066B52 100%)',
        color: 'white',
        padding: 18,
        boxShadow: topCard
          ? '0 18px 36px rgba(6,107,82,0.32), 0 2px 4px rgba(0,0,0,0.08)'
          : '0 8px 20px rgba(6,107,82,0.22)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* diagonal light streak */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(125deg, transparent 38%, rgba(255,255,255,0.08) 50%, transparent 62%)',
        pointerEvents: 'none',
      }} />
      {/* faint inner highlight */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'rgba(255,255,255,0.18)',
      }} />

      <div className="flex items-baseline justify-between" style={{ position: 'relative' }}>
        <div className="flex items-baseline gap-1">
          <span className="font-editorial" style={{ fontSize: 15, color: 'white', fontWeight: 700, fontStyle: 'italic' }}>
            NOVA <span style={{ fontWeight: 400, opacity: 0.7 }}>|</span> BANQ
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>for Business</span>
      </div>

      {/* small yellow chip detail */}
      <div style={{
        position: 'absolute', top: 60, left: 18,
        width: 28, height: 20, borderRadius: 4,
        background: 'linear-gradient(135deg, #FFD23F 0%, #E5B824 100%)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          position: 'absolute', inset: '4px 4px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)',
          borderRadius: 2,
        }} />
      </div>

      {/* contactless glyph */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        style={{ position: 'absolute', top: 62, left: 56, opacity: 0.85 }}
      >
        <path d="M7 7c2.8 2.8 2.8 7.2 0 10M11 4.5c4.2 4.2 4.2 10.8 0 15M15 2c5.5 5.5 5.5 14.5 0 20" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
        <div style={{ fontSize: 13, letterSpacing: 2.4, color: 'rgba(255,255,255,0.95)', fontVariantNumeric: 'tabular-nums' }}>
          •••• •••• •••• {last4}
        </div>
        <div className="flex items-baseline justify-between" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase' }}>{name}</span>
          <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.72)', letterSpacing: 0.3 }}>Business Debit</span>
        </div>
      </div>
    </div>
  );
}

function ActiveRow({ label, value }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <Icon.Check size={11} color="#0A8F6E" stroke={2.6} />
      {label ? (
        <span style={{ fontSize: 12 }}>
          <span style={{ color: '#6B6B6B' }}>{label}: </span>
          <span style={{ fontVariantNumeric: 'tabular-nums', color: '#1A1A1A' }}>{value}</span>
        </span>
      ) : (
        <span style={{ fontSize: 12, color: '#1A1A1A' }}>{value}</span>
      )}
    </div>
  );
}

// ---------- Screen 11 ----------
function Screen11({ futureChangePreview, setFutureChangePreview, replay }) {
  return (
    <NovaScreen
      island={<><IslandIcon kind="spark" /><span>NOVA · Veris dashboard</span></>}
      pct={100}
      step="Step 10 of 10"
      companion="This is the start of the relationship. NOVA now helps keep Veris aligned as things change."
    >
      <div className="px-6 flex-1 flex flex-col overflow-y-auto phone-scroll">
        <div style={{ fontSize: 10.5, color: '#0A8F6E', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Veris is ready to operate
        </div>
        <h1 className="font-editorial" style={{ fontSize: 24, lineHeight: 1.05, marginTop: 2 }}>
          Your operating relationship.
        </h1>

        <Card style={{ marginTop: 12, padding: 16 }}>
          {/* Section 1 — Money */}
          <div>
            <div style={{ fontSize: 10, color: '#6B6B6B', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Money</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>NL91 NOVA 0123 4567 89</div>
            <div className="flex gap-4 mt-1">
              <div>
                <div style={{ fontSize: 10, color: '#6B6B6B' }}>Balance</div>
                <div style={{ fontSize: 16, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€0</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#6B6B6B' }}>Pending</div>
                <div style={{ fontSize: 16, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>€0</div>
              </div>
            </div>
            <div style={{ marginTop: 10, background: '#FFF7ED', borderLeft: '3px solid #FFD23F', padding: '8px 10px', borderRadius: 6 }}>
              <p style={{ fontSize: 11.5, color: '#1A1A1A', lineHeight: 1.5 }}>
                Volta Ventures transfer can be routed here once the new IBAN is shared.
              </p>
              <p style={{ fontSize: 10, color: '#6B6B6B', marginTop: 3, lineHeight: 1.5 }}>
                Based on Mira-approved investor context. No credit review has started.
              </p>
            </div>
          </div>

          {/* Section 2 — Active setup */}
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F0EDE6' }}>
            <div style={{ fontSize: 10, color: '#6B6B6B', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>Active setup</div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between" style={{ fontSize: 11.5 }}>
                <span style={{ color: '#6B6B6B' }}>Exact Online</span>
                <span style={{ color: '#0A8F6E', fontWeight: 500 }}>connected and synced ✓</span>
              </div>
              <div className="flex items-start justify-between gap-3" style={{ fontSize: 11.5 }}>
                <span style={{ color: '#6B6B6B', flexShrink: 0 }}>Approvals</span>
                <span style={{ textAlign: 'right', lineHeight: 1.4 }}>Up to €10k: alone · Above €10k: together</span>
              </div>
              <div className="flex items-center justify-between" style={{ fontSize: 11.5 }}>
                <span style={{ color: '#6B6B6B' }}>Selected company updates</span>
                <span style={{ color: '#0A8F6E', fontWeight: 500 }}>enabled</span>
              </div>
            </div>
          </div>

          {/* Section 3 — NOVA suggests */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F0EDE6' }}>
            <div style={{
              background: '#FBFAF7',
              border: '1px solid #ECE9E2',
              borderRadius: 14,
              padding: 14,
            }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ width: 8, height: 8, borderRadius: 999, background: '#0A8F6E' }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: '#0A8F6E' }}>NOVA suggests</span>
              </div>
              <div style={{ fontSize: 11, color: '#6B6B6B', marginBottom: 6 }}>Next useful steps</div>
              <div>
                <SuggestRow
                  icon={<SuggestIcon kind="send" />}
                  title="Share IBAN with Volta"
                  desc="Route the seed funds into your NOVA account."
                  divider
                />
                <SuggestRow
                  icon={<SuggestIcon kind="card" />}
                  title="Confirm card delivery"
                  desc="Physical cards are on the way."
                  divider
                />
                <SuggestRow
                  icon={<SuggestIcon kind="review" />}
                  title="Start credit review when ready"
                  desc="Prepared, not started. You decide whether to begin."
                />
              </div>
            </div>
          </div>
        </Card>

        <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12 }}>
          If something important changes — in your company records, approved wallet updates or money flow — we'll explain what changed, what it means and what to do.
        </p>

        {/* Preview future change */}
        {!futureChangePreview ? (
          <button
            onClick={() => setFutureChangePreview(true)}
            className="mt-3 active:scale-[0.99] transition-transform"
            style={{
              background: '#F0F7F4',
              border: '1px solid rgba(10,143,110,0.25)',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: 12.5,
              fontWeight: 500,
              color: '#066B52',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: 999,
              background: 'white', border: '1px solid rgba(10,143,110,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon.Sparkle size={12} color="#0A8F6E" />
            </div>
            <div className="flex-1 text-left">
              <div style={{ color: '#066B52' }}>Preview a future change</div>
              <div style={{ fontSize: 10.5, color: '#0A8F6E', fontWeight: 400 }}>See how NOVA stays aligned with Veris</div>
            </div>
            <Icon.ArrowRight size={14} color="#0A8F6E" />
          </button>
        ) : (
          <div className="soft-rise" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 12, padding: 14, marginTop: 12 }}>
            <div className="flex items-center gap-1.5">
              <Icon.Sparkle size={12} color="#9A6500" />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#9A6500', letterSpacing: 0.4, textTransform: 'uppercase' }}>Company update received</span>
            </div>
            <p style={{ fontSize: 12.5, color: '#1A1A1A', lineHeight: 1.5, marginTop: 6 }}>
              Veris shared an approved authority update.
            </p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-1.5">
                <Icon.Check size={11} color="#0A8F6E" stroke={2.6} />
                <span style={{ fontSize: 11.5, color: '#1A1A1A', lineHeight: 1.5 }}>Operating permissions stay the same.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Icon.Info size={11} color="#9A6500" />
                <span style={{ fontSize: 11.5, color: '#1A1A1A', lineHeight: 1.5 }}>Legal authority may need register confirmation.</span>
              </li>
            </ul>
            <button
              style={{
                marginTop: 10,
                background: 'white',
                border: '1px solid #FED7AA',
                color: '#7A5A00',
                fontSize: 12,
                fontWeight: 600,
                padding: '8px 12px',
                borderRadius: 8,
              }}
            >
              Review when needed
            </button>
          </div>
        )}

        <button
          onClick={replay}
          className="mt-3 mb-2 mx-auto"
          style={{ fontSize: 12, color: '#6B6B6B', display: 'block' }}
        >
          Replay journey <span style={{ marginLeft: 2 }}>→</span>
        </button>
      </div>
    </NovaScreen>
  );
}

function SuggestRow({ icon, title, desc, divider = false }) {
  return (
    <button
      className="w-full flex items-center gap-3 text-left active:bg-black/[0.02] transition-colors"
      style={{
        padding: '10px 4px',
        borderBottom: divider ? '1px solid #ECE9E2' : 'none',
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'white', border: '1px solid #ECE9E2',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35, color: '#1A1A1A' }}>{title}</div>
        <div style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.4, marginTop: 1 }}>{desc}</div>
      </div>
      <Icon.Chevron size={14} color="#6B6B6B" />
    </button>
  );
}

function SuggestIcon({ kind }) {
  const c = '#0A8F6E';
  if (kind === 'send') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M3 12l18-8-7 18-3-8-8-2z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === 'card') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke={c} strokeWidth="1.7" />
        <path d="M3 10h18" stroke={c} strokeWidth="1.7" />
        <path d="M7 15h3" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'review') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3" width="14" height="18" rx="2" stroke={c} strokeWidth="1.7" />
        <path d="M9 11l2 2 4-4" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

Object.assign(window, { Screen9, Screen10, Screen11 });
