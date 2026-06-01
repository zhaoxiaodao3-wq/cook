import React from 'react';
import { Settings, FileEdit, Info, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { ScreenState } from '../types';

export function ProfileScreen({ onNavigate }: { onNavigate: (screen: ScreenState) => void }) {
  return (
    <div className="flex flex-col min-h-full bg-surface pb-6">
      
      {/* Header Profile */}
      <div className="flex flex-col items-center pt-10 pb-6 px-5">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4 bg-gray-200">
           <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-display font-bold text-on-surface mb-1">美食家小王</h2>
        <p className="text-sm text-on-surface-variant mb-5">热爱生活，享受每一餐的烟火气。</p>
        
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-lg text-on-surface">284</span>
            <span className="text-xs text-outline font-medium">关注</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-lg text-on-surface">1.2k</span>
            <span className="text-xs text-outline font-medium">粉丝</span>
          </div>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: '24', label: '我的上传', color: 'text-primary', target: 'my_uploads' },
            { value: '128', label: '评价菜谱', color: 'text-primary', target: '' },
            { value: '15', label: '我的建议', color: 'text-primary', target: 'my_suggestions' },
            { value: '56', label: '我的收藏', color: 'text-primary', target: 'my_favorites' },
          ].map((stat, i) => (
            <div 
              key={i} 
              onClick={() => stat.target && onNavigate(stat.target as ScreenState)}
              className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-sm border border-outline-variant/30 hover:border-primary-container transition-colors cursor-pointer active:scale-95 duration-200"
            >
              <span className={`font-display font-bold text-2xl ${stat.color} mb-1`}>{stat.value}</span>
              <span className="text-xs text-on-surface-variant font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* List Menu */}
        <div className="bg-white rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
          {[
            { icon: FileEdit, label: '我的草稿', color: 'text-primary' },
            { icon: Settings, label: '设置', color: 'text-primary' },
            { icon: Info, label: '关于我们', color: 'text-primary' },
            { icon: HelpCircle, label: '帮助与反馈', color: 'text-primary' },
            { icon: LogOut, label: '退出登录', color: 'text-red-500', isLast: true },
          ].map((item, i) => (
            <button 
              key={i} 
              className={`flex items-center justify-between p-4 bg-white hover:bg-surface-container transition-colors ${!item.isLast ? 'border-b border-outline-variant/30' : ''}`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={item.color} />
                <span className={`text-sm font-medium ${item.isLast ? 'text-red-500' : 'text-on-surface'}`}>{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-outline-variant" />
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}
