import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RollingCredits from "./RollingCredits";

export default function RPGDialogueDisplay({ 
  routeText = [], 
  onLastKeywordClick, 
  leftCharacter, 
  rightCharacter,
  conclusionText = "",
  castInfo = [],
  routeId = null
}) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [clickedKeywords, setClickedKeywords] = useState(new Set());
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [endingPhase, setEndingPhase] = useState(null); // null, 'fadeOut', 'conclusion', 'credits'
  const navigate = useNavigate();

  const currentGroup = routeText[currentGroupIndex] || null;
  
  const getCharacterVisibility = () => {
    if (!currentGroup?.characters) {
      return { left: true, right: true };
    }
    return {
      left: currentGroup.characters.left !== false,
      right: currentGroup.characters.right !== false
    };
  };
  
  const characterVisibility = getCharacterVisibility();

  const handleKeywordClick = (id) => {
    const clickedGroupIndex = routeText.findIndex(group => group.id === id);
    
    // Handle last group - start cinematic ending or use provided handler
    if (clickedGroupIndex === routeText.length - 1) {
      if (conclusionText) {
        setEndingPhase('fadeOut');
        return;
      }
      
      if (onLastKeywordClick) {
        onLastKeywordClick();
      }
      return;
    }
    
    if (clickedGroupIndex !== -1 && clickedGroupIndex + 1 < routeText.length) {
      setCurrentGroupIndex(clickedGroupIndex + 1);
      
      const clickedGroup = routeText[clickedGroupIndex];
      if (clickedGroup && clickedGroup.trigger) {
        setClickedKeywords(prev => new Set([...prev, clickedGroup.trigger.text]));
      }
    }
  };

  // Handle ending sequence phases
  useEffect(() => {
    if (endingPhase === 'fadeOut') {
      const timer = setTimeout(() => setEndingPhase('credits'), 2000);
      return () => clearTimeout(timer);
    }
  }, [endingPhase]);

  // Process current group's text for keywords
  const processedLines = useMemo(() => {
    if (!currentGroup) return [];

    const ownKeyword = currentGroup.trigger ? {
      text: currentGroup.trigger.text,
      id: currentGroup.id,
      color: currentGroup.trigger.color
    } : null;

    const lines = currentGroup.text ? currentGroup.text.split('\n') : [];

    return lines.map((line, lineIndex) => {
      const parts = [];
      let lastIndex = 0;

      if (ownKeyword) {
        const regex = new RegExp(ownKeyword.text, 'g');
        let match;
        
        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push({
              type: 'text',
              content: line.substring(lastIndex, match.index),
              key: `${currentGroup.id}-${lineIndex}-text-${lastIndex}`
            });
          }
          
          parts.push({
            type: 'keyword',
            content: ownKeyword.text,
            color: ownKeyword.color,
            id: ownKeyword.id,
            key: `${currentGroup.id}-${lineIndex}-keyword-${match.index}`
          });
          
          lastIndex = match.index + ownKeyword.text.length;
        }
      }

      if (lastIndex < line.length) {
        parts.push({
          type: 'text',
          content: line.substring(lastIndex),
          key: `${currentGroup.id}-${lineIndex}-text-${lastIndex}`
        });
      }

      return parts.length > 0 ? parts : [{ type: 'text', content: line, key: `${currentGroup.id}-${lineIndex}-text-0` }];
    });
  }, [currentGroup]);

  const allTextParts = useMemo(() => {
    const parts = [];
    processedLines.forEach((lineParts, lineIndex) => {
      lineParts.forEach(part => parts.push(part));
      if (lineIndex < processedLines.length - 1) {
        parts.push({ type: 'text', content: '\n', key: `linebreak-${lineIndex}` });
      }
    });
    return parts;
  }, [processedLines]);

  const totalTextLength = allTextParts.reduce((sum, part) => sum + part.content.length, 0);

  // Typing animation effect
  useEffect(() => {
    if (!currentGroup || endingPhase) return;
    
    setDisplayedText("");
    setIsTypingComplete(false);
    
    let currentIndex = 0;
    const typingSpeed = 45;
    
    const typeText = () => {
      if (currentIndex < totalTextLength) {
        let builtText = "";
        let charCount = 0;
        
        for (const part of allTextParts) {
          if (charCount + part.content.length <= currentIndex) {
            builtText += part.content;
            charCount += part.content.length;
          } else {
            const remainingChars = currentIndex - charCount;
            builtText += part.content.substring(0, remainingChars);
            break;
          }
        }
        
        setDisplayedText(builtText);
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };
    
    const timer = setTimeout(typeText, 300);
    return () => clearTimeout(timer);
  }, [currentGroup, totalTextLength, allTextParts, endingPhase]);

  const renderTextWithKeywords = () => {
    if (!isTypingComplete) {
      return displayedText.split('\n').map((line, index) => (
        <div key={index} style={{ marginBottom: index < displayedText.split('\n').length - 1 ? '0.5rem' : 0 }}>
          {line}
        </div>
      ));
    }
    
    return processedLines.map((lineParts, lineIndex) => (
      <div key={lineIndex} style={{ marginBottom: lineIndex < processedLines.length - 1 ? '0.5rem' : 0 }}>
        {lineParts.map((part) => {
          if (part.type === 'keyword') {
            if (clickedKeywords.has(part.content)) {
              return (
                <span key={part.key} style={{ color: "#666" }}>
                  {part.content}
                </span>
              );
            }
            
            return (
              <span
                key={part.key}
                onClick={(e) => {
                  e.stopPropagation();
                  handleKeywordClick(part.id);
                }}
                style={{
                  color: part.color || "#4ecdc4",
                  cursor: "pointer",
                  userSelect: "none",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted"
                }}
              >
                {part.content}
              </span>
            );
          } else {
            return (
              <span key={part.key} style={{ color: "#2a2a2a" }}>
                {part.content}
              </span>
            );
          }
        })}
      </div>
    ));
  };

  if (endingPhase === 'credits') {
    return (
      <RollingCredits 
        castInfo={castInfo}
        conclusionText={conclusionText}
        onCreditsComplete={() => {
          window.location.href = '/';
        }}
        routeId={routeId}
      />
    );
  }

  if (!currentGroup) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f6f0 0%, #e8e6e0 50%, #d8d6d0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontFamily: "'Courier New', monospace",
          color: '#666'
        }}>
          No dialogue content available
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f6f0 0%, #e8e6e0 50%, #d8d6d0 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Decorative pixel elements */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        width: '16px',
        height: '16px',
        backgroundColor: '#4ecdc4',
        opacity: endingPhase === 'fadeOut' ? 0 : 0.6,
        animation: endingPhase === 'fadeOut' ? 'fadeOut 2s ease-out forwards' : 'float 3s ease-in-out infinite',
        transition: 'opacity 2s ease-out'
      }} />
      <div style={{
        position: 'absolute',
        top: '140px',
        right: '100px',
        width: '20px',
        height: '20px',
        backgroundColor: '#ff6b35',
        opacity: endingPhase === 'fadeOut' ? 0 : 0.6,
        animation: endingPhase === 'fadeOut' ? 'fadeOut 2s ease-out forwards' : 'float 3s ease-in-out infinite 1.5s',
        transition: 'opacity 2s ease-out'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '220px',
        left: '120px',
        width: '18px',
        height: '18px',
        backgroundColor: '#45b7d1',
        opacity: endingPhase === 'fadeOut' ? 0 : 0.6,
        animation: endingPhase === 'fadeOut' ? 'fadeOut 2s ease-out forwards' : 'float 3s ease-in-out infinite 2s',
        transition: 'opacity 2s ease-out'
      }} />

      {/* Character portraits area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '40px',
        paddingBottom: '20px',
        opacity: endingPhase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 2s ease-out'
      }}>
        <div style={{
          width: '200px',
          height: '300px',
          backgroundColor: '#f5f3ed',
          border: '4px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 0 #2a2a2a, 0 12px 20px rgba(0,0,0,0.3)',
          opacity: characterVisibility.left ? 1 : 0.3,
          transition: 'all 0.3s ease'
        }}>
          {leftCharacter ? (
            <img src={leftCharacter} alt="Left character" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              color: '#666',
              textAlign: 'center',
              fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
              fontSize: '0.9rem',
              fontWeight: 'bold',
              textRendering: 'geometricPrecision',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'unset'
            }}>
              左キャラクター<br/>
              (200x300px)
            </div>
          )}
        </div>

        <div style={{
          width: '200px',
          height: '300px',
          backgroundColor: '#f5f3ed',
          border: '4px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 0 #2a2a2a, 0 12px 20px rgba(0,0,0,0.3)',
          opacity: characterVisibility.right ? 1 : 0.3,
          transition: 'all 0.3s ease'
        }}>
          {rightCharacter ? (
            <img src={rightCharacter} alt="Right character" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              color: '#666',
              textAlign: 'center',
              fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
              fontSize: '0.9rem',
              fontWeight: 'bold',
              textRendering: 'geometricPrecision',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'unset'
            }}>
              右キャラクター<br/>
              (200x300px)
            </div>
          )}
        </div>
      </div>

      {/* Dialogue box */}
      <div style={{
        backgroundColor: '#f5f3ed',
        border: '6px solid #2a2a2a',
        borderTop: '6px solid #2a2a2a',
        margin: '20px',
        padding: '30px',
        minHeight: '180px',
        boxShadow: '0 8px 0 #2a2a2a, 0 12px 25px rgba(0,0,0,0.3)',
        position: 'relative',
        opacity: endingPhase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 2s ease-out'
      }}>
        <div style={{
          fontSize: '1.6rem',
          lineHeight: '1.6',
          letterSpacing: '0.1em',
          fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
          fontWeight: 'bold',
          color: '#2a2a2a',
          textRendering: 'geometricPrecision',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'unset',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}>
          {renderTextWithKeywords()}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '15px',
          right: '25px',
          fontSize: '1rem',
          color: '#666',
          fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
          fontWeight: 'bold',
          textRendering: 'geometricPrecision',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'unset'
        }}>
          {currentGroupIndex + 1} / {routeText.length}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
        
        @keyframes fadeOut {
          0% { opacity: 0.6; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
} 