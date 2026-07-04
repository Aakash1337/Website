// Retro CRT mode (read-only auto-typed pages)
const { useState: useStateR, useEffect: useEffectR, useRef: useRefR } = React;

function RetroMode({ tweaks }) {
  const P = window.PORTFOLIO;
  const [page, setPage] = useStateR(0);
  const [now, setNow] = useStateR(new Date());

  useEffectR(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const pages = [
    {
      title: "WHOAMI",
      content: () => (
        <>
          <pre className="ascii-art">{window.ASCII_PORTRAIT}</pre>
          <h1 className="banner">AAKASH JOSHI</h1>
          <div className="sub">// {P.role} — {P.location}</div>
          <div className="crt-page">
            <span className="div">════════════════════════════════════════════════</span>{"\n\n"}
            {P.bio}{"\n\n"}
            <span className="key">&gt; tagline:</span> <b>{P.tagline}</b>{"\n\n"}
            <span className="div">════════════════════════════════════════════════</span>{"\n"}
            <span className="key">&gt; status   :</span> <b>AVAILABLE FOR HIRE</b>{"\n"}
            <span className="key">&gt; clearance:</span> PUBLIC{"\n"}
            <span className="key">&gt; node     :</span> pa-univ-01.tgm{"\n"}
          </div>
        </>
      )
    },
    {
      title: "PROJECTS.LST",
      content: () => (
        <div className="crt-page">
          <h1 className="banner" style={{fontSize:'48px'}}>// PROJECTS.LST</h1>
          <div className="sub">{P.projects.length} entries — sorted by recency</div>
          <span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          {P.projects.map((p, i) => (
            <React.Fragment key={p.id}>
              [<b>{(i+1).toString().padStart(2,'0')}</b>] <b>{p.name}</b>  <span className="key">{p.tag} /{p.year}</span>{"\n"}
              {"     "}{p.summary}{"\n"}
              {"     "}<span className="key">stack:</span> {p.stack.join(" · ")}{"\n\n"}
            </React.Fragment>
          ))}
        </div>
      )
    },
    {
      title: "SKILLS.MTX",
      content: () => (
        <div className="crt-page">
          <h1 className="banner" style={{fontSize:'48px'}}>// SKILLS.MTX</h1>
          <div className="sub">proficiency matrix · auto-generated</div>
          <span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          {P.skillsLevels.map(s => {
            const filled = Math.round(s.level / 5);
            const bar = "█".repeat(filled) + "░".repeat(20 - filled);
            return (
              <div key={s.name} className="sk-line">
                <span className="rk-n" style={{display:'inline-block', width:'220px'}}>{s.name}</span>
                <span style={{color:'var(--r-fg)'}}>[{bar}]</span> <b>{s.level}%</b>
              </div>
            );
          })}
          {"\n"}<span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          {Object.entries(P.skills).map(([cat, items]) => (
            <div key={cat}>
              <span className="key">[{cat}]</span> {items.join(" · ")}{"\n\n"}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "HISTORY.LOG",
      content: () => (
        <div className="crt-page">
          <h1 className="banner" style={{fontSize:'48px'}}>// HISTORY.LOG</h1>
          <div className="sub">experience · education · certifications</div>
          <span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          <span className="key">[ EXPERIENCE ]</span>{"\n\n"}
          {P.experience.map(e => (
            <React.Fragment key={e.company}>
              <b>{e.period}</b>  {e.role} @ <b>{e.company}</b>{"\n"}
              {e.bullets.map((b,i) => <div key={i}>  ▶ {b}</div>)}
              {"\n"}
            </React.Fragment>
          ))}
          <span className="key">[ EDUCATION ]</span>{"\n\n"}
          {P.education.map(e => (
            <div key={e.school}>
              <b>{e.period}</b>  {e.degree}{"\n"}
              {"  "}@ {e.school} — GPA {e.gpa}{"\n\n"}
            </div>
          ))}
          <span className="key">[ CERTIFICATIONS ]</span>{"\n\n"}
          {P.certs.map(c => <div key={c.name}>  ✓ {c.name} <span className="key">[{c.status}]</span></div>)}
        </div>
      )
    },
    {
      title: "POSTS.IDX",
      content: () => (
        <div className="crt-page">
          <h1 className="banner" style={{fontSize:'48px'}}>// POSTS.IDX</h1>
          <div className="sub">{P.posts.length} entries — write-ups & notes</div>
          <span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          {P.posts.map((p, i) => (
            <div key={p.title}>
              [<b>{(i+1).toString().padStart(2,'0')}</b>]  <span className="key">{p.date}</span>  <b>{p.title}</b>{"\n"}
              {"      "}<span className="key">tag:</span> {p.tag}  <span className="key">read:</span> {p.read}{"\n\n"}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "CONTACT.SH",
      content: () => (
        <div className="crt-page">
          <h1 className="banner" style={{fontSize:'48px'}}>// CONTACT.SH</h1>
          <div className="sub">secure channels open</div>
          <span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          <span className="key">$ cat ./channels</span>{"\n\n"}
          <b>github</b>    →  github.com/Aakash1337{"\n"}
          <b>linkedin</b>  →  linkedin · aakash-joshi{"\n"}
          <b>email</b>     →  via linkedin{"\n"}
          <b>resume</b>    →  ./resume.pdf  [<a href={P.links.resume} target="_blank" style={{textDecoration:'underline'}}>download</a>]{"\n\n"}
          <span className="div">════════════════════════════════════════════════════════════════</span>{"\n\n"}
          <span className="key">$ echo "thanks for reading"</span>{"\n"}
          thanks for reading.{"\n\n"}
          <span className="cursor"></span>
        </div>
      )
    }
  ];

  // Keyboard nav
  useEffectR(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setPage(p => Math.min(pages.length - 1, p + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setPage(p => Math.max(0, p - 1));
      } else if (e.key >= '1' && e.key <= String(pages.length)) {
        setPage(parseInt(e.key) - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const themeClass = tweaks.retroColor || 'amber';

  return (
    <div className={`retro mode-root ${themeClass}`}>
      <div className="crt-screen crt-jitter">
        <div className="crt-head">
          <span className="marquee">TGM-OS v4.2 // {pages[page].title}</span>
          <span className="ts">{now.toISOString().slice(0,19).replace('T',' ')}</span>
        </div>
        {pages[page].content()}
      </div>

      <div className="crt-pager">
        <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page === 0}>◀ PREV</button>
        <span className="pageno">{(page+1).toString().padStart(2,'0')} / {pages.length.toString().padStart(2,'0')}</span>
        <button onClick={() => setPage(p => Math.min(pages.length-1, p+1))} disabled={page === pages.length - 1}>NEXT ▶</button>
        <span className="keys" style={{opacity:.6,fontSize:'13px',marginLeft:'12px'}}>[← / →] [1-{pages.length}]</span>
      </div>
    </div>
  );
}

window.RetroMode = RetroMode;
