import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DancingCharacter from '../components/DancingCharacter';
import { getCompletedRoutes, ROUTES } from '../utils/completionTracker';

export default function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(false);
  const [completedRoutes, setCompletedRoutes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setTitleAnimation(true), 500);
    const completed = getCompletedRoutes();
    setCompletedRoutes(completed);
    
    // Check for completion updates periodically
    const interval = setInterval(() => {
      const updatedCompleted = getCompletedRoutes();
      setCompletedRoutes(updatedCompleted);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Get dynamic background based on completion
  const getDynamicBackground = () => {
    const completionCount = completedRoutes.length;
    
    if (completionCount === 0) {
      // Original subtle background
      return 'linear-gradient(135deg, #f8f6f0 0%, #e8e6e0 50%, #d8d6d0 100%)';
    } else if (completionCount <= 2) {
      // Warm, slightly colorful
      return 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 30%, #ffcc80 60%, #ffb74d 100%)';
    } else if (completionCount <= 4) {
      // More vibrant and colorful
      return 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 25%, #81c784 50%, #66bb6a 75%, #4caf50 100%)';
    } else {
      // Full rainbow celebration
      return 'linear-gradient(135deg, #ffebee 0%, #f3e5f5 16%, #e8eaf6 32%, #e0f2f1 48%, #f1f8e9 64%, #fff8e1 80%, #fce4ec 100%)';
    }
  };

  // Get character positions based on completion
  const getCharacterPositions = () => {
    const positions = [
      { bottom: '20%', left: '15%' },
      { bottom: '25%', right: '15%' },
      { bottom: '30%', left: '25%' },
      { bottom: '35%', right: '25%' },
      { bottom: '40%', left: '35%' }
    ];
    return positions;
  };

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

  const characterPositions = getCharacterPositions();

  return (
    <div style={{
      minHeight: '100vh',
      background: getDynamicBackground(),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 1s ease-in-out'
    }}>
      {/* Enhanced decorative elements based on completion */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '20px',
        height: '20px',
        backgroundColor: completedRoutes.length > 0 ? '#ff6b35' : '#4ecdc4',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite',
        transition: 'background-color 0.5s ease'
      }} />
      <div style={{
        position: 'absolute',
        top: '100px',
        right: '80px',
        width: '16px',
        height: '16px',
        backgroundColor: completedRoutes.length > 1 ? '#9c27b0' : '#ff6b35',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite 1s',
        transition: 'background-color 0.5s ease'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '150px',
        left: '100px',
        width: '24px',
        height: '24px',
        backgroundColor: completedRoutes.length > 2 ? '#4caf50' : '#45b7d1',
        opacity: 0.6,
        animation: 'float 3s ease-in-out infinite 2s',
        transition: 'background-color 0.5s ease'
      }} />

      {/* Additional celebration elements for high completion */}
      {completedRoutes.length > 3 && (
        <>
          <div style={{
            position: 'absolute',
            top: '200px',
            left: '200px',
            width: '12px',
            height: '12px',
            backgroundColor: '#e91e63',
            opacity: 0.7,
            animation: 'pulse 2s ease-in-out infinite',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            top: '300px',
            right: '150px',
            width: '18px',
            height: '18px',
            backgroundColor: '#ff9800',
            opacity: 0.7,
            animation: 'pulse 2s ease-in-out infinite 0.5s',
            borderRadius: '50%'
          }} />
        </>
      )}

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
        これは、いつかどこかで起こった物語です。
        {completedRoutes.length > 0 && (
          <span style={{ 
            display: 'block', 
            fontSize: '1rem', 
            color: '#4caf50', 
            marginTop: '10px',
            fontWeight: 'bold'
          }}>
            完了したルート: {completedRoutes.length}/4
          </span>
        )}
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

      {/* Dancing characters for completed routes */}
      {completedRoutes.map((routeId, index) => {
        const route = Object.values(ROUTES).find(r => r.id === routeId);
        if (route && characterPositions[index]) {
          return (
            <DancingCharacter
              key={routeId}
              route={route}
              position={characterPositions[index]}
            />
          );
        }
        return null;
      })}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}