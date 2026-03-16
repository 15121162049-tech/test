import { X, ChevronDown, ChevronRight, StopCircle, MicOff } from 'lucide-react';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import aiIconSvg from '../../imports/Union.svg';

type SnapPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

// 状态栏和Dock栏的高度常量 - 匹配App.tsx中的实际值
const STATUS_BAR_HEIGHT = 32; // h-8 = 32px
const DOCK_HEIGHT = 56; // h-14 = 56px
const PADDING = 16;

export default function AdaptiveHeightCard() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [snapPosition, setSnapPosition] = useState<SnapPosition>('top-center');
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [isVoiceAssistantExpanded, setIsVoiceAssistantExpanded] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<'男生' | '女生' | '精灵'>('男生');
  const [isPersonalityExpanded, setIsPersonalityExpanded] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<'内向' | '外向' | '幽默'>('内向');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false); // 新增：标记位置是否已计算
  
  // 初始值设置为 null，等待 useLayoutEffect 计算
  const [centerY, setCenterY] = useState<number>(0);
  const [leftX, setLeftX] = useState<number>(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const collapsedHeightRef = useRef<number>(134);
  const [transitionDuration, setTransitionDuration] = useState<number>(500);
  const [listExpandDuration, setListExpandDuration] = useState<number>(500);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // 光晕层引用 - 用于 Web Animations API
  const glowLayer1Ref = useRef<HTMLDivElement>(null);
  const glowLayer2Ref = useRef<HTMLDivElement>(null);
  const glowLayer3Ref = useRef<HTMLDivElement>(null);
  const glowLayer4Ref = useRef<HTMLDivElement>(null);
  
  // 播放语音示例 - 使用 GitHub 托管音频文件，优化版本
  const playVoiceSample = async (voiceType: '男生' | '女生' | '精灵', personality?: '内向' | '外向' | '幽默') => {
    console.log(`🎵 播放音色: ${voiceType}${personality ? ` - ${personality}` : ''}`);
    
    // 停止并清理之前的音频
    if (currentAudioRef.current) {
      console.log(`⏹️ 停止之前音频播放`);
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current.src = ''; // 清空src释放资源
      currentAudioRef.current = null;
    }
    
    // 添加时间戳止缓存
    const timestamp = Date.now();
    
    // 根据语音类型和性格确定音频文件名
    let audioFileName = '';
    
    if (voiceType === '男生') {
      if (personality === '内向') {
        audioFileName = 'voice-introvert-male.mp3';
      } else if (personality === '外向') {
        audioFileName = 'voice-outgoing-male.mp3';
      } else if (personality === '幽默') {
        audioFileName = 'voice-humor-male.mp3';
      } else {
        audioFileName = 'voice-male.mp3';
      }
    } else if (voiceType === '女生') {
      if (personality === '内向') {
        audioFileName = 'voice-introvert-female.mp3';
      } else if (personality === '外向') {
        audioFileName = 'voice-outgoing-female.mp3';
      } else if (personality === '幽默') {
        audioFileName = 'voice-humor-female.mp3';
      } else {
        audioFileName = 'voice-female.mp3';
      }
    } else if (voiceType === '精灵') {
      if (personality === '内向') {
        audioFileName = 'voice-introvert-fairy.mp3';
      } else if (personality === '外向') {
        audioFileName = 'voice-outgoing-fairy.mp3';
      } else if (personality === '幽默') {
        audioFileName = 'voice-humor-fairy.mp3';
      } else {
        audioFileName = 'voice-fairy.mp3';
      }
    }
    
    console.log(`📂 尝试加载文件: ${audioFileName}`);
    
    const url = `https://raw.githubusercontent.com/15121162049-tech/test/main/${audioFileName}?t=${timestamp}`;
    
    // Web Audio API 备用方案
    const playWebAudioFallback = () => {
      console.log(`🔊 使用 Web Audio API 生成音效`);
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playNote = (frequency: number, startTime: number, duration: number, volume: number) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2000, audioContext.currentTime);
          filter.Q.setValueAtTime(1, audioContext.currentTime);
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
          gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + startTime + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.start(audioContext.currentTime + startTime);
          oscillator.stop(audioContext.currentTime + startTime + duration);
        };
        
        if (voiceType === '男生') {
          playNote(261.63, 0, 0.15, 0.2);
          playNote(392.00, 0.12, 0.2, 0.15);
        } else if (voiceType === '女生') {
          playNote(329.63, 0, 0.12, 0.2);
          playNote(392.00, 0.1, 0.12, 0.18);
          playNote(523.25, 0.18, 0.15, 0.15);
        } else if (voiceType === '精灵') {
          playNote(523.25, 0, 0.1, 0.18);
          playNote(659.25, 0.08, 0.1, 0.16);
          playNote(783.99, 0.15, 0.1, 0.14);
          playNote(1046.50, 0.22, 0.12, 0.12);
        }
        
        const totalDuration = voiceType === '精灵' ? 0.34 : (voiceType === '女生' ? 0.33 : 0.32);
        setTimeout(() => {
          audioContext.close();
          console.log('✅ Web Audio 播放完成');
        }, totalDuration * 1000 + 100);
      } catch (err) {
        console.error('❌ Web Audio API 失败:', err);
      }
    };
    
    // 尝试直接播放音频
    const tryDirectPlay = async (): Promise<void> => {
      console.log(`📡 尝试播放音频: ${audioFileName}`);
      
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.volume = 0.6;
        audio.crossOrigin = 'anonymous';
        
        let hasResolved = false;
        const timeoutId = setTimeout(() => {
          if (!hasResolved) {
            hasResolved = true;
            console.warn(`⏱️ 音频加载超时 (15秒)，使用 Web Audio 备用方案`);
            audio.src = '';
            playWebAudioFallback();
            resolve();
          }
        }, 15000);
        
        audio.addEventListener('canplaythrough', () => {
          if (!hasResolved) {
            clearTimeout(timeoutId);
            console.log(`✅ 音频可以播放: ${voiceType}`);
          }
        }, { once: true });
        
        audio.addEventListener('playing', () => {
          if (!hasResolved) {
            hasResolved = true;
            clearTimeout(timeoutId);
            console.log(`🎶 正在播放: ${voiceType}`);
            resolve();
          }
        }, { once: true });
        
        audio.addEventListener('ended', () => {
          console.log(`⏹️ 播放完成`);
          setIsPlaying(false);
        }, { once: true });
        
        audio.addEventListener('error', (e) => {
          if (!hasResolved) {
            hasResolved = true;
            clearTimeout(timeoutId);
            console.warn(`⚠️ 音频播放失败`);
            playWebAudioFallback();
            resolve();
          }
        }, { once: true });
        
        audio.src = url;
        audio.load();
        
        audio.play()
          .then(() => {
            currentAudioRef.current = audio;
            setIsPlaying(true);
          })
          .catch((playError) => {
            if (!hasResolved) {
              hasResolved = true;
              clearTimeout(timeoutId);
              console.warn(`⚠️ play()失败:`, playError.message);
              playWebAudioFallback();
              resolve();
            }
          });
      });
    };
    
    await tryDirectPlay();
  };
  
  // 用 useLayoutEffect 在渲染前同步设置正确的居中位置
  useLayoutEffect(() => {
    const updatePosition = () => {
      if (!cardRef.current) return;
      
      const container = cardRef.current.parentElement;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const cardWidth = 480; // 原始宽度，未缩放
      
      // 使用 offsetHeight 获取原始高度（不受 transform 影响）
      const rawHeight = cardRef.current.offsetHeight || 134;
      
      // 考虑 scale(0.8) 的影响
      // 视觉高度 = rawHeight * 0.8
      // 使用 translateY(-50%)，组件中心位于 top 位置
      // 视觉顶部 = centerY - rawHeight * 0.5（translateY的偏移）+ rawHeight * 0.1（scale后的差异）
      // 化：视觉顶部 = centerY - rawHeight * 0.4
      // 我们希望视觉顶部 = STATUS_BAR_HEIGHT + 10
      // 所以 centerY = STATUS_BAR_HEIGHT + 10 + rawHeight * 0.4
      const initialCenterY = STATUS_BAR_HEIGHT + 10 + rawHeight * 0.4;
      const initialLeftX = (containerWidth - cardWidth) / 2; // transform不影响布局，使用原始宽度
      
      // 保存原始高度用于后续计算
      collapsedHeightRef.current = rawHeight;
      
      console.log('组件定位计算:', {
        rawHeight,
        STATUS_BAR_HEIGHT,
        initialCenterY,
        visualTop: initialCenterY - rawHeight * 0.4,
        targetTop: STATUS_BAR_HEIGHT + 10
      });
      
      setCenterY(initialCenterY);
      setLeftX(initialLeftX);
      setIsPositioned(true); // 标记位置已计算
    };
    
    // 使用 requestAnimationFrame 确保在渲染后计算
    requestAnimationFrame(() => {
      updatePosition();
    });
    
    return () => {};
  }, []);

  // 使用 Web Animations API 平滑过渡光晕动画速度
  useEffect(() => {
    const layers = [
      glowLayer1Ref.current,
      glowLayer2Ref.current,
      glowLayer3Ref.current,
      glowLayer4Ref.current,
    ];

    const validLayers = layers.filter((layer): layer is HTMLDivElement => layer !== null);

    if (validLayers.length === 0) return;

    const targetPlaybackRate = isPlaying ? 1.8 : 1;

    validLayers.forEach((layer) => {
      const animations = layer.getAnimations();

      animations.forEach((animation) => {
        if (animation instanceof CSSAnimation) {
          const currentTime = animation.currentTime || 0;
          const currentProgress = animation.effect ? currentTime / (animation.effect.getComputedTiming().duration as number) : 0;

          animation.playbackRate = targetPlaybackRate;

          if (animation.effect) {
            const newDuration = animation.effect.getComputedTiming().duration as number;
            animation.currentTime = currentProgress * newDuration;
          }
        }
      });
    });
  }, [isPlaying]);

  // 监听容器尺寸变化，自动重新计算位置
  useEffect(() => {
    if (!cardRef.current) return;
    const container = cardRef.current.parentElement;
    if (!container) return;

    const handleResize = () => {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      const cardWidth = 480; 
      const baseHeight = collapsedHeightRef.current;

      const effectiveTop = STATUS_BAR_HEIGHT + 10;
      const effectiveBottom = containerHeight - DOCK_HEIGHT - 10;

      let newLeftX = leftX;
      let newCenterY = centerY;

      if (snapPosition === 'top-left') {
        newLeftX = PADDING;
        newCenterY = effectiveTop + baseHeight * 0.4;
      } else if (snapPosition === 'top-center') {
        newLeftX = (containerWidth - cardWidth) / 2;
        newCenterY = effectiveTop + baseHeight * 0.4;
      } else if (snapPosition === 'top-right') {
        newLeftX = containerWidth - cardWidth - PADDING;
        newCenterY = effectiveTop + baseHeight * 0.4;
      } else if (snapPosition === 'bottom-left') {
        newLeftX = PADDING;
        newCenterY = effectiveBottom - baseHeight * 0.4;
      } else if (snapPosition === 'bottom-center') {
        newLeftX = (containerWidth - cardWidth) / 2;
        newCenterY = effectiveBottom - baseHeight * 0.4;
      } else if (snapPosition === 'bottom-right') {
        newLeftX = containerWidth - cardWidth - PADDING;
        newCenterY = effectiveBottom - baseHeight * 0.4;
      }

      setCenterY(newCenterY);
      setLeftX(newLeftX);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(container);
    // 同时监听窗口变化作为备选
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [snapPosition, isExpanded]); // 依赖项增加 isExpanded 确保高度变化时也重新对齐

  // ResizeObserver 监听高度更新 collapsedHeightRef
  useEffect(() => {
    if (!cardRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentHeight = entry.contentRect.height;

        if (currentHeight < 200) {
          collapsedHeightRef.current = currentHeight;
        }
      }
    });

    resizeObserver.observe(cardRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 监听 isExpanded 状态变化，调整位置
  useEffect(() => {
    if (!cardRef.current) return;

    const container = cardRef.current.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    const estimatedExpandedHeight = isExpanded ? 400 : collapsedHeightRef.current;
    
    const effectiveTop = STATUS_BAR_HEIGHT + 10; // 距离状态栏10px
    const effectiveBottom = containerHeight - DOCK_HEIGHT - 10; // 距离Dock栏10px

    let newCenterY = centerY;

    if (snapPosition.includes('top')) {
      setTransitionDuration(500);
      setListExpandDuration(500);
      newCenterY = effectiveTop + estimatedExpandedHeight * 0.4; // 考虑 scale(0.8)
    } else if (snapPosition.includes('bottom')) {
      setTransitionDuration(500);
      setListExpandDuration(300);
      newCenterY = effectiveBottom - estimatedExpandedHeight * 0.4; // 考虑 scale(0.8)
    }

    let newLeftX = leftX;
    if (snapPosition.includes('left')) {
      newLeftX = PADDING;
    } else if (snapPosition.includes('right')) {
      newLeftX = containerWidth - 480 - PADDING; // transform不影响布局，使用原始宽度
    } else if (snapPosition.includes('center')) {
      newLeftX = (containerWidth - 480) / 2; // transform不影响布局，使用原始宽度
    }

    setCenterY(newCenterY);
    setLeftX(newLeftX);
  }, [isExpanded, snapPosition]);

  if (!isVisible) return null;

  return (
    <div 
      ref={cardRef}
      className="absolute w-[480px] h-auto min-h-[134px] overflow-hidden rounded-lg z-[150]"
      style={{
        left: `${leftX}px`,
        top: `${centerY}px`,
        transform: 'translateY(-50%) scale(0.8)',
        transformOrigin: 'center center',
        transition: isPositioned ? `left 0.5s ease, top ${transitionDuration}ms ease-in-out, transform 0.5s ease` : 'none',
        opacity: isPositioned ? 1 : 0,
      }}
    >
      {/* 动态背景 */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[40px] opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-500/8 rounded-full blur-[40px] opacity-80"></div>
        
        {/* SVG背景装饰 */}
        <div className="absolute top-1/2 -translate-y-1/2 w-48 h-48 opacity-30" style={{ filter: 'blur(8px)', right: '-32px' }}>
          <img 
            src={aiIconSvg} 
            alt="" 
            className="w-full h-full"
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(28%) sepia(89%) saturate(5447%) hue-rotate(315deg) brightness(95%) contrast(98%)'
            }}
          />
        </div>
        
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="absolute -bottom-8 left-0 right-0 h-32 overflow-hidden pointer-events-none">
          <div 
            className="absolute -bottom-[70px] w-[300%] h-32 glow-layer"
            ref={glowLayer1Ref}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 25%, rgba(236, 72, 153, 1) 38%, rgba(236, 72, 153, 1) 44%, rgba(236, 72, 153, 1) 50%, rgba(236, 72, 153, 1) 56%, transparent 68%, transparent 100%)',
              filter: 'blur(16px)',
              opacity: isPlaying ? 1 : 0.8,
              // @ts-ignore
              '--animation-duration': isPlaying ? '1.5s' : '4s',
              '--animation-delay': '0s',
            }}
          ></div>
          <div 
            className="absolute -bottom-[70px] w-[300%] h-32 glow-layer"
            ref={glowLayer2Ref}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 30%, rgba(139, 92, 246, 0.6) 42%, rgba(139, 92, 246, 0.6) 48%, rgba(139, 92, 246, 0.6) 54%, rgba(139, 92, 246, 0.6) 60%, rgba(139, 92, 246, 0.6) 66%, transparent 78%, transparent 100%)',
              filter: 'blur(18px)',
              opacity: isPlaying ? 1 : 0.8,
              // @ts-ignore
              '--animation-duration': isPlaying ? '1.5s' : '4s',
              '--animation-delay': isPlaying ? '0.375s' : '1s',
            }}
          ></div>
          <div 
            className="absolute -bottom-[70px] w-[300%] h-32 glow-layer"
            ref={glowLayer3Ref}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 38%, rgba(20, 184, 166, 0.4) 50%, rgba(20, 184, 166, 0.4) 56%, rgba(20, 184, 166, 0.4) 62%, transparent 74%, transparent 100%)',
              filter: 'blur(17px)',
              opacity: isPlaying ? 1 : 0.8,
              // @ts-ignore
              '--animation-duration': isPlaying ? '1.5s' : '4s',
              '--animation-delay': isPlaying ? '0.875s' : '2.33s',
            }}
          ></div>
          <div 
            className="absolute -bottom-[100px] w-[300%] h-32 glow-layer"
            ref={glowLayer4Ref}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(34, 211, 238, 0.45) 58%, rgba(34, 211, 238, 0.45) 64%, rgba(34, 211, 238, 0.45) 69%, transparent 82%, transparent 100%)',
              filter: 'blur(17px)',
              opacity: isPlaying ? 1 : 0.8,
              // @ts-ignore
              '--animation-duration': isPlaying ? '1.5s' : '4s',
              '--animation-delay': isPlaying ? '1.25s' : '3.33s',
            }}
          ></div>
        </div>
      </div>
      
      <style>{`
        @keyframes flowLight {
          0% {
            transform: translateX(-55%) translateY(0px);
          }
          12% {
            transform: translateX(-48%) translateY(-5px);
          }
          23% {
            transform: translateX(-40%) translateY(-8px);
          }
          34% {
            transform: translateX(-30%) translateY(-6px);
          }
          47% {
            transform: translateX(-18%) translateY(2px);
          }
          58% {
            transform: translateX(-10%) translateY(4px);
          }
          69% {
            transform: translateX(-20%) translateY(7px);
          }
          79% {
            transform: translateX(-32%) translateY(5px);
          }
          89% {
            transform: translateX(-45%) translateY(3px);
          }
          100% {
            transform: translateX(-55%) translateY(0px);
          }
        }
        
        .glow-layer {
          animation: flowLight var(--animation-duration) ease-in-out infinite var(--animation-delay);
        }
      `}</style>
      
      {/* 内容层 */}
      <div className="relative z-10">
        {/* 左上角标题 */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-2">
            <img 
              src={aiIconSvg} 
              alt="AI Icon" 
              className="w-5 h-5 opacity-80"
            />
            <p className="text-white opacity-80 text-sm">超级千里</p>
          </div>
        </div>
        
        {/* 关闭按钮 */}
        <div className="absolute top-2.5 right-2.5 z-50">
          <button
            onClick={() => {
              // 重置组件状态
              setIsExpanded(false);
              setIsVoiceAssistantExpanded(false);
              setIsPersonalityExpanded(false);
              setIsTaskCompleted(false);
              // 停止播放音频
              if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
                currentAudioRef.current = null;
              }
              setIsPlaying(false);
            }}
            className="w-[24px] h-[24px] bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center border border-white/10 hover:border-white/30"
            aria-label="重置"
          >
            <X className="w-3.5 h-3.5 text-white opacity-60 hover:opacity-100" />
          </button>
        </div>
        
        {/* 静音按钮 - 左角 */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-20">
          <div className={`flex items-center rounded-full backdrop-blur-md border border-white/25 overflow-hidden h-[28px] transition-all duration-300 ${
            isMuted ? 'bg-white/55' : 'bg-white/15 hover:bg-white/25'
          }`}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-1.5 transition-colors duration-200 flex items-center ${
                isMuted ? 'pr-3' : ''
              }`}
              aria-label={isMuted ? "取消静音" : "静音"}
            >
              <MicOff className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                isMuted ? 'text-red-400' : 'text-white'
              }`} />
              <span 
                className="text-white text-xs whitespace-nowrap overflow-hidden transition-all duration-300"
                style={{
                  maxWidth: isMuted ? '60px' : '0px',
                  opacity: isMuted ? 1 : 0,
                  marginLeft: isMuted ? '6px' : '0px',
                }}
              >
                已静音
              </span>
            </button>
          </div>
          
          {/* 语音助手展开组件 */}
          <div className="flex items-center bg-white/15 rounded-full backdrop-blur-md border border-white/25 overflow-hidden h-[28px] transition-all duration-300">
            <button
              onClick={() => {
                setIsVoiceAssistantExpanded(!isVoiceAssistantExpanded);
                if (!isVoiceAssistantExpanded) {
                  setIsPersonalityExpanded(false);
                }
              }}
              className="px-3 py-1.5 hover:bg-white/15 transition-colors duration-200 text-white text-xs whitespace-nowrap flex-shrink-0 w-[60px] text-center"
            >
              {selectedVoice}
            </button>
            
            {/* 展开的子项 */}
            <div 
              className="flex items-center overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxWidth: isVoiceAssistantExpanded ? '200px' : '0px',
                opacity: isVoiceAssistantExpanded ? 1 : 0,
              }}
            >
              <div className="w-px h-4 bg-white/25"></div>
              <button 
                onClick={() => {
                  setSelectedVoice('男生');
                  setIsVoiceAssistantExpanded(false);
                  playVoiceSample('男生', selectedPersonality);
                }}
                className={`px-4 py-0.5 transition-colors duration-200 text-xs whitespace-nowrap text-white rounded-xl mx-0.5 my-1 ${
                  selectedVoice === '男生' ? 'bg-white/55' : 'hover:bg-white/15'
                }`}
              >
                男生
              </button>
              <div className="w-px h-4 bg-white/25"></div>
              <button 
                onClick={() => {
                  setSelectedVoice('女生');
                  setIsVoiceAssistantExpanded(false);
                  playVoiceSample('女生', selectedPersonality);
                }}
                className={`px-4 py-0.5 transition-colors duration-200 text-xs whitespace-nowrap text-white rounded-xl mx-0.5 my-1 ${
                  selectedVoice === '女生' ? 'bg-white/55' : 'hover:bg-white/15'
                }`}
              >
                女生
              </button>
              <div className="w-px h-4 bg-white/25"></div>
              <button 
                onClick={() => {
                  setSelectedVoice('精灵');
                  setIsVoiceAssistantExpanded(false);
                  playVoiceSample('精灵', selectedPersonality);
                }}
                className={`px-4 py-0.5 transition-colors duration-200 text-xs whitespace-nowrap text-white rounded-xl mx-0.5 my-1 ${
                  selectedVoice === '精灵' ? 'bg-white/55' : 'hover:bg-white/15'
                }`}
              >
                精灵
              </button>
            </div>
          </div>
          
          {/* AI性格按钮 */}
          <div className="flex items-center bg-white/15 rounded-full backdrop-blur-md border border-white/25 overflow-hidden h-[28px] transition-all duration-300">
            <button
              onClick={() => {
                setIsPersonalityExpanded(!isPersonalityExpanded);
                if (!isPersonalityExpanded) {
                  setIsVoiceAssistantExpanded(false);
                }
              }}
              className="px-3 py-1.5 hover:bg-white/15 transition-colors duration-200 text-white text-xs whitespace-nowrap flex-shrink-0 w-[60px] text-center"
            >
              {selectedPersonality}
            </button>
            
            {/* 展开的子项 */}
            <div 
              className="flex items-center overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxWidth: isPersonalityExpanded ? '200px' : '0px',
                opacity: isPersonalityExpanded ? 1 : 0,
              }}
            >
              <div className="w-px h-4 bg-white/25"></div>
              <button 
                onClick={() => {
                  setSelectedPersonality('内向');
                  setIsPersonalityExpanded(false);
                  playVoiceSample(selectedVoice, '内向');
                }}
                className={`px-4 py-0.5 transition-colors duration-200 text-xs whitespace-nowrap text-white rounded-xl mx-0.5 my-1 ${
                  selectedPersonality === '内向' ? 'bg-white/55' : 'hover:bg-white/15'
                }`}
              >
                内向
              </button>
              <div className="w-px h-4 bg-white/25"></div>
              <button 
                onClick={() => {
                  setSelectedPersonality('外向');
                  setIsPersonalityExpanded(false);
                  playVoiceSample(selectedVoice, '外向');
                }}
                className={`px-4 py-0.5 transition-colors duration-200 text-xs whitespace-nowrap text-white rounded-xl mx-0.5 my-1 ${
                  selectedPersonality === '外向' ? 'bg-white/55' : 'hover:bg-white/15'
                }`}
              >
                外向
              </button>
              <div className="w-px h-4 bg-white/25"></div>
              <button 
                onClick={() => {
                  setSelectedPersonality('幽默');
                  setIsPersonalityExpanded(false);
                  playVoiceSample(selectedVoice, '幽默');
                }}
                className={`px-4 py-0.5 transition-colors duration-200 text-xs whitespace-nowrap text-white rounded-xl mx-0.5 my-1 ${
                  selectedPersonality === '幽默' ? 'bg-white/55' : 'hover:bg-white/15'
                }`}
              >
                幽默
              </button>
            </div>
          </div>
        </div>
        
        {/* 内容区 */}
        <div className="relative p-4 pt-12 pb-16 max-h-[calc(100%-2rem)] overflow-y-auto">
          <div className="text-left text-white opacity-30 mb-3 text-sm">
            <span className="truncate">你可以说～" 超级千里，帮我导航到西岸智塔楼..."</span>
          </div>
          
          {/* 下拉列表 */}
          <div className="bg-white/15 rounded-lg overflow-hidden backdrop-blur-md border border-white/10">
            <div 
              className="flex items-center justify-between p-2.5 cursor-pointer transition-colors hover:bg-white/10"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-white flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-white flex-shrink-0" />
                )}
                <span className="text-white truncate text-sm">复杂任务名称xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 阻止事件冒泡
                  setIsTaskCompleted(!isTaskCompleted);
                }}
                className={`px-2.5 py-1 rounded-full backdrop-blur-md border transition-all duration-200 ml-2 flex-shrink-0 flex items-center gap-1 w-[88px] ${
                  isTaskCompleted 
                    ? 'bg-white/10 border-white/15' 
                    : 'bg-white/15 hover:bg-white/25 border-white/25'
                }`}
                aria-label={isTaskCompleted ? "已完成" : "结束任务"}
              >
                <StopCircle className={`w-3.5 h-3.5 flex-shrink-0 ${isTaskCompleted ? 'text-white' : 'text-red-400'}`} />
                <span className={`text-xs flex-shrink-0 w-[48px] text-center ${isTaskCompleted ? 'text-white' : 'text-red-400'}`}>
                  {isTaskCompleted ? '已完成' : '结束任务'}
                </span>
              </button>
            </div>
            
            {/* 展开的内容 */}
            <div 
              className={`overflow-hidden transition-all ${isExpanded ? 'max-h-80' : 'max-h-0'}`}
              style={{ 
                transitionTimingFunction: 'ease-in-out',
                transitionDuration: `${listExpandDuration}ms`
              }}
            >
              <div className="p-2.5 pt-0">
                <div className="bg-white/10 rounded p-2.5 text-gray-300 text-xs leading-relaxed backdrop-blur-md overflow-y-auto max-h-64">
                  <p className="break-words">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p className="break-words">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p className="break-words">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  <p className="break-words">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右下角技术支持文字 */}
          <div className="absolute bottom-4 right-4">
            <p className="text-white opacity-20" style={{ fontSize: '12px' }}>采用阶跃辰 Step-3 大模型</p>
          </div>
        </div>
      </div>
    </div>
  );
}