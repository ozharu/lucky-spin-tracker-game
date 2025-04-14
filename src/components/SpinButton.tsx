
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
        px-12 py-3 text-lg font-bold text-yellow-200
        rounded-full uppercase tracking-wide shadow-lg
        transition-all duration-200 transform
        hover:shadow-xl hover:translate-y-[-2px]
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{
        background: 'linear-gradient(45deg, #4338ca, #3b82f6, #0ea5e9, #06b6d4)',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Play className="mr-2" size={22} fill="currentColor" />
      Play
    </button>
  );
};

export default SpinButton;
