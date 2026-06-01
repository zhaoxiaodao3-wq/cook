import React, { useState } from 'react';
import { ImagePlus, Clock, Flame, Users, BookOpen, Plus, X, Send, Save, BarChart2 } from 'lucide-react';

export function UploadScreen() {
  return (
    <div className="flex flex-col bg-surface min-h-full pb-10">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 py-4 border-b border-outline-variant/30 text-center shadow-sm">
        <h1 className="text-lg font-display font-bold text-on-surface">创建新菜谱</h1>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5">
        
        {/* Upload Cover */}
        <button className="w-full h-40 border-2 border-dashed border-primary-container bg-secondary-container rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-colors active:scale-95 duration-200">
          <ImagePlus size={32} className="text-primary" />
          <div className="flex flex-col items-center">
             <span className="text-sm font-bold text-on-surface">上传封面图</span>
             <span className="text-xs text-on-surface-variant">展示你最拿手的美味佳肴</span>
          </div>
        </button>

        {/* Recipe Name */}
        <input 
          type="text" 
          placeholder="菜谱名称 (如：红烧肉)" 
          className="w-full bg-white border border-outline-variant rounded-xl p-4 text-base font-bold placeholder:font-normal focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-white border border-outline-variant rounded-xl p-3 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
               <Clock size={16} className="text-primary" />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-outline">难度</span>
               <input type="text" placeholder="如：45 分钟" className="w-full text-xs outline-none bg-transparent" />
             </div>
           </div>
           
           <div className="bg-white border border-outline-variant rounded-xl p-3 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
               <BarChart2 size={16} className="text-orange-500" />
             </div>
             <div className="flex flex-col w-full">
               <span className="text-[10px] text-outline">难度</span>
               <select className="w-full text-xs outline-none bg-transparent appearance-none">
                 <option>选择难度</option>
                 <option>简单</option>
                 <option>中等</option>
                 <option>困难</option>
               </select>
             </div>
           </div>

           <div className="bg-white border border-outline-variant rounded-xl p-3 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
               <Clock size={16} className="text-primary" />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-outline">烹饪时长</span>
               <input type="text" placeholder="如：30 分钟" className="w-full text-xs outline-none bg-transparent" />
             </div>
           </div>

           <div className="bg-white border border-outline-variant rounded-xl p-3 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
               <Users size={16} className="text-orange-500" />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-outline">适用人数</span>
               <input type="text" placeholder="如：2-3 人" className="w-full text-xs outline-none bg-transparent" />
             </div>
           </div>
        </div>

        {/* Backstory */}
        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-on-surface">
            <BookOpen size={18} className="text-primary" />
            <h3 className="font-bold text-sm">菜谱背后故事</h3>
          </div>
          <textarea 
            placeholder="分享一下这道菜的故事吧..."
            className="w-full outline-none text-sm resize-none h-24 placeholder:text-outline/70"
          ></textarea>
        </div>

        {/* Ingredients */}
        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-on-surface">
              <div className="flex flex-col gap-[2px]">
                <div className="w-4 h-0.5 bg-primary rounded"></div>
                <div className="w-4 h-0.5 bg-primary rounded"></div>
                <div className="w-4 h-0.5 bg-primary rounded"></div>
              </div>
              <h3 className="font-bold text-sm">食材清单</h3> <span className="text-xs text-orange-400 bg-orange-50 px-2 rounded-full">必填</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
             {/* Item 1 */}
             <div className="flex items-center gap-2">
               <div className="flex flex-col gap-[2px] text-outline opacity-50 px-1 shrink-0">
                 <div className="w-1 h-1 bg-current rounded-full"></div>
                 <div className="w-1 h-1 bg-current rounded-full"></div>
                 <div className="w-1 h-1 bg-current rounded-full"></div>
               </div>
               <input type="text" placeholder="食材 (如: 面粉)" className="flex-[2] min-w-0 bg-white border border-outline-variant rounded-lg p-2.5 text-sm outline-none focus:border-primary" />
               <input type="text" placeholder="用量" className="flex-1 min-w-0 bg-white border border-outline-variant rounded-lg p-2.5 text-sm outline-none focus:border-primary" />
               <button className="p-2 text-outline-variant hover:text-red-500 rounded shrink-0"><X size={18} /></button>
             </div>
             
             {/* Item 2 */}
             <div className="flex items-center gap-2">
               <div className="flex flex-col gap-[2px] text-outline opacity-50 px-1 shrink-0">
                 <div className="w-1 h-1 bg-current rounded-full"></div>
                 <div className="w-1 h-1 bg-current rounded-full"></div>
                 <div className="w-1 h-1 bg-current rounded-full"></div>
               </div>
               <input type="text" placeholder="食材 (如: 面粉)" className="flex-[2] min-w-0 bg-white border border-outline-variant rounded-lg p-2.5 text-sm outline-none focus:border-primary" />
               <input type="text" placeholder="用量" className="flex-1 min-w-0 bg-white border border-outline-variant rounded-lg p-2.5 text-sm outline-none focus:border-primary" />
               <button className="p-2 text-outline-variant hover:text-red-500 rounded shrink-0"><X size={18} /></button>
             </div>
          </div>
          
          <button className="bg-primary/10 text-primary w-full py-2.5 rounded-lg flex items-center justify-center gap-1.5 font-bold hover:bg-primary/20 active:scale-95 transition-all text-sm">
            <Plus size={16} />
            添加食材
          </button>
        </div>

        {/* Steps */}
        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col gap-4 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-on-surface">
              <div className="flex flex-col gap-[2px]">
                <div className="w-4 h-0.5 bg-primary rounded"></div>
                <div className="w-4 h-0.5 bg-primary rounded"></div>
                <div className="w-4 h-0.5 bg-primary rounded"></div>
              </div>
              <h3 className="font-bold text-sm">制作步骤</h3>
            </div>
          </div>
          
          <div className="flex gap-3 bg-surface-container-low p-3 border border-outline-variant rounded-xl">
             <div className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white font-bold text-sm shrink-0">1</div>
             <div className="flex flex-col gap-3 w-full">
               <textarea placeholder="详细描述这个步骤..." className="w-full text-sm outline-none bg-transparent resize-none h-16 placeholder:text-outline-variant"></textarea>
               <div className="flex justify-between items-center text-outline-variant">
                  <button className="flex items-center gap-1 text-xs border border-dashed border-outline-variant px-3 py-1.5 rounded-lg hover:text-primary hover:border-primary">
                    <ImagePlus size={14} /> 添加步骤图 (选填)
                  </button>
                  <button className="hover:text-red-500"><X size={16}/></button>
               </div>
             </div>
          </div>
          
          <button className="bg-primary/10 text-primary w-full py-2.5 rounded-lg flex items-center justify-center gap-1.5 font-bold hover:bg-primary/20 active:scale-95 transition-all text-sm">
            <Plus size={16} />
            添加步骤
          </button>
        </div>

        <div className="flex gap-3 mb-6 pt-2">
          <button className="flex-1 bg-white border border-primary text-primary py-3 rounded-xl flex items-center justify-center font-bold shadow-sm hover:bg-primary/5 active:scale-95 transition-all">
            存为草稿
          </button>
          <button className="flex-[2] bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all">
            发布菜谱 <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
