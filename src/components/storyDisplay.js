import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TextGroup from "./textGroup";
import { getCharacter } from '../data/characters';

// DialogueGroup component for speech bubbles - defined outside to prevent re-creation
const DialogueGroup = ({ lines, processedLines, visible, side, speaker, onKeywordClick, clickedKeywords }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const isLeft = side === 'left';

  const fullText = lines.join(" ");

  const processFullText = () => {
    if (!processedLines || processedLines.length === 0) {
      return [{ type: 'text', content: fullText, key: 'full-text' }];
    }
    
    const allParts = [];
    processedLines.forEach((lineParts, lineIndex) => {
      lineParts.forEach((part, partIndex) => {
        allParts.push({
          ...part,
          key: `${part.key}-${lineIndex}-${partIndex}`
        });
      });
      if (lineIndex < processedLines.length - 1) {
        allParts.push({
          type: 'text',
          content: ' ',
          key: `space-${lineIndex}`
        });
      }
    });
    
    return allParts;
  };

  const textParts = processFullText();
  const totalTextLength = textParts.reduce((sum, part) => sum + part.content.length, 0);

  // Typing animation effect - only runs once per component
  useEffect(() => {
    if (!visible || hasStartedTyping) return;
    
    setHasStartedTyping(true);
    setDisplayedText("");
    setIsTypingComplete(false);
    
    let currentIndex = 0;
    const typingSpeed = 45;
    
    const typeText = () => {
      if (currentIndex < totalTextLength) {
        let builtText = "";
        let charCount = 0;
        
        for (const part of textParts) {
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
  }, [visible, hasStartedTyping, textParts, totalTextLength]); // Added missing dependencies

  const renderTextWithKeywords = () => {
    if (!isTypingComplete) {
      return <span>{displayedText}</span>;
    }
    
    return textParts.map((part, index) => {
      if (part.type === 'keyword') {
        if (clickedKeywords && clickedKeywords.has(part.content)) {
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
              onKeywordClick(part.id);
            }}
            style={{
              color: part.color || "#4ecdc4",
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textUnderlineOffset: "3px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ff6b35";
              e.target.style.textShadow = "0 1px 3px rgba(255, 107, 53, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = part.color || "#4ecdc4";
              e.target.style.textShadow = "none";
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
    });
  };

  if (!visible) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isLeft ? 'row' : 'row-reverse',
      alignItems: 'flex-start',
      marginBottom: '2rem',
      gap: '1rem'
    }}>
      {/* Character placeholder */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        border: '3px solid #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#666',
        flexShrink: 0,
        boxShadow: '0 4px 0 #2a2a2a',
        overflow: 'hidden'
      }}>
        {(() => {
          // Determine character based on speaker
          let characterData = null;
          if (speaker) {
            if (speaker.includes('アンバー')) {
              characterData = getCharacter('amber', 'default');
            } else if (speaker.includes('おじいさん')) {
              characterData = getCharacter('grandfather', 'default');
            } else if (speaker.includes('おばあさん')) {
              characterData = getCharacter('grandmother', 'default');
            } else if (speaker.includes('おじぞう')) {
              characterData = getCharacter('jizo', 'default');
            }
          }
          
          return characterData?.image ? (
            <img 
              src={characterData.image} 
              alt={`${speaker || 'character'}`} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                imageRendering: 'pixelated',
                MozImageRendering: '-moz-crisp-edges',
                WebkitImageRendering: 'pixelated'
              }}
            />
          ) : (
            <span>{speaker || '?'}</span>
          );
        })()}
      </div>

      {/* Speech bubble */}
      <div style={{
        backgroundColor: isLeft ? '#f0f8ff' : '#fff5ee',
        border: '3px solid #2a2a2a',
        borderRadius: '20px',
        padding: '1.5rem 2rem',
        maxWidth: '70%',
        position: 'relative',
        boxShadow: '0 6px 0 #2a2a2a, 0 8px 20px rgba(0,0,0,0.15)',
        animation: (!hasStartedTyping && visible) ? "speechBubbleIn 0.6s ease-out" : "none"
      }}>
        {/* Speech bubble tail */}
        <div style={{
          position: 'absolute',
          top: '20px',
          [isLeft ? 'left' : 'right']: '-12px',
          width: '0',
          height: '0',
          borderTop: '15px solid transparent',
          borderBottom: '15px solid transparent',
          [isLeft ? 'borderRight' : 'borderLeft']: '15px solid #2a2a2a'
        }} />
        <div style={{
          position: 'absolute',
          top: '22px',
          [isLeft ? 'left' : 'right']: '-6px',
          width: '0',
          height: '0',
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          [isLeft ? 'borderRight' : 'borderLeft']: `12px solid ${isLeft ? '#f0f8ff' : '#fff5ee'}`
        }} />

        <div style={{
          fontSize: '1.3rem',
          lineHeight: '1.7',
          letterSpacing: '0.05em',
          fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
          fontWeight: '600',
          color: '#2a2a2a',
          textAlign: 'left',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}>
          {renderTextWithKeywords()}
        </div>
      </div>
    </div>
  );
};

export default function VerticalStoryDisplay({ routeText = [], onLastKeywordClick }) {
  const [shownIds, setShownIds] = useState(routeText.length > 0 ? [routeText[0].id] : []);
  const [clickedKeywords, setClickedKeywords] = useState(new Set());
  const containerRef = useRef(null);
  const lastGroupRef = useRef(null);
  const navigate = useNavigate();

  const isDialogue = (text) => {
    return text.includes('「') && text.includes('」');
  };

  const extractSpeaker = (text) => {
    const speakerPatterns = [
      /([あ-ん]+|[ア-ン]+|おじいさん|おばあさん)は?言いました/,
      /([あ-ん]+|[ア-ン]+|おじいさん|おばあさん)が言いました/,
      /([あ-ん]+|[ア-ン]+|おじいさん|おばあさん)は?[：:]/,
      /^「.*」$/
    ];
    
    for (const pattern of speakerPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    if (text.includes('「') && text.includes('」')) {
      if (text.includes('アンバー')) return 'アンバー';
      if (text.includes('おじいさん')) return 'おじいさん';
      if (text.includes('おばあさん')) return 'おばあさん';
      
      return '?';
    }
    
    return null;
  };

  const handleKeywordClick = (id) => {
    const currentGroupIndex = routeText.findIndex(group => group.id === id);
    
    // Handle last group navigation
    if (currentGroupIndex === routeText.length - 1) {
      if (onLastKeywordClick) {
        onLastKeywordClick();
      } else {
        navigate('/choice');
      }
      return;
    }
    
    if (currentGroupIndex !== -1 && currentGroupIndex + 1 < routeText.length) {
      const nextGroupId = routeText[currentGroupIndex + 1].id;
      if (!shownIds.includes(nextGroupId)) {
        setShownIds([...shownIds, nextGroupId]);
        
        const clickedGroup = routeText[currentGroupIndex];
        if (clickedGroup && clickedGroup.trigger) {
          setClickedKeywords(prev => new Set([...prev, clickedGroup.trigger.text]));
        }
      }
    }
  };

  // Scroll to keep the last text group visible and properly positioned
  useEffect(() => {
    if (lastGroupRef.current) {
      const lastGroupElement = lastGroupRef.current;
      const elementTop = lastGroupElement.offsetTop;
      const elementHeight = lastGroupElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll position to ensure the entire element is visible
      // If element is taller than viewport, show from the top
      // If element fits in viewport, center it or show it comfortably
      let scrollTarget;
      
      if (elementHeight > viewportHeight * 0.8) {
        // For tall elements, position the top at 10% of viewport height
        scrollTarget = elementTop - (viewportHeight * 0.1);
      } else {
        // For shorter elements, position so there's space above and below
        scrollTarget = elementTop - (viewportHeight * 0.3);
      }
      
      window.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: shownIds.length === 1 ? 'auto' : 'smooth'
      });
    }
  }, [shownIds]);

  // Prevent scrolling down to blank space while allowing full visibility of last group
  useEffect(() => {
    const handleScroll = () => {
      if (lastGroupRef.current) {
        const lastGroupElement = lastGroupRef.current;
        const lastGroupBottom = lastGroupElement.offsetTop + lastGroupElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Allow generous scrolling to see the complete last group
        // Add significant padding (200px) to ensure nothing is ever cut off
        const maxScroll = Math.max(0, lastGroupBottom - viewportHeight + 200);
        
        if (window.scrollY > maxScroll) {
          window.scrollTo({
            top: maxScroll,
            behavior: 'auto'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shownIds]);

  const memoizedProcessedLines = useMemo(() => {
    const processedByGroup = {};
    
    routeText.forEach(group => {
      const ownKeyword = group.trigger ? {
        text: group.trigger.text,
        id: group.id,
        color: group.trigger.color
      } : null;

      const lines = group.text ? group.text.split('\n') : [];

      processedByGroup[group.id] = lines.map((line, lineIndex) => {
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
                key: `${group.id}-${lineIndex}-text-${lastIndex}`
              });
            }
            
            parts.push({
              type: 'keyword',
              content: ownKeyword.text,
              color: ownKeyword.color,
              id: ownKeyword.id,
              key: `${group.id}-${lineIndex}-keyword-${match.index}`
            });
            
            lastIndex = match.index + ownKeyword.text.length;
          }
        }

        if (lastIndex < line.length) {
          parts.push({
            type: 'text',
            content: line.substring(lastIndex),
            key: `${group.id}-${lineIndex}-text-${lastIndex}`
          });
        }

        const result = parts.length > 0 ? parts : [{ type: 'text', content: line, key: `${group.id}-${lineIndex}-text-0` }];
        return result;
      });
    });
    
    return processedByGroup;
  }, [routeText]);

  // Calculate dynamic background based on progress
  const getBackgroundGradient = () => {
    const progress = shownIds.length / routeText.length;
    
    // Check if this is the common route (by checking for characteristic text or structure)
    const isCommonRoute = routeText.some(group => 
      group.text && (
        group.text.includes('おじいさんとおばあさん') || 
        group.text.includes('おじぞうさん') ||
        group.text.includes('かさを作っていました')
      )
    );
    
    if (isCommonRoute) {
      // Yellow to blue gradient for day to night (common route)
      const startColors = {
        primary: [255, 248, 220],   // #fff8dc - cornsilk (warm morning)
        secondary: [255, 223, 0]    // #ffdf00 - golden yellow (sunrise)
      };
      
      const endColors = {
        primary: [25, 25, 112],     // #191970 - midnight blue
        secondary: [72, 61, 139]    // #483d8b - dark slate blue
      };
      
      // Interpolate between colors
      const interpolate = (start, end, factor) => {
        return Math.round(start + (end - start) * factor);
      };
      
      const currentPrimary = [
        interpolate(startColors.primary[0], endColors.primary[0], progress),
        interpolate(startColors.primary[1], endColors.primary[1], progress),
        interpolate(startColors.primary[2], endColors.primary[2], progress)
      ];
      
      const currentSecondary = [
        interpolate(startColors.secondary[0], endColors.secondary[0], progress),
        interpolate(startColors.secondary[1], endColors.secondary[1], progress),
        interpolate(startColors.secondary[2], endColors.secondary[2], progress)
      ];
      
      return `linear-gradient(135deg, rgb(${currentPrimary.join(',')}) 0%, rgb(${currentSecondary.join(',')}) 100%)`;
    } else {
      // Original ocean depth gradient for other routes
      const startColors = {
        primary: [248, 246, 240],   // #f8f6f0
        secondary: [245, 243, 237]  // #f5f3ed
      };
      
      const endColors = {
        primary: [21, 39, 56],      // #152738 - deep ocean blue
        secondary: [31, 48, 67]     // #1f3043 - darker ocean blue
      };
      
      // Interpolate between colors
      const interpolate = (start, end, factor) => {
        return Math.round(start + (end - start) * factor);
      };
      
      const currentPrimary = [
        interpolate(startColors.primary[0], endColors.primary[0], progress),
        interpolate(startColors.primary[1], endColors.primary[1], progress),
        interpolate(startColors.primary[2], endColors.primary[2], progress)
      ];
      
      const currentSecondary = [
        interpolate(startColors.secondary[0], endColors.secondary[0], progress),
        interpolate(startColors.secondary[1], endColors.secondary[1], progress),
        interpolate(startColors.secondary[2], endColors.secondary[2], progress)
      ];
      
      return `linear-gradient(135deg, rgb(${currentPrimary.join(',')}) 0%, rgb(${currentSecondary.join(',')}) 100%)`;
    }
  };

  // Calculate decorative element colors based on progress
  const getDecoColors = () => {
    const progress = shownIds.length / routeText.length;
    
    // Check if this is the common route
    const isCommonRoute = routeText.some(group => 
      group.text && (
        group.text.includes('おじいさんとおばあさん') || 
        group.text.includes('おじぞうさん') ||
        group.text.includes('かさを作っていました')
      )
    );
    
    if (isCommonRoute) {
      // Snow and winter elements for common route
      if (progress < 0.3) {
        return { color1: "#f0f8ff", color2: "#e6f3ff", opacity: 0.4 }; // Light snow
      } else if (progress < 0.6) {
        return { color1: "#ddeeff", color2: "#b8d4f0", opacity: 0.6 }; // Heavier snow
      } else {
        return { color1: "#c0d6e8", color2: "#a0b8d0", opacity: 0.8 }; // Heavy snow at night
      }
    } else {
      // Original colors for other routes
      if (progress < 0.3) {
        return { color1: "#4ecdc4", color2: "#ff6b35", opacity: 0.3 };
      } else if (progress < 0.6) {
        return { color1: "#5a9bd4", color2: "#f39c12", opacity: 0.4 };
      } else {
        return { color1: "#3498db", color2: "#e74c3c", opacity: 0.5 };
      }
    }
  };

  const decorativeColors = getDecoColors();
  
  // Check if this is the common route for snow effects
  const isCommonRoute = routeText.some(group => 
    group.text && (
      group.text.includes('おじいさんとおばあさん') || 
      group.text.includes('おじぞうさん') ||
      group.text.includes('かさを作っていました')
    )
  );

  // Generate snow particles for common route
  const generateSnowParticles = () => {
    if (!isCommonRoute) return [];
    
    const snowCount = Math.min(shownIds.length * 2 + 5, 20); // Start with more snow, up to 20 particles
    const particles = [];
    
    for (let i = 0; i < snowCount; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5, // Shorter delays so snow appears sooner
        size: Math.random() * 3 + 3, // Larger snowflakes (3-6px)
        duration: Math.random() * 5 + 8 // Faster falling (8-13 seconds)
      });
    }
    
    return particles;
  };

  const snowParticles = generateSnowParticles();

  return (
    <div 
      ref={containerRef}
      className="horizontal-story-container"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: getBackgroundGradient(),
        padding: "3rem 2rem",
        paddingBottom: "100vh",
        position: "relative",
        transition: "background 1.5s ease-in-out" // Smooth background transition
      }}
    >
      {/* Dynamic decorative background elements */}
      <div style={{
        position: "absolute",
        top: "100px",
        left: "5%",
        width: "12px",
        height: "12px",
        backgroundColor: decorativeColors.color1,
        opacity: decorativeColors.opacity,
        borderRadius: isCommonRoute ? "50%" : "2px", // Circular for snow
        transition: "all 1.5s ease-in-out"
      }} />
      <div style={{
        position: "absolute",
        top: "200px",
        right: "8%",
        width: "10px",
        height: "10px",
        backgroundColor: decorativeColors.color2,
        opacity: decorativeColors.opacity,
        borderRadius: isCommonRoute ? "50%" : "2px", // Circular for snow
        transition: "all 1.5s ease-in-out"
      }} />
      
      {/* Snow particles for common route */}
      {isCommonRoute && (
        <>
          {/* Test snow particle - should be immediately visible */}
          <div
            style={{
              position: "fixed",
              left: "10%",
              top: "100px",
              width: "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: 0.9,
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
              animation: "snowfall 10s linear infinite",
              pointerEvents: "none",
              zIndex: 1000
            }}
          />
          
          {/* Generated snow particles */}
          {snowParticles.map(particle => (
            <div
              key={particle.id}
              style={{
                position: "fixed",
                left: `${particle.left}%`,
                top: "-20px",
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: "white",
                borderRadius: "50%",
                opacity: 0.9,
                boxShadow: "0 0 2px rgba(255,255,255,0.8)",
                animation: `snowfall ${particle.duration}s linear infinite`,
                animationDelay: `${particle.animationDelay}s`,
                pointerEvents: "none",
                zIndex: 1000
              }}
            />
          ))}
        </>
      )}
      
      {/* Additional depth elements for deeper progression */}
      {shownIds.length > 3 && (
        <>
          <div style={{
            position: "absolute",
            top: "350px",
            left: "15%",
            width: "8px",
            height: "8px",
            backgroundColor: isCommonRoute ? "#f8f8ff" : "#2c3e50",
            opacity: 0.4,
            borderRadius: "50%",
            animation: "float 4s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute",
            top: "450px",
            right: "20%",
            width: "6px",
            height: "6px",
            backgroundColor: isCommonRoute ? "#e0e6ff" : "#34495e",
            opacity: 0.3,
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite reverse"
          }} />
        </>
      )}

      <div 
        className="story-content"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1
        }}
      >
        {routeText.map((group, index) => {
          const isVisible = shownIds.includes(group.id);
          const processedLines = memoizedProcessedLines[group.id];
          const isLastShown = index === shownIds.length - 1 && isVisible;
          
          const lines = group.text ? group.text.split('\n') : [];
          const isDialogueText = isDialogue(group.text);
          const speaker = isDialogueText ? extractSpeaker(group.text) : null;
          
          // Determine dialogue side (left/right alternating)
          let dialogueSide = 'left';
          if (isDialogueText) {
            // Count previous dialogues to determine alternating pattern
            const previousDialogues = routeText.slice(0, index).filter(g => 
              shownIds.includes(g.id) && isDialogue(g.text)
            ).length;
            dialogueSide = previousDialogues % 2 === 0 ? 'left' : 'right';
          }
          
          if (!isVisible) return null;
          
          return (
            <div 
              key={group.id} 
              ref={isLastShown ? lastGroupRef : null}
              className="text-group-container"
              style={{
                marginBottom: "3rem",
                animation: isVisible ? "fadeInUp 0.6s ease-out" : "none"
              }}
            >
              {isDialogueText ? (
                <DialogueGroup
                  lines={lines}
                  processedLines={processedLines}
                  visible={isVisible}
                  side={dialogueSide}
                  speaker={speaker}
                  onKeywordClick={handleKeywordClick}
                  clickedKeywords={clickedKeywords}
                />
              ) : (
                <TextGroup
                  lines={lines}
                  processedLines={processedLines}
                  visible={isVisible}
                  layout="horizontal"
                  onKeywordClick={handleKeywordClick}
                  clickedKeywords={clickedKeywords}
                  shownIds={shownIds}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-8px); 
          }
        }
        
        @keyframes speechBubbleIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          60% {
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }
        
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) translateX(0px);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          95% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(calc(100vh + 50px)) translateX(30px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
