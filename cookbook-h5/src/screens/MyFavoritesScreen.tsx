import React, { useState } from 'react';
import { ArrowLeft, Bell, Heart } from 'lucide-react';
import { mockRecipes } from '../data';

export function MyFavoritesScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '早餐', '硬菜', '健康轻食', '甜点'];

  return (
    <div className="flex flex-col min-h-full bg-surface pb-6">
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-5 pt-6 pb-2 transition-shadow duration-300 shadow-sm border-b border-outline-variant/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-on-surface-variant hover:text-primary transition-colors p-1 -ml-1">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-[22px] font-display font-bold text-primary tracking-tight">Small Circle</h1>
          </div>
          <button className="text-primary p-1">
            <Bell size={24} />
          </button>
        </div>
      </header>

      <main className="px-5 pt-4">
        {/* Title */}
        <section className="mb-6">
          <h2 className="text-2xl font-display font-bold text-primary mb-1">我的收藏</h2>
          <p className="text-sm text-on-surface-variant">探索你保存的美食灵感</p>
        </section>

        {/* Categories */}
        <section className="mb-6 overflow-x-auto no-scrollbar -mx-5 px-5">
          <div className="flex space-x-2 min-w-max pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Masonry Grid */}
        <div className="columns-2 gap-4 [column-fill:_balance] box-border w-full">
            {mockRecipes.slice(0,4).map((recipe) => (
              <article key={recipe.id} className="relative group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col break-inside-avoid mb-4 border border-outline-variant/30">
                <div className="relative w-full pb-[115%] bg-surface-container">
                  <img src={recipe.image} alt={recipe.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm hover:bg-white transition-colors">
                    <Heart size={14} className="fill-current text-primary" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-display font-semibold text-sm text-on-surface line-clamp-2 mb-1.5">{recipe.title}</h3>
                  <div className="flex items-center text-on-surface-variant gap-1.5">
                    {recipe.authorAvatar && (
                        <img src={recipe.authorAvatar} alt={recipe.author} className="w-4 h-4 rounded-full object-cover"/>
                    )}
                    <span className="text-[10px]">{recipe.author}</span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </main>
    </div>
  );
}
