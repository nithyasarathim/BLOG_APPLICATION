import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../assets/hero-bg.png";
import "./HeroAnimations.css";

const Hero = () => {
  const texts = ["Your Words, Your Legacy", "Write. Share. Inspire.", "Every Story Matters"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="hero-container text-center d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundImage: `url(${background})`, height: "65vh", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <h1 className={`hero-title ${fade ? "fade-in" : "fade-out"}`}>{texts[index]}</h1>
      <p className="hero-subtitle">Join a thriving community of storytellers, thinkers, and creators.</p>

      <div className="hero-actions">
        <Link to="/create-post" className="btn btn-primary hero-btn" style={{backgroundColor:"rgb(0, 208, 255)"}}>Start Writing</Link>
        <a href="#blogs" className="btn btn-secondary hero-btn">Discover Stories</a>
      </div>

      <div className="hero-footer">
        <p className="animated-text">
          ✍️ "Great stories begin with a single word. Start yours today."
        </p>
      </div>
    </div>
  );
};

export default Hero;
