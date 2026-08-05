// Static fallback content. Shown immediately and used until/unless the matching
// Firestore collection (projects / certs) contains documents. Add `order` to
// control sort order when sourced from the database.

export const fallbackProjects = [
  { order: 0, name: 'AIVoice Assistant', description: 'Voice-controlled AI desktop assistant powered by OpenAI API for seamless automation.', link: 'https://github.com/AlifSrSE/AlVoiceAssistant', tag: 'AI / ML' },
  { order: 1, name: 'Real Time Surveillance', description: 'AI-powered multi-camera surveillance system with anomaly detection and real-time alerts.', link: 'https://github.com/AlifSrSE/RealTimeSurveillanceSystem', tag: 'Computer Vision' },
  { order: 2, name: 'Cophee', description: 'A premium e-commerce platform for a coffee shop with integrated subscription management and admin POS.', link: 'https://github.com/AlifSrSE/Cophee', tag: 'Full Stack'},
  { order: 3, name: 'Task Management System', description: 'Enterprise-grade task management tool with full CRUD, filtering, sorting, user authentication, and a RESTful API.', link: 'https://github.com/AlifSrSE/TaskManagementSystem', tag: 'SaaS' },
  { order: 4, name: 'URL Shortener', description: 'URL shortener built with Laravel & React featuring link management, click tracking, and a clean interface.', link: 'https://github.com/AlifSrSE/UrlShortener', tag: 'Web App' },
  { order: 5, name: 'ArcH Real Estates', description: 'Responsive real estate web application with interactive elements and a focus on accessibility and usability.', link: 'https://github.com/AlifSrSE/ArchRealEstates', tag: 'Frontend' },
  { order: 6, name: 'Emotion Based Music Player', description: 'A website which detects emotion using image/emojis and plays music based on preferences.', tag: 'AI / ML' },
  { order: 7, name: 'Employee Management System', description: 'Manage employees with login/signup, leave requests, salary information, and yearly bonus management.', tag: 'Enterprise' },
  { order: 8, name: 'Movie & Halls Info', description: 'Movie review and hall selector website where reviews, trailers, and ticket bookings can be done.', tag: 'Web App' },
];

export const fallbackCerts = [
  { order: 0, name: 'Building with the Claude API', issuer: 'Anthropic', link: null, status: 'In Progress' },
  { order: 1, name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', link: 'https://verify.skilljar.com/c/posuk68qv4xs' },
  { order: 2, name: 'Certificate of Completion: Al Fluency Framework & Foundations', issuer: 'Anthropic', link: 'https://verify.skilljar.com/c/owyb4iff2scm' },
  { order: 3, name: 'Certificate of completion: Claude 101', issuer: 'Anthropic', link: 'https://verify.skilljar.com/c/cnr5hvpjmhxa' },
  { order: 4, name: 'Citi - ICG Technology Software Development Job Simulation', issuer: 'Forage', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Citi/2jxESPvorR7fmypXj_Citi_8ui299Fzpd2EpzYC3_1696139978359_completion_certificate.pdf' },
  { order: 5, name: 'Commonwealth Bank - Introduction to Software Engineering Job Simulation', issuer: 'Forage', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Commonwealth%20Bank/wJMjCSKFhuj97x6F3_Commonwealth%20Bank_8ui299Fzpd2EpzYC3_1695787036324_completion_certificate.pdf' },
  { order: 6, name: 'Walmart USA - Advanced Software Engineering Job Simulation', issuer: 'Forage', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Walmart%20USA/oX6f9BbCL9kJDJzfg_Walmart%20USA_8ui299Fzpd2EpzYC3_1695805588599_completion_certificate.pdf' },
  { order: 7, name: 'GE Aerospace - Explore Digital Technology Job Simulation', issuer: 'Forage', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/GE%20Aerospace/fjk7MFbQbedPXb3ws_GE%20Aerospace_8ui299Fzpd2EpzYC3_1696159179132_completion_certificate.pdf' },
  { order: 8, name: 'Standard Bank - Software Engineering Job Simulation', issuer: 'Forage', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Standard%20Bank%20/8Mgcdiuo2mfSRCfjc_Standard%20Bank%20_8ui299Fzpd2EpzYC3_1701147386056_completion_certificate.pdf' },
];
