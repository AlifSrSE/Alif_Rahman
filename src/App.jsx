import { useEffect } from 'react';
import { ensureAnonymousUser } from './firebase';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Anonymous auth lets Firestore rules permit writes (contact form, visitor count).
  // Fails silently if not enabled — the site still works fully via static fallback.
  useEffect(() => {
    ensureAnonymousUser();
  }, []);

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '160px 24px 80px', display: 'flex', flexDirection: 'column', gap: 48 }}>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
