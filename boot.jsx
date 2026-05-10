// Boot sequence component
const { useState, useEffect, useRef } = React;

function BootSequence({ onDone, mode }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    const seq = [
      { t: 0,    text: "TGM-OS BIOS v4.2.1 — initializing..." },
      { t: 120,  text: "Memory check: 32768K OK" },
      { t: 200,  text: "Detecting devices: [keyboard] [display] [network]" },
      { t: 320,  text: "Loading kernel modules........... [OK]" },
      { t: 440,  text: "Mounting /dev/sda1 on /          [OK]" },
      { t: 540,  text: "Starting tgm-portfolio.service   [OK]" },
      { t: 640,  text: "" },
      { t: 700,  text: "  ┌──────────────────────────────────────────────┐" },
      { t: 760,  text: "  │  AAKASH JOSHI // SECURITY ENGINEER           │" },
      { t: 820,  text: "  │  classified: PUBLIC                          │" },
      { t: 880,  text: "  └──────────────────────────────────────────────┘" },
      { t: 940,  text: "" },
      { t: 1000, text: "Establishing secure session...   [████████████] 100%" },
      { t: 1120, text: "Decrypting payload...            [████████████] 100%" },
      { t: 1240, text: "Authenticating identity........  [SIGNED]" },
      { t: 1360, text: "" },
      { t: 1440, text: "Welcome, operator." },
      { t: 1500, text: "Loading interface..." }
    ];

    seq.forEach(({ t, text }) => {
      setTimeout(() => {
        if (cancelRef.current) return;
        setLines(L => [...L, text]);
      }, t);
    });

    const finishT = setTimeout(() => {
      if (!cancelRef.current) {
        setDone(true);
        setTimeout(onDone, 280);
      }
    }, 1850);

    return () => { cancelRef.current = true; clearTimeout(finishT); };
  }, []);

  const skip = () => { cancelRef.current = true; onDone(); };

  return (
    <div className="boot" style={{ opacity: done ? 0 : 1, transition: 'opacity .3s' }}>
      <pre>
        {lines.map((l, i) => <div key={i} className="boot-line">{l}</div>)}
        {!done && <div className="boot-line"><span className="boot-cursor">█</span></div>}
      </pre>
      <button className="boot-skip" onClick={skip}>SKIP ▶</button>
    </div>
  );
}

window.BootSequence = BootSequence;
