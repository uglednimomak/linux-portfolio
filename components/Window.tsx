import React, { useRef } from 'react';
import { WindowState, AppID } from '../types';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: (id: AppID) => void;
  onMinimize: (id: AppID) => void;
  onFocus: (id: AppID) => void;
  onMouseDown: (e: React.MouseEvent, id: AppID) => void;
}

export const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  onMouseDown
}) => {
  if (!window.isOpen || window.isMinimized) return null;

  return (
    <div
      className={`absolute flex flex-col rounded-t-lg overflow-hidden shadow-2xl border border-black/20 ${isActive ? 'shadow-[0_0_20px_rgba(0,0,0,0.3)]' : 'opacity-95'}`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-10 flex items-center justify-between px-3 select-none cursor-default ${
          isActive ? 'bg-[#2c2c2c] text-[#f7f7f7]' : 'bg-[#1e1e1e] text-[#9a9a9a]'
        }`}
        onMouseDown={(e) => onMouseDown(e, window.id)}
      >
        <div className="font-medium text-sm tracking-wide">{window.title}</div>
        <div className="flex items-center space-x-2">
           <button 
             onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
             className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition-colors"
            >
             <Minus size={14} />
           </button>
           <button 
             className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition-colors"
            >
             <Square size={12} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
             className="w-6 h-6 flex items-center justify-center rounded-full bg-[#E95420] text-white hover:bg-[#d84615] transition-colors"
           >
             <X size={14} />
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-[#f7f7f7] relative overflow-hidden flex flex-col">
        {window.content}
      </div>
    </div>
  );
};
