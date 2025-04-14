
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Calendar } from 'lucide-react';

interface MilestoneTrackerProps {
  playedDays: string[];
  currentDay: string;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ playedDays, currentDay }) => {
  return (
    <div className="w-full pt-4 pb-2">
      <div className="flex items-center justify-center mb-4 gap-2">
        <Calendar size={18} className="text-purple-600" />
        <h2 className="text-lg font-bold text-center text-gray-700">Weekly Progress</h2>
      </div>
      
      <div className="relative flex justify-between items-center px-2 max-w-md mx-auto">
        {/* Progress bar background */}
        <div className="absolute h-1 bg-gray-200 left-0 right-0 top-[25px] -z-0"></div>
        
        {/* Progress bar filled */}
        <div 
          className="absolute h-1 bg-gradient-to-r from-purple-500 to-indigo-500 left-0 top-[25px] -z-0" 
          style={{ 
            width: `${(playedDays.length / daysOfWeek.length) * 100}%` 
          }}
        ></div>
        
        {daysOfWeek.map((day, index) => {
          const isPlayed = playedDays.includes(day);
          const isToday = day === currentDay;
          
          return (
            <div key={day} className="flex flex-col items-center z-10">
              {/* Day circle */}
              <div className={cn(
                "w-[40px] h-[40px] rounded-full flex items-center justify-center relative transition-all duration-300",
                isPlayed 
                  ? "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md" 
                  : isToday 
                    ? "bg-white border-2 border-purple-500 shadow-sm" 
                    : "bg-white border-2 border-gray-200"
              )}>
                {isPlayed && <Check size={18} className="text-white" />}
                {!isPlayed && isToday && <div className="w-2 h-2 rounded-full bg-purple-500"></div>}
              </div>
              
              {/* Day label */}
              <span className={cn(
                "text-xs mt-2 font-medium",
                isToday ? "text-purple-600" : isPlayed ? "text-indigo-600" : "text-gray-500"
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
