import React from 'react';
import { AppID, WindowState } from '../types';
import { LayoutGrid } from 'lucide-react';

interface DockProps {
  windows: Record<AppID, WindowState>;
  activeWindowId: AppID | null;
  onAppClick: (id: AppID) => void;
}

export const Dock: React.FC<DockProps> = ({ windows, activeWindowId, onAppClick }) => {
  const dockItems = Object.values(windows) as WindowState[];

  return (
    <div className="absolute left-0 top-7 bottom-0 w-16 bg-[#000000]/40 backdrop-blur-md flex flex-col items-center py-2 z-40 border-r border-white/5">
      {dockItems.map((app) => (
        <div
          key={app.id}
          className="relative group mb-3 cursor-pointer"
          onClick={() => onAppClick(app.id)}
        >
          {/* Active Indicator Dot */}
          {app.isOpen && (
            <div className={`absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full ${app.id === activeWindowId ? 'bg-[#E95420]' : 'bg-white/50'}`} />
          )}
          
          <div className={`p-2 rounded-lg transition-all duration-200 ${app.id === activeWindowId ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            <div className="text-white transform transition-transform group-hover:scale-110">
              {app.icon}
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#333] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-white/10">
            {app.title}
          </div>
        </div>
      ))}

      <div className="mt-auto mb-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
         <LayoutGrid className="text-white opacity-80" size={24} />
      </div>
    </div>
  );
};