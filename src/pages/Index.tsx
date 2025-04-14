
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import WheelOfFortune from '@/components/WheelOfFortune';
import MilestoneTracker from '@/components/MilestoneTracker';
import SpinButton from '@/components/SpinButton';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastPrize, setLastPrize] = useState<string | null>(null);
  const [playedDays, setPlayedDays] = useState<string[]>([]);
  
  const getCurrentDay = (): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    return days[today.getDay()];
  };
  
  useEffect(() => {
    const mockPlayedDays = ['Mon', 'Tue'];
    setPlayedDays(mockPlayedDays);
  }, []);
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    const today = getCurrentDay();
    if (!playedDays.includes(today)) {
      setPlayedDays([...playedDays, today]);
    }
  };
  
  const handleSpinComplete = (prize: string) => {
    setIsSpinning(false);
    setLastPrize(prize);
    
    toast({
      title: "🎉 Congratulations!",
      description: `You won: ${prize}`,
      duration: 5000,
    });
  };
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start p-6" 
      style={{
        background: 'linear-gradient(135deg, #09203f 0%, #131a34 100%)',
        backgroundSize: '200% 200%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background lines */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute w-full h-1" 
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, ${['#4ADE80', '#3b82f6', '#ec4899', '#FACC15', '#06b6d4'][i % 5]}, transparent)`,
              boxShadow: `0 0 10px ${['#4ADE80', '#3b82f6', '#ec4899', '#FACC15', '#06b6d4'][i % 5]}`,
              animation: `wave ${7 + i}s infinite linear`,
              transformOrigin: 'center',
              opacity: 0.6
            }}
          />
        ))}
      </div>
      
      <Card className="w-full max-w-md mx-auto overflow-hidden border-none shadow-2xl bg-white/90 backdrop-blur-sm">
        <div style={{
          background: 'linear-gradient(45deg, #4338ca, #3b82f6, #0ea5e9, #06b6d4)',
          padding: '1rem'
        }}>
          <h1 className="text-2xl font-bold text-center mb-[10px] text-yellow-200 drop-shadow-md">
            Wheel of Fortune
          </h1>
        </div>
        
        <CardContent className="p-6">
          <div className="mb-8 mt-2">
            <WheelOfFortune
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
          </div>
          
          {lastPrize && (
            <div 
              className="pop-animation text-center mb-6 p-3 rounded-lg shadow-md"
              style={{
                background: 'linear-gradient(45deg, #fef9c3, #fef08a)',
                border: '1px solid #fde047'
              }}
            >
              <h3 className="font-medium text-amber-800">Your Prize</h3>
              <p className="text-lg font-bold text-amber-700">{lastPrize}</p>
            </div>
          )}
          
          <MilestoneTracker
            playedDays={playedDays}
            currentDay={getCurrentDay()}
          />
          
          <div className="flex justify-center mt-8">
            <SpinButton 
              onClick={handleSpin} 
              disabled={isSpinning}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
