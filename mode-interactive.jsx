// Interactive cybersecurity HUD with full terminal
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH, useCallback: useCallbackH } = React;

function MatrixRain({ onClose }) {
  const ref = useRefH(null);
  useEffectH(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    let raf;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    const cols = Math.floor(cv.width / 14);
    const drops = Array(cols).fill(0).map(() => Math.random() * cv.height);
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,.08)';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#00ff88';
      ctx.font = '14px monospace';
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, drops[i]);
        if (drops[i] > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 18;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
    };
  }, []);
  return (
    <div className="matrix-rain">
      <canvas ref={ref}></canvas>
      <button className="esc" onClick={onClose}>ESC ▶ EXIT</button>
    </div>
  );
}

function HudMode({ tweaks }) {
  const P = window.PORTFOLIO;
  const [now, setNow] = useStateH(new Date());
  const [history, setHistory] = useStateH([]);
  const [cwd, setCwd] = useStateH('~');
  const [input, setInput] = useStateH('');
  const [cmdHist, setCmdHist] = useStateH([]);
  const [histIdx, setHistIdx] = useStateH(-1);
  const [matrix, setMatrix] = useStateH(false);
  const [feed, setFeed] = useStateH([]);
  const termRef = useRefH(null);
  const inputRef = useRefH(null);

  useEffectH(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  // initial banner
  useEffectH(() => {
    const banner = [
      { type: 'ascii', content: window.ASCII_PORTRAIT },
      { type: 'fg', content: '' },
      { type: 'fg', content: 'AAKASH JOSHI // Security Engineer' },
      { type: 'out', content: 'TGM-Shell v4.2.1 — interactive portfolio session' },
      { type: 'out', content: 'session-id: ' + Math.random().toString(36).slice(2,10) + ' · auth: PUBLIC' },
      { type: 'out', content: '' },
      { type: 'ok', content: '[+] secure channel established' },
      { type: 'ok', content: '[+] all systems nominal' },
      { type: 'out', content: '' },
      { type: 'fg', content: 'Type `help` for available commands. Try `whoami`, `projects`, `skills`, or `matrix`.' },
      { type: 'out', content: '' },
    ];
    setHistory(banner);
  }, []);

  // threat-feed simulator
  useEffectH(() => {
    const seed = [
      { sev: 'INFO', msg: 'Heartbeat OK — splunk-idx-01' },
      { sev: 'LOW',  msg: 'Outbound SSH key rotated — host srv-04' },
      { sev: 'MED',  msg: 'Auth burst: 14 failed kerb req — DC01' },
      { sev: 'INFO', msg: 'Sysmon ID 1: powershell.exe spawned' },
      { sev: 'HIGH', msg: 'Beaconing detected — 192.168.4.21' },
      { sev: 'LOW',  msg: 'New SPN registered — svc_backup' },
      { sev: 'MED',  msg: 'GPO modified — Default Domain Policy' },
      { sev: 'INFO', msg: 'Honeypot poll cycle complete' },
      { sev: 'HIGH', msg: 'LSASS read attempt — quarantined' },
      { sev: 'LOW',  msg: 'EDR signature update v2026.04.21' },
    ];
    let i = 0;
    const tick = () => {
      const t = new Date();
      const ts = t.toTimeString().slice(0,8);
      setFeed(f => [{ t: ts, ...seed[i % seed.length] }, ...f].slice(0, 18));
      i++;
    };
    tick(); tick(); tick(); tick();
    const iv = setInterval(tick, 3500);
    return () => clearInterval(iv);
  }, []);

  // autoscroll
  useEffectH(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [history]);

  // focus
  useEffectH(() => {
    const focus = () => inputRef.current && inputRef.current.focus();
    focus();
    document.addEventListener('click', focus);
    return () => document.removeEventListener('click', focus);
  }, []);

  const print = (lines) => {
    const arr = Array.isArray(lines) ? lines : [lines];
    setHistory(h => [...h, ...arr]);
  };

  const COMMANDS = {
    help: () => print([
      { type: 'fg', content: 'AVAILABLE COMMANDS' },
      { type: 'out', content: '─────────────────────────────────────────────' },
      { type: 'out', content: '  help              show this menu' },
      { type: 'out', content: '  whoami            display operator profile' },
      { type: 'out', content: '  about             same as whoami' },
      { type: 'out', content: '  ls [dir]          list contents of current dir' },
      { type: 'out', content: '  cd <dir>          change directory' },
      { type: 'out', content: '  cat <file>        print file contents' },
      { type: 'out', content: '  pwd               print working directory' },
      { type: 'out', content: '  projects          list projects (open with: open <id>)' },
      { type: 'out', content: '  open <id>         open project details' },
      { type: 'out', content: '  skills            display proficiency chart' },
      { type: 'out', content: '  experience        career & education timeline' },
      { type: 'out', content: '  posts             list blog posts' },
      { type: 'out', content: '  contact / mail    show contact info' },
      { type: 'out', content: '  resume            download resume.pdf' },
      { type: 'out', content: '  theme <name>      switch theme: cyber|amber|green|cyan' },
      { type: 'out', content: '  mode <name>       switch mode: normal|terminal|interactive' },
      { type: 'out', content: '  date              print current timestamp' },
      { type: 'out', content: '  echo <msg>        echo message' },
      { type: 'out', content: '  history           command history' },
      { type: 'out', content: '  clear             clear the screen' },
      { type: 'out', content: '─────────────────────────────────────────────' },
      { type: 'fg', content: 'EASTER EGGS' },
      { type: 'out', content: '  matrix · hack · sudo · uptime · fortune · coffee' },
    ]),

    whoami: () => print([
      { type: 'ascii', content: window.ASCII_PORTRAIT },
      { type: 'fg', content: '' },
      { type: 'fg', content: 'aakash@tgm:~$ identity' },
      { type: 'out', content: '─────────────────────────────────────────────' },
      { type: 'out', content: 'name      : ' + P.name },
      { type: 'out', content: 'role      : ' + P.role },
      { type: 'out', content: 'location  : ' + P.location },
      { type: 'out', content: 'tagline   : ' + P.tagline },
      { type: 'out', content: '' },
      { type: 'fg', content: P.bio },
    ]),

    about: () => COMMANDS.whoami(),

    pwd: () => print({ type: 'out', content: '/home/aakash/' + (cwd === '~' ? '' : cwd) }),

    ls: (args) => {
      const dir = (args[0] || cwd).replace('~', '');
      if (!dir || dir === '~' || dir === '/' || dir === 'home') {
        print([
          { type: 'fg', content: 'drwxr-xr-x  projects/' },
          { type: 'fg', content: 'drwxr-xr-x  posts/' },
          { type: 'fg', content: 'drwxr-xr-x  experience/' },
          { type: 'out', content: '-rw-r--r--  about.txt' },
          { type: 'out', content: '-rw-r--r--  skills.txt' },
          { type: 'out', content: '-rw-r--r--  contact.txt' },
          { type: 'out', content: '-rw-r--r--  resume.pdf' },
        ]);
      } else if (dir === 'projects') {
        print(P.projects.map(p => ({ type: 'fg', content: '-rw-r--r--  ' + p.id + '.md  ' + p.tag })));
      } else if (dir === 'posts') {
        print(P.posts.map((p,i) => ({ type: 'fg', content: '-rw-r--r--  post-' + (i+1).toString().padStart(2,'0') + '.md  [' + p.tag + ']' })));
      } else if (dir === 'experience') {
        print(P.experience.map(e => ({ type: 'fg', content: '-rw-r--r--  ' + e.company.toLowerCase().replace(/\s+/g,'-') + '.md' })));
      } else {
        print({ type: 'err', content: 'ls: cannot access \'' + dir + '\': No such directory' });
      }
    },

    cd: (args) => {
      const t = args[0];
      if (!t || t === '~' || t === '/' || t === '..') { setCwd('~'); return; }
      if (['projects', 'posts', 'experience'].includes(t)) { setCwd(t); return; }
      print({ type: 'err', content: 'cd: ' + t + ': No such directory' });
    },

    cat: (args) => {
      const f = (args[0] || '').replace('./','');
      if (f === 'about.txt') { COMMANDS.whoami(); return; }
      if (f === 'skills.txt') { COMMANDS.skills(); return; }
      if (f === 'contact.txt') { COMMANDS.contact(); return; }
      if (f === 'resume.pdf') { print({ type: 'warn', content: 'Binary file. Use `resume` to download.' }); return; }
      const proj = P.projects.find(p => f === p.id + '.md' || f === p.id);
      if (proj) { COMMANDS.open([proj.id]); return; }
      print({ type: 'err', content: 'cat: ' + f + ': No such file' });
    },

    projects: () => print([
      { type: 'fg', content: 'PROJECTS — ' + P.projects.length + ' entries' },
      { type: 'out', content: '─────────────────────────────────────────────' },
      ...P.projects.flatMap(p => [
        { type: 'fg', content: '[' + p.id + ']  ' + p.name + '  ' + p.tag + ' /' + p.year },
        { type: 'out', content: '   ' + p.summary },
        { type: 'out', content: '   stack: ' + p.stack.join(' · ') },
        { type: 'out', content: '' },
      ]),
      { type: 'fg', content: 'Tip: `open <id>` for full details.' },
    ]),

    open: (args) => {
      const id = args[0];
      const p = P.projects.find(x => x.id === id);
      if (!p) { print({ type: 'err', content: 'open: project not found: ' + (id || '<empty>') }); return; }
      print([
        { type: 'fg', content: '╔═══ ' + p.name.toUpperCase() + ' ' + '═'.repeat(Math.max(2, 40 - p.name.length)) },
        { type: 'out', content: '  ' + p.tag + '  /' + p.year + '  severity: ' + p.severity },
        { type: 'out', content: '' },
        { type: 'fg', content: '  ' + p.summary },
        { type: 'out', content: '' },
        { type: 'out', content: '  ' + p.details },
        { type: 'out', content: '' },
        { type: 'out', content: '  stack: ' + p.stack.join(' · ') },
        { type: 'fg', content: '╚' + '═'.repeat(50) },
      ]);
    },

    skills: () => {
      const lines = [
        { type: 'fg', content: 'PROFICIENCY MATRIX' },
        { type: 'out', content: '─────────────────────────────────────────────' },
      ];
      P.skillsLevels.forEach(s => {
        const fill = Math.round(s.level / 5);
        const bar = '█'.repeat(fill) + '░'.repeat(20 - fill);
        lines.push({ type: 'out', content: s.name.padEnd(22) + '[' + bar + '] ' + s.level + '%' });
      });
      lines.push({ type: 'out', content: '─────────────────────────────────────────────' });
      Object.entries(P.skills).forEach(([cat, items]) => {
        lines.push({ type: 'fg', content: '[' + cat + ']' });
        lines.push({ type: 'out', content: '  ' + items.join(' · ') });
      });
      print(lines);
    },

    experience: () => {
      const lines = [
        { type: 'fg', content: 'EXPERIENCE & EDUCATION' },
        { type: 'out', content: '─────────────────────────────────────────────' },
      ];
      P.experience.forEach(e => {
        lines.push({ type: 'fg', content: e.period + '  ' + e.role + ' @ ' + e.company });
        e.bullets.forEach(b => lines.push({ type: 'out', content: '  ▶ ' + b }));
        lines.push({ type: 'out', content: '' });
      });
      lines.push({ type: 'fg', content: '[ EDUCATION ]' });
      P.education.forEach(e => {
        lines.push({ type: 'out', content: e.period + '  ' + e.degree });
        lines.push({ type: 'out', content: '  @ ' + e.school + ' — GPA ' + e.gpa });
      });
      lines.push({ type: 'out', content: '' });
      lines.push({ type: 'fg', content: '[ CERTIFICATIONS ]' });
      P.certs.forEach(c => lines.push({ type: 'out', content: '  ✓ ' + c.name + '  [' + c.status + ']' }));
      print(lines);
    },

    posts: () => print([
      { type: 'fg', content: 'BLOG POSTS — ' + P.posts.length + ' entries' },
      { type: 'out', content: '─────────────────────────────────────────────' },
      ...P.posts.flatMap((p,i) => [
        { type: 'fg', content: '[' + (i+1).toString().padStart(2,'0') + ']  ' + p.title },
        { type: 'out', content: '     ' + p.date + '  · [' + p.tag + ']  · ' + p.read },
      ]),
    ]),

    contact: () => print([
      { type: 'fg', content: 'CONTACT — secure channels open' },
      { type: 'out', content: '─────────────────────────────────────────────' },
      { type: 'out', content: '  github    →  github.com/Aakash1337' },
      { type: 'out', content: '  linkedin  →  via linkedin search' },
      { type: 'out', content: '  email     →  contact via linkedin' },
      { type: 'out', content: '  resume    →  ./resume.pdf  (run `resume` to download)' },
    ]),

    mail: () => COMMANDS.contact(),

    resume: () => {
      print({ type: 'ok', content: '[+] opening resume.pdf in new tab...' });
      window.open(P.links.resume, '_blank');
    },

    theme: (args) => {
      const t = args[0];
      const valid = ['cyber','amber','green','cyan','blue'];
      if (!valid.includes(t)) {
        print({ type: 'err', content: 'theme: usage: theme <' + valid.join('|') + '>' });
        return;
      }
      window.parent.postMessage({type: '__edit_mode_set_keys', edits: { themeColor: t }}, '*');
      window.dispatchEvent(new CustomEvent('tweak-set', { detail: { themeColor: t }}));
      print({ type: 'ok', content: '[+] theme set to ' + t });
    },

    mode: (args) => {
      const t = args[0];
      const map = { normal: 'cyber', terminal: 'retro', interactive: 'hud', cyber: 'cyber', retro: 'retro', hud: 'hud' };
      if (!map[t]) { print({ type: 'err', content: 'mode: usage: mode <normal|terminal|interactive>' }); return; }
      window.dispatchEvent(new CustomEvent('switch-mode', { detail: map[t] }));
    },

    date: () => print({ type: 'out', content: now.toString() }),
    echo: (args) => print({ type: 'out', content: args.join(' ') }),
    history: () => print(cmdHist.map((c,i) => ({ type: 'out', content: '  ' + (i+1).toString().padStart(3,' ') + '  ' + c }))),

    clear: () => setHistory([]),

    matrix: () => {
      print({ type: 'ok', content: '[+] entering the matrix... (ESC to exit)' });
      setTimeout(() => setMatrix(true), 300);
    },

    hack: () => {
      const steps = [
        { type: 'warn', content: '[!] initiating intrusion sequence...' },
        { type: 'out', content: 'scanning 192.168.0.0/16 ...' },
        { type: 'out', content: 'port 22 open · port 80 open · port 443 open' },
        { type: 'out', content: 'attempting credential spray...' },
        { type: 'ok', content: '[+] foothold established on 192.168.4.21' },
        { type: 'out', content: 'enumerating privileges...' },
        { type: 'err', content: '[!] j/k — I do BLUE TEAM. try `whoami`.' },
      ];
      steps.forEach((s, i) => setTimeout(() => print(s), i * 350));
    },

    sudo: (args) => {
      if (args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
        print([
          { type: 'err', content: '[!] permission denied. nice try.' },
          { type: 'out', content: '    incident logged: 2026-' + (now.getMonth()+1) + '-' + now.getDate() + ' · sev=HIGH' },
        ]);
        return;
      }
      print({ type: 'warn', content: '[!] this is a portfolio, not a shell. you are not in the sudoers file.' });
    },

    uptime: () => {
      const start = new Date('2024-08-01');
      const days = Math.floor((now - start) / 86400000);
      print({ type: 'out', content: ' up ' + days + ' days · 2 users · load avg: 0.42, 0.51, 0.38' });
    },

    fortune: () => {
      const fortunes = [
        'The best defense is a well-instrumented detection.',
        'Logs you don\'t collect are logs the attacker doesn\'t worry about.',
        'Trust, but verify. Then verify again.',
        'A patient adversary beats a careless defender. Be patient too.',
        'The shortest path to compromise is usually a misconfiguration.',
      ];
      print({ type: 'fg', content: '"' + fortunes[Math.floor(Math.random()*fortunes.length)] + '"' });
    },

    coffee: () => print([
      { type: 'err', content: '[418] I\'m a teapot.' },
      { type: 'out', content: '    HTCPCP/1.0 RFC 2324 · brewing... ☕' },
    ]),

    exit: () => print({ type: 'warn', content: 'exit: this session does not exit. ¯\\_(ツ)_/¯' }),
    quit: () => COMMANDS.exit(),

    banner: () => print([
      { type: 'ascii', content: window.ASCII_PORTRAIT },
      { type: 'fg', content: 'TGM-Shell v4.2.1' },
    ]),
  };

  const run = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) { print({ type: 'in', content: '', cmd: '' }); return; }
    print({ type: 'in', content: trimmed });
    setCmdHist(h => [...h, trimmed]);
    setHistIdx(-1);
    const [cmd, ...args] = trimmed.split(/\s+/);
    const fn = COMMANDS[cmd.toLowerCase()];
    if (!fn) {
      print({ type: 'err', content: cmd + ': command not found. Try `help`.' });
      return;
    }
    fn(args);
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHist.length === 0) return;
      const ni = histIdx === -1 ? cmdHist.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(ni); setInput(cmdHist[ni]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const ni = histIdx + 1;
      if (ni >= cmdHist.length) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(ni); setInput(cmdHist[ni]); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const raw = input;
      const parts = raw.split(/\s+/);
      const cmds = Object.keys(COMMANDS);

      // First token: complete command name
      if (parts.length <= 1) {
        const prefix = (parts[0] || '').toLowerCase();
        const matches = cmds.filter(c => c.startsWith(prefix));
        if (matches.length === 0) return;
        if (matches.length === 1) { setInput(matches[0] + ' '); return; }
        // multiple — fill longest common prefix and list options
        const lcp = matches.reduce((acc, m) => {
          let i = 0;
          while (i < acc.length && i < m.length && acc[i] === m[i]) i++;
          return acc.slice(0, i);
        });
        if (lcp.length > prefix.length) setInput(lcp);
        print([
          { type: 'in', content: raw },
          { type: 'out', content: matches.join('   ') },
        ]);
        return;
      }

      // Second+ token: complete arguments based on command
      const cmd = parts[0].toLowerCase();
      const last = parts[parts.length - 1].toLowerCase();
      let pool = [];
      if (cmd === 'open' || cmd === 'cat') {
        pool = P.projects.map(p => p.id);
        if (cmd === 'cat') pool = pool.concat(['about.txt','skills.txt','contact.txt','resume.pdf']);
      } else if (cmd === 'cd' || cmd === 'ls') {
        pool = ['projects','posts','experience','~'];
      } else if (cmd === 'theme') {
        pool = ['cyber','amber','green','cyan'];
      } else if (cmd === 'mode') {
        pool = ['normal','terminal','interactive'];
      }
      const matches = pool.filter(p => p.toLowerCase().startsWith(last));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(' ') + ' ');
        return;
      }
      const lcp = matches.reduce((acc, m) => {
        let i = 0;
        while (i < acc.length && i < m.length && acc[i].toLowerCase() === m[i].toLowerCase()) i++;
        return acc.slice(0, i);
      });
      if (lcp.length > last.length) {
        parts[parts.length - 1] = lcp;
        setInput(parts.join(' '));
      }
      print([
        { type: 'in', content: raw },
        { type: 'out', content: matches.join('   ') },
      ]);
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    }
  };

  const ts = now.toTimeString().slice(0,8);
  const dt = now.toISOString().slice(0,10);

  return (
    <div className="hud mode-root">
      <div className="hud-grid-bg"></div>
      <div className="hud-shell">
        {/* TOP BAR */}
        <div className="hud-top">
          <div className="branding">TGM<b>·</b>SOC<b>·</b>OPS</div>
          <div><span className="dot"></span>SYSTEM ONLINE</div>
          <div>SESSION · LIVE</div>
          <div className="spacer"></div>
          <div>{dt}</div>
          <div>{ts} UTC</div>
          <div>NODE: pa-univ-01</div>
        </div>

        {/* LEFT */}
        <div className="col-left">
          <div className="panel id-panel" style={{flex: '1 1 auto'}}>
            <div className="ph"><span>// IDENTITY</span><span className="pid">0x01</span></div>
            <div className="pb">
              <pre>{window.ASCII_PORTRAIT}</pre>
              <div className="name">{P.name}</div>
              <div className="role">{P.role}</div>
              <div className="meta">
                <div className="meta-row"><span className="k">LOC</span><span className="v">{P.location}</span></div>
                <div className="meta-row"><span className="k">STATUS</span><span className="v" style={{color:'var(--hud-lime)'}}>AVAILABLE</span></div>
                <div className="meta-row"><span className="k">CLEAR</span><span className="v">PUBLIC</span></div>
                <div className="meta-row"><span className="k">FOCUS</span><span className="v">DETECT · IR</span></div>
                <div className="meta-row"><span className="k">SHELL</span><span className="v">tgm v4.2</span></div>
              </div>
            </div>
          </div>
          <div className="panel" style={{flex: '0 0 auto', maxHeight: '38%'}}>
            <div className="ph"><span>// SKILLS</span><span className="pid">0x02</span></div>
            <div className="pb">
              {P.skillsLevels.slice(0, 8).map(s => (
                <div className="sk-row" key={s.name}>
                  <span className="n">{s.name}</span>
                  <span className="b" style={{'--w': s.level + '%'}}></span>
                  <span className="p">{s.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE — TERMINAL */}
        <div className="col-mid">
          <div className="panel term-panel">
            <div className="ph">
              <span>// SHELL — aakash@tgm:{cwd}</span>
              <span className="pid">tty/pts0 · live</span>
            </div>
            <div className="term-window" ref={termRef}>
              {history.map((line, i) => {
                if (line.type === 'in') {
                  return (
                    <div className="term-line in" key={i}>
                      <span className="prompt">aakash@tgm:{cwd}$</span>
                      <span className="cmd">{line.content}</span>
                    </div>
                  );
                }
                return (
                  <div className={`term-line ${line.type}`} key={i}>{line.content}</div>
                );
              })}
            </div>
            <div className="term-input-row">
              <span className="prompt">aakash@tgm:{cwd}$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck="false"
                autoComplete="off"
              />
              <span className="term-cursor"></span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-right">
          <div className="panel" style={{flex: '1 1 50%'}}>
            <div className="ph"><span>// THREAT FEED</span><span className="pid">live</span></div>
            <div className="pb">
              {feed.map((f, i) => (
                <div className="feed-row" key={i}>
                  <span className="t">{f.t}</span>
                  <span className={`sev ${f.sev}`}>{f.sev}</span>
                  <span className="msg">{f.msg}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel" style={{flex: '0 0 auto'}}>
            <div className="ph"><span>// SYSTEM</span><span className="pid">0x03</span></div>
            <div className="pb">
              <div className="stat-row"><span className="k">CPU</span><span className="v">14.2%</span></div>
              <div className="stat-row"><span className="k">MEM</span><span className="v">38.7%</span></div>
              <div className="stat-row"><span className="k">NET TX</span><span className="v">2.1 MB/s</span></div>
              <div className="stat-row"><span className="k">NET RX</span><span className="v">8.4 MB/s</span></div>
              <div className="stat-row"><span className="k">ALERTS</span><span className="v warn">3</span></div>
              <div className="stat-row"><span className="k">UPTIME</span><span className="v">638d 04h</span></div>
              <div className="stat-row"><span className="k">EDR</span><span className="v">NOMINAL</span></div>
              <div className="stat-row"><span className="k">SIEM</span><span className="v">SYNCED</span></div>
            </div>
          </div>
          <div className="panel" style={{flex: '0 0 auto'}}>
            <div className="ph"><span>// CERTS</span><span className="pid">0x04</span></div>
            <div className="pb">
              {P.certs.map(c => (
                <div key={c.name} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:'1px dotted var(--hud-border)',fontSize:'10px'}}>
                  <span>✓ {c.name}</span>
                  <span style={{color:'var(--hud-cyan)',fontSize:'9px',letterSpacing:'.1em'}}>[{c.status}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="hud-bot">
          <div>TGM-OS v4.2.1</div>
          <div style={{marginLeft:'auto'}}>type `help` · ↑↓ history · TAB completion · CTRL+L clear</div>
        </div>
      </div>

      {matrix && <MatrixRain onClose={() => setMatrix(false)} />}
    </div>
  );
}

window.HudMode = HudMode;
