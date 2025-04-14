
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
  { id: 'free-bet', name: '1 Free Bet', color: 'bg-gradient-to-b from-yellow-300 to-orange-500', textColor: 'text-blue-900', probability: 0.25 },
  { id: 'odd-boost', name: 'Odd Boost x2', color: 'bg-gradient-to-b from-cyan-400 to-blue-600', textColor: 'text-yellow-200', probability: 0.25 },
  { id: 'try-again', name: 'Try again', color: 'bg-gradient-to-b from-pink-400 to-rose-600', textColor: 'text-yellow-200', probability: 0.25 },
  { id: 'double-wins', name: 'Double your wins', color: 'bg-gradient-to-b from-green-400 to-green-600', textColor: 'text-yellow-200', probability: 0.25 },
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
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-md"></div>
      </div>
      
      <div 
        ref={wheelRef}
        className="wheel w-full h-full rounded-full overflow-hidden shadow-2xl transition-transform duration-300"
        style={{ 
          transform: `rotate(${rotationDegree}deg)`,
          border: '8px solid gold',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.5)',
        }}
      >
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
                  transform: `rotate(${angle}deg) skew(45deg)`,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                }}
              >
                <div className="transform -rotate-[45deg] text-center -translate-y-2 font-bold drop-shadow-sm">
                  {prize.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-10 flex items-center justify-center"
           style={{ 
             background: 'radial-gradient(circle, #4ADE80 0%, #16A34A 100%)',
             border: '4px solid gold',
             boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)'
           }}>
        <div className="w-5 h-5 bg-green-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default WheelOfFortune;
