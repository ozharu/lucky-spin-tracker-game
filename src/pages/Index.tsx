
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
  
  // Get current day for the milestone tracker
  const getCurrentDay = (): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    return days[today.getDay()];
  };
  
  // For demo purposes, simulate some already played days
  useEffect(() => {
    // In a real app, this would come from a database or localStorage
    const mockPlayedDays = ['Mon', 'Tue']; // Example: user played on Monday and Tuesday
    setPlayedDays(mockPlayedDays);
  }, []);
  
  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Record that the user played today
    const today = getCurrentDay();
    if (!playedDays.includes(today)) {
      setPlayedDays([...playedDays, today]);
    }
  };
  
  const handleSpinComplete = (prize: string) => {
    setIsSpinning(false);
    setLastPrize(prize);
    
    // Show toast with the prize
    toast({
      title: "🎉 Congratulations!",
      description: `You won: ${prize}`,
      duration: 5000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-white shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-900">
          Wheel of Fortune
        </h1>
        
        {/* Wheel component */}
        <div className="mb-6">
          <WheelOfFortune
            onSpinComplete={handleSpinComplete}
          />
        </div>
        
        {/* Last prize won */}
        {lastPrize && (
          <div className="pop-animation text-center mb-4 p-2 bg-yellow-100 rounded-md">
            <h3 className="font-medium">Last Prize:</h3>
            <p className="text-lg font-bold">{lastPrize}</p>
          </div>
        )}
        
        {/* Milestone tracker */}
        <MilestoneTracker
          playedDays={playedDays}
          currentDay={getCurrentDay()}
        />
        
        {/* Play button */}
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
