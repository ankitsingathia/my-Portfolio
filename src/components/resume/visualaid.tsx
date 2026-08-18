import React from 'react';
import { ResumeSection } from './resumetypes';

const VisualAid: React.FC<{ section: ResumeSection }> = ({ section }) => {
  return (
    <div className="section-container">
      <h2 className="section-title">{section.title}</h2>
      <div className="line-container">
        {section.entries.map((entry) => (
          <div key={entry.title} className="job-container">
            <h3 className="job-title">
              {entry.title} <span className="company">{entry.company}</span>
            </h3>
            <p className="job-dates">{entry.dates}</p>
            {entry.bulletPoints && (
              <ul>
                {entry.bulletPoints.map((bulletPoint) => (
                  <li key={bulletPoint} className="bullet-point">
                    {bulletPoint}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualAid;