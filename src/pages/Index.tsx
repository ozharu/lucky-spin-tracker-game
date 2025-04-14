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
      description: `You won: ${prize}!`,
      duration: 5000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-b from-blue-950 to-indigo-950 grid-bg">
      {/* Decorative light beams in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full transform rotate-[-25deg]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[40%] bg-cyan-500/10 blur-[100px] rounded-full"></div>
      </div>

      <Card className="w-full max-w-md mx-auto overflow-hidden border-none rounded-xl shadow-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-4">
          <h1 className="text-2xl font-bold text-center mb-[10px] text-white neon-text drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
            Wheel of Fortune
          </h1>
        </div>
        
        <CardContent className="p-6 relative">
          <div className="mb-8 mt-2">
            <WheelOfFortune
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
          </div>
          
          {lastPrize && (
            <div className="pop-animation text-center mb-6 p-3 bg-gray-800/80 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <h3 className="font-medium text-cyan-400">YOUR PRIZE</h3>
              <p className="text-2xl font-bold text-white neon-text">{lastPrize} <span className="text-cyan-400">POINTS</span></p>
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
