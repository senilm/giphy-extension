import React from 'react';

const loading = () => {
  const pulseAnimation = {
    animation: 'pulse 1.5s infinite',
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
    }
  `;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <style>{keyframes}</style>
      <div className="text-4xl font-bold text-black" style={pulseAnimation}>
        GIF
      </div>
    </div>
  );
}

export default loading;
