import { useVisitorCount } from '../hooks';

function VisitorCounter() {
  const count = useVisitorCount();
  if (count == null) return null;
  return (
    <span style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.15em' }}>
      {count.toLocaleString()} Visitors
    </span>
  );
}

export default function Footer() {
  return (
    <footer style={{
      maxWidth: 1280, margin: '0 auto', padding: '64px 40px', borderTop: '1px solid #e2e8f0',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, background: '#0f172a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>A</div>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8' }}>© {new Date().getFullYear()} Alif Rahman. Built with precision.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <VisitorCounter />
        <div style={{ display: 'flex', gap: 48 }}>
          {['Privacy', 'Terms', 'Source'].map(l => (
            <a key={l} href="#" style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#3B82F6'} onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
