import React from 'react';
import { Recipe } from '../types';
import { Heart, Star } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  layout?: 'masonry' | 'grid';
  showRanking?: number;
}

export function RecipeCard({ recipe, onClick, layout = 'masonry', showRanking }: RecipeCardProps) {
  return (
    <article 
      onClick={onClick}
      className={`relative group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow duration-300 flex flex-col ${layout === 'grid' ? 'h-full' : 'break-inside-avoid mb-4'}`}
    >
      <div className={`relative w-full ${layout === 'grid' ? 'aspect-square' : 'pb-[120%]'} overflow-hidden bg-surface-container`}>
        <img 
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="absolute top-2 left-2 bg-[#d78a1e] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {recipe.tags[0]}
          </div>
        )}
        
        {recipe.isNew && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            新品
          </div>
        )}

      </div>
      
      <div className="p-3 flex flex-col flex-grow justify-between gap-2">
        <h3 className="font-display font-semibold text-[15px] text-on-surface line-clamp-2 leading-tight">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-on-surface-variant gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden shrink-0">
              {recipe.authorAvatar ? (
                <img src={recipe.authorAvatar} alt={recipe.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-[10px] font-bold">
                  {recipe.author.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-xs truncate max-w-[80px]">{recipe.author}</span>
          </div>
          
          <div className="flex items-center gap-1 text-primary">
            <Star size={12} className="fill-primary text-primary" />
            <span className="text-xs font-medium">{recipe.rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
