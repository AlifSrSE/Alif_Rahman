import { useProjects } from '../hooks';
import { fallbackProjects } from '../data';

export default function Projects() {
  const projects = useProjects(fallbackProjects);
  return (
    <section id="projects" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, background: 'rgba(59,130,246,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚀</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a' }}>Featured Projects</h2>
        </div>
        <div style={{ height: 1, flexGrow: 1, background: '#e2e8f0', marginLeft: 32 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
        {projects.map((project, i) => (
          <div key={project.id || i} className="bento-card" style={{ borderRadius: 32, padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {project.icon && (
              <div style={{ width: 64, height: 64, background: 'rgba(59,130,246,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{project.icon}</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', flexGrow: 1 }}>{project.name}</h3>
              {project.tag && (
                <span style={{ padding: '4px 10px', background: 'rgba(59,130,246,0.9)', color: '#fff', fontSize: 10, fontWeight: 900, borderRadius: 8, textTransform: 'uppercase', letterSpacing: '0.1em', marginLeft: 8, whiteSpace: 'nowrap' }}>{project.tag}</span>
              )}
            </div>
            <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>{project.description}</p>
            {project.link && (
              <div style={{ display: 'flex', gap: 24, paddingTop: 8 }}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 900, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Github <span style={{ fontSize: 16 }}>↗</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
