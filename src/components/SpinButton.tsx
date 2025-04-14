
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
        bg-gradient-to-r from-green-500 via-blue-500 to-purple-500
        rounded-full uppercase tracking-wide
        shadow-[0_0_15px_rgba(56,189,248,0.8)]
        transition-all duration-200 transform
        hover:shadow-[0_0_25px_rgba(56,189,248,0.8)] hover:translate-y-[-2px]
        active:scale-95 focus:outline-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <Play className="mr-2" size={22} fill="white" />
      SPIN
    </button>
  );
};

export default SpinButton;
