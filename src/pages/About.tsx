import { motion } from "framer-motion"; import { ArrowLeft, Download } from "lucide-react"; import { useNavigate } from "react-router-dom"; import { useEffect, useState } from "react"; import html2pdf from "html2pdf.js"; export default function About() { const navigate = useNavigate(); const text = "About Myself"; const [displayedText, setDisplayedText] = useState(""); const [countdown, setCountdown] = useState(null); const [downloading, setDownloading] = useState(false);  useEffect(() => { let index = 0; let interval; const startTyping = () => { setDisplayedText(""); interval = setInterval(() => { index++; setDisplayedText(text.slice(0, index)); if (index === text.length) { clearInterval(interval); setTimeout(() => { index = 0; startTyping(); }, 5000); } }, 120); }; startTyping(); return () => clearInterval(interval); }, []);  const handleDownload = () => { if (downloading) return; setDownloading(true); setCountdown(3); let time = 3; const timer = setInterval(() => { time--; setCountdown(time); if (time <= 0) { clearInterval(timer);  const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nag Prathik M G Resume</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; }
body { font-family: 'Segoe UI', 'Helvetica Neue', Tahoma, Geneva, Verdana, sans-serif; background: #000000; padding: 20px; min-height: 100vh; overflow-x: hidden; }
.container { max-width: 900px; margin: 0 auto; }
.resume-wrapper { background: #0d0d0d; border: 1px solid #222222; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8); }
.header { background: #000000; border-bottom: 2px solid #333333; padding: 45px 40px; display: flex; gap: 40px; align-items: flex-start; }
.profile-photo { width: 150px; height: 150px; border-radius: 12px; border: 3px solid #444444; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6); flex-shrink: 0; object-fit: cover; }
.header-content { flex: 1; }
.header-content h1 { font-size: 36px; margin-bottom: 8px; font-weight: 700; color: #ffffff; }
.header-content .title { font-size: 16px; color: #b0b0b0; margin-bottom: 18px; font-weight: 400; letter-spacing: 0.5px; }
.contact-info { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
.contact-item { display: flex; align-items: center; gap: 8px; padding: 8px; background: #1a1a1a; border-radius: 6px; border: 1px solid #333333; }
.contact-item a { color: #ffffff; text-decoration: none; word-break: break-all; }
.content { padding: 40px; background: #0d0d0d; }
.section { margin-bottom: 35px; }
.section-title { font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #333333; text-transform: uppercase; letter-spacing: 2px; }
.summary-text { color: #d0d0d0; line-height: 1.8; font-size: 14px; background: #1a1a1a; padding: 20px; border-left: 3px solid #555555; border-radius: 6px; border: 1px solid #2a2a2a; }
.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.skill-category { background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #2a2a2a; }
.skill-category h3 { color: #ffffff; font-size: 14px; margin-bottom: 15px; font-weight: 600; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 10px; }
.skill-tag { background: #2a2a2a; color: #e0e0e0; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 500; border: 1px solid #3a3a3a; }
.experience-item { background: #1a1a1a; padding: 18px; border-radius: 6px; border: 1px solid #2a2a2a; border-left: 3px solid #444444; margin-bottom: 15px; }
.experience-item h3 { color: #ffffff; font-size: 15px; font-weight: 600; display: flex; justify-content: space-between; }
.experience-item .duration { font-size: 13px; color: #888888; font-weight: 400; }
.experience-item .company { font-size: 13px; color: #b0b0b0; margin-bottom: 8px; }
.experience-item ul { margin-left: 15px; color: #d0d0d0; font-size: 13px; line-height: 1.6; }
.project-item { background: #1a1a1a; padding: 18px; border-radius: 6px; border: 1px solid #2a2a2a; border-left: 3px solid #444444; margin-bottom: 15px; }
.project-item h3 { color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 5px; }
.project-item .tech-used { font-size: 12px; color: #888888; margin-bottom: 8px; font-family: monospace; }
.project-item ul { margin-left: 15px; color: #d0d0d0; font-size: 13px; line-height: 1.6; }
.education-item { background: #1a1a1a; padding: 18px; border-radius: 6px; border: 1px solid #2a2a2a; border-left: 3px solid #444444; margin-bottom: 15px; }
.education-item h3 { color: #ffffff; font-size: 15px; font-weight: 600; display: flex; justify-content: space-between; }
.education-item .duration { font-size: 13px; color: #888888; font-weight: 400; }
.education-item p { color: #b0b0b0; font-size: 13px; margin-top: 4px; }
@media print { body { background: #000000; padding: 0; } }
</style>
</head>
<body>
<div class="container">
<div class="resume-wrapper">
<div class="header">
<img src="https://raw.githubusercontent.com/nagprathikmg01/web-images-link/31f4e55d34521861579bab4ab322372fe7d8cec4/Name%20%3D%20Prince%20Singh.png" alt="Nag Prathik M G" class="profile-photo">
<div class="header-content">
<h1>Nag Prathik M G</h1>
<p class="title">AI / ML Engineer & QA Automation Expert</p>
<div class="contact-info">
<div class="contact-item">
<a href="https://naagasumukh.engineer/" target="_blank">Portfolio: naagasumukh.engineer</a>
</div>
<div class="contact-item">
<a href="https://github.com/nagprathikmg01" target="_blank">GitHub: nagprathikmg01</a>
</div>
<div class="contact-item">
<a href="mailto:nagprathikmg@gmail.com">nagprathikmg@gmail.com</a>
</div>
<div class="contact-item">
<span>Phone: +91-88926-86763</span>
</div>
</div>
</div>
</div>
<div class="content">
<section class="section">
<h2 class="section-title">Professional Summary</h2>
<div class="summary-text">
Passionate and self-driven Information Science and Engineering student at Nitte Meenakshi Institute of Technology (NMIT) with a strong foundation in Artificial Intelligence, Deep Learning, and Software QA Automation. Experienced student coordinator, Google Student Ambassador at GDSC NMIT, and builder of robust predictive models and agricultural analytics solutions.
</div>
</section>
<section class="section">
<h2 class="section-title">Technical Skills</h2>
<div class="skills-grid">
<div class="skill-category">
<h3>Languages & Frameworks</h3>
<div class="skill-tags">
<span class="skill-tag">Python</span>
<span class="skill-tag">Java</span>
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">TypeScript</span>
<span class="skill-tag">React.js</span>
<span class="skill-tag">FastAPI</span>
<span class="skill-tag">PyTorch</span>
<span class="skill-tag">Streamlit</span>
</div>
</div>
<div class="skill-category">
<h3>Cloud & Tools</h3>
<div class="skill-tags">
<span class="skill-tag">GCP</span>
<span class="skill-tag">AWS</span>
<span class="skill-tag">Docker</span>
<span class="skill-tag">Git</span>
<span class="skill-tag">Playwright</span>
<span class="skill-tag">MySQL</span>
<span class="skill-tag">MongoDB</span>
</div>
</div>
</div>
</section>
<section class="section">
<h2 class="section-title">Work Experience</h2>
<div class="experience-item">
<h3>Google Student Ambassador <span class="duration">Jul 2025 - Present</span></h3>
<p class="company">Google Developer Student Clubs (GDSC) NMIT</p>
<ul>
<li>Promoting cloud computing and generative AI solutions among the campus community.</li>
<li>Organizing GCP certifications study jams and AI prompt engineering workshops.</li>
</ul>
</div>
<div class="experience-item">
<h3>Head of Events <span class="duration">Dec 2024 - Present</span></h3>
<p class="company">Team Adwaitha, NMIT</p>
<ul>
<li>Coordinate event planning, logistics, and scheduling for technical challenges and developer hackathons.</li>
</ul>
</div>
</section>
<section class="section">
<h2 class="section-title">Projects</h2>
<div class="project-item">
<h3>Adaptive Drone Navigation & Drift Detection System</h3>
<p class="tech-used">Python, PyTorch, Transformers, AirSim</p>
<ul>
<li>Designed transformer deep learning model for real-time drone motion prediction with 92% accuracy.</li>
<li>Implemented automated drift detection and warning mechanisms with Streamlit diagnostics.</li>
</ul>
</div>
<div class="project-item">
<h3>Karnataka Agricultural App UI</h3>
<p class="tech-used">React, TypeScript, Vite, Tailwind, Gemini API</p>
<ul>
<li>Built full agricultural dashboard utilizing Gemini API for crop yield predictions and weather alerts.</li>
</ul>
</div>
</div>
</section>
<section class="section">
<h2 class="section-title">Education</h2>
<div class="education-item">
<h3>Bachelor of Engineering in Information Science <span class="duration">2023 - 2027</span></h3>
<p class="company">Nitte Meenakshi Institute of Technology (NMIT), CGPA: 8.45/10.0</p>
</div>
<div class="education-item">
<h3>12th Grade (PUC - PCMB) <span class="duration">2021 - 2023</span></h3>
<p class="company">Ambika PU College, Puttur - Percentage: 94%</p>
</div>
</section>
</div>
</div>
</div>
</body>
</html>`; const blob = new Blob([resumeHTML], { type: "text/html" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "Nag_Prathik_M_G_Resume.html"; document.body.appendChild(a); a.click(); document.body.removeChild(a); window.open(url, "_blank"); setTimeout(() => URL.revokeObjectURL(url), 10000); setDownloading(false); setCountdown(null); } }, 1000); };  return ( <div className="relative min-h-screen bg-[#020617] overflow-hidden text-white px-4 sm:px-6 py-10"> {/* ANIMATED BACKGROUND EFFECTS */} <div className="fixed inset-0 pointer-events-none"> <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} /> <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] opacity-60 animate-pulse" /> <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: "2.5s" }} /> </div> {/* BACK BUTTON */} <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onClick={() => navigate(-1)} className=" fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg " > <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span> </motion.button> {/* MAIN CONTENT */} <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8"> {/* IMAGE SECTION */} <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], }} className="flex flex-col items-center" > <img src="/assets/prince.png" alt="Nag Prathik M G" className=" w-[200px] sm:w-[280px] md:w-[320px] rounded-2xl border border-white/15 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-white/25 transition-all duration-300 " /> {/* DIVIDER LINE */} <div className=" mt-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-[90vw] sm:w-[400px] md:w-[500px] " /> </motion.div> {/* GLASS BOX CONTAINER */} <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1], }} className=" relative w-full max-w-4xl h-[500px] sm:h-[550px] md:h-[600px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.5)] group " > {/* GLASS LIGHT EFFECT */} <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" /> <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" /> {/* HEADER SECTION */} <div className=" relative z-20 flex items-center justify-center px-6 py-6 sm:py-8 border-b border-white/10 bg-black/30 backdrop-blur-2xl " > <h1 className=" text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight " > {displayedText} <span className="animate-pulse ml-2">|</span> </h1> </div> {/* SCROLLABLE CONTENT */} <div className=" relative z-10 h-[calc(100%-80px)] overflow-y-auto px-6 sm:px-10 md:px-12 py-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 " > <div className=" text-white/70 text-sm sm:text-base leading-8 tracking-wide space-y-6 " > <p> I am an Information Science and Engineering student at Nitte Meenakshi Institute of Technology (NMIT) in Bengaluru, pursuing my B.E. from 2023 to 2027. My technical focus revolves around Artificial Intelligence, Deep Learning, and Software QA Automation. </p> <p> I started my coding journey in high school, quickly developing a deep interest in machine learning, model training, and building robust test automation frameworks. </p> <p> Currently, I serve as a Google Student Ambassador at Google Developer Student Clubs (GDSC) NMIT, where I organize cloud computing, Generative AI, and tech workshops. I also lead event coordination as Head of Events for Team Adwaitha, and PR & Marketing for DataWiz NMIT. </p> <p> My key projects include training transformer models for real-time drone motion prediction with 92% accuracy, designing proctor client WebRTC simulators for test security, and building Gemini-powered agricultural recommendations. </p> <p> I am highly motivated to explore advanced research internships in Deep Learning and DevSecOps, bridging the gap between code intelligence and software reliability. </p> </div> </div> </motion.div> {/* DOWNLOAD BUTTON */} <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, }} onClick={handleDownload} disabled={downloading} className=" group relative overflow-hidden flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl hover:bg-white/15 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)] " > {/* BUTTON GLOW EFFECT */} <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" /> {/* BUTTON CONTENT */} <div className="relative z-10 flex items-center gap-3"> <Download size={20} className=" group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 " /> <span className="font-semibold tracking-wide"> {downloading ? `Downloading in ${countdown}s` : "Download Resume"} </span> </div> </motion.button> </div> </div> ); }