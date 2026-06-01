import React from 'react';
import { ArrowLeft, Bell, ChevronRight, Check } from 'lucide-react';

export function MySuggestionsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-surface pb-6">
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-5 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-on-surface-variant hover:text-primary transition-colors p-1 -ml-1">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-display font-bold text-primary tracking-tight">我的建议</h1>
          </div>
          <button className="text-primary p-1">
            <Bell size={24} />
          </button>
        </div>
      </header>

      <main className="px-5 pt-2 flex flex-col gap-4">
        {/* Card 1 */}
        <article className="bg-white rounded-xl p-3 flex flex-col gap-3 shadow-sm border border-outline-variant/30">
          <div className="flex gap-3">
             <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
               <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" alt="Avocado Toast" className="w-full h-full object-cover" />
               <div className="absolute top-1.5 right-1.5 bg-[#389e0d] text-white text-[10px] px-1.5 py-0.5 rounded font-medium shadow-sm">
                 作者已读
               </div>
             </div>
             <div className="flex flex-col justify-between flex-1">
               <div>
                 <h3 className="font-display font-bold text-[15px] text-primary mb-1">牛油果藜麦沙拉</h3>
                 <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                   建议在拌沙拉汁的时候加入少许青柠汁，可以更好地中和牛油果的丰富口感，让整体风味更加清爽解腻。另外如果能稍微烤一下松子撒在上面就完美了。
                 </p>
               </div>
             </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-outline">2天前</span>
            <button className="text-[11px] text-primary flex items-center font-medium hover:opacity-80">
              查看原菜谱 <ChevronRight size={14} />
            </button>
          </div>
        </article>
        
        {/* Card 2 */}
        <article className="bg-white rounded-xl p-3 flex flex-col gap-3 shadow-sm border border-outline-variant/30">
          <div className="flex gap-3">
             <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
               <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop" alt="Bowl" className="w-full h-full object-cover" />
               <div className="absolute top-1.5 right-1.5 bg-[#73d13d] text-white text-[10px] px-1.5 py-0.5 rounded font-medium shadow-sm">
                 未读
               </div>
             </div>
             <div className="flex flex-col justify-between flex-1">
               <div>
                 <h3 className="font-display font-bold text-[15px] text-primary mb-1">轻食减脂波克碗</h3>
                 <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                   按照步骤做了，味道很不错。不过建议把鹰嘴豆提前用少量橄榄油和孜然粉烤一下，口感会更加酥脆，层次感更好。
                 </p>
               </div>
             </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-outline">1周前</span>
            <button className="text-[11px] text-primary flex items-center font-medium hover:opacity-80">
              查看原菜谱 <ChevronRight size={14} />
            </button>
          </div>
        </article>

        {/* Card 3 */}
        <article className="bg-white rounded-xl p-3 flex flex-col gap-3 shadow-sm border border-outline-variant/30">
          <div className="flex gap-3">
             <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
               <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=200&auto=format&fit=crop" alt="Pasta" className="w-full h-full object-cover" />
               <div className="absolute top-1.5 right-1.5 bg-[#d9f7be] text-[#135200] text-[10px] px-1.5 py-0.5 rounded font-bold shadow-sm">
                 已回复
               </div>
             </div>
             <div className="flex flex-col flex-1">
               <h3 className="font-display font-bold text-[15px] text-primary mb-1">意式青酱面</h3>
               <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                 非常棒的食谱！青酱的比例很完美。个人建议在煮面的时候可以在水里多加一点盐，这样面条本身会有底味...
               </p>
             </div>
          </div>
          <div className="bg-[#f5f3f7] p-2.5 rounded-lg border border-outline-variant/30 mt-1">
             <p className="text-xs text-on-surface">
               <span className="font-bold text-primary mr-1">作者回复:</span>
               谢谢你的建议！下次我会在菜谱里补充关于煮面水加盐的小贴士，确实很重要。
             </p>
          </div>
          <div className="flex items-center justify-between pt-1 mt-1 border-t border-outline-variant/20">
            <span className="text-[10px] text-outline">2周前</span>
            <button className="text-[11px] text-primary flex items-center font-medium hover:opacity-80">
              查看原菜谱 <ChevronRight size={14} />
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
