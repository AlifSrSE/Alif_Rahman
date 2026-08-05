import { useCerts } from '../hooks';
import { fallbackCerts } from '../data';

export default function Education() {
  const certs = useCerts(fallbackCerts);
  return (
    <section id="education" style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 32 }}>
      <div className="glass-panel" style={{ borderRadius: 40, padding: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, background: 'rgba(59,130,246,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎓</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a' }}>Education & Accolades</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ padding: 24, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16 }}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>BSc in Computer Science</h4>
              <p style={{ color: '#4B5563', marginTop: 4 }}>BRAC University</p>
              <div style={{ marginTop: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 900, background: '#f1f5f9', padding: '4px 12px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>2019 – 2022</span>
              </div>
            </div>
            <div style={{ padding: 24, background: 'rgba(59,130,246,0.05)', borderRadius: 16, border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 0 30px rgba(59,130,246,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🏆</span>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Codeforces Specialist</h4>
              </div>
              <p style={{ fontSize: 32, fontWeight: 900, color: '#3B82F6' }}>1666 <span style={{ fontSize: 12, fontWeight: 400, color: '#4B5563' }}>Peak Rating</span></p>
              <a href="https://codeforces.com/profile/AlifSrSE" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#3B82F6', fontWeight: 700, marginTop: 8, display: 'inline-block' }}>View Profile ↗</a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h5 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#94a3b8', marginBottom: 16 }}>Certifications & Licenses</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 268, overflowY: 'auto', paddingRight: 4 }}>
              {certs.map(cert => (
                <a key={cert.id || cert.name} href={cert.link || undefined} target={cert.link ? '_blank' : undefined} rel="noopener noreferrer" style={{
                  padding: 16, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: cert.link ? 'pointer' : 'default', transition: 'border-color 0.2s', textDecoration: 'none'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#3B82F6'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span>{cert.status ? '📚' : '✅'}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>{cert.name}</span>
                      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{cert.issuer}{cert.status ? ` · ${cert.status}` : ''}</span>
                    </div>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: 16 }}>{cert.status ? '' : '↗'}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ borderRadius: 40, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 24 }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: '#0f172a' }}>20+</div>
        <p style={{ color: '#4B5563', fontWeight: 500, padding: '0 16px' }}>Production-grade applications delivered globally.</p>
        <div style={{ height: 1, background: '#e2e8f0', width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#3B82F6' }}>8+</div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8' }}>Certs</div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>5k+</div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8' }}>Commits</div>
          </div>
        </div>
      </div>
    </section>
  );
}
