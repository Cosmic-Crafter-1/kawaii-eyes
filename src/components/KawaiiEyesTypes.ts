export interface KawaiiEyesProps {
  faceColor: string;
  eyeColor: string;
  pupilColor: string;
  faceShape: 'round' | 'square' | 'blob' | 'heart' | 'bounce' | 'pulse' | 'wave' | 'jiggle';
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
}

// Expressions that can be triggered on hover or events
export type KawaiiExpression = 
  | 'normal'
  | 'happy'
  | 'excited'
  | 'surprised'
  | 'shy'
  | 'love'
  | 'wink'
  | 'sleepy'
  | 'angry';

export interface ExpressionConfig {
  name: KawaiiExpression;
  eyeStyle?: React.CSSProperties;
  pupilStyle?: React.CSSProperties;
  blushStyle?: React.CSSProperties;
  mouthStyle?: React.CSSProperties;
  specialEyes?: boolean;
}
