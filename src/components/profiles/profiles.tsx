import React from 'react';
import { SiCodeforces, SiLeetcode } from 'react-icons/si';
import './profiles.scss';

const Profiles: React.FC = () => {
  const profiles = [
    {
      platform: 'Codeforces',
      username: 'AnkitMnit',
      link: 'https://codeforces.com/profile/AnkitMnit',
      icon: <SiCodeforces />,
      color: '#1f8acb',
      rating: 'Specialist (1540+)',
      description: 'Competitive Programmer solving complex algorithmic challenges.'
    },
    {
      platform: 'LeetCode',
      username: 'ankit_singathia1',
      link: 'https://leetcode.com/u/ankit_singathia1/',
      icon: <SiLeetcode />,
      color: '#ffa116',
      rating: 'Solved 300+ Problems',
      description: 'Practicing data structures and algorithms for technical excellence.'
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
