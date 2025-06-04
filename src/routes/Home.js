import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const buttonStyle = {
    backgroundColor: isHovered ? '#ff6b35' : '#4ecdc4',
    color: '#2a2a2a',
    border: '4px solid #2a2a2a',
    padding: '16px 32px',
    fontSize: '1.4rem',
    fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    transform: isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? '0 8px 0 #2a2a2a, 0 12px 20px rgba(0,0,0,0.3)'
      : '0 4px 0 #2a2a2a, 0 6px 15px rgba(0,0,0,0.2)',
    textRendering: 'geometricPrecision',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'unset',
    outline: 'none',
    userSelect: 'none'
  };

  const titleStyle = {
    fontSize: '4rem',
    fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
    fontWeight: 'bold',
    color: '#2a2a2a',
    textShadow: '4px 4px 0px #4ecdc4, 8px 8px 0px rgba(0,0,0,0.3)',
    letterSpacing: '0.1em',
    marginBottom: '60px',
    textRendering: 'geometricPrecision',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'unset',
    transform: titleAnimation ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
    opacity: titleAnimation ? 1 : 0,
    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
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
      {/* Decorative pixel-style background elements */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '20px',
        height: '20px',
        backgroundColor: '#4ecdc4',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '100px',
        right: '80px',
        width: '16px',
        height: '16px',
        backgroundColor: '#ff6b35',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite 1s'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '150px',
        left: '100px',
        width: '24px',
        height: '24px',
        backgroundColor: '#45b7d1',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite 2s'
      }} />

      <h1 style={titleStyle}>
        かさじぞう
      </h1>

      <p style={{
        fontSize: '1.2rem',
        fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
        color: '#666',
        marginBottom: '40px',
        letterSpacing: '0.05em',
        textAlign: 'center',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        伝統的な日本の物語をインタラクティブに体験しよう
      </p>

      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate('/common')}
        onMouseDown={(e) => {
          e.target.style.transform = 'translateY(-1px) scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = isHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)';
        }}
      >
        ゲームを始める
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}