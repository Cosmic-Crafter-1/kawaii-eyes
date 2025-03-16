
export const getFaceShapeClass = (faceShape: 'round' | 'square' | 'blob' | 'heart'): string => {
  switch (faceShape) {
    case 'round':
      return 'rounded-full';
    case 'square':
      return 'rounded-2xl';
    case 'blob':
      return 'animate-blob';
    case 'heart':
      return 'heart-shape';
    default:
      return 'rounded-full';
  }
};

export const getPupilShapeClass = (pupilShape: 'round' | 'heart' | 'star' | 'diamond'): string => {
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

export const getEyePosition = (eyePlacement: 'left' | 'center' | 'right', eyeDistance: number) => {
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
