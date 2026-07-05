'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BackgroundEffects from './BackgroundEffects';
import DesktopIcon from './DesktopIcon';
import Hero from './Hero';
import PixelButton from './PixelButton';
import Taskbar from './Taskbar';
import WindowFrame from './WindowFrame';
import {
  ComputerGlyph,
  ContactGlyph,
  FolderGlyph,
  ResumeGlyph,
  SkillsGlyph
} from './RetroIcons';

const desktopItems = [
  { label: 'About Me', id: 'about', icon: ComputerGlyph },
  { label: 'Skills', id: 'skills', icon: SkillsGlyph },
  { label: 'Projects', id: 'projects', icon: FolderGlyph },
  { label: 'Contact', id: 'contact', icon: ContactGlyph },
  { label: 'Resume', id: 'resume', icon: ResumeGlyph }
];

const sectionTitles = {
  about: 'ABOUT ME',
  skills: 'SKILLS',
  projects: 'PROJECTS',
  contact: 'CONTACT',
  resume: 'RESUME',
} as const;

const sectionSubtitles = {
  about: 'B.E. CSE student at SSN College of Engineering.',
  skills: 'Programming, web tech, data tools, and databases.',
  projects: 'Java, Python, and AI projects from the resume.',
  contact: 'Reach out by email, LinkedIn, or GitHub.',
  resume: 'Education, achievements, and extracurricular highlights.',
} as const;

const aboutHighlights = [
  ['Program', 'B.E. Computer Science and Engineering'],
  ['College', 'SSN College of Engineering'],
  ['Interests', 'AI, ML, and Web Development'],
  ['Strength', 'Problem solving and teamwork']
] as const;

const skillGroups = [
  ['Programming Languages', 'Java, Python, C'],
  ['Web Technologies', 'HTML, CSS, JavaScript, React.js'],
  ['Tools & Libraries', 'TensorFlow, Matplotlib, Pandas'],
  ['Database Technologies', 'Oracle SQL, Database design, ER models'],
  ['Interests', 'Artificial Intelligence, Machine Learning, Web Development']
] as const;

const projectCards = [
  {
    title: 'Lost and Found System',
    text: 'A Java-based item tracking system built with modular OOP architecture and serialized data management.',
    bullets: ['Categorized search', 'Record persistence', 'Status-based retrieval workflows']
  },
  {
    title: 'StudyBuddy AI',
    text: 'A multilingual AI learning assistant built with Python, Streamlit, and Groq LLaMA APIs.',
    bullets: ['Real-time academic query handling', 'Hinglish support', 'Tanglish support']
  },
  {
    title: 'Emotion Recognition System',
    text: 'A CNN-based real-time emotion recognition system using TensorFlow, OpenCV, and Python.',
    bullets: ['FER-2013 preprocessing', 'Live webcam inference', 'Streamlit analytics']
  }
] as const;

const educationRows = [
  ['B.E. Computer Science and Engineering', 'SSN College of Engineering', '2024-28', '7.89'],
  ['12th', 'Kids Club Matric Higher Secondary School', '2023-24', '98.3'],
  ['10th', 'St. Joseph\'s Matric Higher Secondary School', '2022-23', '95']
] as const;

const achievements = [
  'Secured 100/100 in 12th Mathematics [2024]',
  'Secured 100/100 in 12th Computer Science [2024]',
  'Achieved Elite + Gold in NPTEL Affective Computing [2026]'
] as const;

const activities = [
  'Shortlisted for the Ideathon',
  'Participated in the srm-hackathon'
] as const;

const extracurricular = ['Canva designer', 'Portrait drawing and painting', 'Photography'] as const;

type SectionId = keyof typeof sectionTitles;

export default function PortfolioDesktop() {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date());

    setCurrentTime(format());
    const timer = window.setInterval(() => setCurrentTime(format()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'about' || id === 'skills' || id === 'projects' || id === 'contact' || id === 'resume') {
      setActiveSection(id);
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const externalNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const closeAllWindows = () => {
    setActiveSection(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <BackgroundEffects />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
        className="relative z-10 min-h-screen pb-24"
      >
          <header className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-black bg-burgundy/95 px-3 py-2 text-cream shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-[1px] sm:px-4">
            <div className="flex w-full items-center justify-start">
              <div className="pixel-font text-left text-[11px] leading-none sm:text-[13px]">
                Sujitha&apos;s PC
              </div>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[1500px] flex-col lg:flex-row">
            <aside className="fixed left-2 top-[4.5rem] z-50 hidden w-36 flex-col gap-2 px-1 lg:flex xl:left-4 xl:top-[5.5rem]">
              {desktopItems.map((item, index) => (
                <DesktopIcon
                  key={item.id}
                  label={item.label}
                  icon={item.icon}
                  delay={0.65 + index * 0.11}
                  onClick={() => scrollToSection(item.id)}
                />
              ))}
            </aside>

            <main className="relative min-h-screen flex-1 px-2 pt-14 sm:px-4 lg:pl-40 lg:pr-4">
              <div className="sticky top-14 z-50 mx-auto mb-3 max-w-5xl lg:hidden">
                <div className="window-shadow border-[3px] border-black bg-[#f0e4cf] px-2 py-2">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {desktopItems.map((item, index) => (
                      <div key={item.id} className="shrink-0">
                        <DesktopIcon
                          label={item.label}
                          icon={item.icon}
                          delay={0.18 + index * 0.07}
                          compact
                          onClick={() => scrollToSection(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Hero ready onExplore={() => scrollToSection('projects')} />
            </main>
          </div>

          <Taskbar currentTime={currentTime} />

          {activeSection ? (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/12 px-3 py-6 sm:px-4 sm:py-8"
              onClick={closeAllWindows}
            >
              <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
                <WindowFrame
                  title={sectionTitles[activeSection]}
                  subtitle={sectionSubtitles[activeSection]}
                  onClose={closeAllWindows}
                  className="h-[min(78vh,44rem)] w-full"
                >
                  <AnimatePresence mode="sync" initial={false}>
                    {activeSection === 'about' ? (
                      <motion.div
                        key="about"
                        className="grid gap-5 sm:grid-cols-[1.3fr_0.95fr]"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
                      >
                        <div className="space-y-4">
                          <p className="text-[18px] leading-7 text-ink/85 sm:text-[21px] sm:leading-8">
                            I am Sujitha C B, a B.E. Computer Science and Engineering student at SSN College of
                            Engineering with a strong interest in AI, machine learning, and web development.
                          </p>
                          <p className="mt-4 text-[17px] leading-7 text-ink/75 sm:text-[19px] sm:leading-8">
                            My work focuses on practical projects, problem solving, and building useful tools with
                            Java, Python, React, and data-driven technologies.
                          </p>
                        </div>
                        <div className="grid gap-3">
                          {aboutHighlights.map(([label, value]) => (
                            <div
                              key={label}
                              className="border-[3px] border-black bg-[#f7f1e4] p-2.5 shadow-[0_2px_0_rgba(255,255,255,0.6)_inset] sm:p-3"
                            >
                              <div className="pixel-font text-[10px] text-burgundy">{label}</div>
                              <div className="mt-1 text-[17px] text-ink sm:text-[18px]">{value}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}

                    {activeSection === 'skills' ? (
                      <motion.div
                        key="skills"
                        className="grid gap-3 sm:grid-cols-2"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
                      >
                        {skillGroups.map(([label, value]) => (
                          <div
                            key={label}
                            className="border-[3px] border-black bg-[#efe0c1] p-3 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] sm:p-4"
                          >
                            <div className="pixel-font text-[10px] text-burgundy sm:text-[11px]">{label}</div>
                            <div className="mt-2 text-[17px] leading-7 text-ink sm:text-[18px]">{value}</div>
                          </div>
                        ))}
                      </motion.div>
                    ) : null}

                    {activeSection === 'projects' ? (
                      <motion.div
                        key="projects"
                        className="grid gap-4"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
                      >
                        {projectCards.map((project) => (
                          <article
                            key={project.title}
                            className="border-[3px] border-black bg-[#f5ebd8] p-3 sm:p-4"
                          >
                            <h3 className="pixel-font text-[12px] text-burgundy sm:text-[13px]">{project.title}</h3>
                            <p className="mt-2 text-[17px] leading-7 text-ink/78 sm:text-[19px]">{project.text}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {project.bullets.map((badge) => (
                                <span
                                  key={badge}
                                  className="border border-black bg-[#efe3cd] px-2 py-1 text-[12px] sm:text-[14px]"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </article>
                        ))}
                      </motion.div>
                    ) : null}

                    {activeSection === 'contact' ? (
                      <motion.div
                        key="contact"
                        className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr]"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
                      >
                        <div>
                          <p className="text-[18px] leading-7 text-ink/85 sm:text-[20px] sm:leading-8">
                            If you want to connect about projects, internships, or collaboration, you can reach me by
                            email, LinkedIn, or GitHub.
                          </p>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <PixelButton
                              onClick={() => externalNavigate('mailto:ssuji7846@gmail.com')}
                              className="w-full min-w-0 px-2 py-3 text-[9px] leading-none sm:px-3 sm:text-[11px]"
                            >
                              EMAIL ME
                            </PixelButton>
                            <PixelButton
                              onClick={() => externalNavigate('https://github.com/Sujithasekar1106')}
                              className="w-full min-w-0 bg-[#8c2330] px-2 py-3 text-[9px] leading-none hover:bg-[#a02738] sm:px-3 sm:text-[11px]"
                            >
                              GITHUB
                            </PixelButton>
                            <PixelButton
                              onClick={() =>
                                externalNavigate(
                                  'https://www.linkedin.com/in/sujithacb/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BM9vw9nAaQGSL7eL%2FLlKSjw%3D%3D'
                                )
                              }
                              className="w-full min-w-0 px-2 py-3 text-[9px] leading-none sm:px-3 sm:text-[11px]"
                            >
                              LINKEDIN
                            </PixelButton>
                          </div>
                        </div>
                        <div className="border-[3px] border-black bg-[#f7ead6] p-4">
                          <div className="pixel-font text-[11px] text-burgundy">CONTACT</div>
                          <div className="mt-3 space-y-3 text-[18px]">
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 bg-burgundy" />
                              <span>ssuji7846@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 bg-burgundy" />
                              <span>github.com/Sujithasekar1106</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 bg-burgundy" />
                              <span>linkedin.com/in/sujithacb</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}

                    {activeSection === 'resume' ? (
                      <motion.div
                        key="resume"
                        className="space-y-4"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: 'easeOut' }}
                      >
                        <div className="flex justify-end">
                          <a
                            href="/Sujitha_CB_resume.pdf"
                            download="Sujitha_C_B_Resume.pdf"
                            className="pixel-font inline-flex items-center justify-center border-[3px] border-black bg-burgundy px-4 py-3 text-[10px] text-cream shadow-retro transition-colors duration-150 hover:bg-[#7e121f] sm:px-5 sm:text-[11px]"
                          >
                            DOWNLOAD PDF
                          </a>
                        </div>
                        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                          <div className="space-y-4">
                            <div className="border-[3px] border-black bg-[#f7f1e4] p-3 sm:p-4">
                              <div className="pixel-font text-[11px] text-burgundy">EDUCATION</div>
                              <div className="mt-3 space-y-3">
                                {educationRows.map(([course, institution, year, score]) => (
                                  <div key={`${course}-${institution}`} className="border-[2px] border-black bg-[#fffaf0] p-3">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                      <div>
                                        <div className="pixel-font text-[10px] text-burgundy sm:text-[11px]">{course}</div>
                                        <div className="mt-1 text-[16px] leading-6 text-ink sm:text-[18px]">{institution}</div>
                                      </div>
                                      <div className="text-right text-[14px] leading-5 text-ink/75 sm:text-[16px]">
                                        <div>{year}</div>
                                        <div>{score}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="border-[3px] border-black bg-[#f7f1e4] p-3 sm:p-4">
                              <div className="pixel-font text-[11px] text-burgundy">EXTRACURRICULAR</div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {extracurricular.map((item) => (
                                  <span key={item} className="border border-black bg-[#efe3cd] px-2 py-1 text-[13px] sm:text-[14px]">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="border-[3px] border-black bg-[#f5ebd8] p-3 sm:p-4">
                              <div className="pixel-font text-[11px] text-burgundy">SCHOLASTIC ACHIEVEMENTS</div>
                              <div className="mt-3 space-y-2.5">
                                {achievements.map((item) => (
                                  <div key={item} className="border-[2px] border-black bg-[#fffaf0] px-3 py-2 text-[16px] leading-6 sm:text-[17px]">
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="border-[3px] border-black bg-[#f7ead6] p-3 sm:p-4">
                              <div className="pixel-font text-[11px] text-burgundy">TECHNICAL ACTIVITIES</div>
                              <div className="mt-3 space-y-2.5">
                                {activities.map((item) => (
                                  <div key={item} className="border-[2px] border-black bg-[#fffaf0] px-3 py-2 text-[16px] leading-6 sm:text-[17px]">
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </WindowFrame>
              </div>
            </div>
          ) : null}

      </motion.div>
    </div>
  );
}
