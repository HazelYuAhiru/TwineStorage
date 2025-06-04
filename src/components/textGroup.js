import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function TextGroup({ lines, processedLines, visible, layout, onKeywordClick, clickedKeywords, shownIds }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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
      // Add space between original lines (except for the last line)
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

  // Typing animation effect
  useEffect(() => {
    if (!visible) return;
    
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
  }, [visible, totalTextLength]);

  const renderTextWithKeywords = () => {
    if (!isTypingComplete) {
      return <span>{displayedText}</span>;
    }
    
    return textParts.map((part, index) => {
      if (part.type === 'keyword') {
        // Check if this keyword has been clicked
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: "#f9f7f2",
        border: "3px solid #2a2a2a",
        borderRadius: "8px",
        padding: "2.5rem",
        margin: "1rem 0",
        maxWidth: "85vw",
        boxShadow: "0 6px 0 #2a2a2a, 0 8px 20px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative corner elements */}
      <div style={{
        position: "absolute",
        top: "12px",
        left: "12px",
        width: "8px",
        height: "8px",
        backgroundColor: "#4ecdc4",
        opacity: 0.6
      }} />
      <div style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        width: "8px",
        height: "8px",
        backgroundColor: "#ff6b35",
        opacity: 0.6
      }} />
      
      <div style={{
        fontSize: "1.4rem",
        lineHeight: "1.8",
        letterSpacing: "0.05em",
        fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
        fontWeight: "600",
        color: "#2a2a2a",
        textAlign: "left",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textIndent: "1.5em",
        marginBottom: "0.5rem"
      }}>
        {renderTextWithKeywords()}
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, transparent, rgba(78, 205, 196, 0.1), transparent)",
        pointerEvents: "none"
      }} />
    </motion.div>
  );
}
