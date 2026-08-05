const experience = [
  {
    company: "Daniyal Technologies",
    location: "Remote, USA",
    link: "https://daniyaltechnologies.com",
    roles: [
      {
        title: "Senior Software Engineer",
        duration: "11/2025 - Present",
        current: true,
        techStack: 'NestJS, TypeScript, PostgreSQL, TypeORM, Redis, BullMQ, AWS S3, Docker, React, Zustand, Playwright',
        tags: ["#Microservices", "#Scale", "#NestJS", "#Redis"],
        bullets: [
          "Project Leadership: Owning full architectural and development responsibility for three core enterprise modules: Appointment System, Operation Hub, and Support Center.",
          "Distributed Systems: Engineered high-performance background processing using BullMQ and Redis for reliable asynchronous tasks and scheduled jobs.",
          "Scalable Backend Design: Architected secure RESTful APIs with NestJS, incorporating Passport JWT, Throttler rate limiting, and automated Swagger documentation.",
          "Real-time Communication: Developed live data synchronization and dashboard updates via WebSockets, with automated SendGrid and Twilio notification triggers.",
          "Infrastructure & DevOps: Orchestrated Docker containerization and AWS S3 cloud storage to ensure environment parity and scalable asset management.",
          "Quality & AI: Implemented Jest/Playwright testing suites and integrated Langchain for AI-driven ticket classification and automated support workflows.",
        ],
      }
    ]
  },
  {
    company: "Druto Fintech Limited",
    location: "UAE || Singapore || Bangladesh",
    link: "https://drutoloan.com",
    roles: [
      {
        title: "Team Lead - AI Development",
        duration: "01/2025 - Present",
        current: true,
        techStack: 'Python, Flask, Django, MongoDB, TensorFlow, PyTorch, Scikit-Learn',
        tags: ["#Fintech", "#AI/ML", "#Leadership"],
        bullets: [
          "Led the end-to-end development of a Credit Scoring System that improved loan approval accuracy by 20% and reduced manual review time by 30%.",
          "Built and deployed a Psychometric Chatbot that reduced manual risk interviews by 40% and accelerated loan approvals by 25%.",
          "Designed and deployed a Loan Red Flag Analysis system that automatically detects fraudulent loan applications, cutting fraud detection time from hours to seconds.",
          "Developed and integrated a Social Scoring System to analyze social data for creditworthiness, enhancing the risk assessment model.",
          "Promoted to Team Lead within 6 months, leading multiple AI development teams and projects.",
        ],
      },
      {
        title: "Senior Software Engineer",
        duration: "01/2024 - 11/2024",
        current: false,
        techStack: 'Python, Flask, Django, MongoDB, TensorFlow, PyTorch, Scikit-Learn',
        tags: ["#Fintech", "#AI", "#Platform"],
        bullets: [
          "Led delivery of the Britto lending platform, now deployed across 3 countries, reducing loan processing time by 35% and handling 30k+ customers.",
          "Delivered core modules (CRUD, user/account, loan & savings) for a digital lending platform.",
          "Directed deployments, CI/CD pipelines, and Git workflows ensuring smooth production rollouts.",
          "Led AI modules now deployed across UAE and Bangladesh operations.",
        ],
      }
    ]
  },
  {
    company: "RedOrange Media & Communications",
    location: "Netherlands || Bangladesh",
    link: "https://redorangecom.com",
    roles: [
      {
        title: "Full Stack Web Developer",
        duration: "01/2024 - 11/2024",
        current: false,
        techStack: 'PHP, Laravel, WordPress, React, React Native, MySQL, JavaScript, Bootstrap',
        tags: ["#FullStack", "#Mobile", "#Laravel"],
        projects: ["Shokkhom", "BNPS-Bangladesh Nari Progati Sangha", "The Share-Net International Digital Platform", "International Panel for Deltas, Coastal Areas, and Islands (IPDC)", "ARTICLE 19-Defending freedom of expression and information"],
        bullets: [
          "Project Lead for multiple web and mobile solutions across media and communications.",
          "Built custom WordPress themes and plugins, integrating REST APIs and optimizing MySQL queries for high performance.",
          "Delivered scalable Laravel-based full-stack applications, ensuring code quality, performance, and maintainability across distributed teams.",
        ],
      }
    ]
  },
  {
    company: "Kay & Que Limited (IT Unit)",
    location: "Dhaka, Bangladesh",
    link: "https://multimodebd.com",
    roles: [
      {
        title: "Software Engineer",
        duration: "01/2021 - 01/2024",
        current: false,
        techStack: 'Python, OpenCV, Laravel, PHP, JavaScript, MySQL',
        tags: ["#Backend", "#CMS", "#ComputerVision"],
        bullets: [
          "Led end-to-end backend and AI project delivery across web, mobile, and computer vision solutions.",
          "Directed computer vision model training, evaluation, and deployment for AI-based applications.",
          "Built secure CMS and backend systems using Laravel, WordPress, PHP, and MySQL.",
          "Improved performance through query optimization and scalable backend architecture.",
          "Managed deployments, migrations, and third-party API integrations with encrypted data handling.",
        ],
      }
    ]
  }
];

export default function Experience() {
  return (
    <section className="glass-panel" id="experience" style={{ borderRadius: 40, overflow: 'hidden' }}>
      <div style={{ padding: '32px 48px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, background: 'rgba(59,130,246,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: 22 }}>⚡</div>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a' }}>Work Experience</h2>
          <p style={{ fontSize: 14, color: '#4B5563' }}>Professional journey across fintech, AI, and full-stack development</p>
        </div>
      </div>
      <div style={{ padding: '48px', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {experience.map((company, companyIdx) => (
            <div key={companyIdx} style={{ display: 'flex', gap: 32, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, minWidth: 60, paddingTop: 8 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: company.roles.some(r => r.current) ? '#3B82F6' : '#e2e8f0',
                  border: company.roles.some(r => r.current) ? '3px solid white' : 'none',
                  boxShadow: company.roles.some(r => r.current) ? '0 0 0 3px #3B82F6' : 'none'
                }} />
                {companyIdx < experience.length - 1 && (
                  <div style={{ flex: 1, width: 2, background: '#e2e8f0', minHeight: 400 }} />
                )}
              </div>

              <div style={{ flex: 1, paddingBottom: 32 }}>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>{company.company}</h3>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 6,
                      background: '#f1f5f9', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}>
                      {company.location}
                    </span>
                  </div>
                  {company.link && (
                    <a href={company.link} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: 12, color: '#3B82F6', fontWeight: 600, textDecoration: 'none'
                    }}>
                      Visit Company ↗
                    </a>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {company.roles.map((role, roleIdx) => (
                    <div key={roleIdx} className="bento-card" style={{
                      borderRadius: 24, padding: 24,
                      borderLeft: role.current ? '4px solid #3B82F6' : undefined,
                      background: role.current ? 'rgba(59,130,246,0.03)' : '#F5F5F5'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div>
                          <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0, marginBottom: 4 }}>{role.title}</h4>
                          <p style={{ fontSize: 12, color: '#64748b', margin: 0, fontWeight: 600 }}>{role.duration}</p>
                        </div>
                        {role.current && (
                          <span style={{
                            fontSize: 9, fontWeight: 900, padding: '4px 12px', borderRadius: 999,
                            background: 'rgba(59,130,246,0.1)', color: '#3B82F6',
                            border: '1px solid rgba(59,130,246,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em',
                            whiteSpace: 'nowrap'
                          }}>
                            Current
                          </span>
                        )}
                      </div>

                      {role.techStack && (
                        <div style={{ marginBottom: 16 }}>
                          <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: 8 }}>Tech Stack</p>
                          <p style={{ fontSize: 12, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>{role.techStack}</p>
                        </div>
                      )}

                      <ul style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7, marginBottom: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {(role.bullets || []).map((b, bi) => (
                          <li key={bi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <span style={{ color: '#3B82F6', fontWeight: 900, marginTop: 1, flexShrink: 0, fontSize: 14 }}>›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {role.projects && (
                        <div style={{ marginBottom: 12 }}>
                          <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: 8 }}>Key Projects</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {role.projects.map(p => (
                              <span key={p} style={{ padding: '4px 10px', background: '#fff', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#3B82F6' }}>{p}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {role.tags && role.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {role.tags.map(tag => (
                            <span key={tag} style={{ padding: '4px 10px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 6, fontSize: 9, fontWeight: 700, color: '#4B5563', textTransform: 'uppercase' }}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
