import React from 'react';

export const StarryBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black">
        <div className="stars-container absolute inset-0" />
      </div>
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 0.8; }
            100% { opacity: 0.2; }
          }
          
          .stars-container {
            background-image: 
              radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0,0,0,0));
            background-repeat: repeat;
            animation: twinkle 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};