import { ReactNode } from "react";

export enum AppID {
  PORTFOLIO = 'portfolio',
  TERMINAL = 'terminal',
  TRASH = 'trash',
  SETTINGS = 'settings'
}

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: ReactNode;
  icon: ReactNode;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialLeft: number;
  initialTop: number;
  windowId: AppID | null;
}

export type SkillCategory = 'frontend' | 'backend' | 'devops';

export interface Skill {
  name: string;
  items: string[];
}
