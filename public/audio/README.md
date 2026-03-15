# 语音音频文件配置说明

## ⚠️ 重要提示
当前目录中的 `.mp3` 文件是**占位符文本文件**，需要替换为真实的音频文件才能正常播放。

## 📁 需要替换的文件
- `voice-male.mp3` - 男生音色（当前是占位符，需替换）
- `voice-female.mp3` - 女生音色（当前是占位符，需替换）
- `voice-fairy.mp3` - 精灵音色（当前是占位符，需替换）

## 🎯 音频内容要求
所有音频文件应包含文本：**"你好我是智能语音助手"**

## 🚀 快速生成方法（推荐）

### 方法1: Microsoft Edge TTS（免费、高质量、最简单）✅

```bash
# 1. 安装 edge-tts
pip install edge-tts

# 2. 生成三个音频文件
# 男生音色（云希-成熟男声）
edge-tts --voice zh-CN-YunxiNeural --text "你好我是智能语音助手" --write-media voice-male.mp3

# 女生音色（晓晓-温柔女声）
edge-tts --voice zh-CN-XiaoxiaoNeural --text "你好我是智能语音助手" --write-media voice-female.mp3

# 精灵音色（晓伊-童声）
edge-tts --voice zh-CN-XiaoyiNeural --text "你好我是智能语音助手" --write-media voice-fairy.mp3

# 3. 将生成的文件移动到 /public/audio/ 目录下
```

### 方法2: 使用在线TTS网站（无需安装）

#### 推荐网站：

1. **TTSFree** (https://ttsfree.com/)
   - 访问网站
   - 选择语言：中文（简体）
   - 选择不同的音色（男声/女声/童声）
   - 输入文本："你好我是智能语音助手"
   - 下载为 MP3 格式
   - 重命名并放到 `/public/audio/` 目录

2. **Natural Reader** (https://www.naturalreaders.com/online/)
   - 高质量AI语音
   - 免费试用

3. **FakeYou** (https://fakeyou.com/)
   - 多种AI音色选择

## 🔧 其他生成方法

### 方案1: 使用免费在线TTS服务生成（推荐）

#### 1.1 使用 Microsoft Edge TTS（免费、高质量）
```bash
# 安装 edge-tts
pip install edge-tts

# 生成男生音色（云希-成熟男声）
edge-tts --voice zh-CN-YunxiNeural --text "你好我是智能语音助手" --write-media voice-male.mp3

# 生成女生音色（晓晓-温柔女声）
edge-tts --voice zh-CN-XiaoxiaoNeural --text "你好我是智能语音助手" --write-media voice-female.mp3

# 生成精灵音色（晓伊-童声）
edge-tts --voice zh-CN-XiaoyiNeural --text "你好我是智能语音助手" --write-media voice-fairy.mp3
```

更多中文音色选项：
- `zh-CN-YunxiNeural` - 云希（男）- 成熟稳重
- `zh-CN-YunjianNeural` - 云健（男）- 年轻活力
- `zh-CN-XiaoxiaoNeural` - 晓晓（女）- 温柔自然
- `zh-CN-XiaoyiNeural` - 晓伊（女）- 童声可爱
- `zh-CN-YunyangNeural` - 云扬（男）- 专业播音

#### 1.2 使用 Google Cloud TTS（免费额度）
访问：https://cloud.google.com/text-to-speech
- 选择语言：中文（简体）
- 选择不同的语音配置
- 下载生成的音频文件

### 方案2: 使用开源TTS项目

#### 2.1 Coqui TTS（本地运行，完全免费）
```bash
# 安装
pip install TTS

# 生成语音
tts --text "你好我是智能语音助手" --model_name tts_models/zh-CN/baker/tacotron2-DDC-GST --out_path voice-male.mp3
```

#### 2.2 PaddleSpeech（百度开源）
```bash
# 安装
pip install paddlespeech

# 生成男声
paddlespeech tts --input "你好我是智能语音助手" --output voice-male.wav --am fastspeech2_male

# 生成女声
paddlespeech tts --input "你好我是智能语音助手" --output voice-female.wav --am fastspeech2_female
```

### 方案3: 使用Python + pyttsx3（最简单）
```python
import pyttsx3

engine = pyttsx3.init()

# 设置男声（较低音调）
engine.setProperty('rate', 150)
engine.setProperty('volume', 1.0)
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)  # 通常男声
engine.save_to_file('你好我是智能语音助手', 'voice-male.mp3')

# 设置女声（较高音调）
engine.setProperty('voice', voices[1].id)  # 通常女声
engine.save_to_file('你好我是智能语音助手', 'voice-female.mp3')

engine.runAndWait()
```

### 方案4: 使用在线TTS网站录制

#### 推荐网站：
1. **Text to Speech Free**
   - 网址: https://ttsfree.com/
   - 支持中文多种音色
   - 免费下载MP3

2. **Natural Reader**
   - 网址: https://www.naturalreaders.com/online/
   - 高质量AI语音
   - 免费试用

3. **FakeYou**
   - 网址: https://fakeyou.com/
   - 多种AI音色
   - 免费使用

## 备用方案

如果本地音频文件不存在，系统会自动使用 Google Translate TTS API 作为备用方案：
- 通过调整播放速度区分不同音色
- 男生: playbackRate = 0.9（低沉）
- 女生: playbackRate = 1.0（标准）
- 精灵: playbackRate = 1.3（活泼）

## 音频格式要求
- 格式: MP3（推荐）或 WAV
- 采样率: 44100Hz 或 48000Hz
- 比特率: 128kbps 或更高
- 时长: 2-4秒

## 注意事项
1. 音频文件必须放在 `/public/audio/` 目录下
2. 文件名必须严格匹配（区分大小写）
3. 建议文件大小不超过 500KB
4. 如果使用WAV格式，请确保浏览器支持