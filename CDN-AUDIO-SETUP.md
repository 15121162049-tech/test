# 🎵 GitHub 音频文件上传指南

## ✅ 您的仓库信息

- **GitHub 用户名**：`15121162049-tech`
- **仓库名**：`test`
- **音频文件夹路径**：`audio`
- **分支**：`main`（或 `master`）

## 📋 CDN 链接已配置

代码中已经配置好以下 CDN 链接：

```typescript
'男生': 'https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-male.mp3'
'女生': 'https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-female.mp3'
'精灵': 'https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-fairy.mp3'
```

## 🚀 上传步骤（2种方式任选）

### 📝 **方式一：通过 GitHub 网页界面上传**（最简单）

#### 步骤：

1. **访问您的仓库**
   - 打开浏览器，访问：https://github.com/15121162049-tech/test

2. **检查是否有 `audio` 文件夹**
   - 如果已有 `audio` 文件夹，点击进入
   - 如果没有，继续下一步会自动创建

3. **上传文件**
   - 点击页面右上角的 **"Add file"** 按钮
   - 选择 **"Upload files"**
   - 将三个 MP3 文件拖入上传区域：
     * `voice-male.mp3`
     * `voice-female.mp3`
     * `voice-fairy.mp3`
   - 或点击 "choose your files" 手动选择文件

4. **提交更改**
   - 滚动到页面底部
   - 在 "Commit changes" 区域输入提交信息（例如：`添加语音文件`）
   - 点击绿色的 **"Commit changes"** 按钮

5. **等待 CDN 生效**
   - 上传成功后，等待 5-10 分钟让 jsDelivr CDN 同步
   - 访问以下链接验证（能播放或下载即成功）：
     * https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-male.mp3

---

### 💻 **方式二：通过 Git 命令行上传**（适合开发者）

#### 前提条件：
- 已安装 Git
- 已配置 GitHub SSH 密钥或 HTTPS 认证

#### 步骤：

```bash
# 1. 克隆仓库到本地
git clone https://github.com/15121162049-tech/test.git
cd test

# 2. 创建 audio 文件夹（如果不存在）
mkdir -p audio

# 3. 将三个 MP3 文件复制到 audio 目录
# （假设音频文件在您的下载文件夹）
cp ~/Downloads/voice-male.mp3 audio/
cp ~/Downloads/voice-female.mp3 audio/
cp ~/Downloads/voice-fairy.mp3 audio/

# 4. 提交更改
git add audio/
git commit -m "添加语音音频文件"

# 5. 推送到 GitHub
git push origin main
# 如果您的默认分支是 master，使用：git push origin master
```

---

## 🎤 如何生成音频文件

如果您还没有音频文件，可以使用以下方法生成：

### **方法一：使用 Microsoft Edge TTS**（推荐，免费）

#### 安装（需要 Python）：

```bash
pip install edge-tts
```

#### 生成音频文件：

```bash
# 男生音色（云希 - 成熟稳重）
edge-tts --voice zh-CN-YunxiNeural --text "你好，我是智能语音助手，很高兴为您服务" --write-media voice-male.mp3

# 女生音色（晓晓 - 温柔甜美）
edge-tts --voice zh-CN-XiaoxiaoNeural --text "你好，我是智能语音助手，很高兴为您服务" --write-media voice-female.mp3

# 精灵音色（晓伊 - 活泼灵动）
edge-tts --voice zh-CN-XiaoyiNeural --text "你好，我是智能语音助手，很高兴为您服务" --write-media voice-fairy.mp3
```

#### 可用的中文音色：

| 音色代码 | 音色名称 | 特点 | 推荐用途 |
|---------|---------|------|---------|
| `zh-CN-YunxiNeural` | 云希（男） | 成熟稳重 | 男生 |
| `zh-CN-YunjianNeural` | 云健（男） | 阳光活力 | 男生 |
| `zh-CN-XiaoxiaoNeural` | 晓晓（女） | 温柔甜美 | 女生 |
| `zh-CN-XiaoyiNeural` | 晓伊（女） | 活泼灵动 | 精灵 |
| `zh-CN-YunxiaNeural` | 云霞（女） | 清新自然 | 女生 |

---

### **方法二：使用在线 TTS 工具**

#### 推荐网站：

1. **TTSFree.com**（免费，无需注册）
   - 网址：https://ttsfree.com/
   - 步骤：
     1. 选择语言：**中文（简体）**
     2. 选择音色（例如：晓晓、云希）
     3. 输入文本："你好，我是智能语音助手，很高兴为您服务"
     4. 点击 **"Convert to Speech"**
     5. 下载 MP3 文件
     6. 重命名为 `voice-male.mp3`、`voice-female.mp3`、`voice-fairy.mp3`

2. **Microsoft Azure TTS Demo**
   - 网址：https://azure.microsoft.com/zh-cn/services/cognitive-services/text-to-speech/
   - 免费试用，音质最佳

3. **讯飞开放平台**
   - 网址：https://www.xfyun.cn/services/online_tts
   - 中文音色丰富

---

## 🔧 代码修改示例

### 找到代码位置

打开 `/src/app/components/AdaptiveHeightCard.tsx`，找到大约第 82 行：

```typescript
const audioUrls: { [key: string]: string } = {
  '男生': 'https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/audio/voice-male.mp3',
  '女生': 'https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/audio/voice-female.mp3',
  '精灵': 'https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/audio/voice-fairy.mp3',
};
```

### 替换为您的实际 URL

使用 GitHub + jsDelivr：

```typescript
const audioUrls: { [key: string]: string } = {
  '男生': 'https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-male.mp3',
  '女生': 'https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-female.mp3',
  '精灵': 'https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-fairy.mp3',
};
```

---

## ✅ 验证音频链接

在浏览器中直接访问 CDN URL，确保可以播放或下载音频文件：

```
https://cdn.jsdelivr.net/gh/15121162049-tech/test@main/audio/voice-male.mp3
```

如果浏览器能播放或下载，说明链接配置正确！

---

## 🛡️ 备用方案

如果 CDN 音频加载失败，系统会自动使用 **Web Audio API** 生成提示音：
- 🎵 **男生**：C4 → G4（低沉双音符）
- 🎵 **女生**：E4 → G4 → C5（明亮三音符）
- 🎵 **精灵**：C5 → E5 → G5 → C6（灵动四音符）

所以即使不配置 CDN，也能正常使用音效功能！

---

## 📞 常见问题

### Q1: GitHub 文件更新后，CDN 没有更新怎么办？

A: jsDelivr CDN 有缓存，可以：
1. 等待 24 小时自动更新
2. 使用版本号强制更新：`@v1.0.0` 而不是 `@main`
3. 访问清除缓存：`https://purge.jsdelivr.net/gh/user/repo@main/file.mp3`

### Q2: 音频文件大小有限制吗？

A: 
- GitHub：单文件建议 < 100MB
- jsDelivr：单文件建议 < 50MB
- 我们的音频文件通常 < 100KB，完全没问题

### Q3: 能用百度网盘或 OneDrive 的分享链接吗？

A: 不建议。这些服务的分享链接通常：
- 需要跳转到网页
- 有防盗链限制
- 不支持直接播放

请使用专门的 CDN 或对象存储服务。

---

## 🎉 推荐方案总结

| 方案 | 难度 | 费用 | 稳定性 | 推荐度 |
|------|------|------|--------|--------|
| GitHub + jsDelivr | ⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 阿里云 OSS | ⭐⭐⭐ | 低成本 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Cloudflare R2 | ⭐⭐⭐ | 免费额度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Catbox.moe | ⭐ | 免费 | ⭐⭐⭐ | ⭐⭐⭐ |

**最推荐：GitHub + jsDelivr**（免费、简单、稳定）

---

需要帮助？请参考 GitHub 仓库示例：
https://github.com/example-user/example-repo/tree/main/audio