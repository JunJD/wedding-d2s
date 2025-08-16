/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * 优化的图片组件
 * 支持懒加载、WebP格式、压缩和加载状态
 */
const OptimizedImage = ({ 
    src, 
    alt, 
    className = '',
    loading = 'lazy',
    width,
    height,
    onClick,
    ...props 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const imgRef = useRef(null);

    // 生成不同质量的图片URL
    const generateImageSrc = (originalSrc) => {
        // 如果是外部URL，直接返回
        if (originalSrc.startsWith('http')) {
            return originalSrc;
        }
        
        // 检查是否有WebP版本
        const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // 支持WebP格式的浏览器优先使用WebP
        if (supportsWebP()) {
            return webpSrc;
        }
        
        return originalSrc;
    };

    // 检查浏览器是否支持WebP
    const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    };

    // Intersection Observer 懒加载
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 设置图片源
    useEffect(() => {
        if (isInView || loading === 'eager') {
            setImageSrc(generateImageSrc(src));
        }
    }, [isInView, src, loading]);

    // 处理图片加载完成
    const handleLoad = () => {
        setIsLoaded(true);
    };

    // 处理图片加载错误，回退到原始格式
    const handleError = () => {
        if (imageSrc.includes('.webp')) {
            setImageSrc(src); // 回退到原始格式
        }
    };

    return (
        <div 
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
            onClick={onClick}
            {...props}
        >
            {/* 加载占位符 */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-400 rounded-full animate-spin"></div>
                </div>
            )}

            {/* 实际图片 */}
            {imageSrc && (
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    style={{
                        filter: isLoaded ? 'none' : 'blur(5px)',
                    }}
                />
            )}

            {/* 加载完成后的渐入效果 */}
            {isLoaded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                />
            )}
        </div>
    );
};

// 高级图片组件，带有多种尺寸选择
export const ResponsiveImage = ({ 
    src, 
    alt, 
    sizes = {
        mobile: 480,
        tablet: 768, 
        desktop: 1200
    },
    className = '',
    ...props 
}) => {
    const [currentSize, setCurrentSize] = useState('desktop');

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCurrentSize('mobile');
            } else if (width < 1200) {
                setCurrentSize('tablet');
            } else {
                setCurrentSize('desktop');
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const currentWidth = sizes[currentSize];
    
    return (
        <OptimizedImage
            src={src}
            alt={alt}
            width={currentWidth}
            className={className}
            {...props}
        />
    );
};

export default OptimizedImage; 