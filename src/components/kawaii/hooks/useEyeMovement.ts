
import { useEffect, RefObject } from 'react';
import { MousePosition } from './useMousePosition';

interface UseEyeMovementProps {
  mousePosition: MousePosition;
  faceDivRef: RefObject<HTMLDivElement>;
  leftEyeRef: RefObject<HTMLDivElement>;
  rightEyeRef: RefObject<HTMLDivElement>;
  leftPupilRef: RefObject<HTMLDivElement>;
  rightPupilRef: RefObject<HTMLDivElement>;
  eyeMovement: 'together' | 'opposite';
}

export const useEyeMovement = ({
  mousePosition,
  faceDivRef,
  leftEyeRef,
  rightEyeRef,
  leftPupilRef,
  rightPupilRef,
  eyeMovement
}: UseEyeMovementProps): void => {
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
      const distanceX = Math.cos(finalAngle) * maxDistance;
      const distanceY = Math.sin(finalAngle) * maxDistance;
      
      // Apply the transformation
      pupilRef.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    };

    moveEye(leftEyeRef.current, leftPupilRef.current, false);
    moveEye(rightEyeRef.current, rightPupilRef.current, true);
  }, [mousePosition, eyeMovement, faceDivRef, leftEyeRef, rightEyeRef, leftPupilRef, rightPupilRef]);
};
