import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ScreenState } from '../types';
import { mockRecipes, trendingRecipes } from '../data';
import { RecipeCard } from '../components/RecipeCard';

export function HomeScreen({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '早餐', '午餐', '晚餐', '甜点'];

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
            placeholder="搜索食谱、食材或厨师..." 
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

      {/* Main Content */}
      <main className="px-5 pt-4 flex flex-col gap-8">
        
        {/* 热门排行 (Trending) */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-on-surface leading-none">热门排行</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-primary font-bold border-b-2 border-primary pb-1">周榜</span>
              <span className="text-on-surface-variant pb-1">月榜</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 p-4 flex flex-col gap-4">
            {trendingRecipes.map((recipe, index) => (
              <div key={recipe.id} className="flex items-center gap-4 cursor-pointer hover:bg-surface-container/50 p-2 -m-2 rounded-lg transition-colors" onClick={() => onNavigate('recipe_detail')}>
                <span className={`font-display font-bold text-xl w-6 text-center ${index === 0 ? 'text-orange-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`}>
                  {index + 1}
                </span>
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-sm text-on-surface mb-1">{recipe.title}</h3>
                  <div className="flex items-center gap-1 text-orange-500">
                     <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     <span className="text-xs font-medium">{recipe.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 最新上传 (Latest) */}
        <section>
          <h2 className="text-lg font-display font-bold text-on-surface mb-4">最新上传</h2>
          <div className="grid grid-cols-2 gap-4 box-border w-full">
            {mockRecipes.slice(0, 4).map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => onNavigate('recipe_detail')}
                layout="grid"
              />
            ))}
          </div>
        </section>
        
      </main>
    </div>
  );
}
