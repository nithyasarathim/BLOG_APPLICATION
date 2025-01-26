import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  
  const phrases = [
    'Platform to share your ideas',
    'Connect with like-minded individuals',
    'Express yourself through blogging',
    'Explore a variety of topics',
    'Engage with a vibrant community',
    'Discover and share your passions',
    'Inspire others with your words',
    'Join us and start your journey!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFadeOut(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases]);

  const gotoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <img src={logo} alt="BlogIt Logo" className="logo" />
        <h1 className="title">Transform your thoughts into a vibrant community!</h1>
        <p className={`dynamic-subtitle ${fadeOut ? 'fade-out' : 'fade-in'}`}>
          {phrases[currentPhraseIndex]}
        </p>
        <button className="login-button" onClick={gotoLogin}>
          Let's get started!
        </button>
      </div>
    </div>
  );
};

export default Home;
