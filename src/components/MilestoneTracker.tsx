
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface MilestoneTrackerProps {
  playedDays: string[];
  currentDay: string;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ playedDays, currentDay }) => {
  return (
    <div className="w-full pt-8 pb-4">
      <h2 className="text-lg font-bold text-center mb-4">Weekly Progress</h2>
      
      <div className="flex justify-between items-center px-2 max-w-md mx-auto">
        {daysOfWeek.map((day, index) => {
          const isPlayed = playedDays.includes(day);
          const isToday = day === currentDay;
          
          return (
            <div key={day} className="flex flex-col items-center">
              {/* Connection line */}
              {index < daysOfWeek.length - 1 && (
                <div className={cn(
                  "hidden md:block absolute h-0.5 w-10 top-[56px] ml-10",
                  isPlayed ? "bg-green-500" : "bg-gray-300"
                )}></div>
              )}
              
              {/* Day circle */}
              <div className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center relative",
                isPlayed 
                  ? "bg-green-500 border-green-600" 
                  : isToday 
                    ? "bg-blue-100 border-blue-500" 
                    : "bg-gray-100 border-gray-300"
              )}>
                {isPlayed && <Check size={18} className="text-white" />}
              </div>
              
              {/* Day label */}
              <span className={cn(
                "text-xs mt-1 font-medium",
                isToday ? "text-blue-500" : "text-gray-600"
              )}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTracker;
