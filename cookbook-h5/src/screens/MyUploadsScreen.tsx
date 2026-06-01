import React from 'react';
import { ArrowLeft, Bell, Heart, CheckCircle, Hourglass, Edit3, Image as ImageIcon } from 'lucide-react';
import { PLACEHOLDER_IMAGE } from '../data';

export function MyUploadsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-white pb-6">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 pt-6 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="text-on-surface-variant hover:text-primary transition-colors p-1 -ml-1">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-display font-bold text-primary tracking-tight">我的上传</h1>
          <div className="w-8"></div>
        </div>
      </header>
      
      <main className="px-5 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-on-surface-variant">共 4 个菜谱</span>
          <div className="flex items-center gap-1 text-primary">
            <Heart size={16} className="fill-primary" />
            <span className="text-xs font-medium">总获赞 1.2k</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col h-full group">
            <div className="aspect-square w-full relative overflow-hidden bg-surface-container">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop" alt="Avocado Toast" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-primary/90 px-2 py-1 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-sm">
                <CheckCircle size={12} className="text-white" />
                <span className="text-[10px] text-white font-medium">已发布</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-grow justify-between gap-2">
              <h3 className="font-display font-semibold text-sm text-primary line-clamp-2">牛油果鲜虾轻食沙拉</h3>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Heart size={14} className="fill-current" />
                  <span className="text-[10px]">452</span>
                </div>
                <span className="text-[10px] text-outline">昨天</span>
              </div>
            </div>
          </article>
          
          {/* Card 2 */}
          <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col h-full group">
            <div className="aspect-square w-full relative overflow-hidden bg-surface-container">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop" alt="Salad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
              <div className="absolute top-2 left-2 bg-primary/70 px-2 py-1 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-sm">
                <Hourglass size={12} className="text-white" />
                <span className="text-[10px] text-white font-medium">审核中</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-grow justify-between gap-2">
              <h3 className="font-display font-semibold text-sm text-primary line-clamp-2">夏日清爽藜麦沙拉</h3>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1 text-outline">
                  <Heart size={14} />
                  <span className="text-[10px]">-</span>
                </div>
                <span className="text-[10px] text-outline">2小时前</span>
              </div>
            </div>
          </article>
          
          {/* Card 3 */}
          <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col h-full group">
            <div className="aspect-square w-full relative overflow-hidden bg-surface-container">
              <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=400&auto=format&fit=crop" alt="Smoothie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-primary/90 px-2 py-1 rounded-md flex items-center gap-1 shadow-sm backdrop-blur-sm">
                <CheckCircle size={12} className="text-white" />
                <span className="text-[10px] text-white font-medium">已发布</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-grow justify-between gap-2">
              <h3 className="font-display font-semibold text-sm text-primary line-clamp-2">莓果抗氧化思慕雪碗</h3>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Heart size={14} className="fill-current" />
                  <span className="text-[10px]">890</span>
                </div>
                <span className="text-[10px] text-outline">上周</span>
              </div>
            </div>
          </article>
          
          {/* Card 4 - Draft */}
          <article className="bg-[#fcfcfa] rounded-xl overflow-hidden flex flex-col h-full border border-dashed border-outline-variant/60 group">
            <div className="aspect-square w-full relative overflow-hidden bg-surface-container group">
              <img src={PLACEHOLDER_IMAGE} alt="未命名草稿" className="w-full h-full object-cover opacity-60" />
              <div className="absolute top-2 left-2 bg-[#f6ffed] px-2 py-1 rounded-md flex items-center gap-1 shadow-sm border border-[#b7eb8f]">
                <Edit3 size={12} className="text-[#389e0d]" />
                <span className="text-[10px] text-[#389e0d] font-medium">草稿</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-grow justify-between gap-2 border-t border-dashed border-outline-variant/60">
              <h3 className="font-display font-medium text-sm text-on-surface-variant italic line-clamp-2">未命名菜谱</h3>
              <div className="flex justify-between items-center mt-auto">
                 <div className="flex items-center gap-1 text-outline">
                  <Heart size={14} />
                  <span className="text-[10px]">-</span>
                </div>
                <span className="text-[10px] text-outline">3天前</span>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
