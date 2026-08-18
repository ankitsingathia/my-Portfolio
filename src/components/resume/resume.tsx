import React, { useEffect, useRef, useState } from 'react';
import { ResumeData } from './resumetypes';
import resumeData from '../../data/resume.json';
import './resume.scss';
import VisualAid from './visualaid';
// @ts-ignore
import ankitResumePdf from '../../assets/resume/Ankit_2022uec1769.pdf';

const Resume: React.FC = () => {
  const data: ResumeData = resumeData;
  // The PDF used to load with the page even though it sits far below the fold.
  // It now loads by itself as soon as the section scrolls into view -- no click
  // needed -- so the reader still just sees their resume, but the bytes are not
  // spent by someone who never scrolls this far.
  const [showPdf, setShowPdf] = useState(false);
  const pdfSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pdfSlotRef.current;
    if (!el || showPdf) return;

    if (!('IntersectionObserver' in window)) {
      setShowPdf(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowPdf(true);
      },
      { rootMargin: '400px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showPdf]);

  return (
    <div className="resume-container" id="resume">
      <div className="content-wrapper">
        <div className="left-column">
          {data.sections
            .filter((section) => ['Experience', 'Certifications', 'Achievements', 'Skills'].includes(section.title))
            .map((section) => (
              <VisualAid key={section.title} section={section} />
            ))}
        </div>
        <div className="right-column">
          <div className="education-preview">
            {data.sections
              .filter((section) => section.title === 'Education')
              .map((section) => (
                <VisualAid key={section.title} section={section} />
              ))}
          </div>
          <div className="pdf-viewer">
            <h3 className="pdf-title">Full Resume</h3>
            <div ref={pdfSlotRef}>
              {showPdf ? (
                <iframe
                  title="Ankit Singathia Resume"
                  src={`${ankitResumePdf}#toolbar=0`}
                  width="100%"
                  height="600px"
                ></iframe>
              ) : (
                /* Same footprint as the iframe so nothing jumps when it swaps in. */
                <div className="pdf-placeholder" aria-hidden="true">
                  <span className="pdf-placeholder-icon">&#128196;</span>
                  <span className="pdf-placeholder-label">Loading resume&hellip;</span>
                </div>
              )}
            </div>
            <div className="pdf-footer">
              <a href={ankitResumePdf} download="Ankit_Singathia_Resume.pdf" className="download-button">
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
