export default function Nav() {
  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '24px' }}>
      <div className="glass-panel" style={{
        maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '16px 32px', borderRadius: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, background: 'linear-gradient(135deg,#3B82F6,#0EA5E9)',
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 20, boxShadow: '0 4px 14px rgba(59,130,246,0.3)'
          }}>AR</div>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#1e293b', letterSpacing: '-0.02em' }}>Alif Rahman</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          {['experience', 'skills', 'projects', 'education'].map(s => (
            <a key={s} href={`#${s}`} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#3B82F6'} onMouseLeave={e => e.target.style.color = '#64748b'}>
              {s === 'education' ? 'Accolades' : s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
          <a href="#contact" style={{
            padding: '10px 24px', background: '#0f172a', color: '#fff',
            borderRadius: 12, fontWeight: 700, fontSize: 13, transition: 'background 0.2s'
          }}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
