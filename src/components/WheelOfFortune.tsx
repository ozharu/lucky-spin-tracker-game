import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface WheelOfFortuneProps {
  isSpinning?: boolean;
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
  { id: 'free-bet', name: 'Free Bet', color: 'bg-yellow-500', textColor: 'text-black', probability: 0.25 },
  { id: 'odd-boost', name: 'Odd Boost', color: 'bg-red-500', textColor: 'text-white', probability: 0.25 },
  { id: 'try-again', name: 'Try Again', color: 'bg-purple-500', textColor: 'text-white', probability: 0.25 },
  { id: 'double-wins', name: 'Double Wins', color: 'bg-green-500', textColor: 'text-white', probability: 0.25 },
];

const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ isSpinning = false, onSpinComplete }) => {
  const [rotating, setRotating] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSpinning && !rotating) {
      spinWheel();
    }
  }, [isSpinning]);

  const spinWheel = () => {
    if (rotating) return;
    
    setRotating(true);
    
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
    
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (winningIndex * segmentAngle);
    
    const extraRotations = 2 + Math.floor(Math.random() * 4);
    const totalRotation = extraRotations * 360 + targetAngle;
    
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-to', `${totalRotation}deg`);
      wheelRef.current.classList.add('wheel-spin');
    }
    
    setTimeout(() => {
      setRotating(false);
      onSpinComplete(prizes[winningIndex].name);
      
      setRotationDegree(totalRotation % 360);
      if (wheelRef.current) {
        wheelRef.current.classList.remove('wheel-spin');
        wheelRef.current.style.transform = `rotate(${totalRotation % 360}deg)`;
      }
    }, 4000);
  };

  return (
    <div className="relative w-full max-w-[300px] aspect-square mx-auto">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
      </div>
      
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md opacity-70"></div>
      
      <div 
        ref={wheelRef}
        className="wheel relative w-full h-full rounded-full overflow-hidden shadow-[0_0_30px_rgba(167,139,250,0.7)] transition-transform duration-300"
        style={{ 
          transform: `rotate(${rotationDegree}deg)`,
          boxShadow: '0 0 30px rgba(167, 139, 250, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.5)',
        }}
      >
        <div className="w-full h-full relative">
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index;
            
            return (
              <div 
                key={prize.id}
                className={cn(
                  "absolute w-1/2 h-1/2 origin-bottom-right flex items-start justify-center py-6 px-3",
                  prize.color,
                  prize.textColor
                )}
                style={{ 
                  transform: `rotate(${angle}deg) skew(${360 / prizes.length / 2}deg)`,
                  boxShadow: 'inset 0 0 10px rgba(255,255,255,0.3)',
                  backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                }}
              >
                <div className="transform text-center -translate-y-4 font-bold text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]" style={{ transform: `rotate(-${angle + (360/prizes.length/2)}deg) skew(-${360 / prizes.length / 2}deg)` }}>
                  {prize.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Center hub with neon effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full z-10 flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.8)]">
        <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-green-600 rounded-full flex items-center justify-center border-4 border-white/20">
          <div className="w-8 h-8 bg-green-400 rounded-full shadow-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default WheelOfFortune;
