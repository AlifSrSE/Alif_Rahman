import AlifRahmanImg from '../assets/AlifRahman.jpg';
import AlifRahmanCV from '../assets/AlifRahmanCV.pdf';

export default function Hero() {
  return (
    <section className="glass-panel" style={{ borderRadius: 40, padding: '64px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -96, right: -96, width: 384, height: 384, background: 'rgba(59,130,246,0.05)', filter: 'blur(120px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -96, left: -96, width: 384, height: 384, background: 'rgba(14,165,233,0.05)', filter: 'blur(120px)', borderRadius: '50%' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 48, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h1 style={{ fontSize: 80, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#0f172a' }}>
            Senior <br />
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#0EA5E9,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Software Engineer
            </span>
          </h1>

          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 480, lineHeight: 1.7, fontWeight: 300 }}>
            Specializing in high-scale backend architectures and modern frontend experiences. Dedicated to continuous learning and{' '}
            <span style={{ color: '#0f172a', fontWeight: 500 }}>Project Perfection</span>.
          </p>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 16 }}>
            <a href="#contact" style={{
              padding: '20px 40px', background: '#0f172a', color: '#fff', fontWeight: 900,
              borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
              fontSize: 14, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', transition: 'background 0.2s'
            }}>
              GET IN TOUCH <span style={{ fontSize: 20 }}>↗</span>
            </a>
            <a href={AlifRahmanCV} download="Alif_Rahman_CV.pdf" style={{
              padding: '20px 40px', background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a',
              fontWeight: 700, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12,
              fontSize: 14, boxShadow: '0 4px 12px -4px rgba(0,0,0,0.05)'
            }}>
              VIEW RESUME 📄
            </a>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            aspectRatio: '1/1', borderRadius: 48, overflow: 'hidden',
            border: '8px solid #fff', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.2)'
          }}>
            <img
              src={AlifRahmanImg}
              alt="Alif Rahman"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.src = "https://placehold.co/500x500/3B82F6/ffffff?text=AR"; }}
            />
          </div>
          <div className="glass-panel" style={{
            position: 'absolute', bottom: -24, right: -24, padding: 24, borderRadius: 24,
            boxShadow: '0 0 30px rgba(59,130,246,0.1)'
          }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#3B82F6' }}>6+</div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, color: '#4B5563', opacity: 0.7 }}>Years of Code</div>
          </div>
        </div>
      </div>
    </section>
  );
}
