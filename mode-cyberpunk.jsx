// Cyberpunk mode (Normal)
const { useState: useStateCp, useEffect: useEffectCp } = React;

function CyberpunkMode({ tweaks }) {
  const P = window.PORTFOLIO;
  const [now, setNow] = useStateCp(new Date());
  useEffectCp(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const ts = now.toISOString().replace('T', ' ').slice(0, 19);

  return (
    <div className="cp mode-root">
      <div className="grid-bg"></div>
      <div className="glow-orb pink"></div>
      <div className="glow-orb cyan"></div>

      <div className="cp-shell">
        <div className="cp-top">
          <div className="logo">AJ<span>//</span>SEC</div>
          <div className="status">
            <div><span className="dot"></span>SYS.ONLINE</div>
            <div>{ts} UTC</div>
            <div>NODE: pa-univ-01</div>
          </div>
        </div>

        <section className="cp-hero">
          <div>
            <div className="tag">SECURITY ENGINEER · BLUE TEAM · SOC</div>
            <h1>
              Aakash<br/>
              <span className="accent">Joshi</span><span style={{color:'var(--cp-pink)'}}>_</span>
            </h1>
            <p className="role-line">{P.tagline} {P.bio}</p>
            <div className="meta">
              <div>LOCATION<b>{P.location}</b></div>
              <div>STATUS<b>Available</b></div>
              <div>FOCUS<b>Detection · IR</b></div>
            </div>
          </div>
          <div className="ascii-frame">
            <pre>{window.ASCII_PORTRAIT}</pre>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="sec">
          <div className="sec-head">
            <h2 data-num="01">selected work</h2>
            <div className="meta">{P.projects.length} ARTIFACTS · 2024 — 2026</div>
          </div>
          <div className="proj-grid">
            {P.projects.map(p => (
              <article className="proj-card" key={p.id}>
                <span className={`sev ${p.severity}`}>{p.severity}</span>
                <div className="pid">
                  <span className="tag">{p.tag}</span>
                  <span className="year">/{p.year}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <div className="stack">
                  {p.stack.map(s => <span key={s}>{s}</span>)}
                </div>
                <span className="arrow">→</span>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="sec">
          <div className="sec-head">
            <h2 data-num="02">capabilities</h2>
            <div className="meta">PROFICIENCY MATRIX</div>
          </div>
          <div className="skills-grid">
            <div>
              {P.skillsLevels.map((s,i) => (
                <div className="skill-bar" key={s.name}>
                  <span className="name">{s.name}</span>
                  <span className="track">
                    <span className="fill" style={{ width: s.level + '%', animationDelay: (i*60) + 'ms' }}></span>
                  </span>
                  <span className="pct">{s.level.toString().padStart(2,'0')}/100</span>
                </div>
              ))}
            </div>
            <div>
              {Object.entries(P.skills).map(([cat, items]) => (
                <div className="skill-cat" key={cat}>
                  <h4>{cat}</h4>
                  <div className="chips">
                    {items.map(it => <span key={it}>{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="sec">
          <div className="sec-head">
            <h2 data-num="03">experience</h2>
            <div className="meta">CHRONO LOG</div>
          </div>
          <div className="timeline">
            {P.experience.map(e => (
              <div className="tl-item" key={e.company}>
                <div className="when">{e.period} · {e.location}</div>
                <h3>{e.role} <b>@ {e.company}</b></h3>
                <ul>{e.bullets.map((b,i) => <li key={i}>{b}</li>)}</ul>
              </div>
            ))}
            {P.education.map(e => (
              <div className="tl-item" key={e.school}>
                <div className="when">{e.period} · {e.location}</div>
                <h3>{e.degree} <b>@ {e.school}</b></h3>
                <ul><li>GPA: {e.gpa}</li></ul>
              </div>
            ))}
          </div>
        </section>

        {/* WRITING */}
        <section className="sec">
          <div className="sec-head">
            <h2 data-num="04">writing</h2>
            <div className="meta">{P.posts.length} ENTRIES · LATEST FIRST</div>
          </div>
          <div className="post-list">
            {P.posts.map(p => (
              <div className="post" key={p.title}>
                <span className="date">{p.date}</span>
                <span className="ptag">{p.tag}</span>
                <span className="title">{p.title}</span>
                <span className="read">{p.read}</span>
                <span className="arr">→</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="sec">
          <div className="sec-head">
            <h2 data-num="05">contact</h2>
            <div className="meta">SECURE CHANNELS OPEN</div>
          </div>
          <div className="contact-grid">
            <h2>Let's talk<br/>about <span className="accent">defense.</span></h2>
            <div className="links">
              <a className="link-row" href={P.links.github} target="_blank">
                <span className="lab">[GIT]</span><span>github.com/Aakash1337</span><span className="arr">→</span>
              </a>
              <a className="link-row" href={P.links.linkedin}>
                <span className="lab">[LIN]</span><span>linkedin · aakash-joshi</span><span className="arr">→</span>
              </a>
              <a className="link-row" href={P.links.email}>
                <span className="lab">[MAIL]</span><span>contact via linkedin</span><span className="arr">→</span>
              </a>
              <a className="link-row" href={P.links.resume} target="_blank">
                <span className="lab">[CV]</span><span>resume.pdf — download</span><span className="arr">↓</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="cp-foot">
          <div>© {now.getFullYear()} aakash joshi · all rights reserved</div>
          <div>build 2026.{(now.getMonth()+1).toString().padStart(2,'0')}.{now.getDate().toString().padStart(2,'0')}</div>
        </footer>
      </div>
    </div>
  );
}

window.CyberpunkMode = CyberpunkMode;
