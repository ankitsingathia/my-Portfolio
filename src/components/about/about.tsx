import React, { useState, useEffect } from "react";
import "./about.scss";

import ankit1 from "../../assets/me/jpg/IMG_20250301_170848.jpg";
import ankit2 from "../../assets/me/webp/IMAGE.png";

const photos = [ankit1, ankit2];

const About: React.FC = () => {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    setPhoto(randomPhoto);
  }, []);

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p>
            Hello! My name is <span className="purple-text">Ankit Singathia</span>.
            I'm a passionate developer and final-year student at <span className="purple-text">MNIT Jaipur</span>, where I'm pursuing my B.Tech in Electronics and Communication Engineering.
            Most recently, I completed a internship as a{" "}
            <span className="purple-text">
              Software Development Intern at{" "}
              <a
                href="https://www.airtel.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bharti Airtel Limited
              </a>
            </span>.
          </p>
          <p>
            My interests are deeply rooted in
            <span className="purple-text">
              {" "}
              Full-Stack Development, AI/ML, and Competitive Programming.
            </span> {" "}
            I'm a Specialist on Codeforces and enjoy solving complex algorithmic problems.
          </p>
          <p>
            I love building applications that solve real-world problems. Whether it's an AI-powered trip planner like <span className="purple-text">TravelGenie</span> or a real-time messaging platform, I strive to create seamless user experiences with modern technologies like React, Node.js, and Generative AI.
          </p>
          <p>
            Beyond coding, I have a keen interest in film making and marketing. I've served as the{" "}
            <span className="purple-text">General Secretary of the Film Making Club</span> at MNIT and was a core member of the marketing team for <span className="purple-text">Blitzschlag</span>, Rajasthan's largest college cultural fest.
          </p>
          <p>
            When I'm not coding or participating in hackathons, you'll find me exploring new technologies, participating in competitive programming contests, or working on creative film projects.
          </p>
          <p>
            If you want to keep up to date with my work or collaborate on an exciting project, definitely connect with me over on{" "}
            <a
              href="https://www.linkedin.com/in/ankit-singathia-467203258/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              LinkedIn
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/ankitsingathia"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="about-photo">
          <img src={photo} alt="Ankit Singathia" />
        </div>
      </section>
    </div>
  );
};

export default About;
