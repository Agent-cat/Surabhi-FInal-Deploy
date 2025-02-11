import React, { useState, useEffect } from 'react';
import './index.css';
import img from './assets/logo.png';
import lantern1 from './assets/Lantern1.png';
import confetti from 'canvas-confetti';

const DeploymentAnimation = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    'Installing dependencies...',
    'Configuring environment...',
    'Setting up VS Code...',
    'Optimizing performance...',
    'Deploying assets...',
    'Final checks...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev === steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            onComplete();
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="deployment-animation">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(step + 1) / steps.length * 100}%` }}
        ></div>
      </div>
      <p className="step-text">{steps[step]}</p>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDeployment, setShowDeployment] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLaunch = () => {
    setIsLoading(true);
    setShowDeployment(true);
  };

  const handleDeploymentComplete = () => {
    setDeploymentComplete(true);
  };

  const handleOpenWebsite = () => {
    window.location.href = 'https://klsurabhi.in';
  };

  if (showDeployment) {
    return (
      <div className="deployment-page">
        <div className="stars"></div>
        <div className="twinkling"></div>
        {deploymentComplete ? (
          <div className="completion-message">
            
            
            <h2 style={{ color: 'red',paddingTop: '20px' }}>Website is Live!</h2>
            <button onClick={handleOpenWebsite} className="open-website-btn">
              Open Website
            </button>
          </div>
        ) : (
          <DeploymentAnimation onComplete={handleDeploymentComplete} />
        )}
      </div>
    );
  }

  return (
    <div className="landing-page">
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <div className="lanterns">
        <img src={lantern1} alt="Lantern" className="lantern lantern-left" />
        <img src={lantern1} alt="Lantern" className="lantern lantern-right" />
      </div>

      <main className={`content-wrapper ${isVisible ? 'visible' : ''}`}>
        <div className="hero-section">
          <div className="logo-container">
            <img src={img} alt="Surabhi" className="main-logo" />
          </div>
          
          <button
            onClick={handleLaunch}
            disabled={isLoading}
            className={`launch-button ${isLoading ? 'loading' : ''}`}
          >
            <span className="button-content">
              {isLoading ? 'Launching...' : 'Launch'}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;