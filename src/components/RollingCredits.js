import React, { useState, useEffect } from 'react';
import { markRouteComplete } from '../utils/completionTracker';

export default function RollingCredits({ castInfo = [], onCreditsComplete, conclusionText = "", routeId = null }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-complete credits after animation duration
    if (isVisible) {
      const totalItems = (conclusionText ? 1 : 0) + castInfo.length + (castInfo.length === 0 ? 10 : 0);
      const duration = (totalItems + 5) * 1000;
      const timer = setTimeout(() => {
        // Mark route as complete when credits finish
        if (routeId) {
          markRouteComplete(routeId);
        }
        
        if (onCreditsComplete) {
          onCreditsComplete();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, castInfo.length, onCreditsComplete, conclusionText, routeId]);

  const defaultCast = [
    { role: "原作", name: "日本の民話" },
    { role: "脚本・演出", name: "あなたの名前" },
    { role: "おじいさん", name: "声優名" },
    { role: "おばあさん", name: "声優名" },
    { role: "アンバー", name: "声優名" },
    { role: "ナレーション", name: "声優名" },
    { role: "音楽", name: "作曲家名" },
    { role: "グラフィック", name: "アーティスト名" },
    { role: "プログラム", name: "開発者名" },
    { role: "", name: "ご清聴ありがとうございました" }
  ];

  const buildCredits = () => {
    const credits = [];
    
    // Add extra spacing at the very beginning
    credits.push({ role: "", name: "", isEmpty: true });
    credits.push({ role: "", name: "", isEmpty: true });
    
    if (conclusionText) {
      credits.push({ 
        role: "", 
        name: conclusionText, 
        isConclusion: true 
      });
    }
    
    if (conclusionText) {
      credits.push({ role: "", name: "", isEmpty: true });
    }
    
    const castToUse = castInfo.length > 0 ? castInfo : defaultCast;
    credits.push(...castToUse);
    
    return credits;
  };

  const credits = buildCredits();

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
      {/* Decorative pixel elements */}
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
        justifyContent: 'flex-end',
        position: 'relative'
      }}>
        <div style={{
          transform: isVisible ? 'translateY(-150vh)' : 'translateY(150vh)',
          transition: `transform ${(credits.length + 5) * 2.5}s linear`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4rem',
          paddingBottom: '150vh',
          paddingTop: '120vh'
        }}>
          {credits.map((credit, index) => {
            // Handle empty spacing items
            if (credit.isEmpty) {
              return <div key={index} style={{ height: '4rem' }} />;
            }
            
            return (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  marginBottom: credit.role === '' && !credit.isConclusion ? '4rem' : '2rem'
                }}
              >
                {credit.role && !credit.isConclusion && (
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
                  fontSize: credit.isConclusion ? '2.8rem' : (credit.role === '' ? '2rem' : '1.6rem'),
                  fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
                  fontWeight: 'bold',
                  color: credit.isConclusion ? '#2a2a2a' : (credit.role === '' ? '#4ecdc4' : '#2a2a2a'),
                  letterSpacing: '0.05em',
                  textRendering: 'geometricPrecision',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'unset',
                  textShadow: (credit.role === '' || credit.isConclusion) ? '2px 2px 0px rgba(0,0,0,0.3)' : 'none',
                  lineHeight: credit.isConclusion ? '1.4' : 'normal',
                  whiteSpace: credit.isConclusion ? 'pre-line' : 'normal'
                }}>
                  {credit.name}
                </div>
              </div>
            );
          })}
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