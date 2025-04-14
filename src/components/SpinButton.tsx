
import React from 'react';
import { Play } from 'lucide-react';

interface SpinButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      className={`
        relative flex items-center justify-center
        px-12 py-3 text-lg font-bold text-white
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded-full uppercase tracking-wide shadow-lg
        transition-all duration-200 transform
        hover:shadow-xl hover:translate-y-[-2px]
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <Play className="mr-2" size={22} fill="white" />
      Play
    </button>
  );
};

export default SpinButton;
