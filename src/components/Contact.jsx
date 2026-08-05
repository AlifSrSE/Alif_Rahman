import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section id="contact" style={{
      background: '#0f172a', borderRadius: 48, padding: '96px', overflow: 'hidden', position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: -160, right: -160, width: 384, height: 384, background: 'rgba(59,130,246,0.2)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 896, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 style={{ fontSize: 64, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>
          Let's Build Something <br />
          <span style={{ color: '#3B82F6' }}>Legacy-Worthy.</span>
        </h2>
        <p style={{ fontSize: 18, color: '#94a3b8', fontWeight: 300, maxWidth: 512, margin: '0 auto', lineHeight: 1.7 }}>
          Currently architecting the future of scalable systems. If you have a challenging project, let's connect.
        </p>
        <ContactForm />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {[
            { href: 'https://linkedin.com/in/alifsrse', label: 'in' },
            { href: 'https://github.com/AlifSrSE', label: '⌥' },
          ].map(({ href, label }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{
              width: 80, height: 80, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
              borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: '#fff', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >{label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
