import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { AppID, WindowState } from './types';
import { PortfolioApp } from './components/apps/Portfolio';
import { TerminalApp } from './components/apps/Terminal';
import { User, Terminal, Trash2, Settings, FileText } from 'lucide-react';

const INITIAL_WINDOWS: Record<AppID, WindowState> = {
  [AppID.PORTFOLIO]: {
    id: AppID.PORTFOLIO,
    title: 'Portfolio Explorer',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 80 },
    size: { width: 900, height: 600 },
    icon: <User size={28} />,
    content: <PortfolioApp />
  },
  [AppID.TERMINAL]: {
    id: AppID.TERMINAL,
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 150, y: 150 },
    size: { width: 600, height: 400 },
    icon: <Terminal size={28} />,
    content: <TerminalApp />
  },
  [AppID.SETTINGS]: {
    id: AppID.SETTINGS,
    title: 'Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 200, y: 200 },
    size: { width: 500, height: 400 },
    icon: <Settings size={28} />,
    content: (
        <div className="p-8 flex items-center justify-center flex-col h-full text-gray-500">
            <Settings size={48} className="mb-4" />
            <p>System settings access restricted for guest user.</p>
        </div>
    )
  },
  [AppID.TRASH]: {
    id: AppID.TRASH,
    title: 'Trash',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 300, y: 300 },
    size: { width: 400, height: 300 },
    icon: <Trash2 size={28} />,
    content: (
        <div className="p-4 flex flex-col h-full bg-white">
            <div className="border-b pb-2 mb-2 text-sm text-gray-500">Deleted Items</div>
            <div className="flex-1 flex items-start gap-4 p-2">
                 <div className="flex flex-col items-center group cursor-pointer">
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-gray-500 group-hover:bg-[#E95420] group-hover:text-white transition-colors">
                        <FileText size={32} />
                    </div>
                    <span className="text-xs mt-1 text-gray-600 bg-gray-100 px-1 rounded">old_cv.pdf</span>
                 </div>
            </div>
             <div className="bg-[#FFF4E5] text-[#E95420] text-xs p-2 rounded border border-[#E95420]/20">
                Trash is emptyable only by root.
            </div>
        </div>
    )
  }
};

function App() {
  const [windows, setWindows] = useState<Record<AppID, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppID | null>(AppID.PORTFOLIO);
  const [maxZIndex, setMaxZIndex] = useState(10);
  
  // Dragging State
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    windowId: AppID | null;
    startX: number;
    startY: number;
    initialLeft: number;
    initialTop: number;
  }>({
    isDragging: false,
    windowId: null,
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0
  });

  const bringToFront = (id: AppID) => {
    setActiveWindowId(id);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: maxZIndex + 1 }
    }));
    setMaxZIndex(prev => prev + 1);
  };

  const handleOpenApp = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false }
    }));
    bringToFront(id);
  };

  const handleCloseWindow = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimizeWindow = (id: AppID) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    setActiveWindowId(null);
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent, id: AppID) => {
    if (windows[id].isMaximized) return;
    
    // Only left click
    if (e.button !== 0) return;

    setDragState({
      isDragging: true,
      windowId: id,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: windows[id].position.x,
      initialTop: windows[id].position.y
    });
    bringToFront(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.windowId) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    setWindows(prev => ({
      ...prev,
      [dragState.windowId!]: {
        ...prev[dragState.windowId!],
        position: {
          x: dragState.initialLeft + deltaX,
          y: dragState.initialTop + deltaY
        }
      }
    }));
  };

  const handleMouseUp = () => {
    if (dragState.isDragging) {
      setDragState(prev => ({ ...prev, isDragging: false, windowId: null }));
    }
  };

  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-[#772953] to-[#E95420] relative">
      <TopBar />
      <Dock 
        windows={windows} 
        activeWindowId={activeWindowId} 
        onAppClick={(id) => {
            if (windows[id].isOpen && !windows[id].isMinimized) {
                if (activeWindowId === id) {
                    handleMinimizeWindow(id);
                } else {
                    bringToFront(id);
                }
            } else {
                handleOpenApp(id);
            }
        }} 
      />

      {/* Desktop Area - Icons can go here if needed, but Dock is primary */}
      <div className="absolute inset-0 pt-7 pl-16 z-0" onClick={() => setActiveWindowId(null)}>
        {/* Placeholder for desktop icons if wanted later */}
      </div>

      {/* Windows Layer */}
      {(Object.values(windows) as WindowState[]).map(win => (
        <Window
          key={win.id}
          window={win}
          isActive={activeWindowId === win.id}
          onClose={handleCloseWindow}
          onMinimize={handleMinimizeWindow}
          onFocus={bringToFront}
          onMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
}

export default App;