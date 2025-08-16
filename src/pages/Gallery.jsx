/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { galleryPhotos, galleryLayouts } from '@/config/photos';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

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
                    {/* 关闭按钮 */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* 上一张按钮 */}
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* 下一张按钮 */}
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* 图片 */}
                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={image.src}
                        alt={image.alt}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* 图片信息 */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                            <p className="text-white/80 text-sm">{image.description}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // 切换到上一张图片
    const handlePrevImage = () => {
        const currentIndex = galleryPhotos.findIndex(photo => photo.id === selectedImage?.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryPhotos.length - 1;
        setSelectedImage(galleryPhotos[prevIndex]);
    };

    // 切换到下一张图片
    const handleNextImage = () => {
        const currentIndex = galleryPhotos.findIndex(photo => photo.id === selectedImage?.id);
        const nextIndex = currentIndex < galleryPhotos.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(galleryPhotos[nextIndex]);
    };

    // 根据类别获取照片组
    const getPhotosByCategory = (category) => {
        return galleryPhotos.filter(photo => photo.category === category);
    };

    return (
        <>
            <section id="gallery" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">
                <div className="container mx-auto px-4 py-20 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4 mb-20"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-block text-rose-500 font-medium bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm"
                        >
                            幸福回忆
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-800 drop-shadow-sm"
                        >
                            我们的爱情故事
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
                                <Heart className="w-5 h-5 text-rose-400" />
                            </div>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        >
                            从相遇到相爱，从拍摄到婚礼，每一个瞬间都是我们爱情故事的珍贵篇章。
                            让这些照片带你走进我们的美好回忆。
                        </motion.p>
                    </motion.div>

                    {/* 分组展示照片 */}
                    <div className="space-y-24">
                        {galleryLayouts.groups.map((group, groupIndex) => {
                            const categoryPhotos = getPhotosByCategory(group.category);
                            if (categoryPhotos.length === 0) return null;

                            return (
                                <motion.div
                                    key={group.category}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
                                    viewport={{ once: true }}
                                    className="space-y-8"
                                >
                                    {/* 分组标题 */}
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl md:text-3xl font-serif text-gray-800">
                                            {group.title}
                                        </h3>
                                        <p className="text-gray-500 italic">{group.subtitle}</p>
                                        <div className="w-16 h-px bg-rose-200 mx-auto"></div>
                                    </div>

                                    {/* 照片网格 - 根据组别设计不同布局 */}
                                    {group.category === 'classic' && (
                                        // 经典组：一大一小
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                            <div className="lg:col-span-2">
                                                <PhotoCard 
                                                    photo={categoryPhotos[0]} 
                                                    index={0}
                                                    onClick={() => setSelectedImage(categoryPhotos[0])}
                                                    size="hero"
                                                />
                                            </div>
                                            <div className="space-y-6">
                                                <PhotoCard 
                                                    photo={categoryPhotos[1]} 
                                                    index={1}
                                                    onClick={() => setSelectedImage(categoryPhotos[1])}
                                                    size="medium"
                                                />
                                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                                    <h4 className="font-semibold text-gray-800 mb-2">拍摄花絮</h4>
                                                    <p className="text-gray-600 text-sm">
                                                        专业摄影团队精心打造，捕捉最真实的情感瞬间
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {group.category === 'outdoor' && (
                                        // 户外组：并排展示
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                            {categoryPhotos.map((photo, index) => (
                                                <PhotoCard 
                                                    key={photo.id}
                                                    photo={photo} 
                                                    index={index}
                                                    onClick={() => setSelectedImage(photo)}
                                                    size="large"
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {group.category === 'ceremony' && (
                                        // 仪式组：重点突出
                                        <div className="max-w-4xl mx-auto space-y-6">
                                            <PhotoCard 
                                                photo={categoryPhotos[0]} 
                                                index={0}
                                                onClick={() => setSelectedImage(categoryPhotos[0])}
                                                size="featured"
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <PhotoCard 
                                                    photo={categoryPhotos[1]} 
                                                    index={1}
                                                    onClick={() => setSelectedImage(categoryPhotos[1])}
                                                    size="medium"
                                                />
                                                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <Camera className="w-8 h-8 text-rose-400 mx-auto mb-3" />
                                                        <h4 className="font-semibold text-gray-800 mb-2">神圣时刻</h4>
                                                        <p className="text-gray-600 text-sm">
                                                            见证爱情最美好的承诺
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(group.category === 'fashion' || group.category === 'traditional' || group.category === 'vintage') && (
                                        // 其他组：标准网格
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                            {categoryPhotos.map((photo, index) => (
                                                <PhotoCard 
                                                    key={photo.id}
                                                    photo={photo} 
                                                    index={index}
                                                    onClick={() => setSelectedImage(photo)}
                                                    size="standard"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 底部总结 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mt-24 space-y-6"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto shadow-xl">
                            <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4" fill="currentColor" />
                            <h3 className="text-xl font-serif text-gray-800 mb-4">
                                爱情的每一个瞬间都值得珍藏
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                从青涩的初遇到今天的携手，我们用镜头记录下了爱情最美好的样子。
                                感谢每一个见证我们幸福的人，愿这份美好永远延续。
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <div className="w-8 h-px bg-rose-200"></div>
                                <span className="text-rose-400 text-sm">♥</span>
                                <div className="w-8 h-px bg-rose-200"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 装饰性背景元素 */}
                <div className="absolute top-20 right-10 w-32 h-32 bg-rose-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-40 h-40 bg-pink-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
            </section>

            {/* 图片预览模态框 */}
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

// 照片卡片组件
const PhotoCard = ({ photo, index, onClick, size = 'standard' }) => {
    const sizeClasses = {
        hero: 'aspect-[4/3]',
        featured: 'aspect-[16/9]', 
        large: 'aspect-[4/5]',
        medium: 'aspect-square',
        standard: 'aspect-[4/5]'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative ${sizeClasses[size]} overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500`}
            onClick={onClick}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* 悬停遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="text-white"
                    >
                        <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed">{photo.description}</p>
                        <div className="w-12 h-px bg-white/50 mt-3"></div>
                    </motion.div>
                </div>
            </div>

            {/* 装饰性边框 */}
            <div className="absolute inset-2 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            {/* 照片序号 */}
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">{index + 1}</span>
            </div>
        </motion.div>
    );
}; 