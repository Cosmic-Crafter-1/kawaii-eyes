
import React from 'react';
import { cn } from '@/lib/utils';
import { getPupilShapeClass } from '../utils/shapeUtils';

interface KawaiiPupilProps {
  pupilShape: 'round' | 'heart' | 'star' | 'diamond';
  pupilColor: string;
  size: number;
  pupilRef: React.RefObject<HTMLDivElement>;
}

const KawaiiPupil: React.FC<KawaiiPupilProps> = ({ 
  pupilShape, 
  pupilColor, 
  size,
  pupilRef 
}) => {
  const getCustomPupilShape = () => {
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
            className={cn("w-1/2 h-1/2 transition-transform duration-75", getPupilShapeClass(pupilShape))}
            style={{ backgroundColor: pupilColor }}
          ></div>
        );
    }
  };

  return (
    <div 
      ref={pupilRef}
      className="flex items-center justify-center transition-transform duration-75"
      style={{ 
        width: `${size * 0.15}px`, 
        height: `${size * 0.15}px`,
      }}
    >
      {getCustomPupilShape()}
    </div>
  );
};

export default KawaiiPupil;
