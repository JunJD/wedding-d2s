/* eslint-disable react/prop-types */
import { Calendar, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';
import { featuredPhotos } from '@/config/photos';

export default function Hero() {
    const [guestName, setGuestName] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(decodedName);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    const CountdownTimer = ({ targetDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
        function calculateTimeLeft() {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    menit: Math.floor((difference / 1000 / 60) % 60),
                    detik: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        }
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate]);

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {Object.keys(timeLeft).map((interval) => (
                    <motion.div
                        key={interval}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-rose-600">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{interval}</span>
                    </motion.div>
                ))}
            </div>
        );
    };

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-rose-400' :
                                i % 3 === 1 ? 'text-pink-400' :
                                    'text-red-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <>
            <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center relative overflow-hidden">
                {/* 精选照片背景 - 参考优秀网站设计 */}
                <div className="absolute inset-0 z-0">
                    {/* 主背景照片 - 右侧大图 */}
                    <div className="absolute right-0 top-0 w-1/2 h-full">
                        <motion.div 
                            initial={{ opacity: 0, scale: 1.1, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.5 }}
                            className="relative w-full h-full"
                        >
                            <img 
                                src={featuredPhotos.hero.main}
                                alt="主要婚纱照"
                                className="w-full h-full object-cover"
                            />
                            {/* 优雅的渐变遮罩 */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white/95"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40"></div>
                        </motion.div>
                    </div>

                    {/* 左侧装饰照片 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50, rotate: -5 }}
                        animate={{ opacity: 1, y: 0, rotate: -3 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="absolute left-8 bottom-20 w-28 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 z-10"
                    >
                        <img 
                            src={featuredPhotos.hero.accent}
                            alt="复古风格照片"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 右下角小照片 */}
                    <motion.div 
                        initial={{ opacity: 0, y: -50, rotate: 5 }}
                        animate={{ opacity: 1, y: 0, rotate: 3 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute right-8 bottom-32 w-24 h-30 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 z-10"
                    >
                        <img 
                            src={featuredPhotos.hero.secondary}
                            alt="户外浪漫照片"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 左上角小照片 */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30, y: -30 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute left-12 top-32 w-20 h-26 rounded-xl overflow-hidden shadow-xl border-3 border-white/80 opacity-80"
                    >
                        <img 
                            src={featuredPhotos.gallery.traditional}
                            alt="传统风格照片"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 整体背景渐变和光效 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/70"></div>
                    
                    {/* 装饰性光晕 */}
                    <div className="absolute top-20 left-20 w-40 h-40 bg-rose-100/40 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-52 h-52 bg-pink-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mx-auto"
                    >
                        <span className="px-4 py-1 text-sm bg-white/90 backdrop-blur-sm text-rose-600 rounded-full border border-rose-200 shadow-lg">
                            Catat Tanggal Penting Ini
                        </span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-700 font-light italic text-base sm:text-lg drop-shadow-sm"
                        >
                            InsyaAllah Kami Akan Menikah
                        </motion.p>
                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-3xl sm:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600 drop-shadow-lg"
                        >
                            {config.data.groomName} & {config.data.brideName}
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="relative max-w-md mx-auto"
                    >
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl"></div>

                        <div className="relative px-4 sm:px-8 py-8 sm:py-10 rounded-2xl border border-rose-100/50">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                            </div>

                            <div className="space-y-6 text-center">
                                <div className="space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Calendar className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            {formatEventDate(config.data.date, "full")}
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="flex items-center justify-center space-x-2"
                                    >
                                        <Clock className="w-4 h-4 text-rose-400" />
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                                            {config.data.time}
                                        </span>
                                    </motion.div>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-px w-8 sm:w-12 bg-rose-200/50" />
                                    <div className="w-2 h-2 rounded-full bg-rose-300" />
                                    <div className="h-px w-8 sm:w-12 bg-rose-200/50" />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="space-y-2"
                                >
                                    <p className="text-gray-500 font-serif italic text-sm">
                                        Kepada Yth.
                                    </p>
                                    <p className="text-gray-600 font-medium text-sm">
                                        Bapak/Ibu/Saudara/i
                                    </p>
                                    <p className="text-rose-500 font-semibold text-lg">
                                        {guestName ? guestName : "Tamu"}
                                    </p>
                                </motion.div>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                            </div>
                        </div>

                        <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 bg-rose-100/30 rounded-full blur-xl" />
                        <div className="absolute -bottom-2 -left-2 w-16 sm:w-24 h-16 sm:h-24 bg-pink-100/30 rounded-full blur-xl" />
                    </motion.div>

                    <CountdownTimer targetDate={config.data.date} />

                    <div className="pt-6 relative">
                        <FloatingHearts />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto" fill="currentColor" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    )
}
