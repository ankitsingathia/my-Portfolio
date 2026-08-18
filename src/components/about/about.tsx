import React, { useState, useEffect } from "react";
import "./about.scss";

import portrait from "../../assets/me/webp/potrait.webp";
import headshot from "../../assets/me/webp/headshot.webp";

const photos = [
  { src: portrait, alt: "Ankit Singathia" },
  { src: headshot, alt: "Ankit Singathia, portrait" },
];

const CROSSFADE_INTERVAL_MS = 5000;

const About: React.FC = () => {
  // Start on a random photo (as before), then alternate between them.
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * photos.length)
  );

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      CROSSFADE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p>
            Hello! My name is <span className="purple-text">Ankit Singathia</span>.
            I'm a passionate developer and a <span className="purple-text">Graduate from MNIT Jaipur</span>, where I completed my B.Tech in Electronics and Communication Engineering.
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
            I practice on LeetCode and CodeChef and enjoy solving complex algorithmic problems.
          </p>
          <p>
            I love building applications that solve real-world problems. Whether it's an AI-powered trip planner like <span className="purple-text">Wanderly</span> or a professional AI diagnostic system like <span className="purple-text">MDPS</span>, I strive to create seamless user experiences with modern technologies like React, Node.js, and Generative AI.
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
          {/* Both photos are stacked and cross-faded, so the box never resizes
              even though the two images have different aspect ratios. */}
          <div className="photo-stack">
            {photos.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={i === index ? p.alt : ""}
                aria-hidden={i === index ? undefined : true}
                className={i === index ? "is-visible" : ""}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
