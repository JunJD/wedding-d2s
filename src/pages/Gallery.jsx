import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Camera, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 照片分类配置
    const categories = [
        { id: 'all', name: '全部', icon: Camera },
        { id: 'classic', name: '经典棚拍', icon: Camera },
        { id: 'outdoor', name: '浪漫户外', icon: Heart },
        { id: 'fashion', name: '时尚艺术', icon: Camera },
        { id: 'vintage', name: '复古怀旧', icon: Camera },
        { id: 'traditional', name: '中式传统', icon: Heart },
        { id: 'ceremony', name: '婚礼仪式', icon: Heart },
    ];

    // 分类配置映射
    const categoryConfig = {
        classic: { name: '经典棚拍', title: '经典棚拍' },
        outdoor: { name: '浪漫户外', title: '浪漫户外' },
        fashion: { name: '时尚艺术', title: '时尚艺术' },
        vintage: { name: '复古怀旧', title: '复古怀旧' },
        traditional: { name: '中式传统', title: '中式传统' },
        ceremony: { name: '婚礼仪式', title: '婚礼仪式' },
    };

    // 检测图片是否存在的函数
    const checkImageExists = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    };

    // 动态加载照片数据
    const loadPhotos = async () => {
        setIsLoading(true);
        const allPhotos = [];
        
        for (const [categoryId, config] of Object.entries(categoryConfig)) {
            let imageIndex = 1;
            
            // 检测每个分类文件夹中的照片数量
            while (true) {
                const imagePath = `/photos/${categoryId}/image${imageIndex}.jpg`;
                const exists = await checkImageExists(imagePath);
                
                if (!exists) {
                    // 也尝试其他格式
                    const alternativeFormats = ['png', 'jpeg', 'webp'];
                    let foundAlternative = false;
                    
                    for (const format of alternativeFormats) {
                        const altPath = `/photos/${categoryId}/image${imageIndex}.${format}`;
                        const altExists = await checkImageExists(altPath);
                        if (altExists) {
                            allPhotos.push({
                                id: `${categoryId}-${imageIndex}`,
                                category: categoryId,
                                src: altPath,
                                alt: `${config.name} ${imageIndex}`,
                                title: config.title
                            });
                            foundAlternative = true;
                            break;
                        }
                    }
                    
                    if (!foundAlternative) {
                        break; // 没找到这个索引的图片，跳出循环
                    }
                } else {
                    // 找到jpg格式的图片
                    allPhotos.push({
                        id: `${categoryId}-${imageIndex}`,
                        category: categoryId,
                        src: imagePath,
                        alt: `${config.name} ${imageIndex}`,
                        title: config.title
                    });
                }
                
                imageIndex++;
                
                // 安全限制：最多检测50张图片
                if (imageIndex > 50) break;
            }
        }
        
        setPhotos(allPhotos);
        setIsLoading(false);
    };

    // 组件挂载时加载照片
    useEffect(() => {
        loadPhotos();
    }, []);

    // 过滤照片
    const filteredPhotos = selectedCategory === 'all' 
        ? photos 
        : photos.filter(photo => photo.category === selectedCategory);

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
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                            <p className="text-white font-medium">{image.title}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // 切换到上一张图片
    const handlePrevImage = () => {
        const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedImage?.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
        setSelectedImage(filteredPhotos[prevIndex]);
    };

    // 切换到下一张图片
    const handleNextImage = () => {
        const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedImage?.id);
        const nextIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(filteredPhotos[nextIndex]);
    };

    return (
        <>
            <section id="gallery" className="min-h-screen relative overflow-hidden">
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
                            幸福时光
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-serif text-gray-800"
                        >
                            我们的相册
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
                            <Camera className="w-5 h-5 text-rose-400" />
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-rose-500 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
                                }`}
                            >
                                <category.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{category.name}</span>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Photo Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {filteredPhotos.map((photo, index) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                                onClick={() => setSelectedImage(photo)}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => {
                                        // 图片加载失败时显示占位符
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0Q1RDVES0EiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwQzE0LjQ3NzIgMTAgMTAgMTQuNDc3MiAxMCAyMEMxMCAyNS41MjI4IDE0LjQ3NzIgMzAgMjAgMzBDMjUuNTIyOCAzMCAzMCAyNS41MjI4IDMwIDIwQzMwIDE0LjQ3NzIgMjUuNTIyOCAxMCAyMCAxMFpNMjAgMjZDMTcuNzkwOSAyNiAxNiAyNC4yMDkxIDE2IDIyQzE2IDE5Ljc5MDkgMTcuNzkwOSAxOCAyMCAxOEMyMi4yMDkxIDE4IDI0IDE5Ljc5MDkgMjQgMjJDMjQgMjQuMjA5MSAyMi4yMDkxIDI2IDIwIDI2WiIgZmlsbD0iIzY5NzM4MCIvPgo8L3N2Zz4K';
                                    }}
                                />
                                
                                {/* 悬停遮罩 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                    <div className="p-3 text-white">
                                        <p className="text-sm font-medium">{photo.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* 加载状态 */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-500">正在加载照片...</p>
                        </div>
                    )}

                    {/* 空状态 */}
                    {!isLoading && filteredPhotos.length === 0 && (
                        <div className="text-center py-12">
                            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">暂无照片，请按照README.md说明上传照片</p>
                        </div>
                    )}
                </div>
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