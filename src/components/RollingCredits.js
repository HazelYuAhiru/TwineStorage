import React, { useState, useEffect } from 'react';
import { markRouteComplete } from '../utils/completionTracker';

export default function RollingCredits({ castInfo = [], onCreditsComplete, conclusionText = "", routeId = null }) {
  const [startCredits, setStartCredits] = useState(false);
  const [showConclusion, setShowConclusion] = useState(!!conclusionText);

  const buildCredits = () => {
    const credits = [];
    
    credits.push({ role: "", name: "", isEmpty: true });
    credits.push(...castInfo);
    
    if (castInfo.length === 0) {
      credits.push({ role: "", name: "ありがとうございました" });
    }
    
    return credits;
  };

  const credits = buildCredits();

  useEffect(() => {
    if (conclusionText) {
      const timer = setTimeout(() => {
        setShowConclusion(false);
        setTimeout(() => setStartCredits(true), 500);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setStartCredits(true), 800);
      return () => clearTimeout(timer);
    }
  }, [conclusionText]);

  useEffect(() => {
    if (startCredits) {
      const duration = credits.length * 3050;
      
      const timer = setTimeout(() => {
        if (routeId) {
          markRouteComplete(routeId);
        }
        
        if (onCreditsComplete) {
          onCreditsComplete();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [startCredits, credits.length, onCreditsComplete, conclusionText, routeId]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f8f6f0 0%, #e8e6e0 50%, #d8d6d0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      zIndex: 1000
    }}>
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '80px',
        width: '20px',
        height: '20px',
        backgroundColor: '#4ecdc4',
        opacity: 0.4,
        animation: 'floatSlow 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '120px',
        right: '120px',
        width: '16px',
        height: '16px',
        backgroundColor: '#ff6b35',
        opacity: 0.4,
        animation: 'floatSlow 6s ease-in-out infinite 2s'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '60px',
        width: '24px',
        height: '24px',
        backgroundColor: '#45b7d1',
        opacity: 0.4,
        animation: 'floatSlow 6s ease-in-out infinite 4s'
      }} />

      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {conclusionText && showConclusion && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(245, 243, 237, 0.98)',
            border: '6px solid #2a2a2a',
            borderRadius: '12px',
            padding: '60px 80px',
            boxShadow: '0 8px 0 #2a2a2a, 0 12px 25px rgba(0,0,0,0.3)',
            maxWidth: '80vw',
            textAlign: 'center',
            opacity: 1,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 100
          }}>
            <div style={{
              fontSize: '2.4rem',
              lineHeight: '1.6',
              letterSpacing: '0.1em',
              fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
              fontWeight: 'bold',
              color: '#2a2a2a',
              textRendering: 'geometricPrecision',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'unset',
              whiteSpace: 'pre-line'
            }}>
              {conclusionText}
            </div>
          </div>
        )}

        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
          display: showConclusion ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            transform: startCredits ? 'translateY(-100vh)' : 'translateY(100vh)',
            transition: startCredits ? `transform ${credits.length * 4}s linear` : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6rem',
            paddingBottom: '50vh',
            paddingTop: '100vh'
          }}>
            {credits.map((credit, index) => {
              if (credit.isEmpty) {
                return <div key={index} style={{ height: '4rem' }} />;
              }
              
              return (
                <div 
                  key={index}
                  style={{
                    textAlign: 'center',
                    marginBottom: credit.role === '' && !credit.isSpecial ? '4rem' : '2rem'
                  }}
                >
                  {credit.role && (
                    <div style={{
                      fontSize: '1.2rem',
                      fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
                      fontWeight: 'bold',
                      color: '#666',
                      marginBottom: '0.5rem',
                      letterSpacing: '0.1em',
                      textRendering: 'geometricPrecision',
                      WebkitFontSmoothing: 'none',
                      MozOsxFontSmoothing: 'unset'
                    }}>
                      {credit.role}
                    </div>
                  )}
                  <div style={{
                    fontSize: (credit.role === '' || credit.isSpecial) ? '2rem' : '1.6rem',
                    fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
                    fontWeight: 'bold',
                    color: (credit.role === '' || credit.isSpecial) ? '#4ecdc4' : '#2a2a2a',
                    letterSpacing: '0.05em',
                    textRendering: 'geometricPrecision',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'unset',
                    textShadow: (credit.role === '' || credit.isSpecial) ? '2px 2px 0px rgba(0,0,0,0.3)' : 'none',
                    lineHeight: credit.isSpecial ? '1.4' : 'normal',
                    whiteSpace: credit.isSpecial ? 'pre-line' : 'normal'
                  }}>
                    {credit.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
} 