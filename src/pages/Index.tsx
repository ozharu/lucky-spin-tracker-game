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
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <Card className="w-full max-w-md mx-auto overflow-hidden border-none shadow-xl bg-white/90 backdrop-blur-sm">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
          <h1 className="text-2xl font-bold text-center mb-[10px] text-white">
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
            <div className="pop-animation text-center mb-6 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 shadow-sm">
              <h3 className="font-medium text-amber-800">Your Prize</h3>
              <p className="text-lg font-bold text-amber-600">{lastPrize}</p>
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
