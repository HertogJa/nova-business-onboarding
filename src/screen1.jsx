// Screen 1 — Banking starts outside the bank (Claude's world)

function Screen1({ claudeStep, setClaudeStep, setActiveScreen }) {
  const [showSafety, setShowSafety] = useState(false);
  const [progress, setProgress] = useState(0);
  const [handoverPhase, setHandoverPhase] = useState(0); // 0=stay, 1=compress, 2=cross
  const progressRef = useRef(null);

  // manifest -> handover -> screen 2
  useEffect(() => {
    if (claudeStep === 'manifest') {
      setProgress(0);
      const start = Date.now();
      const duration = 2400;
      const id = setInterval(() => {
        const e = Math.min(1, (Date.now() - start) / duration);
        setProgress(e * 100);
        if (e >= 1) {
          clearInterval(id);
          setTimeout(() => setClaudeStep('handover'), 550);
        }
      }, 50);
      return () => clearInterval(id);
    }
    if (claudeStep === 'handover') {
      setHandoverPhase(1);
      const t1 = setTimeout(() => setHandoverPhase(2), 550);
      const t2 = setTimeout(() => setActiveScreen(2), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [claudeStep]);

  return (
    <PhoneFrame
      dark
      island={<>
        <IslandIcon kind="spark" />
        <span>Claude · Veris workspace</span>
        <span style={{ width: 5, height: 5, borderRadius: 999, background: 'white', display: 'inline-block', opacity: 0.85 }} />
      </>}
    >
      <div className="h-full flex flex-col px-5 pt-2 pb-4 relative">
        {/* Claude header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(217,119,87,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Claude orange star mark */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.4c.6 2.7 1.2 5.4 3.3 7.5 2.1 2.1 4.8 2.7 7.5 3.3-2.7.6-5.4 1.2-7.5 3.3-2.1 2.1-2.7 4.8-3.3 7.5-.6-2.7-1.2-5.4-3.3-7.5C6.6 14.4 3.9 13.8 1.2 13.2c2.7-.6 5.4-1.2 7.5-3.3 2.1-2.1 2.7-4.8 3.3-7.5z" fill="#D97757" />
              </svg>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 11, letterSpacing: 0.4, textTransform: 'uppercase' }}>Claude</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: 0.4 }}>Veris workspace</span>
        </div>

        {/* Main Claude card */}
        <div
          className="flex-1 flex flex-col relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 22,
            padding: 18,
            opacity: handoverPhase >= 2 ? 0 : 1,
            transform: handoverPhase >= 1 ? 'translateY(-6px)' : 'none',
            transition: 'opacity 500ms ease-out, transform 600ms ease-out',
          }}
        >
          {claudeStep === 'recommendation' && (
            <Step1Recommendation onPrepare={() => setClaudeStep('consent')} />
          )}
          {claudeStep === 'consent' && (
            <Step1Consent
              showSafety={showSafety}
              setShowSafety={setShowSafety}
              onApprove={() => setClaudeStep('manifest')}
            />
          )}
          {(claudeStep === 'manifest' || claudeStep === 'handover') && (
            <Step1Manifest progress={progress} handoverPhase={handoverPhase} />
          )}
        </div>

        {/* Cross-fade NOVA reveal underneath */}
        {handoverPhase >= 1 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: '#F7F5F0',
              opacity: handoverPhase >= 2 ? 1 : 0,
              transition: 'opacity 600ms ease-out',
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 22, color: '#0A8F6E' }}>
              opening your session
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// ---------- Step 1: recommendation ----------
function Step1Recommendation({ onPrepare }) {
  return (
    <div className="flex flex-col h-full">
      <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 14, lineHeight: 1.55 }} className="soft-rise">
        Congrats on closing the investment from Volta Ventures. Veris needs banking now. I looked at three banks that could fit you.
      </p>

      <div className="mt-4 flex flex-col gap-2.5 stagger flex-1">
        <BankRow
          name="Bank A"
          desc="Affordable. Strong for international payments. You'd handle most of the setup yourself."
        />
        <BankRow
          name="Bank B"
          desc="Built for venture-backed startups. Will help you borrow when you're ready. Higher monthly fee."
        />
        <BankRow
          name="NOVA BANQ"
          desc="Premium European bank. People who know your sector. International network and the experience to grow with Veris."
          featured
        />
      </div>

      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.5 }} className="mt-3 soft-rise">
        NOVA fits Veris best. Want me to prepare the handover?
      </p>

      <button
        onClick={onPrepare}
        className="mt-3 self-start active:scale-[0.98]"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          fontSize: 13,
          fontWeight: 500,
          padding: '9px 14px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        Yes, prepare it
      </button>
    </div>
  );
}

function BankRow({ name, desc, featured = false }) {
  return (
    <div
      style={{
        background: featured ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: featured ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: '10px 12px',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        {featured && <Icon.Check size={12} color="white" stroke={2.6} />}
        <span style={{ color: 'white', fontSize: 13, fontWeight: featured ? 600 : 500 }}>{name}</span>
        {featured && (
          <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 600, color: 'white', background: 'rgba(255,255,255,0.16)', padding: '2px 7px', borderRadius: 999, letterSpacing: 0.3 }}>
            BEST FIT
          </span>
        )}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11.5, lineHeight: 1.45 }}>{desc}</p>
    </div>
  );
}

// ---------- Step 2: consent ----------
function Step1Consent({ showSafety, setShowSafety, onApprove }) {
  return (
    <div className="flex flex-col h-full">
      {/* Mira reply chip */}
      <div className="flex justify-end mb-3 soft-rise">
        <MiraChip>Yes, prepare it.</MiraChip>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13.5, lineHeight: 1.5 }} className="soft-rise">
        Before Veris shares anything with NOVA, here's what you'll approve.
      </p>

      <div className="mt-3 flex flex-col gap-2 stagger flex-1 overflow-hidden">
        <ConsentRow
          n="1"
          title="Veris company details"
          source="EU Business Wallet"
          purpose="Company name, legal form, KvK number, sector, registered address"
        />
        <ConsentRow
          n="2"
          title="KvK check"
          source="KvK"
          purpose="Company existence, registered address and statutory directors"
        />
        <ConsentRow
          n="3"
          title="Ownership and authority details"
          source="Veris company trust layer"
          purpose="Who owns Veris, who may act for Veris and UBO status"
        />
        <ConsentRow
          n="4"
          title="Investment notice"
          source="Volta Ventures B.V."
          purpose="€2.3M investment context and shareholder position"
        />
        <ConsentRow
          n="5"
          title="Exact Online permission"
          source="Mira's approval"
          purpose="Connecting Exact Online after the NOVA account is live"
        />
      </div>

      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, lineHeight: 1.5, marginTop: 8 }}>
        You approve this handover. You can withdraw or change permissions later.
      </p>

      <button
        onClick={() => setShowSafety(!showSafety)}
        className="self-start mt-1"
        style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}
      >
        Why this is safe <span style={{ marginLeft: 2 }}>{showSafety ? '↑' : '→'}</span>
      </button>

      {showSafety && (
        <div className="soft-rise" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 10, marginTop: 6, color: 'rgba(255,255,255,0.7)', fontSize: 10.5, lineHeight: 1.5 }}>
          Claude recommends. Mira decides. Claude may prepare onboarding, compare banks and request consent.
          Claude cannot share data without approval, sign terms, open accounts, approve credit or execute payments.
          Veris shares verified company details only after Mira approves the handover.
        </div>
      )}

      <button
        onClick={onApprove}
        className="mt-3 self-start active:scale-[0.98]"
        style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          fontSize: 13,
          fontWeight: 500,
          padding: '9px 14px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        Approve handover
      </button>
    </div>
  );
}

function ConsentRow({ n, title, source, purpose }) {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 7 }}>
      <div className="flex items-baseline gap-2">
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, width: 10 }}>{n}</span>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <span style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>{title}</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10 }}>{source}</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10.5, lineHeight: 1.45, marginTop: 2 }}>{purpose}</p>
        </div>
      </div>
    </div>
  );
}

function MiraChip({ children }) {
  return (
    <div className="flex items-center gap-1.5" style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '6px 10px 6px 6px',
      borderRadius: 999,
      maxWidth: '85%',
    }}>
      <div style={{ width: 18, height: 18, borderRadius: 999, background: 'rgba(255,255,255,0.18)', color: 'white', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12 }}>{children}</span>
    </div>
  );
}

// ---------- Step 3: manifest ----------
function Step1Manifest({ progress, handoverPhase }) {
  const items = [
    ['Veris company details', 'EU Business Wallet'],
    ['KvK check', 'company and directors'],
    ['Ownership and authority details', 'Veris trust layer'],
    ['Investment notice', 'Volta Ventures, €2.3M'],
    ['Exact Online permission', 'activates after account opening'],
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-3 soft-rise">
        <MiraChip>Approve handover.</MiraChip>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13.5, lineHeight: 1.5 }} className="soft-rise">
        Preparing the handover for NOVA.
      </p>

      <div
        className="mt-3 flex flex-col gap-2 stagger flex-1"
        style={{
          opacity: handoverPhase >= 1 ? 0.65 : 1,
          transform: handoverPhase >= 1 ? 'scale(0.92)' : 'scale(1)',
          transformOrigin: 'center',
          transition: 'opacity 500ms ease-out, transform 500ms ease-out',
        }}
      >
        {items.map(([t, s], i) => (
          <div
            key={i}
            className="flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              padding: '9px 12px',
            }}
          >
            <Icon.Check size={12} color="white" stroke={2.6} />
            <div className="flex-1 min-w-0">
              <div style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>{t}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10 }}>{s}</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10.5, lineHeight: 1.5, marginTop: 10 }}>
        Shared by Veris with Mira's approval — encrypted, auditable, revocable.
      </p>

      <div className="mt-3">
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 6 }}>Opening your NOVA session…</div>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
          <div style={{
            height: 2,
            width: `${progress}%`,
            background: 'white',
            borderRadius: 2,
            transition: 'width 80ms linear',
          }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen1 });
