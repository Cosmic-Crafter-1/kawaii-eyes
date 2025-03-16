import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { KawaiiEyesProps } from './KawaiiEyesTypes';
import './shapes.css';

const KawaiiEyes: React.FC<KawaiiEyesProps> = ({
  faceColor = '#FFC6D9',
  eyeColor = 'white',
  pupilColor = 'black',
  faceShape = 'round',
  pupilShape = 'round',
  name = 'Mochi',
  eyeDistance = 30,
  size = 200,
  eyePlacement = 'center',
  eyeMovement = 'together',
  hasBlush = true,
  blushColor = '#FFA5B3',
  hasBorder = true,
  borderColor = '#000000',
  borderWidth = 7,
  // Chat bubble properties with defaults
  enableChat = false,
  chatLines = [],
  chatInterval = 3000,
  chatLoop = true,
  chatBubbleColor = '#FFFFFF',
  chatTextColor = '#333333',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isReacting, setIsReacting] = useState(false);
  const [reaction, setReaction] = useState<string>('');
  
  const faceDivRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  // Reactions for the Kawaii Eyes
  const reactions = [
    'happy', // Pupils get bigger, slight upward movement
    'excited', // Pupils shrink and move fast
    'surprised', // Pupils get very large
    'shy', // Pupils move down and to the sides
    'love', // Pupils become hearts momentarily
  ];

  // Custom hook for tracking mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Chat rotation logic
  useEffect(() => {
    if (!enableChat || chatLines.length === 0) return;
    
    const chatTimer = setInterval(() => {
      setCurrentChatIndex(prevIndex => {
        // If we're at the end and not looping, stay at the last message
        if (prevIndex === chatLines.length - 1 && !chatLoop) {
          return prevIndex;
        }
        // Otherwise cycle through messages
        return (prevIndex + 1) % chatLines.length;
      });
      
      // Trigger a reaction when changing chat messages
      triggerReaction();
    }, chatInterval);
    
    return () => clearInterval(chatTimer);
  }, [enableChat, chatLines, chatInterval, chatLoop]);

  // Trigger a random reaction
  const triggerReaction = () => {
    if (isReacting) return;
    
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    setReaction(randomReaction);
    setIsReacting(true);
    
    // Reset reaction after a short delay
    setTimeout(() => {
      setIsReacting(false);
      setReaction('');
    }, 1000);
  };

  // Calculate pupil position
  useEffect(() => {
    if (!faceDivRef.current || !leftEyeRef.current || !rightEyeRef.current || 
        !leftPupilRef.current || !rightPupilRef.current) return;

    const moveEye = (eyeRef: HTMLDivElement, pupilRef: HTMLDivElement, isRightEye: boolean) => {
      const eyeRect = eyeRef.getBoundingClientRect();
      const pupilRect = pupilRef.getBoundingClientRect();
      
      // Calculate the center of the eye
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      
      // Calculate angle between eye center and mouse
      const angle = Math.atan2(
        mousePosition.y - eyeCenterY,
        mousePosition.x - eyeCenterX
      );
      
      // Max distance pupil can move from center (40% of eye radius)
      const maxDistance = (eyeRect.width / 2) * 0.4;
      
      // For opposite movement, invert the angle for the right eye
      let finalAngle = angle;
      if (eyeMovement === 'opposite' && isRightEye) {
        finalAngle = angle + Math.PI; // Add 180 degrees to invert direction
      }
      
      // Calculate new position with constraints
      let distanceX = Math.cos(finalAngle) * maxDistance;
      let distanceY = Math.sin(finalAngle) * maxDistance;
      
      // Apply reaction adjustments
      if (isReacting) {
        switch (reaction) {
          case 'happy':
            // Pupils get bigger and move slightly up
            pupilRef.style.transform = `translate(${distanceX}px, ${distanceY - 2}px) scale(1.2)`;
            return;
          case 'excited':
            // Pupils shrink and move fast (jittery)
            const jitterX = distanceX + (Math.random() * 4 - 2);
            const jitterY = distanceY + (Math.random() * 4 - 2);
            pupilRef.style.transform = `translate(${jitterX}px, ${jitterY}px) scale(0.8)`;
            return;
          case 'surprised':
            // Pupils get very large
            pupilRef.style.transform = `translate(${distanceX}px, ${distanceY}px) scale(1.5)`;
            return;
          case 'shy':
            // Pupils move down and to the sides
            const shyX = isRightEye ? distanceX + 2 : distanceX - 2;
            pupilRef.style.transform = `translate(${shyX}px, ${distanceY + 3}px) scale(0.9)`;
            return;
          case 'love':
            // No special transform needed as we'll render hearts
            pupilRef.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
            return;
          default:
            // Normal movement
            pupilRef.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
        }
      } else {
        // Normal movement when not reacting
        pupilRef.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
      }
    };

    moveEye(leftEyeRef.current, leftPupilRef.current, false);
    moveEye(rightEyeRef.current, rightPupilRef.current, true);
  }, [mousePosition, eyeMovement, isReacting, reaction]);

  // Helper for face shape class
  const getFaceShapeClass = () => {
    switch (faceShape) {
      case 'round':
        return 'rounded-full';
      case 'square':
        return 'rounded-2xl';
      case 'blob':
        return 'animate-blob';
      case 'bounce':
        return 'animate-bounce';
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'animate-wave';
      case 'jiggle':
        return 'animate-jiggle';
      case 'heart':
        return 'heart-shape';
      default:
        return 'rounded-full';
    }
  };

  // Helper for pupil shape 
  const getPupilShapeClass = () => {
    switch (pupilShape) {
      case 'round':
        return 'rounded-full';
      case 'heart':
        return 'heart-shape';
      case 'star':
        return 'star-shape';
      case 'diamond':
        return 'diamond-shape';
      default:
        return 'rounded-full';
    }
  };

  // Get eye position based on placement
  const getEyePosition = () => {
    let leftPos, rightPos;
    
    switch (eyePlacement) {
      case 'left':
        leftPos = 30 - eyeDistance / 2;
        rightPos = 30 + eyeDistance / 2;
        break;
      case 'right':
        leftPos = 70 - eyeDistance / 2;
        rightPos = 70 + eyeDistance / 2;
        break;
      case 'center':
      default:
        leftPos = 50 - eyeDistance / 2;
        rightPos = 50 + eyeDistance / 2;
    }
    
    return { leftPos, rightPos };
  };

  const getCustomPupilShape = () => {
    // When in love reaction, override pupil shape to hearts
    if (reaction === 'love') {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="heart-shape w-3/4 h-3/4" style={{ backgroundColor: pupilColor }}></div>
        </div>
      );
    }
    
    switch (pupilShape) {
      case 'heart':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="heart-shape w-3/4 h-3/4" style={{ backgroundColor: pupilColor }}></div>
          </div>
        );
      case 'star':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="star-shape w-3/4 h-3/4" style={{ backgroundColor: pupilColor }}></div>
          </div>
        );
      case 'diamond':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="diamond-shape w-1/2 h-1/2" style={{ backgroundColor: pupilColor }}></div>
          </div>
        );
      default:
        return (
          <div 
            className={cn("w-1/2 h-1/2 transition-transform duration-75", getPupilShapeClass())}
            style={{ backgroundColor: pupilColor }}
          ></div>
        );
    }
  };

  const eyePositions = getEyePosition();

  // Border style for face
  const borderStyle = hasBorder ? {
    border: `${borderWidth}px solid ${borderColor}`
  } : {};

  return (
    <div className="relative flex flex-col items-center">
      {/* Chat Bubble */}
      {enableChat && chatLines.length > 0 && (
        <div 
          className="absolute z-20 px-4 py-3 rounded-xl shadow-md animate-bounce-slow"
          style={{ 
            backgroundColor: chatBubbleColor,
            color: chatTextColor,
            top: `-${size * 0.2}px`,
            right: `-${size * 0.3}px`,
            maxWidth: `${Math.max(size * 1.5, 200)}px`,
            border: '1px solid rgba(0,0,0,0.1)',
            fontSize: `${Math.max(size * 0.07, 14)}px`,
          }}
        >
          <div className="relative">
            {chatLines[currentChatIndex]}
            {/* Chat bubble tail */}
            <div 
              className="absolute bottom-0 left-0 w-4 h-4 transform translate-y-1/2 -translate-x-1/2 rotate-45"
              style={{ backgroundColor: chatBubbleColor, borderLeft: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Kawaii Face */}
      <div 
        ref={faceDivRef}
        className={cn("relative flex items-center justify-center transition-all duration-300", 
          getFaceShapeClass())}
        style={{ 
          backgroundColor: faceColor,
          width: `${size}px`,
          height: `${size}px`,
          ...borderStyle
        }}
      >
        {/* Left Eye */}
        <div 
          ref={leftEyeRef}
          className="absolute bg-white rounded-full flex items-center justify-center kawaii-shadow z-10"
          style={{ 
            width: `${size * 0.35}px`, 
            height: `${size * 0.35}px`,
            backgroundColor: eyeColor,
            left: `${eyePositions.leftPos}%`,
            top: faceShape === 'heart' ? '30%' : '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            ref={leftPupilRef}
            className="flex items-center justify-center transition-transform duration-75"
            style={{ 
              width: `${size * 0.15}px`, 
              height: `${size * 0.15}px`,
            }}
          >
            {getCustomPupilShape()}
          </div>
        </div>
        
        {/* Right Eye */}
        <div 
          ref={rightEyeRef}
          className="absolute bg-white rounded-full flex items-center justify-center kawaii-shadow z-10"
          style={{ 
            width: `${size * 0.35}px`, 
            height: `${size * 0.35}px`,
            backgroundColor: eyeColor,
            left: `${eyePositions.rightPos}%`,
            top: faceShape === 'heart' ? '30%' : '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            ref={rightPupilRef}
            className="flex items-center justify-center transition-transform duration-75"
            style={{ 
              width: `${size * 0.15}px`, 
              height: `${size * 0.15}px`,
            }}
          >
            {getCustomPupilShape()}
          </div>
        </div>

        {/* Blush */}
        {hasBlush && (
          <>
            <div 
              className="absolute rounded-full z-10 opacity-70"
              style={{ 
                width: `${size * 0.25}px`, 
                height: `${size * 0.12}px`,
                backgroundColor: blushColor,
                left: `${eyePositions.leftPos - 10}%`,
                top: faceShape === 'heart' ? '50%' : '65%',
                transform: 'translate(-50%, -50%)'
              }}
            />
            <div 
              className="absolute rounded-full z-10 opacity-70"
              style={{ 
                width: `${size * 0.25}px`, 
                height: `${size * 0.12}px`,
                backgroundColor: blushColor,
                left: `${eyePositions.rightPos + 10}%`,
                top: faceShape === 'heart' ? '50%' : '65%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </>
        )}

        {/* Name Label (optional) */}
        {name && (
          <div 
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center font-medium"
            style={{ fontSize: `${size * 0.15}px` }}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  );
};

export default KawaiiEyes;
