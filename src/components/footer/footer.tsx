import React from 'react';
import './footer.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodechef, SiLeetcode } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="left-align">
        <p>
          Developed & Designed with <span className="purple-heart">❤️</span> by  
          <a href="https://linkedin.com/in/ankit-singathia-467203258/" target="_blank" rel="noopener noreferrer" className="footer-link">Me</a>.
        </p>
      </div>
      <div className="center-align">
        <p>&copy; Ankit Singathia 2026</p>
      </div>
      <div className="right-align social-icons">
        <a href="https://github.com/ankitsingathia" target="_blank" rel="noopener noreferrer" aria-label="Ankit Singathia on GitHub"><FaGithub /></a>
        <a href="https://linkedin.com/in/ankit-singathia-467203258/" target="_blank" rel="noopener noreferrer" aria-label="Ankit Singathia on LinkedIn"><FaLinkedin /></a>
        <a href="https://leetcode.com/u/AnkitSingahia/" target="_blank" rel="noopener noreferrer" aria-label="Ankit Singathia on LeetCode"><SiLeetcode /></a>
        <a href="https://www.codechef.com/users/ankitsingathia" target="_blank" rel="noopener noreferrer" aria-label="Ankit Singathia on CodeChef"><SiCodechef /></a>
      </div>
    </footer>
  );
};

export default Footer;
