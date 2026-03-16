import { Navigation, Music, Phone, Settings, Radio, Video, Map, Cloud } from 'lucide-react';

// Apple Vision Pro 风格的车机界面底图
export default function VisionStyleCarUI() {
  const apps = [
    { icon: Navigation, name: '导航', color: 'from-blue-500/30 to-cyan-500/30', iconColor: 'text-cyan-300' },
    { icon: Music, name: '音乐', color: 'from-pink-500/30 to-rose-500/30', iconColor: 'text-rose-300' },
    { icon: Phone, name: '电话', color: 'from-green-500/30 to-emerald-500/30', iconColor: 'text-emerald-300' },
    { icon: Radio, name: '电台', color: 'from-purple-500/30 to-violet-500/30', iconColor: 'text-violet-300' },
    { icon: Video, name: '视频', color: 'from-orange-500/30 to-amber-500/30', iconColor: 'text-amber-300' },
    { icon: Map, name: '地图', color: 'from-teal-500/30 to-cyan-500/30', iconColor: 'text-teal-300' },
    { icon: Cloud, name: '天气', color: 'from-sky-500/30 to-blue-500/30', iconColor: 'text-sky-300' },
    { icon: Settings, name: '设置', color: 'from-slate-500/30 to-gray-500/30', iconColor: 'text-gray-300' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 深色渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
      
      {/* 柔和光晕效果 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[40px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[40px]"></div>
      
      {/* 应用网格 - 居中布局 */}
      <div className="relative z-10 h-full flex items-center justify-center px-12">
        <div className="grid grid-cols-4 gap-8 max-w-4xl">
          {apps.map((app, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              {/* 应用卡片 */}
              <div className="relative">
                {/* 毛玻璃背景 */}
                <div className={`
                  w-32 h-32 rounded-3xl
                  bg-gradient-to-br ${app.color}
                  backdrop-blur-sm
                  border border-white/10
                  shadow-2xl shadow-black/50
                  transition-all duration-300
                  group-hover:scale-105 group-hover:shadow-3xl
                  group-hover:border-white/20
                `}>
                  {/* 图标 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <app.icon className={`w-14 h-14 ${app.iconColor} drop-shadow-lg`} strokeWidth={1.5} />
                  </div>
                  
                  {/* 高光效果 */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* 应用名称 */}
                <div className="mt-3 text-center">
                  <span className="text-white/80 text-sm font-medium drop-shadow-md">{app.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
}
