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
            <span key={part.key} style={{ color: "#2a2a2a" }}>
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
              color: part.color || "#007acc",
              cursor: "pointer",
              userSelect: "none"
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
        fontSize: "2rem",
        lineHeight: "1.6",
        letterSpacing: "0.2em",
        fontFamily: "'Courier New', 'Liberation Mono', 'Consolas', 'Monaco', monospace",
        fontWeight: "bold",
        color: "#2a2a2a",
        width: "75vw", 
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "none",
        MozOsxFontSmoothing: "unset",
        fontSmooth: "never",
        filter: "contrast(1.3) brightness(1.1)",
        textShadow: "1px 1px 0px rgba(0,0,0,0.4)",
        transform: "translateZ(0)",
      }}
    >
      {renderTextWithKeywords()}
    </motion.div>
  );
}
