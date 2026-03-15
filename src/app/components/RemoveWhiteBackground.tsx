import { useEffect, useRef, useState } from 'react';

interface RemoveWhiteBackgroundProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}

export default function RemoveWhiteBackground({ 
  src, 
  alt, 
  className, 
  style,
  threshold = 240 
}: RemoveWhiteBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImage, setProcessedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // 设置canvas尺寸
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 绘制原始图片
      ctx.drawImage(img, 0, 0);
      
      // 获取图片数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 遍历所有像素，将白色背景变透明
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        
        // 如果RGB值都接近白色(大于阈值)，则设置为透明
        if (red > threshold && green > threshold && blue > threshold) {
          data[i + 3] = 0; // 设置alpha为0(透明)
        }
      }
      
      // 将处理后的数据放回canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 转换为图片URL
      const processedUrl = canvas.toDataURL('image/png');
      setProcessedImage(processedUrl);
      setIsLoading(false);
    };
    
    img.src = src;
  }, [src, threshold]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/* 占位图：加载时显示原图 */}
      {isLoading && (
        <img 
          src={src} 
          alt={alt} 
          className={className}
          style={{
            ...style,
            opacity: 0.3
          }}
        />
      )}
      {/* 处理后的图片 */}
      {processedImage && !isLoading && (
        <img 
          src={processedImage} 
          alt={alt} 
          className={className}
          style={style}
        />
      )}
    </>
  );
}