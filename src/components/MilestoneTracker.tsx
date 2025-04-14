
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
        <Calendar size={18} className="text-cyan-400" />
        <h2 className="text-lg font-bold text-center text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Weekly Progress</h2>
      </div>
      
      <div className="relative flex justify-between items-center px-2 max-w-md mx-auto">
        {/* Progress bar background */}
        <div className="absolute h-2 bg-gray-800/50 left-0 right-0 top-[25px] -z-0 rounded-full"></div>
        
        {/* Progress bar filled with neon glow */}
        <div 
          className="absolute h-2 bg-gradient-to-r from-cyan-400 to-blue-500 left-0 top-[25px] -z-0 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.6)]" 
          style={{ 
            width: `${(playedDays.length / daysOfWeek.length) * 100}%` 
          }}
        ></div>
        
        {daysOfWeek.map((day, index) => {
          const isPlayed = playedDays.includes(day);
          const isToday = day === currentDay;
          
          return (
            <div key={day} className="flex flex-col items-center z-10">
              {/* Day circle with neon glow effect */}
              <div className={cn(
                "w-[40px] h-[40px] rounded-full flex items-center justify-center relative transition-all duration-300",
                isPlayed 
                  ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]" 
                  : isToday 
                    ? "bg-gray-900 border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]" 
                    : "bg-gray-900 border-2 border-gray-700"
              )}>
                {isPlayed && <Check size={18} className="text-white" />}
                {!isPlayed && isToday && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.6)]"></div>}
              </div>
              
              {/* Day label */}
              <span className={cn(
                "text-xs mt-2 font-medium",
                isToday ? "text-cyan-400" : isPlayed ? "text-cyan-400" : "text-gray-400"
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
