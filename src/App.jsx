import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, query, deleteDoc, doc } from 'firebase/firestore';

// --- IMPORTANT: Firebase Configuration for Local Development ---
// When running locally with `npm run dev` (Vite), __app_id, __firebase_config, and __initial_auth_token are NOT available.
// You MUST provide your Firebase project's configuration via environment variables.
//
// STEP 1: Create a .env.local file in your project root (e.g., AlifDev/.env.local)
//         This file should be at the same level as your package.json, vite.config.js, etc.
//
// STEP 2: Add your Firebase credentials to .env.local like this (REPLACE ALL PLACEHOLDERS):
//         You can find these values in your Firebase project console: Project settings -> General.
//         VITE_ prefix is REQUIRED for Vite to expose environment variables to the browser.
//
// VITE_FIREBASE_API_KEY="YOUR_API_KEY_FROM_FIREBASE_CONSOLE"
// VITE_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT_ID.firebaseapp.com"
// VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID" // This is crucial and must be provided
// VITE_FIREBASE_STORAGE_BUCKET="YOUR_PROJECT_ID.appspot.com"
// VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
// VITE_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
// VITE_FIREBASE_MEASUREMENT_ID="G-YOUR_MEASUREMENT_ID" // Optional, if using Google Analytics for Firebase
//
// VITE_APP_ID="default-local-alifdev" // A unique identifier for your app's local data in Firestore

// Determine Firebase config based on the execution environment
const firebaseConfig = typeof __firebase_config !== 'undefined' && Object.keys(__firebase_config).length > 0
  ? JSON.parse(__firebase_config) // Use Canvas-provided config when running in Canvas
  : { // Fallback for local development using Vite's import.meta.env
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    };

// Determine app ID based on the execution environment
// __app_id is provided by Canvas; VITE_APP_ID is from your local .env.local file
const appId = typeof __app_id !== 'undefined' ? __app_id : (import.meta.env.VITE_APP_ID || 'default-local-app-id');

// initialAuthToken is specifically provided by Canvas for authentication;
// locally, we'll rely on anonymous sign-in or other auth methods.
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Helper component for displaying skills
const SkillBadge = ({ skill }) => (
  <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">
    {skill}
  </span>
);

// Main App Component
function App() {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemLink, setNewItemLink] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false); // To track auth state readiness

  // Pre-populate some data from your CV for a richer initial display
  const professionalSkills = [
    "TypeScript", "Laravel", "Python", "ReactJS", "NextJs", "NodeJs",
    "JavaScript", "VueJS", "Wordpress", "PHP", "Tailwind CSS", "MongoDB",
    "PostgreSQL", "React Native", "MySQL", "Curl", "FastAPI",
    "RESTful API", "Ajax"
  ];

  const technicalTools = [
    "Git", "Postman", "cPanel", "Canva", "Jira", "Trello", "Figma", "AdobeXD"
  ];

  const experience = [
    {
      title: "Sr. Software Engineer",
      company: "Druto Fintech Limited",
      duration: "01/2025 - Present",
      description: `A digital lending platform connecting financial institutions with MSMEs, enabling easy access to CMSME loans through a unified Lending Panel.
        Developed and maintained scalable web applications using TypeScript, ReactJs, NextJs, NodeJs & MongoDB.
        Led Git workflows, handled deployments, and built robust APIs for high-performance systems.
        Implemented custom AI features using Python, integrating them into production systems. Managed key system folders (Admin, API, Web), ensuring smooth AI and backend integration across services.
        Built and deployed core modules - CRUD, user/account management, loan and savings features - for a digital lending platform. Led successful rollouts of new product (Britto) and features in a live environment.`,
      link: "https://drutoloan.com"
    },
    {
      title: "Full Stack Web Developer",
      company: "RedOrange Media & Communications",
      duration: "01/2024 - 11/2024",
      description: `An international consultancy house for media and communications.
        Focused on React, Laravel & WordPress for website management, including theme and plugin development. Proficient in PHP, MySQL, and JavaScript, handled a wide range of frontend and backend tasks seamlessly.
        As a Project Lead, delivered high-quality web solutions using React Native, Laravel frameworks, and Bootstrap across various projects, ensuring performance, responsiveness, and clean architecture.`,
      projects: ["Shokkhom", "BNPS-Bangladesh Nari Progati Sangha", "The Share-Net International Digital Platform", "International Panel for Deltas, Coastal Areas, and Islands (IPDC)", "ARTICLE 19-Defending freedom of expression and information"],
      link: "info@redorangecom.com" // Placeholder for contact
    },
    {
      title: "Software Engineer",
      company: "Kay & Que Limited (IT Unit)",
      duration: "01/2023 - 01/2024",
      description: `Handled full backend tasks - updates, maintenance, configuration - and integrated APIs with parameter handling and encryption. Skilled in Laravel, WordPress, PHP, MySQL, HTML, CSS, JavaScript, and Bootstrap, with experience in migrations.`,
      link: "knq@multimodebd.com" // Placeholder for contact
    },
    {
      title: "Software Developer (Python)",
      company: "NDA (Machine Learning, AI platform based company)",
      duration: "12/2021 - 09/2022",
      description: `Led AI projects with expertise in Python, TensorFlow, OpenCV, and YOLO, focusing on model training and deployment for computer vision. Built systems for object, pose, and last-touch detection, staying up to date with deep learning innovations and applying strong problem-solving skills.`,
      link: "https://colab.research.google.com/drive/11kz1Yi1CNcHAa_yIPdG45dH5csk8AZxQ?usp=sharing"
    },
    {
      title: "CHIEF TECHNOLOGY OFFICER",
      company: "Forecast by Rainfall",
      duration: "03/2021 - 11/2021",
      description: `Developed Forecast's main 30+ page responsive website featuring news, games, and music using WordPress with Elementor, Divi, Beaver Builder, and other tools.`,
      link: "https://www.forecastmedia.net/"
    }
  ];

  const education = [
    {
      degree: "BSc in Computer Science and Engineering",
      institution: "BRAC UNIVERSITY",
      duration: "01/2019 - 12/2022",
      location: "Dhaka, Bangladesh",
      courses: ["Football Offside Tracker (Thesis)", "Movie & Hall Info", "Employee Management System", "Emotion Based Music Player"]
    }
  ];

  const achievements = [
    {
      title: "Codeforces Specialist",
      description: "Achieved Specialist title on Codeforces with a peak rating of 1666, demonstrating strong algorithmic problem-solving and competitive programming skills through regular participation in rated contests.",
      link: "https://codeforces.com/profile/AlifSrSE"
    }
  ];

  useEffect(() => {
    // Initialize Firebase only if projectId and apiKey are explicitly provided and not placeholders
    if (firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.projectId !== "your-project-id" && firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY_HERE") {
      try {
        const app = initializeApp(firebaseConfig);
        const firestoreDb = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setDb(firestoreDb);
        setAuth(firebaseAuth);

        const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            // Only try to sign in with custom token if available (from Canvas)
            if (initialAuthToken) {
              try {
                await signInWithCustomToken(firebaseAuth, initialAuthToken);
                setUserId(firebaseAuth.currentUser.uid);
              } catch (error) {
                console.error("Error signing in with custom token:", error);
                // Fallback to anonymous on token failure
                try {
                  await signInAnonymously(firebaseAuth);
                  setUserId(firebaseAuth.currentUser.uid);
                } catch (anonError) {
                  console.error("Error signing in anonymously:", anonError);
                }
              }
            } else {
              // For local development or no initial token, sign in anonymously
              try {
                await signInAnonymously(firebaseAuth);
                setUserId(firebaseAuth.currentUser.uid);
              } catch (anonError) {
                console.error("Error signing in anonymously:", anonError);
              }
            }
          }
          setIsAuthReady(true); // Auth state is ready after initial check or sign-in attempt
        });

        // Cleanup auth listener on component unmount
        return () => unsubscribeAuth();
      } catch (error) {
        console.error("Firebase initialization failed:", error);
        setIsAuthReady(true); // Allow UI to render even if init fails, to show error message
      }
    } else {
      // If Firebase config is missing or contains placeholders, log an error and mark auth as ready
      // so the UI can display the helpful error message.
      console.error("Firebase configuration is incomplete or contains placeholders. Please check your .env.local file or Canvas environment variables.");
      setIsAuthReady(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    // Listen for portfolio items ONLY if Firebase DB and user ID are properly set up AND auth is ready
    if (db && userId && isAuthReady) {
      // Collection path for public data: /artifacts/{appId}/public/data/{your_collection_name}
      const portfolioCollectionRef = collection(db, `artifacts/${appId}/public/data/portfolio`);
      // No orderBy is used as per instructions to avoid index issues
      const q = query(portfolioCollectionRef);

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPortfolioItems(items);
      }, (error) => {
        console.error("Error fetching portfolio items:", error);
      });

      // Cleanup snapshot listener on component unmount or when dependencies change
      return () => unsubscribeSnapshot();
    }
  }, [db, userId, isAuthReady]); // Re-run effect if db, userId, or isAuthReady changes

  const addPortfolioItem = async () => {
    if (!newItemName.trim() || !newItemDescription.trim()) {
      console.warn("Name and description cannot be empty.");
      // You could display a temporary message to the user here
      return;
    }
    if (!db || !userId) {
      console.error("Firestore database not initialized or user not authenticated.");
      // Display a user-friendly error message
      return;
    }
    try {
      // Collection path for public data
      const portfolioCollectionRef = collection(db, `artifacts/${appId}/public/data/portfolio`);
      await addDoc(portfolioCollectionRef, {
        name: newItemName,
        description: newItemDescription,
        link: newItemLink,
        createdAt: serverTimestamp(),
        userId: userId // Store the ID of the user who added it
      });
      setNewItemName('');
      setNewItemDescription('');
      setNewItemLink('');
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      // Display user-friendly error message
    }
  };

  const deletePortfolioItem = async (id) => {
    if (!db || !userId) {
      console.error("Firestore database not initialized or user not authenticated.");
      return;
    }
    try {
      const itemToDelete = portfolioItems.find(item => item.id === id);
      if (itemToDelete && itemToDelete.userId === userId) {
        await deleteDoc(doc(db, `artifacts/${appId}/public/data/portfolio`, id));
      } else {
        console.warn("You can only delete your own portfolio items or you are not authorized.");
        // Instead of alert(), implement a custom modal message or a temporary notification.
      }
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
    }
  };

  // Display loading screen until authentication state is determined
  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-xl animate-pulse">Loading your personal website...</p>
      </div>
    );
  }

  // Display Firebase configuration error if running locally and config is incomplete/placeholder
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey || firebaseConfig.projectId === "your-project-id" || firebaseConfig.apiKey === "YOUR_FIREBASE_API_KEY_HERE") {
    return (
      <div className="min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 font-inter antialiased flex items-center justify-center p-8">
        <div className="bg-white dark:bg-red-800 p-8 rounded-lg shadow-xl text-center max-w-lg">
          <h3 className="text-2xl font-bold mb-4">Firebase Configuration Error!</h3>
          <p className="mb-4">
            It looks like your Firebase project ID or API Key is missing or still using placeholder values.
          </p>
          <p className="mb-4 text-left">
            **To run locally (`localhost:5173`), you MUST:**
            <br /><br />
            1.  Create a file named `.env.local` in the root of your `AlifDev` project.
            <br />
            2.  Populate it with your *actual* Firebase project credentials from the Firebase Console (Project settings &gt; General).
            <br />
            3.  Ensure each variable is prefixed with `VITE_` (e.g., `VITE_FIREBASE_API_KEY="..."`).
            <br />
            4.  **Remove any placeholder text** like `"YOUR_API_KEY_HERE"`.
            <br />
            5.  Restart your development server (`npm run dev`).
          </p>
          <p className="text-sm">
            The Canvas environment will automatically provide these values when deployed here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter antialiased">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">AlifDev</h1>
          <nav>
            <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
              <li><a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">About</a></li>
              <li><a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Experience</a></li>
              <li><a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Skills</a></li>
              <li><a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Projects</a></li>
              <li><a href="#education" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Education</a></li>
              <li><a href="#achievements" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Achievements</a></li>
              <li><a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex items-center justify-center h-96 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg rounded-b-xl p-8 mx-auto mt-4 w-[calc(100%-2rem)] max-w-7xl relative overflow-hidden">
        {/* Background blobs for visual interest */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="text-center relative z-10">
          <h2 className="text-5xl font-extrabold mb-4 animate-fadeInDown">Hello, I'm Alif Rahman!</h2>
          <p className="text-xl animate-fadeInUp">A <span className="font-semibold text-yellow-300">Senior Software Engineer</span> dedicated to building user-friendly, visually appealing, and scalable web applications.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">About Me</h3>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-blue-400 dark:border-blue-600">
            {/* Replace with your actual profile picture if available, otherwise use a placeholder */}
            <img
              src="https://placehold.co/192x192/ADD8E6/000000?text=Alif"
              alt="Alif Rahman"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/192x192/ADD8E6/000000?text=Alif"; }}
            />
          </div>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
            <p className="mb-4">
              An experienced software developer with almost <span className="font-bold text-blue-600 dark:text-blue-400">5 years of professional work experience</span>, dedicated to continuous learning and project perfection. Specializing in both UI and UX, I am passionate about creating user-friendly, visually appealing software. I thrive on refining my work until it meets the highest standards of excellence.
            </p>
            <p className="mb-4">
              My expertise spans across modern frontend frameworks like React, Next.js, and Vue.js, robust backend technologies including Node.js, Python/Flask/FastAPI, and Laravel (PHP), and database management with MongoDB, PostgreSQL, and MySQL. I'm adept at leading Git workflows, handling deployments, and building high-performance APIs.
            </p>
            <p>
              When I'm not coding, you can find me exploring new algorithms, contributing to open-source projects, travelling, or engaging in sports. I'm always eager to collaborate on challenging projects and turn innovative ideas into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">Work Experience</h3>
        <div className="space-y-8">
          {experience.map((job, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{job.title}</h4>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{job.company} - <span className="text-gray-600 dark:text-gray-300">{job.duration}</span></p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">{job.description}</p>
              {job.projects && (
                <div className="mt-4">
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200">Key Projects:</h5>
                  <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                    {job.projects.map((project, idx) => (
                      <li key={idx}>{project}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.link && (
                <a href={job.link.startsWith('http') || job.link.startsWith('mailto') ? job.link : `http://${job.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 inline-block">
                  {job.link.startsWith('http') ? 'Visit Website' : (job.link.startsWith('mailto') ? 'Contact via Email' : 'Learn More')}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">Skills & Technologies</h3>
        <div className="mb-8">
          <h4 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Professional Skills</h4>
          <div className="flex flex-wrap gap-2">
            {professionalSkills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Technical Tools & Platforms</h4>
          <div className="flex flex-wrap gap-2">
            {technicalTools.map((tool, index) => (
              <SkillBadge key={index} skill={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (Pre-populated from CV) */}
      <section id="projects" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">My Personal Projects</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Note: The projects below are pre-populated from your CV. You can add more dynamically using the form below, which will be saved in Firestore!</p>

        {/* Dynamic Project Addition Form */}
        <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <h4 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Project (Firebase)</h4>
          {db && userId && <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Your User ID: {userId}</p>}
          <div className="space-y-4">
            <div>
              <label htmlFor="newItemName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Project Name</label>
              <input
                type="text"
                id="newItemName"
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition duration-300"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g., Blockchain Voting System"
              />
            </div>
            <div>
              <label htmlFor="newItemDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
              <textarea
                id="newItemDescription"
                rows="3"
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition duration-300"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                placeholder="A brief description of your project and technologies used."
              ></textarea>
            </div>
            <div>
              <label htmlFor="newItemLink" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Project Link (Optional)</label>
              <input
                type="url"
                id="newItemLink"
                className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition duration-300"
                value={newItemLink}
                onChange={(e) => setNewItemLink(e.target.value)}
                placeholder="e.g., https://github.com/yourproject"
              />
            </div>
            <button
              onClick={addPortfolioItem}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg transition duration-300 transform hover:scale-105"
            >
              Add Project to Portfolio
            </button>
          </div>
        </div>

        {/* Hardcoded Projects from CV */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {[
            {
              name: "AlVoice Assistant",
              description: "Developed a voice-controlled AI desktop assistant using Python, capable of automating daily tasks like messaging, media control, translations, and app management. Integrated OpenAI's GPT-3.5-turbo for intelligent conversation handling. Designed secure, multi-featured workflows with TTS, speech recognition, and multilingual support for dynamic desktop automation.",
              link: "https://github.com/AlifSrSE/AlVoiceAssistant"
            },
            {
              name: "Real Time Surveillance System",
              description: "AI-powered multi-camera surveillance with posture classification, Fall/inactivity detection, heatmaps, and real-time alerts. Built using OpenCV, MediaPipe, Streamlit & Flask.",
              link: "https://github.com/AlifSrSE/RealTimeSurveillanceSystem"
            },
            {
              name: "Cophee - Dual Interface Coffee Shop Management System",
              description: "Built Cophee, a full-stack web app for a coffee shop business with a customer-facing site and an admin dashboard. Used TypeScript, Next.js, TailwindCSS, and PostgreSQL with Prisma to implement POS functionality, employee and inventory management, authentication, and analytics-following scalable, modular architecture.",
              link: "https://github.com/AlifSrSE/Cophee"
            },
            {
              name: "Task Management System",
              description: "A Task Management System with full CRUD, filtering, and sorting features. Includes user authentication and a RESTful API for external integration, all within a user-friendly interface.",
              link: "https://github.com/AlifSrSE/TaskManagementSystem"
            },
            {
              name: "URL Shortener",
              description: "A URL shortener web app built with Laravel (backend) and React (frontend), featuring RESTful APIs, link management, click tracking, and a clean, user-friendly interface.",
              link: "https://github.com/AlifSrSE/UrlShortener"
            },
            {
              name: "ArcH Real Estates",
              description: "Created a responsive web application using Bootstrap, JavaScript, HTML, and CSS. The project demonstrates my skills in front-end development and user interface design. It features an intuitive layout, interactive elements, and a focus on accessibility and usability.",
              link: "https://github.com/AlifSrSE/ArchRealEstates"
            },
            {
              name: "Emotion Based Music Player",
              description: "A website which detects emotion using image/emojis and plays musics on the preference. Attributes such as login/sign-up, playlist, genre, country preference, artist preference, favourite etc. is present. Languages: Html, Css, JavaScript, Bootstrap, Php, MySql.",
              // No direct GitHub link found in CV, placeholder
            },
             {
              name: "Employee Management System",
              description: "Built to manage employees of a company. Login/signup interfaces, employee data, leave request, leave approval, salary information, yearly bonus etc. all are present to manage a company's employees. Languages: Html, Css, JavaScript, Bootstrap, Php, MySql.",
              // No direct GitHub link found in CV, placeholder
            },
            {
              name: "Movie & Halls Info",
              description: "Built a movie review and hall selector website where movie reviews and trailers can be seen. Moreover, hall information and booking tickets can be done with this website. Languages: Html, Css, JavaScript, Bootstrap, Php, MySql.",
              // No direct GitHub link found in CV, placeholder
            }
          ].map((project, index) => (
            <div key={`static-${index}`} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl transform hover:scale-105">
              <h4 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{project.name}</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Portfolio Items from Firestore */}
        <h4 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Dynamic Projects (from Firestore)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.length > 0 ? (
            portfolioItems.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl transform hover:scale-105 relative">
                <h4 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{item.name}</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{item.description}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Project
                  </a>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Added by: {item.userId}</p>
                {item.userId === userId && ( // Only show delete for current user's items
                  <button
                    onClick={() => deletePortfolioItem(item.id)}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-300 transform hover:scale-110"
                    title="Delete Project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">No dynamic portfolio items added yet. Add one above!</p>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">Education</h3>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h4>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution} - <span className="text-gray-600 dark:text-gray-300">{edu.location} ({edu.duration})</span></p>
              {edu.courses && (
                <div className="mt-3">
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200">Relevant Coursework/Theses:</h5>
                  <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400">
                    {edu.courses.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">Achievements</h3>
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{achievement.title}</h4>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{achievement.description}</p>
              {achievement.link && (
                <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-3 inline-block">
                  View Profile
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl">
        <h3 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center border-b-2 border-blue-500 pb-2">Get in Touch</h3>
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I'm always open to new opportunities, collaborations, and conversations. Feel free to connect with me!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:alif.rahman.c@gmail.com" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              alif.rahman.c@gmail.com
            </a>
            <a href="https://linkedin.com/in/alifsrse" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/AlifSrSE" target="_blank" rel="noopener noreferrer" className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-md shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.43-.41-2.43-.41-.33-.8-.8-1.01-.8-1.01-.65-.45.01-.44.01-.44.73.05 1.12.73 1.12.73.64 1.12 1.62.8 2.01.61.06-.47.25-.8.41-1C6.41 11.23 4.21 10.42 4.21 7.89c0-.82.29-1.49.73-2.01-.07-.37-.32-1.87.07-2.79 0 0 .6-.19 1.97.73A6.5 6.5 0 018 4.66c.6.02 1.22.09 1.78.23 1.37-.92 1.97-.73 1.97-.73.39.92.14 2.42.07 2.79.44.52.73 1.2.73 2.01 0 2.53-2.21 3.34-4.31 3.53.25.21.48.62.48 1.26 0 .91-.01 1.64-.01 1.86 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a href="https://alifsrse.github.io/Alif_Rahman/" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3.216 3.217a1 1 0 01-1.414-1.414L11.172 6H8a1 1 0 010-2h4V2a1 1 0 112 0v2h-1.414zM2 9a1 1 0 011-1h3.586l3.217 3.217a1 1 0 01-1.414 1.414L6 11.172V14a1 1 0 01-1 1H2a1 1 0 110-2h3.172l3.217-3.217a1 1 0 011.414-1.414L11.172 8H14a1 1 0 010 2h-1.414z" clipRule="evenodd" />
              </svg>
              Old Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white p-6 text-center mt-12 rounded-t-xl mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <p>&copy; {new Date().getFullYear()} Alif Rahman. All rights reserved.</p>
        <p className="text-sm mt-2">Crafted with React, Tailwind CSS, and powered by Firestore.</p>
      </footer>
       <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.6, 1);
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}}></style>
    </div>
  );
}

export default App;