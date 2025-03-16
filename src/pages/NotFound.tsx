
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import KawaiiEyes from '@/components/KawaiiEyes';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <KawaiiEyes 
          faceColor="#FFD6CC" 
          eyeColor="#FFFFFF" 
          pupilColor="#000000"
          faceShape="round"
          pupilShape="round"
          name="Lost"
          eyeDistance={30}
          size={120}
          eyePlacement="center"
          eyeMovement="together"
          hasBlush={true}
          blushColor="#FFA5B3"
          hasBorder={false}
          borderColor="#000000"
          borderWidth={2}
          enableChat={true}
          chatLines={["Page not found!", "Are you lost?"]}
          chatInterval={3000}
          chatLoop={true}
          chatBubbleColor="#FFFFFF"
          chatTextColor="#333333"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
