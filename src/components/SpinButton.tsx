
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
        bg-gradient-to-r from-red-500 to-red-700
        rounded-full uppercase tracking-wide shadow-lg
        transition-all duration-200 transform
        hover:from-red-600 hover:to-red-800 hover:scale-105
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <Play className="mr-2" size={22} />
      Play
    </button>
  );
};

export default SpinButton;
