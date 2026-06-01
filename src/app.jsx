// Root App — state machine, page chrome, navigation pills

const SHIFT_BY_SCREEN = {
  1: { num: 1, label: 'Agent-ready banking', moment: 'Agent-to-agent entry' },
  2: { num: 2, label: 'Company-owned trust layer', moment: 'Verified credential intake' },
  3: { num: 1, label: 'Agent-ready banking', moment: null },
  4: { num: 2, label: 'Company-owned trust layer', moment: null },
  5: { num: 2, label: 'Company-owned trust layer', moment: 'Company-owned trust layer' },
  6: { num: 3, label: 'Live operating relationship', moment: null },
  7: { num: 2, label: 'Company-owned trust layer', moment: null },
  8: { num: 2, label: 'Company-owned trust layer', moment: 'Selected update permission' },
  9: { num: 3, label: 'Live operating relationship', moment: null },
  10: { num: 3, label: 'Live operating relationship', moment: null },
  11: { num: 3, label: 'Live operating relationship', moment: 'Live operating relationship' },
};

function App() {
  const [activeScreen, setActiveScreen] = useState(1);
  const [claudeStep, setClaudeStep] = useState('recommendation');
  const [graphLayer, setGraphLayer] = useState('legal');
  const [selectedGraphNode, setSelectedGraphNode] = useState(null);
  const [approvalDemo, setApprovalDemo] = useState(null);
  const [miraWalletApproved, setMiraWalletApproved] = useState(false);
  const [miraSigned, setMiraSigned] = useState(false);
  const [bramSigned, setBramSigned] = useState(false);
  const [selectedUpdatesApproved, setSelectedUpdatesApproved] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [futureChangePreview, setFutureChangePreview] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  // fade re-mount when switching screens
  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [activeScreen]);

  const goTo = (n) => {
    if (n === 1) setClaudeStep('recommendation');
    setActiveScreen(n);
  };

  const replay = () => {
    setActiveScreen(1);
    setClaudeStep('recommendation');
    setGraphLayer('legal');
    setSelectedGraphNode(null);
    setApprovalDemo(null);
    setMiraWalletApproved(false);
    setMiraSigned(false);
    setBramSigned(false);
    setSelectedUpdatesApproved(false);
    setSelectedAddress(null);
    setFutureChangePreview(false);
  };

  const shift = SHIFT_BY_SCREEN[activeScreen];

  const screenEl = (() => {
    switch (activeScreen) {
      case 1:
        return <Screen1 claudeStep={claudeStep} setClaudeStep={setClaudeStep} setActiveScreen={setActiveScreen} />;
      case 2: return <Screen2 setActiveScreen={setActiveScreen} />;
      case 3: return <Screen3 setActiveScreen={setActiveScreen} />;
      case 4:
        return <Screen4
          miraWalletApproved={miraWalletApproved}
          setMiraWalletApproved={setMiraWalletApproved}
          setActiveScreen={setActiveScreen}
        />;
      case 5:
        return <Screen5
          bramSigned={bramSigned}
          selectedGraphNode={selectedGraphNode}
          setSelectedGraphNode={setSelectedGraphNode}
          setActiveScreen={setActiveScreen}
        />;
      case 6:
        return <Screen6
          miraSigned={miraSigned}
          setMiraSigned={setMiraSigned}
          setActiveScreen={setActiveScreen}
        />;
      case 7:
        return <Screen7
          bramSigned={bramSigned}
          setBramSigned={setBramSigned}
          setActiveScreen={setActiveScreen}
        />;
      case 8:
        return <Screen8
          bramSigned={bramSigned}
          selectedUpdatesApproved={selectedUpdatesApproved}
          setSelectedUpdatesApproved={setSelectedUpdatesApproved}
          setActiveScreen={setActiveScreen}
        />;
      case 9:
        return <Screen9
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setActiveScreen={setActiveScreen}
        />;
      case 10:
        return <Screen10 setActiveScreen={setActiveScreen} />;
      case 11:
        return <Screen11
          futureChangePreview={futureChangePreview}
          setFutureChangePreview={setFutureChangePreview}
          replay={replay}
        />;
      default:
        return null;
    }
  })();

  // Bram caption above frame only for Screen 7
  const showBramCaption = activeScreen === 7;

  return (
    <div style={{ background: '#F7F5F0', minHeight: '100vh' }}>
      {/* Moment 1 — Opening hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 40px',
        }}
      >
        <div style={{ maxWidth: '100%' }}>
          <h1
            className="font-editorial"
            style={{
              fontSize: 'clamp(48px, 7.6vw, 80px)',
              lineHeight: 1.02,
              color: '#1A1A1A',
              letterSpacing: -0.5,
              whiteSpace: 'nowrap',
            }}
          >
            Banking, beautifully simple.
          </h1>
          <p
            className="font-editorial"
            style={{
              fontSize: 30, lineHeight: 1.3, color: 'rgba(26,26,26,0.8)',
              marginTop: 28, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto',
            }}
          >
            When banking starts outside the bank, companies arrive already known — and the relationship lives from day one.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 32, fontSize: 12, color: '#6B6B6B' }}>
          NOVA BANQ Business · 2031 Vision Concept
        </div>
      </section>

      {/* Moment 2 — The demo */}
      <section style={{ paddingTop: 96, paddingBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* persona */}
        <div style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 12 }}>
          Mira Hendriks · 31 · CEO · Veris B.V.
        </div>

        {/* shift badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap justify-center" style={{ maxWidth: 600 }}>
          <ShiftBadge num={shift.num} label={shift.label} />
          {shift.moment && <MomentChip>{shift.moment}</MomentChip>}
        </div>

        {/* Bram caption only on screen 7 */}
        <div style={{ height: 22, marginTop: 4, marginBottom: 8 }}>
          {showBramCaption && (
            <div className="soft-rise" style={{ fontSize: 11, color: '#6B6B6B', textAlign: 'center' }}>
              Bram de Vries · Veris B.V.
            </div>
          )}
        </div>

        {/* Phone */}
        <div key={fadeKey} className="fade-in">
          {screenEl}
        </div>

        {/* nav pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8 justify-center" style={{ maxWidth: 460 }}>
          {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goTo(n)}
              style={{
                width: 36,
                height: 32,
                borderRadius: 16,
                background: activeScreen === n ? '#0A8F6E' : 'white',
                color: activeScreen === n ? 'white' : '#6B6B6B',
                border: activeScreen === n ? '1px solid #0A8F6E' : '1px solid #E2DED8',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 160ms',
              }}
            >
              {n}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 10, color: '#6B6B6B', marginTop: 14, letterSpacing: 0.2 }}>
          1 Agent-ready banking · 2 Company-owned trust layer · 3 Live operating relationship
        </p>
      </section>

      {/* Moment 3 — Editorial bridge */}
      <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: 'center' }}>
        <p className="font-editorial" style={{ fontSize: 36, color: '#1A1A1A', lineHeight: 1.2, maxWidth: 720, margin: '0 auto' }}>
          From here, onboarding becomes operations.
        </p>
      </section>

      {/* Moment 4 — Closing hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 40px',
          paddingTop: 128,
        }}
      >
        <h2 className="font-editorial" style={{
          fontSize: 'clamp(56px, 9vw, 96px)',
          lineHeight: 1.02,
          color: '#1A1A1A',
          letterSpacing: -0.5,
          whiteSpace: 'nowrap',
        }}>
          Banking, beautifully simple.
        </h2>
        <div style={{ marginTop: 96, textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#6B6B6B' }}>
            Concept prototype · Fictional brand · Internal vision demo · 2031
          </p>
          <p style={{ fontSize: 11, color: '#6B6B6B', fontStyle: 'italic', marginTop: 4 }}>
            Designed for a world where companies, wallets and customer-side agents initiate the banking relationship.
          </p>
        </div>
      </section>
    </div>
  );
}

function ShiftBadge({ num, label }) {
  return (
    <div
      className="flex items-center gap-1.5"
      style={{
        background: 'white',
        border: '1px solid #E2DED8',
        borderRadius: 999,
        padding: '5px 12px',
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: 999, background: '#0A8F6E',
        color: 'white', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{num}</span>
      <span style={{ fontSize: 11, color: '#1A1A1A', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function MomentChip({ children }) {
  return (
    <div style={{
      background: '#FFF7ED',
      border: '1px solid #FED7AA',
      borderRadius: 999,
      padding: '5px 10px',
      fontSize: 10.5,
      color: '#7A5A00',
      fontWeight: 500,
    }}>
      {children}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
