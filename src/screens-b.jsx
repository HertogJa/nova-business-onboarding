// Screens 6-8: Mira signs, Bram signs, Selected updates

// ---------- SignatureBlock ----------
function SignatureBlock({ who }) {
  return (
    <div className="soft-rise" style={{ background: '#F0F7F4', border: '1px solid rgba(10,143,110,0.35)', borderRadius: 12, padding: 14, marginTop: 14 }}>
      <div className="flex items-center gap-2 mb-2">
        <div style={{ width: 28, height: 28, borderRadius: 999, background: '#0A8F6E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Check size={14} color="white" stroke={3} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#066B52' }}>Signed</div>
      </div>
      <p style={{ fontSize: 12.5, color: '#1A1A1A', lineHeight: 1.5 }}>
        Approved and signed by <span style={{ fontWeight: 600 }}>{who}</span> as authorised representative of Veris B.V.
      </p>
      <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 6 }}>
        Wallet-confirmed identity · qualified electronic signature · mandate version captured
      </p>
      <p style={{ fontSize: 10.5, color: '#0A8F6E', marginTop: 4, lineHeight: 1.4 }}>
        eIDAS 2.0 compliant · timestamp and signed terms captured
      </p>
    </div>
  );
}

// ---------- Screen 6 ----------
function Screen6({ miraSigned, setMiraSigned, setActiveScreen }) {
  const [spinning, setSpinning] = useState(false);
  const [revealContinue, setRevealContinue] = useState(miraSigned);

  useEffect(() => {
    if (miraSigned) {
      const t = setTimeout(() => setRevealContinue(true), 700);
      return () => clearTimeout(t);
    }
    setRevealContinue(false);
  }, [miraSigned]);

  const handleSign = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 320);
    setMiraSigned(true);
  };

  return (
    <NovaScreen
      island={<><IslandIcon kind="spark" /><span>NOVA · Operating model</span></>}
      pct={55}
      step="Step 5 of 10"
      companion="Now we turn that ownership and authority picture into practical rules. You confirm and sign as authorised representative."
    >
      <div className="px-6 flex-1 flex flex-col overflow-y-auto phone-scroll">
        <h1 className="font-editorial mb-1" style={{ fontSize: 22, lineHeight: 1.1 }}>
          How Veris works at NOVA.
        </h1>
        <p style={{ fontSize: 11.5, color: '#6B6B6B', marginBottom: 12, lineHeight: 1.5 }}>
          Suggested by NOVA · confirmed and signed by Mira
        </p>

        <Card>
          <div className="space-y-3">
            <RuleRow
              label="Approvals"
              value="Up to €10,000: Mira or Bram alone · Above €10,000: Mira and Bram together"
            />
            <RuleRow label="Cards" value="Mira ✓ · Bram ✓" />
            <RuleRow label="Accounting" value="Exact Online ready to connect · activates after account opening" />
          </div>
          <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0EDE6' }}>
            Operating permissions stay within Veris' registered legal authority.
          </p>
          <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 6, fontStyle: 'italic' }}>
            Example: €8,500 can be approved alone · €12,000 needs both.
          </p>
        </Card>

        {!miraSigned ? (
          <div style={{ marginTop: 12 }}>
            <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 500, color: '#1A1A1A' }}>Before you sign: </span>
              account terms · fees · data sharing · approval rules · selected company updates
            </p>
          </div>
        ) : (
          <>
            <SignatureBlock who="Mira Hendriks" />
            <p style={{ fontSize: 12, color: '#0A8F6E', fontStyle: 'italic', marginTop: 10, lineHeight: 1.5 }}>
              Done. Now Bram needs to approve on his own device.
            </p>
          </>
        )}
      </div>

      <CtaArea>
        {!miraSigned ? (
          <PrimaryButton onClick={handleSign} icon={
            <span className={spinning ? 'spin-once' : ''} style={{ display: 'inline-flex' }}>
              <Icon.Wallet size={16} color="white" />
            </span>
          }>
            Approve and sign with my wallet
          </PrimaryButton>
        ) : (
          <div style={{
            opacity: revealContinue ? 1 : 0,
            transform: revealContinue ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 360ms ease-out, transform 360ms ease-out',
            pointerEvents: revealContinue ? 'auto' : 'none',
          }}>
            <PrimaryButton onClick={() => setActiveScreen(7)}>Continue</PrimaryButton>
          </div>
        )}
      </CtaArea>
    </NovaScreen>
  );
}

function RuleRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: '#0A8F6E', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</div>
      <div className="flex items-start gap-1.5 mt-1">
        <Icon.Check size={12} color="#0A8F6E" />
        <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{value}</div>
      </div>
    </div>
  );
}

// ---------- Screen 7 (Bram) ----------
function Screen7({ bramSigned, setBramSigned, setActiveScreen }) {
  const [spinning, setSpinning] = useState(false);
  const [revealContinue, setRevealContinue] = useState(bramSigned);

  useEffect(() => {
    if (bramSigned) {
      const t = setTimeout(() => setRevealContinue(true), 700);
      return () => clearTimeout(t);
    }
    setRevealContinue(false);
  }, [bramSigned]);

  const handleSign = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 320);
    setBramSigned(true);
  };

  return (
    <NovaScreen
      island={<><IslandIcon kind="wallet" /><span>Bram · Wallet signing</span></>}
      pct={64}
      step="Step 6 of 10"
      companion="Welcome, Bram. Mira invited you to approve Veris' setup at NOVA. Because you are also authorised for Veris, we need your own wallet approval before Veris can go live."
    >
      <div className="px-6 flex-1 flex flex-col overflow-y-auto phone-scroll">
        <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5, marginBottom: 10 }}>
          Mira has already signed on her device. You sign for yourself with your own wallet.
        </p>

        {/* yellow notification card */}
        <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E2DED8', borderLeft: '4px solid #FFD23F', padding: 14, marginBottom: 12 }}>
          <div className="flex items-center gap-2 mb-1">
            <div style={{ width: 28, height: 28, borderRadius: 999, background: '#FFF3C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#7A5A00' }}>B</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Approval needed</div>
          </div>
          <p style={{ fontSize: 12.5, color: '#1A1A1A', lineHeight: 1.5 }}>
            Mira approved Veris' setup at NOVA. As statutory director and 30% UBO, you need to confirm your own role and sign the setup with your wallet.
          </p>
        </div>

        <Card>
          <div className="space-y-2.5">
            <SummaryRow label="What you're approving" value="Veris business account, cards, approval rules and accounting connection" />
            <SummaryRow label="Your role" value="CTO · statutory director · 30% UBO" />
            <SummaryRow label="Your payment authority" value="Approve payments up to €10,000 alone" />
          </div>
          <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0EDE6' }}>
            <span style={{ fontWeight: 500, color: '#1A1A1A' }}>Before you sign: </span>
            account terms · fees · data sharing · approval rules · selected company updates
          </p>
        </Card>

        <p style={{ fontSize: 11.5, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12 }}>
          NOVA asks your EU Digital Identity Wallet to confirm it's you, confirm your role and capture your qualified electronic signature. Nothing else is shared.
        </p>

        <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 6, fontStyle: 'italic' }}>
          Bram is part of Veris' authority layer: statutory director, 30% UBO and payment approver.
        </p>

        {bramSigned && (
          <>
            <SignatureBlock who="Bram de Vries" />
            <p style={{ fontSize: 12, color: '#0A8F6E', fontStyle: 'italic', marginTop: 10, lineHeight: 1.5 }}>
              Done. Bram has approved. Veris can continue.
            </p>
          </>
        )}
      </div>

      <CtaArea>
        {!bramSigned ? (
          <PrimaryButton onClick={handleSign} icon={
            <span className={spinning ? 'spin-once' : ''} style={{ display: 'inline-flex' }}>
              <Icon.Wallet size={16} color="white" />
            </span>
          }>
            Approve and sign with my wallet
          </PrimaryButton>
        ) : (
          <div style={{
            opacity: revealContinue ? 1 : 0,
            transform: revealContinue ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 360ms ease-out, transform 360ms ease-out',
            pointerEvents: revealContinue ? 'auto' : 'none',
          }}>
            <PrimaryButton onClick={() => setActiveScreen(8)}>Continue</PrimaryButton>
          </div>
        )}
      </CtaArea>
    </NovaScreen>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: '#6B6B6B', fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>{value}</div>
    </div>
  );
}

// ---------- Screen 8 ----------
function Screen8({ bramSigned, selectedUpdatesApproved, setSelectedUpdatesApproved, setActiveScreen }) {
  return (
    <NovaScreen
      island={<><IslandIcon kind="spark" /><span>NOVA · Selected updates</span></>}
      pct={73}
      step="Step 7 of 10"
      companion="Veris is almost ready. To keep your banking setup aligned, choose which important company updates NOVA may receive after activation."
    >
      <div className="px-6 flex-1 flex flex-col">
        <h1 className="font-editorial mb-1" style={{ fontSize: 22, lineHeight: 1.1 }}>
          Keep Veris aligned.
        </h1>
        {bramSigned ? (
          <p style={{ fontSize: 11.5, color: '#0A8F6E', marginBottom: 10, lineHeight: 1.5, fontStyle: 'italic' }}>
            Bram approved just now · Veris is ready for final checks.
          </p>
        ) : (
          <p style={{ fontSize: 11.5, color: '#9A6500', marginBottom: 10, lineHeight: 1.5, fontStyle: 'italic' }}>
            Waiting for Bram's wallet approval.
          </p>
        )}

        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Selected updates Veris can share with NOVA
          </div>
          <div className="space-y-2.5 mt-2">
            <UpdateRow n="1" title="Registered company changes" desc="So NOVA knows when formal company facts change." />
            <UpdateRow n="2" title="Authority changes" desc="So approval rules stay aligned with who may act for Veris." />
            <UpdateRow n="3" title="Account connection status" desc="So services like Exact Online keep working after activation." />
            <UpdateRow n="4" title="Changes that may affect your banking setup" desc="So NOVA can explain what changed and what action is needed." />
          </div>
          <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F0EDE6' }}>
            You can change these permissions later. NOVA only receives updates Veris has allowed.
          </p>
          <div style={{ marginTop: 8 }}>
            <SourceChip>Shared by Veris · controlled by Veris · revocable later</SourceChip>
          </div>
        </Card>

        {selectedUpdatesApproved && (
          <p style={{ fontSize: 12, color: '#0A8F6E', fontStyle: 'italic', marginTop: 12, lineHeight: 1.5 }} className="soft-rise">
            Done. Veris allowed selected updates so NOVA can keep the setup aligned.
          </p>
        )}
      </div>

      <CtaArea>
        {!selectedUpdatesApproved ? (
          <>
            <PrimaryButton
              onClick={() => setSelectedUpdatesApproved(true)}
              disabled={!bramSigned}
            >
              Allow selected updates
            </PrimaryButton>
            <SecondaryLink>Review update permissions</SecondaryLink>
          </>
        ) : (
          <PrimaryButton onClick={() => setActiveScreen(9)}>Continue</PrimaryButton>
        )}
      </CtaArea>
    </NovaScreen>
  );
}

function UpdateRow({ n, title, desc }) {
  return (
    <div className="flex items-start gap-2">
      <div style={{ width: 18, height: 18, borderRadius: 999, background: '#F0F7F4', border: '1px solid rgba(10,143,110,0.3)', color: '#0A8F6E', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        {n}
      </div>
      <div className="flex-1">
        <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.4 }}>{title}</div>
        <div style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.45, marginTop: 1 }}>{desc}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Screen6, Screen7, Screen8 });
