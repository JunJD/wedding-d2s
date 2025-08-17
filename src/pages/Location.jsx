/* eslint-disable react/prop-types */
import config from "@/config/config";
import { Navigation as NavigationIcon, MapPin, CalendarCheck, ExternalLink, Eye, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";
import { useState } from 'react';
import { featuredPhotos, galleryPhotos } from '@/config/photos';

export default function Location() {
    const [selectedImage, setSelectedImage] = useState(null);
    
    // 获取酒店相关照片
    const hotelImages = galleryPhotos.filter(photo => photo.category === 'venue');

    // 备用静态地图 (使用OpenStreetMap)
    const osmStaticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${config.data.amap.center[0]-0.01},${config.data.amap.center[1]-0.01},${config.data.amap.center[0]+0.01},${config.data.amap.center[1]+0.01}&layer=mapnik&marker=${config.data.amap.center[1]},${config.data.amap.center[0]}`;

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
            <section id="location" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">
                {/* 照片背景装饰 */}
                <div className="absolute inset-0 z-0">
                    {/* 左侧酒店照片 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="absolute left-0 top-1/4 w-1/3 h-1/2 opacity-15"
                    >
                        <img 
                            src={featuredPhotos.location.venue}
                            alt="仪式现场"
                            className="w-full h-full object-cover rounded-r-3xl"
                        />
                    </motion.div>

                    {/* 右侧酒店照片 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="absolute right-0 bottom-1/4 w-1/3 h-1/2 opacity-15"
                    >
                        <img 
                            src={featuredPhotos.location.hotel}
                            alt="宴会厅"
                            className="w-full h-full object-cover rounded-l-3xl"
                        />
                    </motion.div>

                    {/* 装饰性小照片 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50, rotate: -5 }}
                        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute left-12 bottom-16 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white/90"
                    >
                        <img 
                            src={featuredPhotos.gallery.featured}
                            alt="特色照片"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 装饰性光晕 */}
                    <div className="absolute top-20 left-1/4 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-pink-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
                </div>

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
                            className="inline-block text-rose-500 font-medium bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm"
                        >
                            婚礼地点
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-800 drop-shadow-sm"
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
                            <div className="bg-white/80 rounded-full p-2 shadow-sm">
                            <MapPin className="w-5 h-5 text-rose-400" />
                            </div>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Location Content */}
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Embedded Map Display */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-8 mb-12"
                        >
                            {/* Venue Information */}
                            <div className="space-y-6">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                    <h3 className="text-2xl font-serif text-gray-800 mb-4">
                                        {config.data.location}
                                    </h3>
                                    
                                    <div className="space-y-3 text-gray-600">
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-rose-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">{config.data.location}</p>
                                                <p className="text-sm">{config.data.address}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <CalendarCheck className="w-5 h-5 text-rose-400 flex-shrink-0" />
                                            <span className="text-sm">
                                                {formatEventDate(config.data.date, "full")} · {config.data.time}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                                        <a 
                                                        href={config.data.amap.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                                        >
                                            <NavigationIcon className="w-4 h-4" />
                                            高德地图
                                        </a>
                                        
                                        <a 
                                                        href={config.data.baidu.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                                        >
                                            <NavigationIcon className="w-4 h-4" />
                                            百度地图
                                        </a>
                                        
                                        <a 
                                            href={config.data.apple_maps_url}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            苹果地图
                                        </a>
                                    </div>
                                </div>

                                {/* Hotel Images */}
                                {hotelImages.length > 0 && (
                                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                        <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                                            <Camera className="w-5 h-5 text-rose-400" />
                                            场地照片
                                        </h4>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                                    {hotelImages.map((image, index) => (
                                                        <motion.div
                                                            key={image.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                                                            onClick={() => setSelectedImage(image)}
                                                        >
                                                            <img
                                                                src={image.src}
                                                                alt={image.alt}
                                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <Eye className="w-6 h-6 text-white" />
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                            </div>

                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                            >
                                <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-rose-400" />
                                    地图位置
                                </h4>
                                
                                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200">
                                    <iframe
                                        src={osmStaticMapUrl}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        className="w-full h-full"
                                        title="婚礼场地位置"
                                    ></iframe>
                                </div>
                                
                                <p className="text-sm text-gray-500 mt-3 text-center">
                                    点击上方导航按钮获取详细路线
                                </p>
                            </motion.div>
                                </motion.div>
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onPrev={handlePrevImage}
                    onNext={handleNextImage}
                />
            )}
        </>
    );
}