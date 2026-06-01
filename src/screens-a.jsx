// Screens 2-5: Veris arrives → Bank's read → Wallet check → Authority graph

// ---------- Screen 2 ----------
function Screen2({ setActiveScreen }) {
  const [phase, setPhase] = useState(0); // 0=chips, 1=assembled
  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <NovaScreen
      island={<><IslandIcon kind="wallet" /><span>NOVA · Session active</span></>}
      pct={18}
      step="Step 1 of 10"
      companion="Welcome to NOVA, Mira. Veris shared the company details you approved. First we'll check the company, then your role, then the rules."
    >
      <div className="px-6 flex-1 flex flex-col">
        <div className="mb-3">
          <h1 className="font-editorial" style={{ fontSize: 22, lineHeight: 1.1, color: '#1A1A1A' }}>
            This is what NOVA received.
          </h1>
        </div>

        {/* Source chips animate in then dissolve into card */}
        <div
          className="flex flex-wrap gap-1.5 mb-3"
          style={{
            opacity: phase === 0 ? 1 : 0.65,
            transform: phase === 0 ? 'translateY(0)' : 'translateY(-2px)',
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
          }}
        >
          <span className="soft-rise" style={{ animationDelay: '60ms' }}><SourceChip>EU Business Wallet</SourceChip></span>
          <span className="soft-rise" style={{ animationDelay: '180ms' }}><SourceChip>Checked with KvK</SourceChip></span>
          <span className="soft-rise" style={{ animationDelay: '300ms' }}><SourceChip>Veris trust layer</SourceChip></span>
          <span className="soft-rise" style={{ animationDelay: '420ms' }}><SourceChip>Volta investment notice</SourceChip></span>
        </div>

        {/* Consent strip */}
        <div className="flex items-center gap-2 mb-3" style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '8px 12px' }}>
          <Icon.Check size={13} color="#9A6500" />
          <span style={{ fontSize: 11.5, color: '#5C3E00', lineHeight: 1.4 }}>
            You approved this handover: company details, ownership, authority and investor context
          </span>
        </div>

        {/* Company card */}
        <div className={phase === 1 ? 'soft-rise' : ''}>
          <Card>
            <div className="flex items-start gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F0F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon.Building size={20} color="#0A8F6E" />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>Veris B.V.</div>
                <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 2 }}>Dutch B.V. · Healthcare IT</div>
                <div style={{ fontSize: 12, color: '#6B6B6B' }}>KvK 87654321</div>
                <div style={{ fontSize: 12, color: '#1A1A1A', marginTop: 6 }}>Herengracht 182, 1016 BS Amsterdam</div>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0EDE6' }}>
              <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5 }}>
                Correspondence address also received · Ownership and authority details received: <span style={{ color: '#1A1A1A' }}>Mira · Bram · Volta</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5" style={{ marginTop: 10 }}>
              <Icon.Check size={11} color="#0A8F6E" />
              <p style={{ fontSize: 10.5, color: '#0A8F6E', lineHeight: 1.4 }}>
                Via EU Business Wallet · Checked with KvK · Investment notice from Volta Ventures B.V.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <CtaArea>
        <PrimaryButton onClick={() => setActiveScreen(3)}>Yes, this is Veris</PrimaryButton>
        <SecondaryLink>Need to change something</SecondaryLink>
      </CtaArea>
    </NovaScreen>
  );
}

// ---------- Screen 3 ----------
function Screen3({ setActiveScreen }) {
  return (
    <NovaScreen
      island={<><IslandIcon kind="spark" /><span>NOVA · Building your setup</span></>}
      pct={27}
      step="Step 2 of 10"
      companion="Now that we know Veris, we'll suggest a starting setup that fits how Veris operates."
    >
      <div className="px-6 flex-1 flex flex-col">
        <h1 className="font-editorial mb-3" style={{ fontSize: 22, lineHeight: 1.1 }}>
          NOVA's read on Veris.
        </h1>

        <Card>
          <div>
            <div style={{ fontSize: 10.5, color: '#0A8F6E', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>What we picked up</div>
            <ul className="mt-2 space-y-1.5">
              {[
                'Funded healthtech startup',
                'Two founders operate together',
                'European payments and accounting from day one',
                'Investor context received with Mira\'s approval',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ width: 4, height: 4, borderRadius: 999, background: '#0A8F6E', marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #F0EDE6' }}>
            <div style={{ fontSize: 10.5, color: '#0A8F6E', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>Suggested starting setup</div>
            <ul className="mt-2 space-y-1.5">
              {[
                'Business account and European payments',
                'Cards for Mira and Bram',
                'Exact Online connection prepared',
                'Joint approval above €10,000',
                'Credit review option prepared, not started',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icon.Check size={12} color="#0A8F6E" />
                  <span style={{ fontSize: 13, lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 14 }}>
            Based on Veris' company details, confirmed ownership and authority details, and Mira-approved investor context.
          </p>
        </Card>

        <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12 }}>
          <span style={{ color: '#1A1A1A', fontWeight: 500 }}>Note: </span>
          We'll prepare the credit review option — you decide later whether to start it.
        </p>
      </div>

      <CtaArea>
        <PrimaryButton onClick={() => setActiveScreen(4)}>Looks good</PrimaryButton>
        <SecondaryLink>Adjust the setup</SecondaryLink>
      </CtaArea>
    </NovaScreen>
  );
}

// ---------- Screen 4 ----------
function Screen4({ miraWalletApproved, setMiraWalletApproved, setActiveScreen }) {
  return (
    <NovaScreen
      island={<><IslandDot /><span>NOVA · Verifying</span></>}
      pct={36}
      step="Step 3 of 10"
      companion="Before we use your role in the setup, your own wallet confirms it's you."
    >
      <div className="px-6 flex-1 flex flex-col">
        {!miraWalletApproved ? (
          <>
            <h1 className="font-editorial mb-3" style={{ fontSize: 22, lineHeight: 1.1 }}>
              One quick identity check.
            </h1>
            <Card>
              <div className="flex items-center gap-2 mb-2.5">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F0F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon.Wallet size={18} color="#0A8F6E" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Approve wallet check</div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: '#1A1A1A' }}>
                NOVA asks your EU Digital Identity Wallet to confirm:
              </p>
              <ul className="mt-2 space-y-1">
                {['it\'s you', 'your role at Veris', 'that you may act for Veris in this setup'].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ width: 4, height: 4, borderRadius: 999, background: '#0A8F6E', marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, lineHeight: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12.5, color: '#1A1A1A', marginTop: 10 }}>Nothing else is shared.</p>
              <div className="mt-3"><SourceChip>Via your EU Digital Identity Wallet</SourceChip></div>
            </Card>
          </>
        ) : (
          <>
            <h1 className="font-editorial mb-3" style={{ fontSize: 22, lineHeight: 1.1 }}>
              Done. Your wallet confirmed it's you.
            </h1>
            <Card>
              <div className="flex items-center gap-3 soft-rise">
                <div className="relative">
                  <div style={{ width: 52, height: 52, borderRadius: 999, border: '3px solid #0A8F6E', background: '#F0F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 600, color: '#0A8F6E' }}>M</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderRadius: 999, background: '#0A8F6E', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                    <Icon.Check size={11} color="white" stroke={3} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Mira Hendriks</div>
                  <div style={{ fontSize: 12, color: '#6B6B6B' }}>CEO · statutory director · Veris B.V.</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: '#1A1A1A', marginTop: 12 }}>
                Done. Your wallet confirmed it's you.
              </p>
              <div className="mt-2"><SourceChip>Via your EU Digital Identity Wallet — quick and safe</SourceChip></div>
              <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5, marginTop: 10 }}>
                Your role is matched with Veris' confirmed authority details.
              </p>
            </Card>
          </>
        )}
      </div>

      <CtaArea>
        {!miraWalletApproved ? (
          <>
            <PrimaryButton onClick={() => setMiraWalletApproved(true)} icon={<Icon.Wallet size={16} color="white" />}>
              Approve wallet check
            </PrimaryButton>
            <SecondaryLink>Trouble verifying?</SecondaryLink>
          </>
        ) : (
          <PrimaryButton onClick={() => setActiveScreen(5)}>Continue</PrimaryButton>
        )}
      </CtaArea>
    </NovaScreen>
  );
}

// ---------- Screen 5: Authority Graph ----------
function Screen5({ bramSigned, selectedGraphNode, setSelectedGraphNode, setActiveScreen }) {
  // graph layout (within ~330x340 viewBox)
  const CX = 165, CY = 155;
  const M = { x: 52, y: 62 };    // Mira top-left
  const B = { x: 278, y: 62 };   // Bram top-right
  const V = { x: 165, y: 252 };  // Volta bottom-center

  const pulse = (n) => {
    switch (n) {
      case 0: return 'pulse-a';
      case 1: return 'pulse-b';
      case 2: return 'pulse-c';
      default: return '';
    }
  };

  const detail = (() => {
    switch (selectedGraphNode) {
      case 'mira':
        return {
          title: 'Mira Hendriks · CEO · statutory director · 55% · UBO',
          source: 'Veris company trust layer · checked with KvK director data',
          body: 'She has operating permissions within Veris\' registered legal authority.',
        };
      case 'bram':
        return {
          title: 'Bram de Vries · CTO · statutory director · 30% · UBO',
          source: 'Veris company trust layer · checked with KvK director data',
          body: bramSigned
            ? 'Wallet approval and signature confirmed.'
            : 'Own wallet approval still needed before Veris can go live.',
        };
      case 'volta':
        return {
          title: 'Volta Ventures B.V. · 15% institutional shareholder',
          source: 'Mira-approved investment notice from Volta Ventures B.V.',
          body: 'Investor context only · no operating permissions.',
        };
      case 'veris':
        return {
          title: 'Veris B.V. company trust layer',
          source: 'Combines company facts, ownership, UBO status and operating permissions.',
          body: 'Shared by Veris after Mira approved the handover.',
        };
      case 'approvalLine':
        return {
          title: 'Approval rule',
          source: null,
          body: (
            <>
              <div>Up to €10,000: Mira or Bram alone.</div>
              <div>Above €10,000: Mira and Bram together.</div>
              <div style={{ marginTop: 4 }}>Operating permissions stay within Veris' registered legal authority.</div>
            </>
          ),
        };
      default:
        return null;
    }
  })();

  return (
    <NovaScreen
      island={<><IslandIcon kind="spark" /><span>NOVA · Veris authority graph</span></>}
      pct={45}
      step="Step 4 of 10"
      companion="We've matched Veris' company details, ownership and roles. Here is how Veris is owned and operated."
    >
      <div className="px-6 flex-1 flex flex-col">
        <h1 className="font-editorial" style={{ fontSize: 28, lineHeight: 1.05, color: '#1A1A1A' }}>
          This is how Veris is owned and operated.
        </h1>
        <p style={{ fontSize: 11.5, color: '#6B6B6B', marginTop: 6, lineHeight: 1.5 }}>
          Built from Veris' shared company details, KvK check, UBO details and Volta investment notice.
        </p>

        {/* Graph */}
        <div className="mt-3" style={{ position: 'relative', height: 340 }}>
          <svg width="100%" height="100%" viewBox="0 0 330 340" style={{ overflow: 'visible' }}>
            {/* Outer rings */}
            <circle cx={CX} cy={CY} r="125" fill="none" stroke="#E2DED8" strokeDasharray="2 4" />
            <circle cx={CX} cy={CY} r="82" fill="none" stroke="#E2DED8" strokeDasharray="2 4" />

            {/* Lines */}
            {/* Mira <-> Veris */}
            <line x1={M.x} y1={M.y} x2={CX} y2={CY} stroke="#0A8F6E" strokeWidth="1.5" className={pulse(0)} />
            {/* Bram <-> Veris */}
            <line x1={B.x} y1={B.y} x2={CX} y2={CY} stroke={bramSigned ? '#0A8F6E' : '#C8AE5E'} strokeWidth="1.5" className={pulse(1)} />
            {/* Volta <-> Veris */}
            <line x1={V.x} y1={V.y} x2={CX} y2={CY} stroke="#B8B5AE" strokeWidth="1.5" strokeDasharray="3 3" className={pulse(2)} />

            {/* Mira <-> Bram approval line, tappable */}
            <line
              x1={M.x} y1={M.y} x2={B.x} y2={B.y}
              stroke={selectedGraphNode === 'approvalLine' ? '#0A8F6E' : 'rgba(10,143,110,0.45)'}
              strokeWidth={selectedGraphNode === 'approvalLine' ? 2 : 1.2}
              strokeDasharray="4 3"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedGraphNode(selectedGraphNode === 'approvalLine' ? null : 'approvalLine')}
            />
            {/* invisible wider hit target */}
            <line
              x1={M.x} y1={M.y} x2={B.x} y2={B.y}
              stroke="transparent" strokeWidth="14"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedGraphNode(selectedGraphNode === 'approvalLine' ? null : 'approvalLine')}
            />
            {/* glow midpoint */}
            <circle cx={(M.x + B.x) / 2} cy={(M.y + B.y) / 2} r="4" fill="#0A8F6E" opacity={selectedGraphNode === 'approvalLine' ? 0.85 : 0.35} />
          </svg>

          {/* Nodes (absolute positioned on top of svg) */}
          <GraphNode
            x={M.x} y={M.y} letter="M" name="Mira Hendriks"
            sub="55% · CEO · UBO" status="Confirmed"
            ringColor="#0A8F6E"
            active={selectedGraphNode === 'mira'}
            onClick={() => setSelectedGraphNode(selectedGraphNode === 'mira' ? null : 'mira')}
          />
          <GraphNode
            x={B.x} y={B.y} letter="B" name="Bram de Vries"
            sub="30% · CTO · UBO"
            status={bramSigned ? 'Confirmed' : 'Approval pending'}
            ringColor={bramSigned ? '#0A8F6E' : '#E0AC2E'}
            active={selectedGraphNode === 'bram'}
            onClick={() => setSelectedGraphNode(selectedGraphNode === 'bram' ? null : 'bram')}
          />
          <GraphNode
            x={V.x} y={V.y} letter={<Icon.Building size={20} color="#6B6B6B" />} name="Volta Ventures B.V."
            sub="15% · institutional shareholder"
            status="No operating permissions"
            ringColor="#B8B5AE"
            active={selectedGraphNode === 'volta'}
            onClick={() => setSelectedGraphNode(selectedGraphNode === 'volta' ? null : 'volta')}
          />

          {/* Center: Veris node */}
          <div
            onClick={() => setSelectedGraphNode(selectedGraphNode === 'veris' ? null : 'veris')}
            style={{
              position: 'absolute', left: CX - 38, top: CY - 38,
              width: 76, height: 76, borderRadius: 999,
              background: '#0A8F6E',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer',
              boxShadow: selectedGraphNode === 'veris' ? '0 0 0 4px rgba(10,143,110,0.18)' : '0 4px 12px rgba(10,143,110,0.3)',
              transition: 'box-shadow 200ms',
            }}
          >
            <Icon.Building size={18} color="white" />
            <span style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>Veris B.V.</span>
            <span style={{ fontSize: 8, opacity: 0.8 }}>trust layer</span>
          </div>
        </div>

        {/* Two-tier legend */}
        <div className="flex items-center justify-between" style={{ marginTop: 6, marginBottom: 6 }}>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 14, height: 0, borderTop: '1.5px dashed #6B6B6B', display: 'inline-block' }} />
            <span style={{ fontSize: 9.5, color: '#6B6B6B' }}>Legal authority — register-backed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ width: 14, height: 0, borderTop: '1.5px dashed #0A8F6E', display: 'inline-block' }} />
            <span style={{ fontSize: 9.5, color: '#0A8F6E' }}>Operating permissions — set by Veris</span>
          </div>
        </div>

        {/* Detail card OR default approval text */}
        {detail ? (
          <div className="soft-rise" style={{ background: '#F0F7F4', border: '1px solid rgba(10,143,110,0.3)', borderRadius: 12, padding: 12, marginTop: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#066B52', lineHeight: 1.35 }}>{detail.title}</div>
            {detail.source && (
              <div style={{ fontSize: 10.5, color: '#0A8F6E', marginTop: 4, lineHeight: 1.4 }}>{detail.source}</div>
            )}
            <div style={{ fontSize: 12, color: '#1A1A1A', marginTop: 6, lineHeight: 1.5 }}>{detail.body}</div>
          </div>
        ) : (
          <div style={{ marginTop: 4 }}>
            <p style={{ fontSize: 11.5, color: '#1A1A1A', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 500 }}>Up to €10,000:</span> Mira or Bram alone · <span style={{ fontWeight: 500 }}>Above €10,000:</span> Mira and Bram together
            </p>
            <p style={{ fontSize: 10.5, color: '#6B6B6B', marginTop: 4, lineHeight: 1.4 }}>
              Operating permissions stay within Veris' registered legal authority. Tap any node or the dotted line.
            </p>
          </div>
        )}
      </div>

      <CtaArea>
        <PrimaryButton onClick={() => setActiveScreen(6)}>Yes, this is right</PrimaryButton>
        <SecondaryLink>This structure has changed</SecondaryLink>
      </CtaArea>
    </NovaScreen>
  );
}

function GraphNode({ x, y, letter, name, sub, status, ringColor, active, onClick }) {
  const size = 50;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size, height: size,
        borderRadius: 999,
        background: 'white',
        border: `3px solid ${ringColor}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#1A1A1A',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer',
        boxShadow: active ? `0 0 0 4px ${ringColor}22` : '0 2px 6px rgba(0,0,0,0.08)',
        transition: 'box-shadow 200ms',
      }}
    >
      {typeof letter === 'string' ? letter : letter}
      {/* label below */}
      <div style={{
        position: 'absolute',
        top: size + 4,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#1A1A1A' }}>{name}</div>
        <div style={{ fontSize: 9, color: '#6B6B6B', marginTop: 1 }}>{sub}</div>
        <div style={{ fontSize: 9, color: ringColor === '#E0AC2E' ? '#9A6500' : ringColor === '#B8B5AE' ? '#6B6B6B' : '#0A8F6E', marginTop: 1, fontWeight: 500 }}>
          {status}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen2, Screen3, Screen4, Screen5 });
