
import React from 'react';
import KawaiiPupil from './KawaiiPupil';

interface KawaiiEyeProps {
  eyeColor: string;
  pupilColor: string;
  pupilShape: 'round' | 'heart' | 'star' | 'diamond';
  size: number;
  position: { left: string; top: string };
  eyeRef: React.RefObject<HTMLDivElement>;
  pupilRef: React.RefObject<HTMLDivElement>;
}

const KawaiiEye: React.FC<KawaiiEyeProps> = ({
  eyeColor,
  pupilColor,
  pupilShape,
  size,
  position,
  eyeRef,
  pupilRef
}) => {
  return (
    <div 
      ref={eyeRef}
      className="absolute bg-white rounded-full flex items-center justify-center kawaii-shadow z-10"
      style={{ 
        width: `${size * 0.35}px`, 
        height: `${size * 0.35}px`,
        backgroundColor: eyeColor,
        left: position.left,
        top: position.top,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <KawaiiPupil 
        pupilShape={pupilShape}
        pupilColor={pupilColor}
        size={size}
        pupilRef={pupilRef}
      />
    </div>
  );
};

export default KawaiiEye;
