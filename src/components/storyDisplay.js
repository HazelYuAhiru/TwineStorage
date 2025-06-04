import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TextGroup from "./textGroup";

export default function VerticalStoryDisplay({ routeText = [], onLastKeywordClick }) {
  const [shownIds, setShownIds] = useState(routeText.length > 0 ? [routeText[0].id] : []);
  const [clickedKeywords, setClickedKeywords] = useState(new Set());
  const containerRef = useRef(null);
  const lastGroupRef = useRef(null);
  const navigate = useNavigate();

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

  // Scroll to keep the last text group at 3/4 of the page height
  useEffect(() => {
    if (lastGroupRef.current) {
      const lastGroupElement = lastGroupRef.current;
      const targetPosition = window.innerHeight * 0.75;
      const elementTop = lastGroupElement.offsetTop;
      const scrollTarget = elementTop - targetPosition;
      
      window.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: shownIds.length === 1 ? 'auto' : 'smooth'
      });
    }
  }, [shownIds]);

  // Prevent scrolling beyond the last text group
  useEffect(() => {
    const handleScroll = () => {
      if (lastGroupRef.current) {
        const lastGroupElement = lastGroupRef.current;
        const lastGroupBottom = lastGroupElement.offsetTop + lastGroupElement.offsetHeight;
        const maxScroll = lastGroupBottom - window.innerHeight * 0.25;
        
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

  return (
    <div 
      ref={containerRef}
      className="horizontal-story-container"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #f8f6f0 0%, #f5f3ed 100%)",
        padding: "3rem 2rem",
        paddingBottom: "50vh",
        position: "relative"
      }}
    >
      {/* Decorative background elements for depth */}
      <div style={{
        position: "absolute",
        top: "100px",
        left: "5%",
        width: "12px",
        height: "12px",
        backgroundColor: "#4ecdc4",
        opacity: 0.3,
        borderRadius: "2px"
      }} />
      <div style={{
        position: "absolute",
        top: "200px",
        right: "8%",
        width: "10px",
        height: "10px",
        backgroundColor: "#ff6b35",
        opacity: 0.3,
        borderRadius: "2px"
      }} />
      
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
              <TextGroup
                lines={lines}
                processedLines={processedLines}
                visible={isVisible}
                layout="horizontal"
                onKeywordClick={handleKeywordClick}
                clickedKeywords={clickedKeywords}
                shownIds={shownIds}
              />
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
      `}</style>
    </div>
  );
}
