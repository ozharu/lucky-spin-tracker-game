import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import WheelOfFortune from '@/components/WheelOfFortune';
import MilestoneTracker from '@/components/MilestoneTracker';
import SpinButton from '@/components/SpinButton';

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
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-blue-100">
      <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-white shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-[10px] text-purple-900">
          Wheel of Fortune
        </h1>
        
        <div className="mb-6">
          <WheelOfFortune
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
          />
        </div>
        
        {lastPrize && (
          <div className="pop-animation text-center mb-4 p-2 bg-yellow-100 rounded-md">
            <h3 className="font-medium">Last Prize:</h3>
            <p className="text-lg font-bold">{lastPrize}</p>
          </div>
        )}
        
        <MilestoneTracker
          playedDays={playedDays}
          currentDay={getCurrentDay()}
        />
        
        <div className="flex justify-center mt-6">
          <SpinButton 
            onClick={handleSpin} 
            disabled={isSpinning}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
