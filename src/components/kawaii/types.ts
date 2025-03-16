
export interface KawaiiEyesProps {
  faceColor: string;
  eyeColor: string;
  pupilColor: string;
  faceShape: 'round' | 'square' | 'blob' | 'heart';
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
}

export interface EyePositions {
  leftPos: number;
  rightPos: number;
}
