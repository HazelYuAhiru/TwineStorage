import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RollingCredits from "./RollingCredits";
import { getCharacter } from '../data/characters';

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
  const [endingPhase, setEndingPhase] = useState(null); // null, 'fadeOut', 'credits'
  const navigate = useNavigate();

  const currentGroup = routeText[currentGroupIndex] || null;
  
  const getCharacterVisibility = () => {
    if (!currentGroup?.characters) {
      return { left: true, right: true };
    }
    
    // Handle new character system
    if (currentGroup.characters.visible) {
      return currentGroup.characters.visible;
    }
    
    // Handle legacy system
    return {
      left: currentGroup.characters.left !== false,
      right: currentGroup.characters.right !== false
    };
  };
  
  const getCurrentCharacters = () => {
    if (!currentGroup?.characters) {
      return { left: null, right: null };
    }
    
    // Handle new character system with variants
    if (currentGroup.characters.left !== undefined || currentGroup.characters.right !== undefined) {
      const leftChar = currentGroup.characters.left ? 
        getCharacter(
          currentGroup.characters.left, 
          currentGroup.characters.leftVariant || 'default'
        ) : null;
      const rightChar = currentGroup.characters.right ? 
        getCharacter(
          currentGroup.characters.right, 
          currentGroup.characters.rightVariant || 'default'
        ) : null;
      
      return {
        left: leftChar,
        right: rightChar
      };
    }
    
    // Fallback to static characters
    return { left: null, right: null };
  };
  
  const characterVisibility = getCharacterVisibility();
  const currentCharacters = getCurrentCharacters();
  
  // Determine if this is a conversation (both characters present) or monologue (only one character)
  const hasLeftCharacter = currentCharacters.left || leftCharacter;
  const hasRightCharacter = currentCharacters.right || rightCharacter;
  const isConversation = hasLeftCharacter && hasRightCharacter;
  
  // For monologue, we only show the character that exists
  const shouldShowLeftSlot = isConversation || hasLeftCharacter;
  const shouldShowRightSlot = isConversation || hasRightCharacter;

  // Get dynamic background based on route and story context
  const getDynamicBackground = () => {
    // Check current URL to determine route
    const currentPath = window.location.pathname;
    const currentText = currentGroup?.text || '';
    
    // Route 1 - cat village and poster themes
    if (currentPath.includes('route1') || currentText.includes('アンバー') || currentText.includes('ねこ') || currentText.includes('ポスター')) {
      return 'linear-gradient(135deg, #fff4e6 0%, #ffe0b3 30%, #ffcc80 60%, #ffb84d 100%)';
    }
    
    // Route 2 - magical/mystical themes
    if (currentPath.includes('route2') || currentText.includes('魔法') || currentText.includes('電話') || currentText.includes('奇跡')) {
      return 'linear-gradient(135deg, #f0e6ff 0%, #d9b3ff 30%, #c480ff 60%, #b84dff 100%)';
    }
    
    // Common route or default - snowy mountain village
    if (currentPath.includes('common') || currentText.includes('雪') || currentText.includes('山') || currentText.includes('おじぞう')) {
      return 'linear-gradient(135deg, #e6f3ff 0%, #b3d9ff 30%, #80bfff 60%, #4da6ff 100%)';
    }
    
    // Default peaceful background
    return 'linear-gradient(135deg, #f8f6f0 0%, #e8e6e0 50%, #d8d6d0 100%)';
  };

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

  const renderCharacterSlot = (side) => {
    const character = currentCharacters[side];
    const staticCharacter = side === 'left' ? leftCharacter : rightCharacter;
    const isVisible = characterVisibility[side];
    
    // Get scaling configuration
    const scalingConfig = currentGroup?.characters;
    const isPixelArt = scalingConfig?.[`${side}PixelArt`] || (character?.image && character.image.includes('pixel')) || false;
    const objectFit = scalingConfig?.[`${side}Scaling`] || 'contain';
    
    // In conversation mode, use visibility to gray out. In monologue mode, always show at full opacity
    const displayOpacity = isConversation ? (isVisible ? 1 : 0.3) : 1;
    
    return (
      <div style={{
        width: '200px',
        height: '200px',
        backgroundColor: character?.bgColor || '#f5f3ed',
        border: '4px solid #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 0 #2a2a2a, 0 12px 20px rgba(0,0,0,0.3)',
        opacity: displayOpacity,
        transition: 'all 0.3s ease',
        overflow: 'hidden' // Prevent image overflow
      }}>
        {character?.image || staticCharacter ? (
          <img 
            src={character?.image || staticCharacter} 
            alt={`${character?.name || side} character`} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: objectFit, // Use configured scaling
              // Pixel art scaling properties (always applied for crisp scaling)
              imageRendering: 'pixelated', // Modern browsers and Safari
              MozImageRendering: '-moz-crisp-edges', // Firefox
              msInterpolationMode: 'nearest-neighbor', // IE
              // Additional sharpening for pixel art
              filter: isPixelArt ? 'none' : 'unset',
              WebkitFilter: isPixelArt ? 'none' : 'unset',
              // Prevent blurring on transform
              transformOrigin: 'center',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          />
        ) : (
          <div style={{
            color: '#666',
            textAlign: 'center',
            fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
            fontSize: character ? '1.2rem' : '0.9rem',
            fontWeight: 'bold',
            textRendering: 'geometricPrecision',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'unset',
            whiteSpace: 'pre-line'
          }}>
            {character?.placeholder || (side === 'left' ? '左キャラクター\n(200x200px)' : '右キャラクター\n(200x200px)')}
          </div>
        )}
      </div>
    );
  };

  if (endingPhase === 'credits') {
    return (
      <RollingCredits 
        castInfo={castInfo}
        conclusionText={conclusionText}
        onCreditsComplete={() => {
          navigate('/');
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
      background: getDynamicBackground(),
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
        flexDirection: 'column',
        opacity: endingPhase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 2s ease-out'
      }}>
        {/* Background image rectangle */}
        <div style={{
          flex: 1,
          margin: '20px',
          marginBottom: '10px',
          backgroundColor: '#f5f3ed',
          border: '4px solid #2a2a2a',
          borderRadius: '12px',
          boxShadow: '0 6px 0 #2a2a2a, 0 10px 20px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '200px',
          backgroundImage: (() => {
            const currentPath = window.location.pathname;
            const currentText = currentGroup?.text || '';
            
            if (currentPath.includes('route1') || currentText.includes('アンバー') || currentText.includes('ねこ') || currentText.includes('村')) {
              // Village pattern  
              return 'linear-gradient(45deg, #ffe4b5 25%, transparent 25%), linear-gradient(-45deg, #ffe4b5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ffe4b5 75%), linear-gradient(-45deg, transparent 75%, #ffe4b5 75%)';
            } else if (currentPath.includes('route2') || currentText.includes('魔法') || currentText.includes('電話')) {
              // Mystical sparkle pattern
              return 'radial-gradient(circle at 25% 25%, #d3d3d3 1px, transparent 1px), radial-gradient(circle at 75% 75%, #d3d3d3 1px, transparent 1px), radial-gradient(circle at 50% 80%, #d3d3d3 0.5px, transparent 0.5px)';
            } else if (currentPath.includes('common') || currentText.includes('雪') || currentText.includes('山')) {
              // Snowy pattern
              return 'radial-gradient(circle at 20px 20px, #ffffff 2px, transparent 2px), radial-gradient(circle at 80px 80px, #ffffff 1px, transparent 1px)';
            }
            return 'none';
          })(),
          backgroundSize: (() => {
            const currentPath = window.location.pathname;
            const currentText = currentGroup?.text || '';
            
            if (currentPath.includes('route1') || currentText.includes('アンバー') || currentText.includes('ねこ') || currentText.includes('村')) {
              return '20px 20px';
            } else if (currentPath.includes('route2') || currentText.includes('魔法') || currentText.includes('電話')) {
              return '50px 50px, 80px 80px, 30px 30px';
            } else if (currentPath.includes('common') || currentText.includes('雪') || currentText.includes('山')) {
              return '40px 40px, 100px 100px';
            }
            return 'auto';
          })(),
          backgroundPosition: 'center',
          backgroundRepeat: (() => {
            const currentPath = window.location.pathname;
            const currentText = currentGroup?.text || '';
            if (currentPath.includes('route1') || currentPath.includes('route2') || currentPath.includes('common') ||
                currentText.includes('雪') || currentText.includes('山') || 
                currentText.includes('ねこ') || currentText.includes('村') ||
                currentText.includes('魔法') || currentText.includes('電話')) {
              return 'repeat';
            }
            return 'no-repeat';
          })()
        }}>
          {/* Character portraits positioned over background */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '0',
            right: '0',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: isConversation ? 'space-between' : 'center',
            padding: '0 40px'
          }}>
            {shouldShowLeftSlot && renderCharacterSlot('left')}
            {shouldShowRightSlot && renderCharacterSlot('right')}
          </div>
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