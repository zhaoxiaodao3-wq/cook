import React from 'react';
import { TabValue } from '../types';
import { Home, UtensilsCrossed, Plus, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-end pb-6 pt-2 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] text-xs border-t border-outline-variant/20">
      
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center w-[72px] h-[52px] rounded-full gap-1 interactive-active transition-colors ${currentTab === 'home' ? 'bg-[#d9f7be] text-[#135200]' : 'text-on-surface-variant hover:bg-surface-container'}`}
      >
        <Home size={22} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
        <span className="font-medium text-[11px] leading-none">首页</span>
      </button>

      <button 
        onClick={() => onTabChange('recipes')}
        className={`flex flex-col items-center justify-center w-[72px] h-[52px] rounded-full gap-1 interactive-active transition-colors ${currentTab === 'recipes' ? 'bg-[#d9f7be] text-[#135200]' : 'text-on-surface-variant hover:bg-surface-container'}`}
      >
        <UtensilsCrossed size={22} strokeWidth={currentTab === 'recipes' ? 2.5 : 2} />
        <span className="font-medium text-[11px] leading-none">全部菜品</span>
      </button>

      {/* Center prominent Upload button */}
      <button 
        onClick={() => onTabChange('upload')}
        className="flex flex-col items-center justify-center relative w-[72px] interactive-active group"
      >
        <div className="absolute -top-10 bg-primary text-white w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary/90 transition-colors border-4 border-white">
          <Plus size={28} strokeWidth={2.5} />
        </div>
        <span className={`font-medium text-[11px] mt-[26px] ${currentTab === 'upload' ? 'text-primary' : 'text-on-surface-variant'}`}>上传</span>
      </button>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center w-[72px] h-[52px] rounded-full gap-1 interactive-active transition-colors ${currentTab === 'profile' ? 'bg-[#d9f7be] text-[#135200]' : 'text-on-surface-variant hover:bg-surface-container'}`}
      >
        <User size={22} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
        <span className="font-medium text-[11px] leading-none">个人中心</span>
      </button>

    </nav>
  );
}
