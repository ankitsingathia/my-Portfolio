import React, { useState, useMemo } from 'react';
import { FaGithub, FaGlobe, FaSearch } from 'react-icons/fa';
import './projects.scss';

// Project previews. The motion previews are short silent videos rather than
// GIFs -- see project_media.tsx for why.
import ProjectMedia, { MediaAsset } from './project_media';

import portfolioWebm from '../../assets/projects/video/Portfolio.webm';
import portfolioMp4 from '../../assets/projects/video/Portfolio.mp4';
import portfolioPoster from '../../assets/projects/video/Portfolio-poster.webp';
import wanderlyWebm from '../../assets/projects/video/wanderly.webm';
import wanderlyMp4 from '../../assets/projects/video/wanderly.mp4';
import wanderlyPoster from '../../assets/projects/video/wanderly-poster.webp';
import mdpsWebm from '../../assets/projects/video/mdpsgif.webm';
import mdpsMp4 from '../../assets/projects/video/mdpsgif.mp4';
import mdpsPoster from '../../assets/projects/video/mdpsgif-poster.webp';
import chatAppImg from '../../assets/projects/ChatApp.webp';

// Import projects data
import projectsData from '../../data/projects.json'; 

// Project interface for type safety
interface Project {
  id: string;
  title: string;
  description: string;
  media: string;
  featured: boolean;
  category: 'big' | 'small';
  technologies: {
    languages: string[];
    frameworks: string[];
    libraries: string[];
  };
  tags: string[];
  links: {
    github: string;
    demo: string | null;
  };
}


// Asset mapping for project previews
const mediaMap: { [key: string]: MediaAsset } = {
  portfolio: { poster: portfolioPoster, webm: portfolioWebm, mp4: portfolioMp4 },
  wanderly: { poster: wanderlyPoster, webm: wanderlyWebm, mp4: wanderlyMp4 },
  mdps: { poster: mdpsPoster, webm: mdpsWebm, mp4: mdpsMp4 },
  'chat-app': { poster: chatAppImg },
};

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    (projectsData.projects as Project[]).forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and order projects based on search term, selected tag, and featured toggle
  const filteredProjects = useMemo(() => {
    const allProjects = (projectsData.projects as Project[]);

    // Base filter: search + tag always apply across all projects
    let filtered = allProjects.filter(project => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.languages.some(lang => lang.toLowerCase().includes(query)) ||
        project.technologies.frameworks.some(fw => fw.toLowerCase().includes(query)) ||
        project.technologies.libraries.some(lib => lib.toLowerCase().includes(query)) ||
        project.tags.some(tag => tag.toLowerCase().includes(query));

      const matchesTag = !selectedTag || project.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });

    // When not showing all AND there is no active search or tag filter,
    // show only featured projects
    if (!showAll && !searchTerm && !selectedTag) {
      filtered = filtered.filter(p => p.featured);
    }

    // Always prioritize featured projects higher in the list
    filtered = filtered.sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });

    return filtered;
  }, [searchTerm, selectedTag, showAll]);

  const bigProjects = filteredProjects.filter(project => project.category === 'big');
  const smallProjects = filteredProjects.filter(project => project.category === 'small');

  const renderTechnologies = (technologies: Project['technologies'], isSmall: boolean = false) => {
    const allTech = [
      ...technologies.languages,
      ...technologies.frameworks,
      ...technologies.libraries
    ];

    return (
      <div className="project-technologies">
        <span className="tech-uses">Uses:</span>
        <div className="tech-items">
          {allTech.map((tech, index) => (
            <span key={index} className="tech-item">{tech}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderProject = (project: Project, isSmall: boolean = false) => {
    const media = mediaMap[project.media] || mediaMap.portfolio;
    const containerClass = isSmall ? 'small-project' : 'project-container';

    return (
      <div key={project.id} className={containerClass}>
        <ProjectMedia media={media} title={project.title} />
        <div className="project-content">
          <div className="project-header">
            <h3>{project.title}</h3>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <p className="project-description">{project.description}</p>
          {renderTechnologies(project.technologies, isSmall)}
          <div className="project-links">
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <FaGithub /> See on GitHub
            </a>
            {project.links.demo ? (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <FaGlobe /> Try it Out
              </a>
            ) : (
              /* No live demo yet. Render it as plainly unavailable rather than as
                 a link-alike that only fires an alert. */
              <span className="demo-unavailable">
                <FaGlobe /> Demo coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="projects-container" id="projects">
      <h2 className="section-title">Projects</h2>
      
      <div className="projects-controls">
        <div className="search-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects, technologies, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`show-all-button ${showAll ? 'active' : ''}`}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Featured' : 'Show All Projects'}
          </button>
        </div>
        
        <div className="filter-tags">
          <button
            className={`tag-filter ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            All Tags
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
  
      <div className="projects-display">
        {filteredProjects.length === 0 ? (
          <div className="no-results">
            No projects found matching your search criteria.
          </div>
        ) : (
          <>
            {bigProjects.length > 0 && (
              <div className="big-projects-container">
                {bigProjects.map(project => renderProject(project, false))}
              </div>
            )}
  
            {smallProjects.length > 0 && (
              <div className="small-projects-container">
                {smallProjects.map(project => renderProject(project, true))}
                
                {/* Coming Soon project - only show if not filtering and showing all or fewer than 6 projects */}
                {!searchTerm && !selectedTag && (smallProjects.length < 4 || showAll) && (
                  <div className="coming-soon-project">
                    <div className="project-content">
                      <h3>More Projects Coming Soon...</h3>
                      <p>Stay tuned for more exciting projects!</p>
                      <div className="project-links">
                        <a href="https://github.com/ankitsingathia" target="_blank" rel="noopener noreferrer">
                          <FaGithub /> See on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
