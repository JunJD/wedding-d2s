import config from "@/config/config";
import { Clock, Navigation as NavigationIcon, MapPin, CalendarCheck, ExternalLink, Eye, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";
import { useState, useEffect } from 'react';

export default function Location() {
    const [hotelImages, setHotelImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoadingHotel, setIsLoadingHotel] = useState(true);

    // 备用静态地图 (使用OpenStreetMap)
    const osmStaticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${config.data.amap.center[0]-0.01},${config.data.amap.center[1]-0.01},${config.data.amap.center[0]+0.01},${config.data.amap.center[1]+0.01}&layer=mapnik&marker=${config.data.amap.center[1]},${config.data.amap.center[0]}`;

    // 检测图片是否存在
    const checkImageExists = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    };

    // 动态加载酒店图片
    const loadHotelImages = async () => {
        setIsLoadingHotel(true);
        const images = [];
        let imageIndex = 1;

        // 检测酒店图片
        while (true) {
            const imagePath = `/photos/hotel/image${imageIndex}.jpg`;
            const exists = await checkImageExists(imagePath);

            if (!exists) {
                // 尝试其他格式
                const alternativeFormats = ['png', 'jpeg', 'webp'];
                let foundAlternative = false;

                for (const format of alternativeFormats) {
                    const altPath = `/photos/hotel/image${imageIndex}.${format}`;
                    const altExists = await checkImageExists(altPath);
                    if (altExists) {
                        images.push({
                            id: `hotel-${imageIndex}`,
                            src: altPath,
                            alt: `酒店环境 ${imageIndex}`,
                            title: '酒店环境'
                        });
                        foundAlternative = true;
                        break;
                    }
                }

                if (!foundAlternative) {
                    break;
                }
            } else {
                images.push({
                    id: `hotel-${imageIndex}`,
                    src: imagePath,
                    alt: `酒店环境 ${imageIndex}`,
                    title: '酒店环境'
                });
            }

            imageIndex++;
            if (imageIndex > 20) break; // 安全限制
        }

        setHotelImages(images);
        setIsLoadingHotel(false);
    };

    // 组件挂载时加载酒店图片
    useEffect(() => {
        loadHotelImages();
    }, []);

    // 图片预览模态框
    const ImageModal = ({ image, onClose, onPrev, onNext }) => {
        if (!image) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {hotelImages.length > 1 && (
                        <>
                            <button
                                onClick={onPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={onNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </>
                    )}

                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={image.src}
                        alt={image.alt}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                            <p className="text-white font-medium">{image.title}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // 切换图片
    const handlePrevImage = () => {
        const currentIndex = hotelImages.findIndex(img => img.id === selectedImage?.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : hotelImages.length - 1;
        setSelectedImage(hotelImages[prevIndex]);
    };

    const handleNextImage = () => {
        const currentIndex = hotelImages.findIndex(img => img.id === selectedImage?.id);
        const nextIndex = currentIndex < hotelImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(hotelImages[nextIndex]);
    };

    return (
        <>
            {/* Location section */}
            <section id="location" className="min-h-screen relative overflow-hidden">
                <div className="container mx-auto px-4 py-20 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4 mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-block text-rose-500 font-medium"
                        >
                            婚礼地点
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-800"
                        >
                            婚礼地点
                        </motion.h2>

                        {/* Decorative Divider */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 pt-4"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <MapPin className="w-5 h-5 text-rose-400" />
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Location Content */}
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Embedded Map Display */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white"
                        >
                            <div className="relative w-full h-full">
                                {/* OpenStreetMap iframe */}
                                <iframe
                                    src={osmStaticMapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="婚礼地点地图"
                                    className="w-full h-full"
                                />
                                
                                {/* Map overlay with location info */}
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-rose-500" />
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">{config.data.location}</p>
                                            <p className="text-gray-600 text-xs">{config.data.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* View in different maps button */}
                                <div className="absolute bottom-4 right-4">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-200"
                                    >
                                        <p className="text-xs text-gray-500 mb-2 text-center">选择地图App:</p>
                                        <div className="flex gap-1">
                                            {/* 高德地图 */}
                                            <motion.a
                                                href={config.data.amap.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                                                title="高德地图"
                                            >
                                                <MapPin className="w-3 h-3" />
                                                <span>高德</span>
                                            </motion.a>
                                            
                                            {/* 百度地图 */}
                                            <motion.a
                                                href={config.data.baidu.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                                title="百度地图"
                                            >
                                                <MapPin className="w-3 h-3" />
                                                <span>百度</span>
                                            </motion.a>
                                            
                                            {/* Apple Maps */}
                                            <motion.a
                                                href={config.data.apple_maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-1 bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                                                title="Apple地图"
                                            >
                                                <MapPin className="w-3 h-3" />
                                                <span>Apple</span>
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Venue Details */}
                        <div className="space-y-8">
                            {/* Main Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="w-full"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">婚礼详情</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-4">
                                            <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                                            <div>
                                                <p className="text-gray-800 font-medium">{config.data.location}</p>
                                                <p className="text-gray-600">{config.data.address}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <CalendarCheck className="w-5 h-5 text-rose-500" />
                                            <p className="text-gray-600">{formatEventDate(config.data.date)}</p>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <Clock className="w-5 h-5 text-rose-500" />
                                            <p className="text-gray-600">{config.data.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Navigation & Tips */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="w-full"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">导航指南</h3>
                                    
                                    <div className="space-y-4">
                                        {/* Navigation Helper */}
                                        <div className="flex items-start space-x-4">
                                            <NavigationIcon className="w-5 h-5 text-rose-500 mt-1" />
                                            <div>
                                                <p className="text-gray-800 font-medium mb-2">导航提示</p>
                                                <p className="text-gray-600 text-sm">
                                                    位于池州市贵池区清风路86号，市委对面。<br />
                                                    建议使用高德地图或百度地图导航，输入&ldquo;葡萄园大酒店&rdquo;即可找到。
                                                </p>
                                            </div>
                                        </div>

                                        {/* Map Services */}
                                        <div className="flex items-start space-x-4">
                                            <Eye className="w-5 h-5 text-rose-500 mt-1" />
                                            <div>
                                                <p className="text-gray-800 font-medium mb-2">地图服务</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <motion.a
                                                        href={config.data.amap.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition-colors"
                                                    >
                                                        <MapPin className="w-3 h-3" />
                                                        <span>高德地图导航</span>
                                                        <ExternalLink className="w-2 h-2" />
                                                    </motion.a>
                                                    
                                                    <motion.a
                                                        href={config.data.baidu.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
                                                    >
                                                        <MapPin className="w-3 h-3" />
                                                        <span>百度地图导航</span>
                                                        <ExternalLink className="w-2 h-2" />
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Hotel Environment */}
                            {(hotelImages.length > 0 || isLoadingHotel) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    viewport={{ once: true }}
                                    className="w-full"
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                        <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">酒店环境</h3>
                                        
                                        {/* Loading State */}
                                        {isLoadingHotel && (
                                            <div className="text-center py-8">
                                                <div className="animate-spin w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full mx-auto mb-3"></div>
                                                <p className="text-gray-500 text-sm">正在加载酒店图片...</p>
                                            </div>
                                        )}

                                        {/* Hotel Images Grid */}
                                        {!isLoadingHotel && hotelImages.length > 0 && (
                                            <div className="space-y-4">
                                                <div className="flex items-start space-x-4 mb-4">
                                                    <Camera className="w-5 h-5 text-rose-500 mt-1" />
                                                    <div>
                                                        <p className="text-gray-800 font-medium mb-2">环境展示</p>
                                                        <p className="text-gray-600 text-sm">
                                                            {config.data.location}为您提供优雅舒适的婚礼环境，点击查看详情。
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                    {hotelImages.map((image, index) => (
                                                        <motion.div
                                                            key={image.id}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                                            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-100"
                                                            onClick={() => setSelectedImage(image)}
                                                        >
                                                            <img
                                                                src={image.src}
                                                                alt={image.alt}
                                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                                onError={(e) => {
                                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0Q1RDVES0EiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwQzE0LjQ3NzIgMTAgMTAgMTQuNDc3MiAxMCAyMEMxMCAyNS41MjI4IDE0LjQ3NzIgMzAgMjAgMzBDMjUuNTIyOCAzMCAzMCAyNS41MjI4IDMwIDIwQzMwIDE0LjQ3NzIgMjUuNTIyOCAxMCAyMCAxMFpNMjAgMjZDMTcuNzkwOSAyNiAxNiAyNC4yMDkxIDE2IDIyQzE2IDE5Ljc5MDkgMTcuNzkwOSAxOCAyMCAxOEMyMi4yMDkxIDE4IDI0IDE5Ljc5MDkgMjQgMjJDMjQgMjQuMjA5MSAyMi4yMDkxIDI2IDIwIDI2WiIgZmlsbD0iIzY5NzM4MCIvPgo8L3N2Zz4K';
                                                                }}
                                                            />
                                                            
                                                            {/* Hover Overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                                <div className="p-2 text-white">
                                                                    <p className="text-xs font-medium">查看大图</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Empty State */}
                                        {!isLoadingHotel && hotelImages.length === 0 && (
                                            <div className="text-center py-8">
                                                <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 text-sm">
                                                    暂无酒店图片，请在 public/photos/hotel/ 文件夹中添加图片
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Hotel Image Modal */}
            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onPrev={handlePrevImage}
                    onNext={handleNextImage}
                />
            )}
        </>
    )
}