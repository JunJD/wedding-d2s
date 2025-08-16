import { motion } from 'framer-motion';
import { Heart, Calendar, Ring, Church, Sparkles, Clock } from 'lucide-react';
import { featuredPhotos } from '@/config/photos';

export default function LoveStory() {
    // 爱情故事的重要时刻
    const milestones = [
        {
            id: 1,
            date: '2020年3月',
            title: '初次相遇',
            subtitle: '命中注定的邂逅',
            description: '在春暖花开的季节里，我们第一次相遇。那一刻，仿佛整个世界都安静了下来，只剩下彼此眼中的光芒。虽然只是简单的打招呼，但心中已经悄悄种下了爱的种子。',
            icon: Sparkles,
            color: 'from-pink-400 to-rose-400',
            bgColor: 'bg-pink-50',
            image: featuredPhotos.hero.main
        },
        {
            id: 2,
            date: '2020年5月12日',
            title: '正式恋爱',
            subtitle: '爱情的开始',
            description: '经过两个月的相识相知，我们终于确定了彼此的心意。在这个特殊的日子里，我们正式开始了这段美好的恋爱关系。从此，每一天都因为有了你而变得格外精彩。',
            icon: Heart,
            color: 'from-red-400 to-pink-400',
            bgColor: 'bg-red-50',
            image: featuredPhotos.hero.secondary
        },
        {
            id: 3,
            date: '2025年5月12日',
            title: '领取结婚证',
            subtitle: '法律意义上的结合',
            description: '在我们恋爱五周年的纪念日，我们来到民政局，正式成为法律意义上的夫妻。这一刻，我们的爱情得到了法律的认可和保护，也标志着我们即将踏入人生的新阶段。',
            icon: Ring,
            color: 'from-emerald-400 to-teal-400',
            bgColor: 'bg-emerald-50',
            image: featuredPhotos.hero.accent
        },
        {
            id: 4,
            date: '2025年10月4日',
            title: '梦想婚礼',
            subtitle: '与你共度余生',
            description: '在这个秋高气爽的日子里，我们将在亲朋好友的见证下，举办我们梦想中的婚礼。从此以后，我们将携手面对人生的风风雨雨，共同创造属于我们的美好未来。',
            icon: Church,
            color: 'from-purple-400 to-indigo-400',
            bgColor: 'bg-purple-50',
            image: featuredPhotos.gallery.traditional
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="love-story" className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-rose-100/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-10 w-40 h-40 bg-pink-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-20 w-24 h-24 bg-purple-100/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-36 h-36 bg-emerald-100/25 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* 页面标题 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm mb-6"
                    >
                        我们的故事
                    </motion.span>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800 mb-6"
                    >
                        爱情时光轴
                    </motion.h2>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-16 bg-rose-200"></div>
                        <div className="bg-white/80 rounded-full p-3 shadow-sm">
                            <Clock className="w-6 h-6 text-rose-400" />
                        </div>
                        <div className="h-[1px] w-16 bg-rose-200"></div>
                    </motion.div>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        从初遇的怦然心动，到相恋的甜蜜时光，再到今天的携手相伴，
                        每一个重要的时刻都见证着我们爱情的成长与深化。
                    </motion.p>
                </motion.div>

                {/* 时间轴 */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative max-w-6xl mx-auto"
                >
                    {/* 中央时间线 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-200 via-pink-200 to-purple-200 hidden md:block"></div>
                    
                    {milestones.map((milestone, index) => {
                        const isEven = index % 2 === 0;
                        const Icon = milestone.icon;
                        
                        return (
                            <motion.div
                                key={milestone.id}
                                variants={itemVariants}
                                className={`relative flex items-center mb-20 ${
                                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* 内容卡片 */}
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                        className={`${milestone.bgColor} rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/50 relative overflow-hidden`}
                                    >
                                        {/* 装饰背景 */}
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${milestone.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                                        
                                        {/* 日期标签 */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className={`inline-flex items-center gap-2 bg-gradient-to-r ${milestone.color} text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm`}
                                        >
                                            <Calendar className="w-4 h-4" />
                                            {milestone.date}
                                        </motion.div>
                                        
                                        {/* 标题 */}
                                        <motion.h3
                                            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            className="text-2xl font-serif text-gray-800 mb-2"
                                        >
                                            {milestone.title}
                                        </motion.h3>
                                        
                                        {/* 副标题 */}
                                        <motion.p
                                            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            className="text-gray-500 italic text-lg mb-4"
                                        >
                                            {milestone.subtitle}
                                        </motion.p>
                                        
                                        {/* 描述 */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                            className="text-gray-600 leading-relaxed"
                                        >
                                            {milestone.description}
                                        </motion.p>
                                    </motion.div>
                                </div>

                                {/* 中央图标 */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.4,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full shadow-lg flex items-center justify-center`}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                </div>

                                {/* 照片展示 */}
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                                    >
                                        <div className="aspect-[4/3] relative">
                                            <img
                                                src={milestone.image}
                                                alt={milestone.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* 悬停遮罩 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="absolute bottom-6 left-6 right-6">
                                                    <h4 className="text-white font-semibold text-lg mb-1">
                                                        {milestone.title}
                                                    </h4>
                                                    <p className="text-white/80 text-sm">
                                                        {milestone.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* 装饰边框 */}
                                        <div className="absolute inset-3 border border-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 底部总结 */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-3xl mx-auto shadow-xl border border-rose-100/50">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                        >
                            <Heart className="w-8 h-8 text-white" fill="currentColor" />
                        </motion.div>
                        
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-2xl font-serif text-gray-800 mb-4"
                        >
                            爱情的意义
                        </motion.h3>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-gray-600 leading-relaxed mb-6"
                        >
                            五年的时光见证了我们从青涩到成熟，从相知到相爱。
                            每一个重要的日子都深深地印在我们心中，成为我们爱情路上最珍贵的回忆。
                            未来的路还很长，但有你在身边，每一天都充满期待。
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex items-center justify-center gap-3"
                        >
                            <div className="w-12 h-px bg-rose-200"></div>
                            <span className="text-rose-400 text-lg">♥</span>
                            <span className="text-gray-500 text-sm font-medium">永远相爱</span>
                            <span className="text-rose-400 text-lg">♥</span>
                            <div className="w-12 h-px bg-rose-200"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 