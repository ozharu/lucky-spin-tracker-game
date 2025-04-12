
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface WheelOfFortuneProps {
  onSpinComplete: (prize: string) => void;
}

interface Prize {
  id: string;
  name: string;
  color: string;
  textColor: string;
  probability: number;
}

const prizes: Prize[] = [
  { id: 'free-bet', name: '1 Free Bet', color: 'bg-amber-500', textColor: 'text-black', probability: 0.25 },
  { id: 'odd-boost', name: 'Odd Boost x2', color: 'bg-green-500', textColor: 'text-white', probability: 0.25 },
  { id: 'try-again', name: 'Try again', color: 'bg-red-500', textColor: 'text-white', probability: 0.25 },
  { id: 'double-wins', name: 'Double your wins', color: 'bg-blue-500', textColor: 'text-white', probability: 0.25 },
];

const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Determine the winning prize based on probability
    let randValue = Math.random();
    let cumulativeProbability = 0;
    let winningIndex = 0;
    
    for (let i = 0; i < prizes.length; i++) {
      cumulativeProbability += prizes[i].probability;
      if (randValue <= cumulativeProbability) {
        winningIndex = i;
        break;
      }
    }
    
    // Calculate the rotation needed to land on the winning prize
    // Each segment is 90 degrees (360/4), and we need to account for the current position
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (winningIndex * segmentAngle);
    
    // Add extra rotations (2-5 full rotations) for effect and to make it harder to predict
    const extraRotations = 2 + Math.floor(Math.random() * 4);
    const totalRotation = extraRotations * 360 + targetAngle;
    
    // Apply the rotation
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-to', `${totalRotation}deg`);
      wheelRef.current.classList.add('wheel-spin');
    }
    
    // Handle the completion of the spin
    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(prizes[winningIndex].name);
      
      // Reset rotation for next spin
      setRotationDegree(totalRotation % 360);
      if (wheelRef.current) {
        wheelRef.current.classList.remove('wheel-spin');
        wheelRef.current.style.transform = `rotate(${totalRotation % 360}deg)`;
      }
    }, 4000); // Animation duration
  };

  return (
    <div className="relative w-full max-w-[300px] aspect-square mx-auto">
      {/* Center pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-0 h-0">
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-red-600"></div>
      </div>
      
      {/* Wheel */}
      <div 
        ref={wheelRef}
        className="wheel w-full h-full rounded-full overflow-hidden shadow-xl border-8 border-yellow-500 transition-transform duration-300"
        style={{ transform: `rotate(${rotationDegree}deg)` }}
      >
        {/* Wheel segments */}
        <div className="w-full h-full relative">
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index;
            
            return (
              <div 
                key={prize.id}
                className={cn(
                  "absolute w-1/2 h-1/2 origin-bottom-right flex items-start justify-center py-4 px-2",
                  prize.color,
                  prize.textColor
                )}
                style={{ 
                  transform: `rotate(${angle}deg) skew(45deg)` 
                }}
              >
                <div className="transform -rotate-[45deg] text-center -translate-y-2 font-bold">
                  {prize.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-yellow-500 z-10 flex items-center justify-center">
        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default WheelOfFortune;
