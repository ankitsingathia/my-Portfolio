import React from 'react';
import { SiCodechef, SiLeetcode } from 'react-icons/si';
import './profiles.scss';

const Profiles: React.FC = () => {
  const profiles = [
    {
      platform: 'LeetCode',
      username: 'AnkitSingahia',
      link: 'https://leetcode.com/u/AnkitSingahia/',
      icon: <SiLeetcode />,
      color: '#ffa116',
      rating: '1000+ solved (Rating: 1790)',
      description: 'Arrays, DP, graphs, trees, and system design problems for technical interviews.'
    },
    {
      platform: 'CodeChef',
      username: 'ankitsingathia',
      link: 'https://www.codechef.com/users/ankitsingathia',
      icon: <SiCodechef />,
      color: '#5b4638',
      rating: '3-Star (1651)',
      description: 'Competitive programming profile with 30 solved problems.'
    }
  ];

  return (
    <section className="profiles-section" id="profiles">
      <div className="profiles-container">
        <h2 className="profiles-title text-gradient">Coding Profiles</h2>
        <div className="profiles-grid">
          {profiles.map((profile, index) => (
            <a 
              key={index} 
              href={profile.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="profile-card"
              style={{ '--platform-color': profile.color } as React.CSSProperties}
            >
              <div className="profile-icon">
                {profile.icon}
              </div>
              <div className="profile-info">
                <h3>{profile.platform}</h3>
                <p className="username">@{profile.username}</p>
                <p className="rating">{profile.rating}</p>
                <p className="description">{profile.description}</p>
              </div>
              <div className="card-shine"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profiles;
