import React, { useState } from 'react';
import { ArrowLeft, Bookmark, Star, MessageSquarePlus, Clock, Flame, LayoutGrid, Users, CheckCircle2, Search, X, EyeOff, Send } from 'lucide-react';
import { ScreenState } from '../types';

export function RecipeDetailScreen({ onBack }: { onBack: () => void }) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const ratingTexts = ["Terrible", "Could be better", "Okay", "Good", "Excellent!"];

  return (
    <div className="flex flex-col bg-white min-h-full pb-10 relative">
      {/* Hero Image & Header */}
      <div className="relative w-full h-[300px]">
        <img 
          src="https://images.unsplash.com/photo-1578335032549-c1240abe7915?q=80&w=800&auto=format&fit=crop" 
          alt="Matcha Cake" 
          className="w-full h-full object-cover"
        />
        
        {/* Floating Header */}
        <div className="absolute top-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="text-white font-medium text-sm">Small Circle</div>
          <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="px-5 pt-5 pb-8 relative -mt-4 bg-white rounded-t-2xl z-10 flex flex-col gap-6">
        
        {/* Title & Author */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-display font-bold text-on-surface">恋茶千层蛋糕</h1>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                 <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" alt="author" className="w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface">李大厨</span>
                <span className="text-[10px] text-outline">2天前发布 · 1.2万次阅读</span>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <Bookmark size={20} />
          </button>
        </div>

        {/* Rating & Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-bold text-[#F59E0B]">4.8</span>
            <span className="text-xs text-outline ml-1">(124 评价)</span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setIsReviewOpen(true)}
              className="flex-1 bg-primary text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 font-medium shadow-sm hover:bg-primary/90 interactive-active"
            >
              <Star size={18} className="fill-white" />
              我要评分
            </button>
            <button 
              onClick={() => setIsReviewOpen(true)}
              className="flex-1 bg-white border border-primary text-primary py-2.5 rounded-lg flex items-center justify-center gap-1.5 font-medium shadow-sm hover:bg-primary/5 interactive-active"
            >
              <MessageSquarePlus size={18} />
              我要写建议
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Clock, label: '时长', value: '45 分钟' },
            { icon: Flame, label: '难度', value: '中等' },
            { icon: LayoutGrid, label: '分类', value: '甜点' },
            { icon: Users, label: '适合人群', value: '聚会' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-low p-3 rounded-xl flex flex-col items-center justify-center gap-1 border border-outline-variant/30">
              <stat.icon size={20} className="text-outline" />
              <span className="text-[10px] text-outline">{stat.label}</span>
              <span className="text-sm font-bold text-on-surface">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div>
           <div className="flex justify-between items-end mb-4">
             <h2 className="text-lg font-display font-bold text-on-surface border-l-4 border-primary pl-2 leading-none">食材清单</h2>
             <span className="text-xs text-outline">6人份</span>
           </div>
           
           <div className="flex flex-col gap-0 border border-outline-variant/50 rounded-xl overflow-hidden shadow-sm">
             {[
               { name: '低筋面粉', amount: '240g' },
               { name: '抹茶粉', amount: '20g' },
               { name: '细砂糖', amount: '90g' },
               { name: '鸡蛋', amount: '4个' },
               { name: '牛奶', amount: '650ml' },
               { name: '无盐黄油', amount: '50g' },
               { name: '淡奶油', amount: '600ml' },
             ].map((item, i) => (
               <div key={i} className="flex justify-between items-center p-3 border-b border-outline-variant/50 last:border-0 bg-white">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full border-2 border-outline-variant/60 flex items-center justify-center"></div>
                   <span className="text-sm text-on-surface">{item.name}</span>
                 </div>
                 <span className="text-sm font-medium text-on-surface-variant">{item.amount}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-lg font-display font-bold text-on-surface border-l-4 border-primary pl-2 mb-4 leading-none">制作步骤</h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white font-bold text-sm shrink-0">1</div>
              <div className="flex flex-col gap-3 flex-1">
                <p className="text-sm text-on-surface leading-relaxed">将低筋面粉和抹茶粉一起筛入大碗中，确保没有面粉结块。</p>
                <div className="w-full h-32 rounded-lg bg-surface-container overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1596541223910-c081e64627d3?q=80&w=400&auto=format&fit=crop" alt="step 1" className="w-full h-full object-cover"/>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white font-bold text-sm shrink-0">2</div>
              <p className="text-sm text-on-surface leading-relaxed flex-1">鸡蛋加入砂糖搅拌均匀，分次加入牛奶和融化的黄油拌匀，最后加入粉类混合成面糊。</p>
            </div>
            
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-primary text-white font-bold text-sm shrink-0">3</div>
              <p className="text-sm text-on-surface leading-relaxed flex-1">面糊过筛至少两次，放入冰箱冷藏静置30分钟，以消除气泡并增加面糊韧性。</p>
            </div>
          </div>
        </div>

        {/* Chef Tips */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 mt-2">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-1.5">
            <span className="text-lg">💡</span> 厨神贴士
          </h3>
          <ul className="text-sm text-on-surface-variant space-y-2">
            <li className="flex gap-1"><span className="text-orange-400">•</span> 摊饼皮时火候一定要小，避免边缘焦黑影响卖相。</li>
            <li className="flex gap-1"><span className="text-orange-400">•</span> 奶油不要抹得太厚，否则切开后容易塌陷。</li>
            <li className="flex gap-1"><span className="text-orange-400">•</span> 面糊静置是关键，这能让做出来的饼皮更加细腻无孔。</li>
          </ul>
        </div>
        
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReviewOpen(false)}></div>
          
          <div className="relative z-60 w-full max-w-[340px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl flex flex-col pt-5 pb-5 px-5 border border-white/50">
            <header className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-4">
              <h2 className="font-display font-bold text-lg text-primary">Rate & Review</h2>
              <button onClick={() => setIsReviewOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors p-1">
                <X size={20} />
              </button>
            </header>
            
            {/* Context Item */}
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 shadow-sm">
                 <img src="https://images.unsplash.com/photo-1578335032549-c1240abe7915?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Cake"/>
               </div>
               <div className="flex flex-col">
                 <h3 className="font-bold text-sm text-on-surface">恋茶千层蛋糕</h3>
                 <p className="text-[11px] text-outline">Fresh Harvest Originals</p>
               </div>
            </div>

            {/* Stars */}
            <div className="flex flex-col items-center gap-3 mb-5">
              <p className="text-xs text-on-surface-variant">How was your cooking experience?</p>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRating(star)}
                    className="active:scale-90 transition-transform"
                  >
                    <Star 
                      size={32} 
                      className={star <= rating ? "fill-primary text-primary" : "text-outline-variant"} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-medium text-primary tracking-wide">"{ratingTexts[rating - 1]}"</p>
            </div>

            {/* Textarea */}
            <div className="relative mb-4">
              <textarea 
                className="w-full bg-white border border-outline-variant rounded-xl p-3 text-sm placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none shadow-sm" 
                placeholder="写下你的烹饪心得或建议..." 
                rows={3}
              ></textarea>
              <span className="absolute bottom-2 right-2 text-[10px] text-outline">0/200</span>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <EyeOff size={16} />
                <span className="text-xs font-medium">Post Anonymously</span>
              </div>
              
              {/* Custom Toggle Switch */}
              <button 
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors duration-300 ${isAnonymous ? 'bg-primary' : 'bg-surface-variant'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isAnonymous ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {/* Action */}
            <button 
              onClick={() => setIsReviewOpen(false)}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all text-sm"
            >
               提交评价 <Send size={16} className="-mr-1"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
