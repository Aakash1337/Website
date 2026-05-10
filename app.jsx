// Main app: mode switcher, tweaks, boot
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "hud",
  "themeColor": "cyber",
  "retroColor": "amber",
  "scanIntensity": 0.6,
  "glitchIntensity": 1,
  "crtCurve": false,
  "bootEnabled": true,
  "monoFont": "JetBrains Mono"
}/*EDITMODE-END*/;

function App() {
  const tweaks = useTweaks(TWEAK_DEFAULTS);
  const [tk, setTweak] = tweaks;
  const [booted, setBooted] = useStateApp(!tk.bootEnabled);

  // listen for in-terminal mode/theme switch events
  useEffectApp(() => {
    const onMode = (e) => setTweak('mode', e.detail);
    const onTweak = (e) => setTweak(e.detail);
    window.addEventListener('switch-mode', onMode);
    window.addEventListener('tweak-set', onTweak);
    return () => {
      window.removeEventListener('switch-mode', onMode);
      window.removeEventListener('tweak-set', onTweak);
    };
  }, []);

  // apply font globally
  useEffectApp(() => {
    document.documentElement.style.setProperty('--mono', `'${tk.monoFont}', ui-monospace, monospace`);
  }, [tk.monoFont]);

  // CSS vars for scan/glitch
  useEffectApp(() => {
    document.documentElement.style.setProperty('--scan', tk.scanIntensity);
    document.documentElement.style.setProperty('--glitch', tk.glitchIntensity);
  }, [tk.scanIntensity, tk.glitchIntensity]);

  if (!booted) {
    return <BootSequence onDone={() => setBooted(true)} mode={tk.mode} />;
  }

  const showScanlines = tk.scanIntensity > 0.05;

  let modeEl;
  if (tk.mode === 'cyber') modeEl = <CyberpunkMode tweaks={tk} />;
  else if (tk.mode === 'retro') modeEl = <RetroMode tweaks={tk} />;
  else modeEl = <HudMode tweaks={tk} />;

  const wrapperClass = [
    showScanlines ? 'scanlines' : '',
    tk.crtCurve ? 'crt-curve' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={wrapperClass}>
        {modeEl}
      </div>

      {/* Mode switcher */}
      <div className="mode-switch">
        <span className="label-mode">MODE</span>
        <button className={tk.mode === 'cyber' ? 'active' : ''} onClick={() => setTweak('mode', 'cyber')}>NORMAL</button>
        <button className={tk.mode === 'retro' ? 'active' : ''} onClick={() => setTweak('mode', 'retro')}>TERMINAL</button>
        <button className={tk.mode === 'hud' ? 'active' : ''} onClick={() => setTweak('mode', 'hud')}>INTERACTIVE</button>
      </div>

      {/* Tweaks Panel */}
      <TweaksPanel>
        <TweakSection label="Mode" />
        <TweakRadio label="View" value={tk.mode} onChange={v => setTweak('mode', v)}
          options={[{value:'cyber',label:'Normal'}, {value:'retro',label:'Terminal'}, {value:'hud',label:'Interactive'}]} />

        <TweakSection label="Aesthetic" />
        <TweakSelect label="Retro color" value={tk.retroColor} onChange={v => setTweak('retroColor', v)}
          options={[{value:'amber',label:'Amber'}, {value:'green',label:'Green phosphor'}, {value:'cyan',label:'Cyan'}]} />
        <TweakSelect label="Mono font" value={tk.monoFont} onChange={v => setTweak('monoFont', v)}
          options={[
            {value:'JetBrains Mono',label:'JetBrains Mono'},
            {value:'IBM Plex Mono',label:'IBM Plex Mono'},
            {value:'Share Tech Mono',label:'Share Tech Mono'},
            {value:'VT323',label:'VT323 (retro)'}
          ]} />

        <TweakSection label="Effects" />
        <TweakSlider label="Scanlines" value={tk.scanIntensity} onChange={v => setTweak('scanIntensity', v)} min={0} max={1.5} step={0.1} />
        <TweakSlider label="Glitch frequency" value={tk.glitchIntensity} onChange={v => setTweak('glitchIntensity', v)} min={0} max={3} step={0.25} />
        <TweakToggle label="CRT curvature" value={tk.crtCurve} onChange={v => setTweak('crtCurve', v)} />
        <TweakToggle label="Boot sequence" value={tk.bootEnabled} onChange={v => setTweak('bootEnabled', v)} />

        <TweakSection label="Quick" />
        <TweakButton label="Replay boot" onClick={() => setBooted(false)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
