import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Power } from 'lucide-react';

export const TopBar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="h-7 bg-[#1c1c1c] text-gray-200 flex items-center justify-between px-3 select-none z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-sm hover:bg-white/10 px-2 rounded cursor-pointer transition-colors">
          Activities
        </span>
        <span className="text-sm hover:bg-white/10 px-2 rounded cursor-pointer transition-colors">
          Portfolio OS
        </span>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 font-medium text-sm">
        {formattedDate}
      </div>

      <div className="flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
          <Wifi size={14} />
          <Volume2 size={14} />
          <Battery size={14} />
          <Power size={14} />
        </div>
      </div>
    </div>
  );
};
