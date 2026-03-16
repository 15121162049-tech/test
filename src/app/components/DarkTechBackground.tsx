export default function DarkTechBackground() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* 深色渐变基底 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-black"></div>
      
      {/* 网格线 */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 光晕效果 - 蓝色 */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[120px]"></div>

      {/* 粒子星光效果 */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 3}s infinite ${Math.random() * 2}s`,
              boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(96, 165, 250, ${Math.random() * 0.5 + 0.3})`,
            }}
          />
        ))}
      </div>

      {/* 流动光线 */}
      <div className="absolute inset-0 opacity-20">
        {/* 顶部光线 */}
        <div 
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{ animation: 'flow 8s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{ animation: 'flow 10s ease-in-out infinite 2s' }}
        ></div>
        {/* 中部光线 */}
        <div 
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          style={{ animation: 'flow 12s ease-in-out infinite 1s' }}
        ></div>
        {/* 底部光线 */}
        <div 
          className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          style={{ animation: 'flow 9s ease-in-out infinite 3s' }}
        ></div>
      </div>

      {/* 径向渐变遮罩 - 边缘变暗 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60"></div>

      {/* 波浪扫描线效果 */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          style={{ 
            height: '200px',
            animation: 'scan 8s linear infinite',
          }}
        ></div>
      </div>

      {/* 光点脉冲效果 */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`pulse-${i}`}
          className="absolute w-3 h-3 rounded-full bg-blue-400/30"
          style={{
            left: `${15 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
            animation: `pulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.5}s`,
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.6)',
          }}
        />
      ))}

      {/* CSS 动画 */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes flow {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, transparent 0%, transparent 40%, black 100%);
        }
      `}</style>
    </div>
  );
}
