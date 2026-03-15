import { useState } from 'react';
import { Lock, Wind, MapPin, Zap, ArrowLeft, MoreVertical } from 'lucide-react';

// 状态栏和Dock栏的高度常量
const STATUS_BAR_HEIGHT = 48;
const DOCK_HEIGHT = 80;
const PADDING = 20;

export default function PhoneRatioCard() {
  // 手机比例：宽度360px，高度按9:19.5计算 = 780px
  const cardWidth = 360;
  const cardHeight = 780;

  return (
    <div 
      className="fixed z-40 overflow-hidden rounded-2xl"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        left: `${PADDING}px`,
        top: `${STATUS_BAR_HEIGHT + PADDING}px`,
        maxHeight: `calc(100vh - ${STATUS_BAR_HEIGHT + DOCK_HEIGHT + PADDING * 2}px)`,
      }}
    >
      {/* 毛玻璃背景 */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/40 border border-white/10"></div>

      {/* 动态光晕效果 */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        {/* 左上光晕 */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        {/* 右下光晕 */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 网格纹理 */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* 内容层 */}
      <div className="relative z-10 h-full flex flex-col">
        {/* 小程序导航栏 */}
        <div className="backdrop-blur-xl bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all">
            <ArrowLeft className="text-white text-lg" />
          </button>
          <h1 className="text-white font-medium">智能车控助手</h1>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all">
            <MoreVertical className="text-white text-lg" />
          </button>
        </div>

        {/* 主内容区 */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero区域 - 车模展示 */}
          <div className="p-6">
            {/* 标题区域 */}
            <div className="text-center mb-6">
              <p className="text-white/50 text-sm">我的车</p>
            </div>
          </div>

          {/* 功能网格 */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {/* 功能按钮1 */}
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                  <Lock className="text-white w-6 h-6" />
                </div>
                <p className="text-white text-sm font-medium">车门锁定</p>
              </button>

              {/* 功能按钮2 */}
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wind className="text-white w-6 h-6" />
                </div>
                <p className="text-white text-sm font-medium">空调控制</p>
              </button>

              {/* 功能按钮3 */}
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <p className="text-white text-sm font-medium">车定位</p>
              </button>

              {/* 功能按钮4 */}
              <button className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <p className="text-white text-sm font-medium">充电状态</p>
              </button>
            </div>

            {/* 车辆状态卡片 */}
            <div className="mt-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-white font-medium mb-3">车辆状态</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">电量</span>
                  <span className="text-white text-sm font-medium">85%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-green-400 to-blue-500"></div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white/60 text-sm">续航里程</span>
                  <span className="text-white text-sm font-medium">420 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">车门状态</span>
                  <span className="text-white text-sm font-medium">已锁定</span>
                </div>
              </div>
            </div>

            {/* 快捷操作 */}
            <div className="mt-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-white font-medium mb-3">快捷操作</h3>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all">
                  解锁车门
                </button>
                <button className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all">
                  鸣笛闪灯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}