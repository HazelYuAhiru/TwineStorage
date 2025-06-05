import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DancingCharacter = ({ route, position }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route.path);
  };

  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        cursor: 'pointer',
        zIndex: 10
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Character */}
      <div
        style={{
          width: '80px',
          height: '80px',
          animation: 'dance 2s ease-in-out infinite',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          border: '3px solid #2a2a2a',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f5f3ed'
        }}
      >
        {route.characterImage ? (
          <img 
            src={route.characterImage} 
            alt={`${route.name} character`} 
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
        ) : (
          <div style={{
            fontSize: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            {route.character}
          </div>
        )}
      </div>

      {/* Hover dialogue bubble */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#f9f7f2',
            border: '3px solid #2a2a2a',
            borderRadius: '15px',
            padding: '0.8rem 1.2rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 0 #2a2a2a, 0 6px 15px rgba(0,0,0,0.2)',
            animation: 'bubbleIn 0.3s ease-out',
            zIndex: 1000,
            marginBottom: '10px'
          }}
        >
          {/* Speech bubble tail */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid #2a2a2a'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% - 3px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #f9f7f2'
            }}
          />

          <div
            style={{
              fontSize: '0.9rem',
              fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
              fontWeight: 'bold',
              color: '#2a2a2a',
              textAlign: 'center'
            }}
          >
            <div style={{ color: route.color, marginBottom: '2px' }}>
              {route.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              クリックして再プレイ！
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dance {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          25% {
            transform: translateY(-5px) rotate(2deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1deg);
          }
          75% {
            transform: translateY(-3px) rotate(1deg);
          }
        }

        @keyframes bubbleIn {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DancingCharacter; 