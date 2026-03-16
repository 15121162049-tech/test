import AdaptiveHeightCard from './components/AdaptiveHeightCard';
import VisionStyleCarUI from './components/VisionStyleCarUI';
import MusicPlayerUI from './components/MusicPlayerUI';
import { Battery, Wifi, Signal } from 'lucide-react';
import { useState, useEffect } from 'react';

// 车机界面系统 - 2026年3月2日更新
export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}月${day}日`;
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center p-8">
      {/* 电脑屏幕边框 */}
      <div className="relative w-full h-full max-w-[95%] max-h-[95%]">
        {/* 细边框外壳 */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-slate-700 to-slate-800 p-[12px] shadow-2xl">
          {/* 屏幕区域 */}
          <div className="relative w-full h-full rounded-md overflow-hidden bg-black border border-slate-900/50">
            {/* 屏幕微弱反光 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none z-[200]"></div>
            
            {/* 内容区域 */}
            <div className="size-full relative overflow-hidden">
              {/* 车载音乐播放器界面底图 */}
              <MusicPlayerUI />
              
              {/* 顶部状态栏 */}
              <div className="absolute top-0 left-0 right-0 h-8 z-[100] backdrop-blur-sm bg-black/15 border-b border-white/10">
                <div className="flex items-center justify-between h-full pl-3 pr-6">
                  {/* 左侧：用户头像和名称 */}
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://images.unsplash.com/photo-1615843423179-bea071facf96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB1c2VyJTIwYXZhdGFyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTQ1MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="用户头像"
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-white text-sm">用户2026</span>
                  </div>

                  {/* 中间：时间 */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  </div>

                  {/* 右侧：状态图标 */}
                  <div className="flex items-center gap-4">
                    <Signal className="w-4 h-4 text-white/80" />
                    <Wifi className="w-4 h-4 text-white/80" />
                    <div className="flex items-center gap-1.5">
                      <Battery className="w-4 h-4 text-white/80" />
                      <span className="text-white/60 text-xs">85%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部Dock栏 */}
              <div className="absolute bottom-0 left-0 right-0 h-14 z-[100]">
                {/* 黑色透明背景 20% */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* DOCK文字 */}
                <div className="relative h-full flex items-center justify-center">
                  <span className="text-white/10 text-2xl font-medium tracking-wider">DOCK</span>
                </div>
              </div>

              {/* 主内容区域 */}
              <div className="pt-8 pb-14 size-full relative">
                <AdaptiveHeightCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}