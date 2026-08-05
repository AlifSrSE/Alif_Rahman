const skillGroups = [
  { label: 'Backend & Core', icon: '🗄️', primary: ['NestJS', 'TypeORM', 'BullMQ'], rest: ['Node.js', 'Redis', 'PostgreSQL', 'MongoDB', 'Python', 'Flask', 'FastApi', 'Laravel'] },
  { label: 'Frontend', icon: '✨', primary: ['React', 'Next.js', 'TypeScript'], rest: ['Zustand', 'Redux', 'Tailwind CSS', 'WebSockets'] },
  { label: 'Infrastructure', icon: '🚀', primary: ['AWS S3', 'Docker', 'CI/CD'], rest: ['Playwright', 'Jest', 'Swagger', 'Git', 'Postman', 'Figma', 'Twilio', 'Sendgrid'] },
];

export default function Skills() {
  return (
    <section className="glass-panel" id="skills" style={{ borderRadius: 40, padding: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
        <div style={{ width: 48, height: 48, background: 'rgba(59,130,246,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔗</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a' }}>Technical Breadth</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
        {skillGroups.map(({ label, icon, primary, rest }) => (
          <div key={label} style={{ background: '#F5F5F5', padding: 32, borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 900, color: '#0f172a' }}>{label}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {primary.map(s => (
                <span key={s} className="skill-primary" style={{ padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s}</span>
              ))}
              {rest.map(s => (
                <span key={s} className="skill-default" style={{ padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
