
import React from 'react';

interface KawaiiBlushProps {
  size: number;
  blushColor: string;
  leftPosition: string;
  rightPosition: string;
  topPosition: string;
}

const KawaiiBlush: React.FC<KawaiiBlushProps> = ({
  size,
  blushColor,
  leftPosition,
  rightPosition,
  topPosition
}) => {
  return (
    <>
      <div 
        className="absolute rounded-full z-10 opacity-70"
        style={{ 
          width: `${size * 0.25}px`, 
          height: `${size * 0.12}px`,
          backgroundColor: blushColor,
          left: leftPosition,
          top: topPosition,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="absolute rounded-full z-10 opacity-70"
        style={{ 
          width: `${size * 0.25}px`, 
          height: `${size * 0.12}px`,
          backgroundColor: blushColor,
          left: rightPosition,
          top: topPosition,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

export default KawaiiBlush;
