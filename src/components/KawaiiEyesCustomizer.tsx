"use client"

import type React from "react"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Code, Heart, Circle, Square, Star, Diamond, MessageCircle, Plus, Trash2, FileArchive } from "lucide-react"
import { toast } from "sonner"
import KawaiiEyes from "./KawaiiEyes"
import type { KawaiiEyesProps } from "./KawaiiEyesTypes"
import JSZip from "jszip"

const KawaiiEyesCustomizer: React.FC = () => {
  const [config, setConfig] = useState<KawaiiEyesProps>({
    faceColor: "#FFC6D9",
    eyeColor: "#FFFFFF",
    pupilColor: "#000000",
    faceShape: "round",
    pupilShape: "round",
    name: "Mochi",
    eyeDistance: 30,
    size: 200,
    eyePlacement: "center",
    eyeMovement: "together",
    hasBlush: true,
    blushColor: "#FFA5B3",
    hasBorder: true,
    borderColor: "#000000",
    borderWidth: 7,
    // Chat bubble properties
    enableChat: false,
    chatLines: [],
    chatInterval: 3000,
    chatLoop: true,
    chatBubbleColor: "#FFFFFF",
    chatTextColor: "#333333",
  })

  // New state for managing chat input
  const [newChatLine, setNewChatLine] = useState("")

  const colors = {
    faces: [
      { name: "Pink", value: "#FFC6D9" },
      { name: "Purple", value: "#D6BCFA" },
      { name: "Blue", value: "#A5C8FF" },
      { name: "Mint", value: "#A5E9D1" },
      { name: "Yellow", value: "#FFF2A8" },
      { name: "Peach", value: "#FFD6CC" },
    ],
    eyes: [
      { name: "White", value: "#FFFFFF" },
      { name: "Cream", value: "#FFF5E0" },
      { name: "Light Blue", value: "#E6F4FF" },
      { name: "Light Pink", value: "#FFE6EE" },
    ],
    pupils: [
      { name: "Black", value: "#000000" },
      { name: "Blue", value: "#4F86F7" },
      { name: "Brown", value: "#8B4513" },
      { name: "Green", value: "#228B22" },
      { name: "Purple", value: "#9932CC" },
    ],
    blush: [
      { name: "Pink", value: "#FFA5B3" },
      { name: "Red", value: "#FF6B6B" },
      { name: "Orange", value: "#FFA07A" },
      { name: "Purple", value: "#D8B4FE" },
    ],
    borders: [
      { name: "Black", value: "#000000" },
      { name: "Brown", value: "#8B4513" },
      { name: "Gray", value: "#808080" },
      { name: "Pink", value: "#FF69B4" },
    ],
    bubbles: [
      { name: "White", value: "#FFFFFF" },
      { name: "Light Blue", value: "#E6F4FF" },
      { name: "Light Pink", value: "#FFE6EE" },
      { name: "Light Yellow", value: "#FFFEE0" },
      { name: "Light Purple", value: "#F3E8FF" },
      { name: "Light Green", value: "#E7F9EF" },
    ],
    text: [
      { name: "Black", value: "#333333" },
      { name: "Dark Blue", value: "#2C3E50" },
      { name: "Dark Purple", value: "#4A235A" },
      { name: "Dark Green", value: "#1E4620" },
      { name: "Dark Pink", value: "#971249" },
    ],
  }

  const faceShapes = [
    { name: "Round", value: "round", icon: Circle },
    { name: "Square", value: "square", icon: Square },
    { name: "Heart", value: "heart", icon: Heart },
    { name: "Ghost", value: "ghost", icon: Circle },
  ]

  const animatedFaceShapes = [
    { name: "Blob", value: "blob", icon: Circle },
    { name: "Bounce", value: "bounce", icon: Circle },
    { name: "Pulse", value: "pulse", icon: Circle },
    { name: "Wave", value: "wave", icon: Circle },
    { name: "Jiggle", value: "jiggle", icon: Circle },
  ]

  const pupilShapes = [
    { name: "Round", value: "round", icon: Circle },
    { name: "Heart", value: "heart", icon: Heart },
    { name: "Star", value: "star", icon: Star },
    { name: "Diamond", value: "diamond", icon: Diamond },
  ]

  const eyePlacements = [
    { name: "Left", value: "left" },
    { name: "Center", value: "center" },
    { name: "Right", value: "right" },
  ]

  const eyeMovements = [
    { name: "Together", value: "together" },
    { name: "Opposite", value: "opposite" },
  ]

  // Add hover expressions
  const hoverExpressions = [">_<", "^_^", ">w<", ">.<", ">3<", ">o<", ">u<", ">n<"]

  const handleChange = (key: keyof KawaiiEyesProps, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  // Add a chat line
  const addChatLine = () => {
    if (newChatLine.trim() === "") return

    setConfig((prev) => ({
      ...prev,
      chatLines: [...prev.chatLines, newChatLine.trim()],
    }))
    setNewChatLine("")

    if (!config.enableChat) {
      // Enable chat if adding the first line
      handleChange("enableChat", true)
    }

    toast.success("Chat line added!")
  }

  // Remove a chat line
  const removeChatLine = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      chatLines: prev.chatLines.filter((_, i) => i !== index),
    }))

    toast.success("Chat line removed!")
  }

  // Component for color selector with preset colors and a color picker
  const ColorSelector = ({
    value,
    onChange,
    colorOptions,
    label,
  }: {
    value: string
    onChange: (color: string) => void
    colorOptions: { name: string; value: string }[]
    label: string
  }) => {
    return (
      <div>
        <Label className="mb-3 block">{label}</Label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {colorOptions.map((color) => (
            <Button
              key={color.value}
              type="button"
              variant={value === color.value ? "default" : "outline"}
              className="h-12 w-full p-0 relative"
              onClick={() => onChange(color.value)}
            >
              <div className="absolute inset-2 rounded-sm" style={{ backgroundColor: color.value }}></div>
              <span className="sr-only">{color.name}</span>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor={`custom-${label.toLowerCase()}`} className="whitespace-nowrap">
            Custom:
          </Label>
          <Input
            id={`custom-${label.toLowerCase()}`}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 h-10 p-1"
          />
          <div className="flex-1">
            <Input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#RRGGBB"
              className="font-mono"
            />
          </div>
        </div>
      </div>
    )
  }

  const generateComponentCode = () => {
    return `import React, { useState, useEffect, useRef } from 'react';

// Kawaii Eyes Component
const KawaiiEyes = () => {
  // Configuration from customizer
  const config = {
    faceColor: "${config.faceColor}",
    eyeColor: "${config.eyeColor}",
    pupilColor: "${config.pupilColor}",
    faceShape: "${config.faceShape}",
    pupilShape: "${config.pupilShape}",
    name: "${config.name}",
    eyeDistance: ${config.eyeDistance},
    size: ${config.size},
    eyePlacement: "${config.eyePlacement}",
    eyeMovement: "${config.eyeMovement}",
    hasBlush: ${config.hasBlush},
    blushColor: "${config.blushColor}",
    hasBorder: ${config.hasBorder},
    borderColor: "${config.borderColor}",
    borderWidth: ${config.borderWidth},
    // Chat configuration
    enableChat: ${config.enableChat},
    chatLines: ${JSON.stringify(config.chatLines)},
    chatInterval: ${config.chatInterval},
    chatLoop: ${config.chatLoop},
    chatBubbleColor: "${config.chatBubbleColor}",
    chatTextColor: "${config.chatTextColor}"
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isReacting, setIsReacting] = useState(false);
  const [reaction, setReaction] = useState('');
  
  const faceDivRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  // Reactions for the Kawaii Eyes
  const reactions = [
    'happy', // Pupils get bigger, slight upward movement
    'excited', // Pupils shrink and move fast
    'surprised', // Pupils get very large
    'shy', // Pupils move down and to the sides
    'love', // Pupils become hearts momentarily
  ];

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Chat rotation logic
  useEffect(() => {
    if (!config.enableChat || config.chatLines.length === 0) return;
    
    const chatTimer = setInterval(() => {
      setCurrentChatIndex(prevIndex => {
        // If we're at the end and not looping, stay at the last message
        if (prevIndex === config.chatLines.length - 1 && !config.chatLoop) {
          return prevIndex;
        }
        // Otherwise cycle through messages
        return (prevIndex + 1) % config.chatLines.length;
      });
      
      // Trigger a reaction when changing chat messages
      triggerReaction();
    }, config.chatInterval);
    
    return () => clearInterval(chatTimer);
  }, [config.enableChat, config.chatLines, config.chatInterval, config.chatLoop]);
  
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

  // Calculate pupil position with reactions
  useEffect(() => {
    if (!faceDivRef.current || !leftEyeRef.current || !rightEyeRef.current || 
        !leftPupilRef.current || !rightPupilRef.current) return;

    const moveEye = (eyeRef, pupilRef, isRightEye) => {
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
      if (config.eyeMovement === 'opposite' && isRightEye) {
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
            pupilRef.style.transform = \`translate(\${distanceX}px, \${distanceY - 2}px) scale(1.2)\`;
            return;
          case 'excited':
            // Pupils shrink and move fast (jittery)
            const jitterX = distanceX + (Math.random() * 4 - 2);
            const jitterY = distanceY + (Math.random() * 4 - 2);
            pupilRef.style.transform = \`translate(\${jitterX}px, \${jitterY}px) scale(0.8)\`;
            return;
          case 'surprised':
            // Pupils get very large
            pupilRef.style.transform = \`translate(\${distanceX}px, \${distanceY}px) scale(1.5)\`;
            return;
          case 'shy':
            // Pupils move down and to the sides
            const shyX = isRightEye ? distanceX + 2 : distanceX - 2;
            pupilRef.style.transform = \`translate(\${shyX}px, \${distanceY + 3}px) scale(0.9)\`;
            return;
          case 'love':
            // No special transform needed as we'll render hearts instead
            pupilRef.style.transform = \`translate(\${distanceX}px, \${distanceY}px)\`;
            return;
          default:
            // Normal movement
            pupilRef.style.transform = \`translate(\${distanceX}px, \${distanceY}px)\`;
        }
      } else {
        // Normal movement when not reacting
        pupilRef.style.transform = \`translate(\${distanceX}px, \${distanceY}px)\`;
      }
    };

    moveEye(leftEyeRef.current, leftPupilRef.current, false);
    moveEye(rightEyeRef.current, rightPupilRef.current, true);
  }, [mousePosition, config.eyeMovement, isReacting, reaction]);

  // Helper for face shape
  const getFaceShapeStyle = () => {
    const baseStyle = \`
      position: relative;
      transition: all 0.3s;
      &:hover::before {
        content: '\${hoverExpressions[Math.floor(Math.random() * hoverExpressions.length)]}';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: \${config.size * 0.2}px;
        color: \${config.pupilColor};
        z-index: 20;
        pointer-events: none;
      }
    \`;

    switch (config.faceShape) {
      case 'round':
        return \`\${baseStyle} border-radius: 50%;\`;
      case 'square':
        return \`\${baseStyle} border-radius: 15%;\`;
      case 'blob': 
        return \`\${baseStyle} border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; animation: blob 15s ease-in-out infinite;\`;
      case 'heart': 
        return \`\${baseStyle} position: relative; transform: rotate(-45deg) scale(0.8);\`;
      case 'ghost':
        return \`\${baseStyle} 
    border-radius: 40% 40% 0 0;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 25%;
      background-color: inherit;
      border-bottom-left-radius: 40% 50%;
      border-bottom-right-radius: 40% 50%;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 75% 85%, 50% 100%, 25% 85%, 0 100%);
    }
  \`;
    case 'bounce':
      return \`\${baseStyle} border-radius: 50%; animation: bounce 6s ease-in-out infinite;\`;
    case 'pulse':
      return \`\${baseStyle} border-radius: 50%; animation: pulse 6s ease-in-out infinite;\`;
    case 'wave':
      return \`\${baseStyle} border-radius: 50%; animation: wave 7s ease-in-out infinite;\`;
    case 'jiggle':
      return \`\${baseStyle} border-radius: 50%; animation: jiggle 6s ease-in-out infinite;\`;
    default:
      return \`\${baseStyle} border-radius: 50%;\`;
  }
};

  // Get eye position based on placement
  const getEyePosition = () => {
    let leftPos, rightPos;
    
    switch (config.eyePlacement) {
      case 'left':
        leftPos = 30 - config.eyeDistance / 2;
        rightPos = 30 + config.eyeDistance / 2;
        break;
      case 'right':
        leftPos = 70 - config.eyeDistance / 2;
        rightPos = 70 + config.eyeDistance / 2;
        break;
      case 'center':
      default:
        leftPos = 50 - config.eyeDistance / 2;
        rightPos = 50 + config.eyeDistance / 2;
    }
    
    return { leftPos, rightPos };
  };

  // Render custom pupil shape
  const getPupilElement = () => {
    // When in love reaction, override pupil shape to hearts
    if (reaction === 'love') {
      return \`
        <div style="
          width: 75%; 
          height: 75%; 
          position: relative;
          transform: rotate(-45deg) scale(0.8);
          background-color: \${config.pupilColor};
        ">
          <div style="
            content: '';
            position: absolute;
            background-color: inherit;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            top: -50%;
            left: 0;
          "></div>
          <div style="
            content: '';
            position: absolute;
            background-color: inherit;
            border-radius: 50%;
            width: 100%;
            height: 100%;
            top: 0;
            right: -50%;
          "></div>
        </div>
      \`;
    }
    
    switch (config.pupilShape) {
      case 'heart':
        return \`
          <div style="
            width: 75%; 
            height: 75%; 
            position: relative;
            transform: rotate(-45deg) scale(0.8);
            background-color: \${config.pupilColor};
          ">
            <div style="
              content: '';
              position: absolute;
              background-color: inherit;
              border-radius: 50%;
              width: 100%;
              height: 100%;
              top: -50%;
              left: 0;
            "></div>
            <div style="
              content: '';
              position: absolute;
              background-color: inherit;
              border-radius: 50%;
              width: 100%;
              height: 100%;
              top: 0;
              right: -50%;
            "></div>
          </div>
        \`;
      case 'star':
        return \`
          <div style="
            width: 75%; 
            height: 75%; 
            position: relative;
          ">
            <div style="
              width: 100%;
              height: 100%;
              background-color: \${config.pupilColor};
              position: absolute;
              transform: rotate(0deg);
            "></div>
            <div style="
              width: 100%;
              height: 100%;
              background-color: \${config.pupilColor};
              position: absolute;
              transform: rotate(72deg);
            "></div>
            <div style="
              width: 100%;
              height: 100%;
              background-color: \${config.pupilColor};
              position: absolute;
              transform: rotate(144deg);
            "></div>
          </div>
        \`;
      case 'diamond':
        return \`
          <div style="
            width: 50%; 
            height: 50%; 
            background-color: \${config.pupilColor};
            transform: rotate(45deg);
          "></div>
        \`;
      default:
        return \`
          <div style="
            width: 50%; 
            height: 50%; 
            background-color: \${config.pupilColor};
            border-radius: 50%;
          "></div>
        \`;
    }
  };

  // CSS for animations
  const keyframesCSS = \`
    @keyframes blob {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
      75% { border-radius: 60% 40% 60% 30% / 60% 40% 60% 50%; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.01); }
    }
    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(1deg); }
      75% { transform: rotate(-1deg); }
    }
    @keyframes jiggle {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-1px); }
      75% { transform: translateX(1px); }
    }
  \`;

  // Get positions for eyes
  const eyePositions = getEyePosition();
  const eyeTopPosition = config.faceShape === 'heart' ? '30%' : '50%';

  // Border style
  const borderStyle = config.hasBorder ? \`border: \${config.borderWidth}px solid \${config.borderColor};\` : '';

  return (
    <>
      <style>
        {\`
          \${keyframesCSS}
          .kawaii-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .kawaii-face {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: \${config.size}px;
            height: \${config.size}px;
            background-color: \${config.faceColor};
            \${getFaceShapeStyle()}
            transition: all 0.3s;
            \${borderStyle}
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
                        0 8px 10px -6px rgba(0, 0, 0, 0.03);
          }
          .kawaii-eye {
            position: absolute;
            width: \${config.size * 0.35}px;
            height: \${config.size * 0.35}px;
            background-color: \${config.eyeColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 10;
          }
          .kawaii-eye-left {
            left: \${eyePositions.leftPos}%;
            top: \${eyeTopPosition};
            transform: translate(-50%, -50%);
          }
          .kawaii-eye-right {
            left: \${eyePositions.rightPos}%;
            top: \${eyeTopPosition};
            transform: translate(-50%, -50%);
          }
          .kawaii-pupil {
            width: \${config.size * 0.15}px;
            height: \${config.size * 0.15}px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.075s;
          }
          .kawaii-blush {
            position: absolute;
            width: \${config.size * 0.25}px;
            height: \${config.size * 0.12}px;
            background-color: \${config.blushColor};
            border-radius: 50%;
            z-index: 5;
            opacity: 0.7;
          }
          .kawaii-blush-left {
            left: \${eyePositions.leftPos - 10}%;
            top: \${config.faceShape === 'heart' ? '50%' : '65%'};
            transform: translate(-50%, -50%);
          }
          .kawaii-blush-right {
            left: \${eyePositions.rightPos + 10}%;
            top: \${config.faceShape === 'heart' ? '50%' : '65%'};
            transform: translate(-50%, -50%);
          }
          .kawaii-name {
            position: absolute;
            bottom: -\${config.size * 0.12}px;
            left: 50%;
            transform: translateX(-50%);
            font-size: \${config.size * 0.15}px;
            font-family: sans-serif;
            font-weight: 500;
            text-align: center;
          }
          .kawaii-chat-bubble {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            background-color: \${config.chatBubbleColor};
            color: \${config.chatTextColor};
            padding: 12px 16px;
            border-radius: 12px;
            max-width: \${Math.max(config.size * 1.5, 200)}px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-bottom: 20px;
            font-family: sans-serif;
            font-size: \${config.size * 0.08}px;
            z-index: 20;
            border: 1px solid rgba(0,0,0,0.1);
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .kawaii-chat-bubble::after {
            display: none;
          }
        \`}
      </style>
      
      <div className="kawaii-container">
        {config.enableChat && config.chatLines.length > 0 && (
          <div className="kawaii-chat-bubble">
            {config.chatLines[currentChatIndex]}
          </div>
        )}
        
        <div ref={faceDivRef} className="kawaii-face">
          <div ref={leftEyeRef} className="kawaii-eye kawaii-eye-left">
            <div ref={leftPupilRef} className="kawaii-pupil" dangerouslySetInnerHTML={{ __html: getPupilElement() }} />
          </div>
          <div ref={rightEyeRef} className="kawaii-eye kawaii-eye-right">
            <div ref={rightPupilRef} className="kawaii-pupil" dangerouslySetInnerHTML={{ __html: getPupilElement() }} />
          </div>
          
          {config.hasBlush && (
            <>
              <div className="kawaii-blush kawaii-blush-left"></div>
              <div className="kawaii-blush kawaii-blush-right"></div>
            </>
          )}
          
          {config.name && <div className="kawaii-name">{config.name}</div>}
        </div>
      </div>
    </>
  );
};

export default KawaiiEyes;
`
  }

  const downloadAsZip = async () => {
    const zip = new JSZip()

    // Add the main component file
    zip.file("KawaiiEyes.tsx", generateComponentCode())

    // Add the types file
    zip.file("KawaiiEyesTypes.ts", generateTypesCode())

    // Add the CSS file
    zip.file("shapes.css", generateCssCode())

    // Add a README file
    zip.file("README.md", generateReadmeCode())

    // Generate and download the zip
    const content = await zip.generateAsync({ type: "blob" })
    const url = window.URL.createObjectURL(content)
    const link = document.createElement("a")
    link.href = url
    link.download = "kawaii-eyes-component.zip"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const generateTypesCode = () => {
    return `export interface KawaiiEyesProps {
      faceColor: string;
      eyeColor: string;
      pupilColor: string;
      faceShape: 'round' | 'square' | 'blob' | 'heart' | 'bounce' | 'pulse' | 'wave' | 'jiggle' | 'ghost';
      pupilShape: 'round' | 'heart' | 'star' | 'diamond';
      name: string;
      eyeDistance: number;
      size: number;
      eyePlacement: 'left' | 'center' | 'right';
      eyeMovement: 'together' | 'opposite';
      hasBlush: boolean;
      blushColor: string;
      hasBorder: boolean;
      borderColor: string;
      borderWidth: number;
      // Chat bubble properties
      enableChat: boolean;
      chatLines: string[];
      chatInterval: number;
      chatLoop: boolean;
      chatBubbleColor: string;
      chatTextColor: string;
    }`
  }

  const generateCssCode = () => {
    return `@keyframes blob {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
      75% { border-radius: 60% 40% 60% 30% / 60% 40% 60% 50%; }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.01); }
    }

    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(1deg); }
      75% { transform: rotate(-1deg); }
    }

    @keyframes jiggle {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-1px); }
      75% { transform: translateX(1px); }
    }

    .animate-blob {
      animation: blob 15s ease-in-out infinite;
    }

    .animate-bounce {
      animation: bounce 6s ease-in-out infinite;
    }

    .animate-pulse {
      animation: pulse 6s ease-in-out infinite;
    }

    .animate-wave {
      animation: wave 7s ease-in-out infinite;
    }

    .animate-jiggle {
      animation: jiggle 6s ease-in-out infinite;
    }

    .heart-shape {
      position: relative;
      transform: rotate(-45deg) scale(0.8);
    }

    .heart-shape:before,
    .heart-shape:after {
      content: '';
      position: absolute;
      background-color: inherit;
      border-radius: 50%;
    }

    .heart-shape:before {
      width: 100%;
      height: 100%;
      top: -50%;
      left: 0;
    }

    .heart-shape:after {
      width: 100%;
      height: 100%;
      top: 0;
      right: -50%;
    }`
  }

  const generateReadmeCode = () => {
    return `# Kawaii Eyes Component

A cute and customizable eyes component for React applications.

## Features

- Customizable face shapes (round, square, blob, heart)
- Animated face shapes (bounce, pulse, wave, jiggle)
- Customizable eye colors and pupil shapes
- Interactive eye movement following cursor
- Optional chat bubble with customizable messages
- Blush and border customization
- Fully responsive

## Installation

1. Copy the component files to your project
2. Import the component:
\`\`\`jsx
import KawaiiEyes from './KawaiiEyes';
\`\`\`

## Usage

\`\`\`jsx
<KawaiiEyes
  faceColor="#FFC6D9"
  eyeColor="white"
  pupilColor="black"
  faceShape="round"
  pupilShape="round"
  name="Mochi"
  size={200}
  hasBlush={true}
  hasBorder={true}
  borderWidth={7}
/>
\`\`\`

## Props

See the \`KawaiiEyesTypes.ts\` file for a complete list of available props.

## License

MIT`
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        {/* Preview Section */}
        <div className="flex flex-col items-center justify-center p-10 glass-card animate-float">
          <div className="mb-8 text-center">
            <span className="px-3 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-full mb-2 inline-block animate-fade-in">
              Live Preview
            </span>
            <h2 className="text-2xl font-medium mt-2">{config.name || "Kawaii Eyes"}</h2>
          </div>
          <div className="flex items-center justify-center p-4 min-h-[300px]">
            <KawaiiEyes {...config} />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              onClick={() => {
                const code = generateComponentCode()
                const blob = new Blob([code], { type: "text/plain" })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = url
                link.download = "KawaiiEyes.tsx"
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
              }}
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              Download as single component
            </Button>
            <Button onClick={downloadAsZip} className="flex items-center gap-2">
              <FileArchive className="h-4 w-4" />
              Download split components
            </Button>
          </div>
        </div>

        {/* Customization Section */}
        <div className="glass-card p-6 animate-fade-in">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-6 mb-6">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="shape">Shape</TabsTrigger>
              <TabsTrigger value="eyes">Eyes</TabsTrigger>
              <TabsTrigger value="color">Colors</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={config.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter a cute name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Size</Label>
                    <span className="text-sm text-muted-foreground">{config.size}px</span>
                  </div>
                  <Slider
                    value={[config.size]}
                    onValueChange={(value) => handleChange("size", value[0])}
                    min={100}
                    max={400}
                    step={10}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shape" className="space-y-6">
              <div>
                <Label className="mb-3 block">Face Shape</Label>
                <RadioGroup
                  value={config.faceShape}
                  onValueChange={(value) => handleChange("faceShape", value)}
                  className="grid grid-cols-4 gap-4"
                >
                  {faceShapes.map((shape) => (
                    <div key={shape.value} className="text-center">
                      <RadioGroupItem value={shape.value} id={`shape-${shape.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`shape-${shape.value}`}
                        className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <shape.icon className="h-6 w-6" />
                        </div>
                        <span className="ml-2">{shape.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-3 block">Animated Face Shapes</Label>
                <RadioGroup
                  value={config.faceShape}
                  onValueChange={(value) => handleChange("faceShape", value)}
                  className="grid grid-cols-5 gap-4"
                >
                  {animatedFaceShapes.map((shape) => (
                    <div key={shape.value} className="text-center">
                      <RadioGroupItem value={shape.value} id={`shape-${shape.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`shape-${shape.value}`}
                        className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div
                          className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${
                            shape.value === "blob"
                              ? "animate-blob"
                              : shape.value === "bounce"
                                ? "animate-bounce"
                                : shape.value === "pulse"
                                  ? "animate-pulse"
                                  : "animate-jiggle"
                          }`}
                        >
                          <Circle className="h-6 w-6" />
                        </div>
                        <span className="ml-2">{shape.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="mb-3 block">Pupil Shape</Label>
                <RadioGroup
                  value={config.pupilShape}
                  onValueChange={(value) => handleChange("pupilShape", value)}
                  className="grid grid-cols-4 gap-4"
                >
                  {pupilShapes.map((shape) => (
                    <div key={shape.value} className="text-center">
                      <RadioGroupItem value={shape.value} id={`pupil-${shape.value}`} className="peer sr-only" />
                      <Label
                        htmlFor={`pupil-${shape.value}`}
                        className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <shape.icon className="h-6 w-6" />
                        </div>
                        <span className="ml-2">{shape.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="eyes" className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Eye Distance</Label>
                  <span className="text-sm text-muted-foreground">{config.eyeDistance}%</span>
                </div>
                <Slider
                  value={[config.eyeDistance]}
                  onValueChange={(value) => handleChange("eyeDistance", value[0])}
                  min={20}
                  max={60}
                  step={1}
                />
              </div>

              <div className="mt-6">
                <Label className="mb-3 block">Eye Placement</Label>
                <RadioGroup
                  value={config.eyePlacement}
                  onValueChange={(value) => handleChange("eyePlacement", value)}
                  className="grid grid-cols-3 gap-4"
                >
                  {eyePlacements.map((placement) => (
                    <div key={placement.value} className="text-center">
                      <RadioGroupItem
                        value={placement.value}
                        id={`placement-${placement.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`placement-${placement.value}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>{placement.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="mt-6">
                <Label className="mb-3 block">Eye Movement</Label>
                <RadioGroup
                  value={config.eyeMovement}
                  onValueChange={(value) => handleChange("eyeMovement", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  {eyeMovements.map((movement) => (
                    <div key={movement.value} className="text-center">
                      <RadioGroupItem
                        value={movement.value}
                        id={`movement-${movement.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`movement-${movement.value}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>{movement.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="color" className="space-y-6">
              <ColorSelector
                label="Face Color"
                value={config.faceColor}
                onChange={(color) => handleChange("faceColor", color)}
                colorOptions={colors.faces}
              />

              <ColorSelector
                label="Eye Color"
                value={config.eyeColor}
                onChange={(color) => handleChange("eyeColor", color)}
                colorOptions={colors.eyes}
              />

              <ColorSelector
                label="Pupil Color"
                value={config.pupilColor}
                onChange={(color) => handleChange("pupilColor", color)}
                colorOptions={colors.pupils}
              />
            </TabsContent>

            <TabsContent value="style" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="has-blush" className="cursor-pointer">
                    Blush
                  </Label>
                  <Switch
                    id="has-blush"
                    checked={config.hasBlush}
                    onCheckedChange={(checked) => handleChange("hasBlush", checked)}
                  />
                </div>

                {config.hasBlush && (
                  <div className="mt-4 pl-4 border-l-2 border-muted">
                    <ColorSelector
                      label="Blush Color"
                      value={config.blushColor}
                      onChange={(color) => handleChange("blushColor", color)}
                      colorOptions={colors.blush}
                    />
                  </div>
                )}

                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="has-border" className="cursor-pointer">
                      Border
                    </Label>
                    <Switch
                      id="has-border"
                      checked={config.hasBorder}
                      onCheckedChange={(checked) => handleChange("hasBorder", checked)}
                    />
                  </div>

                  {config.hasBorder && (
                    <div className="mt-4 pl-4 border-l-2 border-muted space-y-4">
                      <ColorSelector
                        label="Border Color"
                        value={config.borderColor}
                        onChange={(color) => handleChange("borderColor", color)}
                        colorOptions={colors.borders}
                      />

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Border Width</Label>
                          <span className="text-sm text-muted-foreground">{config.borderWidth}px</span>
                        </div>
                        <Slider
                          value={[config.borderWidth]}
                          onValueChange={(value) => handleChange("borderWidth", value[0])}
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Chat Bubble Tab */}
            <TabsContent value="chat" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-chat" className="cursor-pointer">
                    Enable Chat Bubble
                  </Label>
                  <Switch
                    id="enable-chat"
                    checked={config.enableChat}
                    onCheckedChange={(checked) => handleChange("enableChat", checked)}
                  />
                </div>

                {config.enableChat && (
                  <div className="mt-4 pl-4 border-l-2 border-muted space-y-5">
                    {/* Chat Messages */}
                    <div>
                      <Label className="mb-3 block">Chat Messages</Label>
                      <div className="flex items-end gap-2 mb-3">
                        <div className="flex-1">
                          <Input
                            value={newChatLine}
                            onChange={(e) => setNewChatLine(e.target.value)}
                            placeholder="Type a chat message..."
                          />
                        </div>
                        <Button onClick={addChatLine} size="icon" disabled={!newChatLine.trim()}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Chat Messages List */}
                      <div className={`space-y-2 my-3 ${config.chatLines.length === 0 ? "hidden" : ""}`}>
                        {config.chatLines.map((line, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
                            <p className="text-sm truncate flex-1 pr-2">{line}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeChatLine(index)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Empty state */}
                      {config.chatLines.length === 0 && (
                        <div className="bg-muted/30 rounded-lg p-6 text-center my-4">
                          <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">Add messages that will be displayed in a chat bubble</p>
                        </div>
                      )}
                    </div>

                    {/* Interval Settings */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Message Interval</Label>
                        <span className="text-sm text-muted-foreground">
                          {(config.chatInterval / 1000).toFixed(1)}s
                        </span>
                      </div>
                      <Slider
                        value={[config.chatInterval]}
                        onValueChange={(value) => handleChange("chatInterval", value[0])}
                        min={1000}
                        max={10000}
                        step={500}
                      />
                    </div>

                    {/* Loop Option */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="chat-loop" className="cursor-pointer">
                        Loop Messages
                      </Label>
                      <Switch
                        id="chat-loop"
                        checked={config.chatLoop}
                        onCheckedChange={(checked) => handleChange("chatLoop", checked)}
                      />
                    </div>

                    {/* Bubble Color */}
                    <ColorSelector
                      label="Bubble Color"
                      value={config.chatBubbleColor}
                      onChange={(color) => handleChange("chatBubbleColor", color)}
                      colorOptions={colors.bubbles}
                    />

                    {/* Text Color */}
                    <ColorSelector
                      label="Text Color"
                      value={config.chatTextColor}
                      onChange={(color) => handleChange("chatTextColor", color)}
                      colorOptions={colors.text}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default KawaiiEyesCustomizer

