import React from 'react';
import { ResumeData } from './resumetypes';
import resumeData from '../../data/resume.json';
import './resume.scss';
import VisualAid from './visualaid';
// @ts-ignore
import ankitResumePdf from '../../assets/resume/ankitresume.pdf';

const Resume: React.FC = () => {
  const data: ResumeData = resumeData;

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
            <iframe
              title="Ankit Singathia Resume"
              src={`${ankitResumePdf}#toolbar=0`}
              width="100%"
              height="600px"
              allow="autoplay"
            ></iframe>
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
