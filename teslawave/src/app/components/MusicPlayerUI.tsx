import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Volume2, List } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// 车载HMI音乐播放器界面
export default function MusicPlayerUI() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(145); // 2:25
  const [duration] = useState(238); // 3:58
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // 模拟播放进度
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) return 0;
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  const playlist = [
    { title: 'Midnight Drive', artist: 'Synthwave Dreams', duration: '3:58', playing: true },
    { title: 'Neon Lights', artist: 'Electric Soul', duration: '4:12', playing: false },
    { title: 'Highway Stars', artist: 'Night Riders', duration: '3:45', playing: false },
    { title: 'City Glow', artist: 'Urban Beats', duration: '4:30', playing: false },
    { title: 'Tokyo Drift', artist: 'Cyber Wave', duration: '3:25', playing: false },
    { title: 'Starlight', artist: 'Cosmic Sounds', duration: '4:05', playing: false },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 背景渐变 - 蓝紫色调 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/60 to-blue-900/50"></div>
      
      {/* 动态背景光晕 - 蓝色系 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* 主内容区域 */}
      <div className="relative z-10 h-full flex items-start justify-center px-16 gap-12 pt-16 pb-12">
        
        {/* 左侧：播放列表 */}
        <div className="w-96 h-[620px] rounded-3xl p-6 flex flex-col mr-24 -mt-4 -ml-[10px]">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5 text-white" />
            <h3 className="text-xl font-bold text-white">播放列表</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {playlist.map((song, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all cursor-pointer ${
                  song.playing
                    ? 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${song.playing ? 'text-white' : 'text-white/80'}`}>
                      {song.title}
                    </h4>
                    <p className="text-sm text-white/50">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/50">{song.duration}</span>
                    {song.playing && (
                      <div className="flex gap-0.5 items-end h-4">
                        <div className="w-0.5 bg-blue-400 rounded-full animate-music-bar-1" style={{ height: '60%' }}></div>
                        <div className="w-0.5 bg-blue-400 rounded-full animate-music-bar-2" style={{ height: '100%' }}></div>
                        <div className="w-0.5 bg-blue-400 rounded-full animate-music-bar-3" style={{ height: '40%' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：专辑封面和控制 */}
        <div className="flex flex-col items-center gap-5 flex-shrink-0 mt-16 -ml-[84px]">
          {/* 专辑封面 */}
          <div className="relative group">
            {/* 封面阴影 - 蓝紫色系 */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/60 to-blue-600/50 rounded-3xl blur-2xl scale-95 opacity-75 group-hover:opacity-100 transition-opacity"></div>
            
            {/* 封面图片 */}
            <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwYXJ0JTIwbXVzaWN8ZW58MXx8fHwxNzcyOTc0NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Album Cover"
                className="w-full h-full object-cover"
              />
              {/* 播放状态遮罩 */}
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              )}
              
              {/* 点赞按钮 - 右下角 */}
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                    liked 
                      ? 'bg-pink-500/40 text-pink-300 border border-pink-400/50' 
                      : 'bg-black/40 text-white/80 hover:text-white border border-white/20 hover:bg-black/60'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          {/* 歌曲信息 */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Midnight Drive</h2>
            <p className="text-xl text-white/70">Synthwave Dreams</p>
          </div>

          {/* 进度条 */}
          <div className="w-80 space-y-2">
            <div className="relative h-1.5 bg-white/20 rounded-full backdrop-blur-sm">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              >
                {/* 进度指示器 */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-blue-500/50"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* 播放控制 */}
          <div className="flex items-center gap-6">
            {/* Shuffle */}
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`p-3 rounded-full transition-all ${
                shuffle 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* 上一首 */}
            <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all hover:scale-110">
              <SkipBack className="w-6 h-6" fill="currentColor" />
            </button>

            {/* 播放/暂停 */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-xl shadow-blue-500/50 text-white transition-all hover:scale-110 w-20 h-20 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8" fill="currentColor" />
              )}
            </button>

            {/* 下一首 */}
            <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all hover:scale-110">
              <SkipForward className="w-6 h-6" fill="currentColor" />
            </button>

            {/* Repeat */}
            <button
              onClick={() => setRepeat(!repeat)}
              className={`p-3 rounded-full transition-all ${
                repeat 
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/50' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20 border border-white/10'
              }`}
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes music-bar-1 {
          0%, 100% { height: 40%; }
          50% { height: 80%; }
        }
        @keyframes music-bar-2 {
          0%, 100% { height: 100%; }
          50% { height: 50%; }
        }
        @keyframes music-bar-3 {
          0%, 100% { height: 60%; }
          50% { height: 90%; }
        }
        .animate-music-bar-1 {
          animation: music-bar-1 0.8s ease-in-out infinite;
        }
        .animate-music-bar-2 {
          animation: music-bar-2 0.8s ease-in-out infinite 0.2s;
        }
        .animate-music-bar-3 {
          animation: music-bar-3 0.8s ease-in-out infinite 0.4s;
        }
      `}</style>
    </div>
  );
}