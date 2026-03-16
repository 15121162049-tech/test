import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Volume2, List, Share2, MoreHorizontal, Mic2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// 歌曲数据类型定义
interface Lyric {
  time: number;
  text: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumArt: string;
  lyrics: Lyric[];
}

// 完整歌曲库数据
const songsData: Song[] = [
  {
    id: 1,
    title: "Midnight Drive",
    artist: "Synthwave Dreams",
    duration: 238,
    albumArt: "https://images.unsplash.com/photo-1597890739474-507658211517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lyrics: [
      { time: 0, text: "Night falls over the neon city" },
      { time: 10, text: "The engine hums a synthwave melody" },
      { time: 20, text: "Reflections dancing on the chrome" },
      { time: 30, text: "Searching for a place called home" },
      { time: 45, text: "Midnight drive, under starlight skies" },
      { time: 60, text: "I see the world through cybernetic eyes" },
      { time: 75, text: "Digital dreams in a silicon soul" },
      { time: 90, text: "Losing all our self control" },
      { time: 105, text: "The grid is glowing, bright and blue" },
      { time: 120, text: "Every turn leads back to you" },
      { time: 135, text: "Synchronized with the city's beat" },
      { time: 150, text: "Feeling the static beneath our feet" },
      { time: 165, text: "No destination, just the flow" },
      { time: 180, text: "To the rhythm, here we go" },
      { time: 195, text: "Endless highway, silver line" },
      { time: 210, text: "Frozen moments lost in time" },
      { time: 225, text: "Midnight drive, fading out of sight" },
      { time: 235, text: "Into the echoes of the night" }
    ]
  },
  {
    id: 2,
    title: "Ocean Dreams",
    artist: "Coastal Vibes",
    duration: 195,
    albumArt: "https://images.unsplash.com/photo-1573470369532-03944ae8ab93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lyrics: [
      { time: 0, text: "Waves are calling from afar" },
      { time: 12, text: "Underneath the evening star" },
      { time: 25, text: "Golden sunlight fades away" },
      { time: 38, text: "Dancing in the ocean spray" },
      { time: 52, text: "Feel the rhythm of the tide" },
      { time: 65, text: "Where the sea and sky collide" },
      { time: 78, text: "Drifting on a summer breeze" },
      { time: 92, text: "Lost in endless mysteries" },
      { time: 105, text: "Ocean dreams carry me home" },
      { time: 120, text: "Through the waters I roam" },
      { time: 135, text: "Horizons painted in gold" },
      { time: 150, text: "Stories waiting to be told" },
      { time: 165, text: "Sunset whispers on the shore" },
      { time: 180, text: "Forever craving something more" },
      { time: 190, text: "Ocean dreams, let me stay" }
    ]
  },
  {
    id: 3,
    title: "Cosmic Journey",
    artist: "Stellar Echoes",
    duration: 267,
    albumArt: "https://images.unsplash.com/photo-1761682704492-b7ed11edfda7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lyrics: [
      { time: 0, text: "Beyond the stars, in endless space" },
      { time: 14, text: "We're travelers without a trace" },
      { time: 28, text: "Nebulas glow in violet hues" },
      { time: 42, text: "Chasing light through cosmic blues" },
      { time: 58, text: "Gravity fades, we're floating free" },
      { time: 72, text: "In galaxies of mystery" },
      { time: 88, text: "Stardust memories in our veins" },
      { time: 102, text: "Breaking through celestial chains" },
      { time: 118, text: "Cosmic journey takes us far" },
      { time: 135, text: "Beyond the moon, beyond the stars" },
      { time: 150, text: "Infinite darkness, infinite light" },
      { time: 165, text: "We're wanderers of the night" },
      { time: 182, text: "Through the void we find our way" },
      { time: 198, text: "In the cosmos, we forever stay" },
      { time: 215, text: "Quantum dreams and astral planes" },
      { time: 232, text: "Eternal echoes still remain" },
      { time: 248, text: "Cosmic journey, set us free" },
      { time: 262, text: "Into the universal sea" }
    ]
  }
];

// Apple Music 风格的车载 HMI 音乐播放器 - 布局优化版
export default function MusicPlayerUI() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 从头开始播放
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);
  const lyricsRef = useRef<HTMLDivElement>(null);
  
  // 当前歌曲数据
  const currentSong = songsData[currentSongIndex];
  const { title, artist, duration, albumArt, lyrics } = currentSong;

  // 切换到上一首
  const playPrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songsData.length - 1 : prev - 1));
    setCurrentTime(0);
    setIsPlaying(true);
    setLiked(false);
  };

  // 切换到下一首
  const playNext = () => {
    setCurrentSongIndex((prev) => (prev === songsData.length - 1 ? 0 : prev + 1));
    setCurrentTime(0);
    setIsPlaying(true);
    setLiked(false);
  };

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

  // 歌词自动滚动逻辑
  useEffect(() => {
    const activeLyricIndex = lyrics.findIndex((l, i) => {
      const nextTime = lyrics[i + 1]?.time || duration;
      return currentTime >= l.time && currentTime < nextTime;
    });

    if (activeLyricIndex !== -1 && lyricsRef.current) {
      const activeElement = lyricsRef.current.children[activeLyricIndex] as HTMLElement;
      if (activeElement) {
        lyricsRef.current.scrollTo({
          top: activeElement.offsetTop - lyricsRef.current.clientHeight / 2 + activeElement.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950 font-sans">
      {/* 动态 Apple Music 风格背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden scale-110">
        <div 
          className="absolute inset-0 blur-[40px] opacity-60 animate-apple-bg-rotate"
          style={{ 
            backgroundImage: `url(${albumArt})`,
            backgroundSize: '200% 200%',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-slate-950/30"></div>
      </div>

      {/* 主布局容器 */}
      <div className="relative z-10 h-full flex items-center justify-between px-16 py-12 gap-16">
        
        {/* 左侧：封面与播控组件 (缩小版) */}
        <div className="w-[340px] flex flex-col items-center space-y-10">
          {/* 专辑封面 */}
          <div className={`relative w-[280px] h-[280px] rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-all duration-700 ${isPlaying ? 'scale-100' : 'scale-[0.88] brightness-75'}`}>
            <ImageWithFallback 
              src={albumArt}
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* 播控核心组件 */}
          <div className="w-full space-y-8">
            {/* 歌曲信息与喜爱 */}
            <div className="flex items-center justify-between px-1">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">{title}</h2>
                <p className="text-lg text-white/40 font-medium">{artist}</p>
              </div>
              <button onClick={() => setLiked(!liked)} className={`p-2 rounded-full hover:bg-white/10 transition-colors ${liked ? 'text-red-500' : 'text-white/40'}`}>
                <Heart className="w-6 h-6" fill={liked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* 进度条 */}
            <div className="space-y-2 px-1">
              <div className="relative h-1 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden group">
                <div 
                  className="absolute left-0 top-0 h-full bg-white/90 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-white/20 tracking-[0.2em] uppercase">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* 核心播放按钮 */}
            <div className="flex items-center justify-center gap-8">
              <button onClick={playPrevious} className="text-white/60 hover:text-white transition-all transform active:scale-90">
                <SkipBack className="w-10 h-10 fill-current" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="group relative flex items-center justify-center transition-transform transform active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-16 h-16 text-white fill-current" />
                ) : (
                  <Play className="w-16 h-16 text-white fill-current ml-1" />
                )}
              </button>

              <button onClick={playNext} className="text-white/60 hover:text-white transition-all transform active:scale-90">
                <SkipForward className="w-10 h-10 fill-current" />
              </button>
            </div>

            {/* 音量控制 */}
            <div className="flex items-center gap-4 px-2 py-1">
              <Volume2 className="w-4 h-4 text-white/20" />
              <div className="flex-1 relative h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-white/40 rounded-full" style={{ width: `${volume}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：歌词显示区域 (扩展版) */}
        <div className="flex-1 h-[85%] flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 mb-6 px-4">
            <Mic2 className="w-5 h-5 text-white/30" />
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Lyrics Experience</h3>
          </div>
          
          <div 
            ref={lyricsRef}
            className="flex-1 overflow-y-auto space-y-14 px-4 py-16 mask-fade-edges scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {lyrics.map((line, index) => {
              const active = currentTime >= line.time && (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time);
              return (
                <div 
                  key={index}
                  className={`transition-all duration-1200 origin-left cursor-default max-w-4xl ${
                    active 
                      ? 'text-white text-6xl font-extrabold opacity-100 scale-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                      : 'text-white/10 text-4xl font-bold opacity-20 scale-[0.92] hover:opacity-40 blur-[1px] hover:blur-0'
                  }`}
                >
                  {line.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .mask-fade-edges {
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        @keyframes apple-bg-rotate {
          0% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1.1) rotate(0deg); }
        }
        .animate-apple-bg-rotate {
          animation: apple-bg-rotate 30s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}