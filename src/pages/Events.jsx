import EventCards from '@/components/EventsCard'
import config from '@/config/config'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { featuredPhotos } from '@/config/photos'

export default function Events() {
    return (
        <>
            {/* Event Section */}
            <section id="event" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">
                {/* 照片背景装饰 */}
                <div className="absolute inset-0 z-0">
                    {/* 左侧仪式照片 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -100, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="absolute left-0 top-1/4 w-1/3 h-1/2 opacity-10"
                    >
                        <img 
                            src={featuredPhotos.events.ceremony}
                            alt="婚礼仪式照片"
                            className="w-full h-full object-cover rounded-r-3xl"
                        />
                    </motion.div>

                    {/* 右侧酒店接待照片 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="absolute right-0 bottom-1/4 w-1/3 h-1/2 opacity-10"
                    >
                        <img 
                            src={featuredPhotos.events.reception}
                            alt="接待场地照片"
                            className="w-full h-full object-cover rounded-l-3xl"
                        />
                    </motion.div>

                    {/* 装饰性小照片 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50, rotate: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="absolute left-8 bottom-20 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white/90"
                    >
                        <img 
                            src={featuredPhotos.gallery.traditional}
                            alt="传统风格照片"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: -50, rotate: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute right-12 top-32 w-28 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white/90"
                    >
                        <img 
                            src={featuredPhotos.gallery.lifestyle}
                            alt="生活风格照片"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 装饰性光晕 */}
                    <div className="absolute top-20 left-1/4 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-pink-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 container mx-auto px-4 py-20"
                >
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block text-rose-500 font-medium mb-2 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm"
                        >
                            Catat Tanggal Penting Ini
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight drop-shadow-sm"
                        >
                            Rangkaian Acara Pernikahan
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 max-w-md mx-auto bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-sm"
                        >
                            Kami Mengundang Anda untuk Merayakan Hari Istimewa Sebagai Awal Perjalanan Cinta Kami
                        </motion.p>

                        {/* Decorative Line */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-4 mt-6"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <div className="text-rose-400 bg-white/80 rounded-full p-2 shadow-sm">
                                <Heart className="w-4 h-4" fill="currentColor" />
                            </div>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div>
                    </motion.div>

                    {/* Events Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-2xl mx-auto"
                    >
                        <EventCards events={config.data.agenda} />
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}