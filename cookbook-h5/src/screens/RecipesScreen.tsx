import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ScreenState } from '../types';
import { mockRecipes } from '../data';
import { RecipeCard } from '../components/RecipeCard';

export function RecipesScreen({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '川菜', '甜点', '素食', '家常菜'];

  return (
    <div className="flex flex-col min-h-full bg-surface pb-6">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-5 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="avatar" className="w-full h-full object-cover"/>
            </div>
            <h1 className="text-xl font-display font-bold text-primary tracking-tight">Small Circle</h1>
          </div>
          <Search size={24} className="text-primary" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-outline" />
          </div>
          <input 
            type="text" 
            placeholder="搜索菜谱, 食材或厨师..." 
            className="w-full bg-white border border-outline-variant rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>

        {/* Horizontal Tabs */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white text-on-surface-variant border border-outline-variant/50 hover:bg-surface-container'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Masonry Grid */}
      <main className="px-5 pt-4">
         <div className="columns-2 gap-4 [column-fill:_balance] box-border w-full">
            {mockRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => onNavigate('recipe_detail')}
                layout="masonry"
              />
            ))}
         </div>
      </main>
      
    </div>
  );
}
