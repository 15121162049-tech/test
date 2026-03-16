import { useState } from 'react';
import { 
  Home, 
  Lightbulb, 
  Wifi, 
  Lock, 
  Video, 
  Settings, 
  ChevronDown,
  Sun,
  Moon,
  Bell,
  Plus,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  Power,
  ChevronUp,
  Mail,
  MessageCircle,
  StickyNote
} from 'lucide-react';

export default function VisionHomeControl() {
  const [isDark, setIsDark] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [tvOn, setTvOn] = useState(true);
  const [smartLightOn, setSmartLightOn] = useState(true);
  const [vacuumOn, setVacuumOn] = useState(false);
  const [conditionerOn, setConditionerOn] = useState(true);

  const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'Dining Room', 'Play Room'];

  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ea 100%)',
    }}>
      {/* 背景装饰 - 模拟房间场景 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-300/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
      </div>

      {/* 左侧竖直工具栏 */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <Home className="w-5 h-5 text-gray-700" />
        </div>
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <Lightbulb className="w-5 h-5 text-gray-700" />
        </div>
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <Wifi className="w-5 h-5 text-gray-700" />
        </div>
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <Lock className="w-5 h-5 text-gray-700" />
        </div>
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <Video className="w-5 h-5 text-gray-700" />
        </div>
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <Settings className="w-5 h-5 text-gray-700" />
        </div>
        <div className="bg-white/60 backdrop-blur-2xl rounded-full p-3 shadow-lg border border-white/40">
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="relative h-full flex flex-col px-32 py-6">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between mb-6 bg-white/40 backdrop-blur-2xl rounded-3xl px-6 py-4 shadow-lg border border-white/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-semibold">
              D
            </div>
            <h1 className="text-xl font-medium text-gray-800">Welcome, Daniel</h1>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-full px-6 py-3 flex items-center gap-3 border border-white/60">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
              <input 
                type="text" 
                placeholder="Can you open the toilet..." 
                className="bg-transparent flex-1 outline-none text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-white/80 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2 border border-white/60 hover:bg-white transition-colors">
              {isDark ? <Moon className="w-4 h-4 text-gray-700" /> : <Sun className="w-4 h-4 text-gray-700" />}
              <span className="text-sm text-gray-700">{isDark ? 'Dark' : 'Light'}</span>
            </button>
            <button className="bg-white/60 backdrop-blur-xl rounded-full p-3 border border-white/60 hover:bg-white/80 transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* 控制卡片网格 */}
        <div className="flex-1 grid grid-cols-3 gap-5 overflow-y-auto pb-24">
          {/* YouTube 搜索卡片 */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-gray-800 font-medium">Search Youtube</span>
              <Bell className="w-4 h-4 text-gray-600 ml-auto" />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-white/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/40 hover:bg-white/80 transition-colors">
                <Home className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">Favorites</span>
              </button>
              <button className="flex-1 bg-white/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/40 hover:bg-white/80 transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">Channels</span>
              </button>
              <button className="flex-1 bg-white/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col items-center gap-2 border border-white/40 hover:bg-white/80 transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">Live</span>
              </button>
            </div>
          </div>

          {/* Smart TV 卡片 */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-800 font-medium">Smart TV</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={tvOn} 
                  onChange={(e) => setTvOn(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-black rounded-xl aspect-square flex items-center justify-center">
                <span className="text-2xl">N</span>
              </div>
              <div className="bg-blue-400 rounded-xl aspect-square"></div>
              <div className="bg-black rounded-xl aspect-square"></div>
              <div className="bg-white/80 rounded-xl aspect-square flex items-center justify-center border border-gray-200">
                <Plus className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>

          {/* 音乐播放器 */}
          <div className="bg-gradient-to-br from-pink-200/80 to-pink-300/80 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-white/80 rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 font-semibold mb-1">Yahweh</h3>
                <p className="text-gray-600 text-sm">Glowrie Yeaslles</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gray-700 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">03:54</span>
                </div>
              </div>
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            </div>
            <div className="flex items-center justify-between">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <div className="flex items-center gap-4">
                <SkipBack className="w-5 h-5 text-gray-700" />
                <button 
                  onClick={() => setMusicPlaying(!musicPlaying)}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  {musicPlaying ? (
                    <Pause className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  )}
                </button>
                <SkipForward className="w-5 h-5 text-gray-700" />
              </div>
              <Power className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* 提醒事项 */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <h3 className="text-gray-800 font-medium mb-3">Reminders</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Call Gardener</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                <span>Buy Groceries</span>
              </label>
            </div>
            <div className="mt-4 text-6xl font-bold text-gray-800">2</div>
          </div>

          {/* 智能家居快捷方式 */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="grid grid-cols-2 gap-3">
              <button className="aspect-square bg-green-400/60 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-center border border-green-500/30 hover:bg-green-400/80 transition-colors">
                <Lightbulb className="w-8 h-8 text-green-700" />
              </button>
              <button className="aspect-square bg-green-400/60 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-center border border-green-500/30 hover:bg-green-400/80 transition-colors">
                <Lock className="w-8 h-8 text-green-700" />
              </button>
              <button className="aspect-square bg-green-400/60 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-center border border-green-500/30 hover:bg-green-400/80 transition-colors">
                <Home className="w-8 h-8 text-green-700" />
              </button>
              <button className="aspect-square bg-green-400/60 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-center border border-green-500/30 hover:bg-green-400/80 transition-colors">
                <ChevronUp className="w-8 h-8 text-green-700" />
              </button>
            </div>
          </div>

          {/* 消息/邮件/笔记 */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-center justify-center gap-6 mb-6">
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">AirDrop</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">Messages</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">Mail</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
                  <StickyNote className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">Notes</span>
              </button>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 text-left text-sm text-gray-600 border border-white/40 hover:bg-white/80 transition-colors flex items-center gap-2">
                <span>SharePlay</span>
              </button>
              <button className="w-full bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 text-left text-sm text-gray-600 border border-white/40 hover:bg-white/80 transition-colors flex items-center gap-2">
                <span>Copy</span>
              </button>
              <button className="w-full bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 text-left text-sm text-gray-600 border border-white/40 hover:bg-white/80 transition-colors flex items-center gap-2">
                <span>Print</span>
              </button>
              <button className="w-full bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 text-left text-sm text-gray-600 border border-white/40 hover:bg-white/80 transition-colors flex items-center gap-2">
                <span>Duplicate</span>
              </button>
              <button className="w-full bg-white/60 backdrop-blur-xl rounded-xl px-4 py-3 text-left text-sm text-gray-600 border border-white/40 hover:bg-white/80 transition-colors flex items-center gap-2">
                <span>iWork</span>
              </button>
            </div>
          </div>

          {/* Smart Light */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-medium">Smart<br/>Light</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={smartLightOn} 
                  onChange={(e) => setSmartLightOn(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          {/* Vacuum Cleaner */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-medium">Vacuum<br/>Cleaner</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={vacuumOn} 
                  onChange={(e) => setVacuumOn(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          {/* 空调控制 */}
          <div className="bg-white/50 backdrop-blur-2xl rounded-3xl p-6 shadow-xl border border-white/60 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-medium">Conditioner</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={conditionerOn} 
                  onChange={(e) => setConditionerOn(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-gray-800">16°C</div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Mode</span>
                <span className="text-gray-400">Cold ❄️</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto turn-on</span>
                <span className="text-gray-400">20:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto turn-off</span>
                <span className="text-gray-400">16:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Wind</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部房间切换栏 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/50 backdrop-blur-2xl rounded-full px-4 py-3 shadow-xl border border-white/60">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setSelectedRoom(room)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedRoom === room
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'text-gray-600 hover:bg-white/40'
              }`}
            >
              {room}
            </button>
          ))}
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-md">
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* 右下角主题切换 */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute bottom-6 right-6 w-14 h-14 bg-white/60 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-xl border border-white/60 hover:bg-white/80 transition-colors"
      >
        {isDark ? <Moon className="w-6 h-6 text-gray-700" /> : <Sun className="w-6 h-6 text-gray-700" />}
      </button>
    </div>
  );
}
