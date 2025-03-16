
import React from 'react';

interface KawaiiNameProps {
  name: string;
  size: number;
}

const KawaiiName: React.FC<KawaiiNameProps> = ({ name, size }) => {
  if (!name) return null;
  
  return (
    <div 
      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center font-medium"
      style={{ fontSize: `${size * 0.15}px` }}
    >
      {name}
    </div>
  );
};

export default KawaiiName;
