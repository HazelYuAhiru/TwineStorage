import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacter } from '../data/characters';

export default function Choice() {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);
  const [titleAnimation, setTitleAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get character data for choice images
  const amberWithKasa = getCharacter('amber', 'with_kasa');
  const jizoWithKasa = getCharacter('jizo', 'with_kasa');

  const getOptionStyle = (isHovered) => ({
    width: '200px',
    height: '200px',
    border: '4px solid #2a2a2a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? '0 10px 0 #2a2a2a, 0 15px 25px rgba(0,0,0,0.3)'
      : '0 6px 0 #2a2a2a, 0 10px 20px rgba(0,0,0,0.2)',
    backgroundColor: isHovered ? '#4ecdc4' : '#f5f3ed',
  });

  const optionContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 40px',
    transition: 'all 0.3s ease'
  };

  const optionTextStyle = {
    fontSize: '1.2rem',
    fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
    fontWeight: 'bold',
    color: '#2a2a2a',
    textAlign: 'center',
    letterSpacing: '0.05em',
    textRendering: 'geometricPrecision',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'unset',
    marginTop: '15px',
    userSelect: 'none'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
    fontWeight: 'bold',
    color: '#2a2a2a',
    textShadow: '3px 3px 0px #4ecdc4, 6px 6px 0px rgba(0,0,0,0.3)',
    letterSpacing: '0.05em',
    marginBottom: '80px',
    textAlign: 'center',
    textRendering: 'geometricPrecision',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'unset',
    transform: titleAnimation ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
    opacity: titleAnimation ? 1 : 0,
    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };

  const placeholderStyle = {
    fontSize: '1rem',
    color: '#666',
    textAlign: 'center',
    fontFamily: "'Courier New', monospace"
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f6f0 0%, #e8e6e0 50%, #d8d6d0 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative pixel elements */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        width: '16px',
        height: '16px',
        backgroundColor: '#ff6b35',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '120px',
        right: '100px',
        width: '20px',
        height: '20px',
        backgroundColor: '#45b7d1',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite 1.5s'
      }} />

      <h1 style={titleStyle}>
        おじいさんが戸をあけると、そこには――
      </h1>

      {/* Choice Options */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '80px'
      }}>
        <div style={optionContainerStyle}>
          <div
            style={getOptionStyle(hoveredOption === 'route1')}
            onMouseEnter={() => setHoveredOption('route1')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => navigate('/route1')}
          >
            <img 
              src={amberWithKasa.image} 
              alt="Amber with kasa" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                imageRendering: '-moz-crisp-edges',
                imageRendering: 'crisp-edges',
                WebkitImageRendering: 'pixelated'
              }}
            />
          </div>
          <div style={optionTextStyle}>
            かさをかぶってねこ
          </div>
        </div>

        <div style={optionContainerStyle}>
          <div
            style={getOptionStyle(hoveredOption === 'route2')}
            onMouseEnter={() => setHoveredOption('route2')}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => navigate('/route2')}
          >
            <img 
              src={jizoWithKasa.image} 
              alt="Jizo with kasa" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                imageRendering: '-moz-crisp-edges',
                imageRendering: 'crisp-edges',
                WebkitImageRendering: 'pixelated'
              }}
            />
          </div>
          <div style={optionTextStyle}>
            かさをかぶっておじぞう
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
} 