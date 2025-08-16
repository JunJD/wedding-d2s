#!/usr/bin/env node

/**
 * 婚礼照片压缩脚本
 * 保持高质量的同时大幅减少文件大小
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检查是否是替换模式
const isReplaceMode = process.argv.includes('--replace');

// 配置
const config = {
    inputDir: path.join(__dirname, '../public/photos'),
    outputDir: isReplaceMode 
        ? path.join(__dirname, '../public/photos') 
        : path.join(__dirname, '../public/photos-compressed'),
    quality: 85,        // JPEG质量
    maxWidth: 1920,     // 最大宽度
    maxHeight: 1080,    // 最大高度
    generateWebP: true  // 生成WebP版本
};

// 格式化文件大小
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 获取文件大小
async function getFileSize(filePath) {
    try {
        const stats = await fs.stat(filePath);
        return stats.size;
    } catch {
        return 0;
    }
}

// 压缩单个图片
async function compressImage(inputPath, outputPath) {
    const originalSize = await getFileSize(inputPath);
    const fileName = path.basename(inputPath);
    
    try {
        // 如果是替换模式，先创建临时文件
        const tempPath = isReplaceMode ? outputPath + '.tmp' : outputPath;
        
        // 压缩图片
        await sharp(inputPath)
            .resize(config.maxWidth, config.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ 
                quality: config.quality,
                progressive: true
            })
            .toFile(tempPath);
        
        // 如果是替换模式，替换原文件
        if (isReplaceMode) {
            await fs.rename(tempPath, outputPath);
        }
        
        const compressedSize = await getFileSize(outputPath);
        const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ ${fileName}`);
        console.log(`   ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (节省 ${savings}%)`);
        
        // 生成WebP版本
        if (config.generateWebP) {
            const webpPath = outputPath.replace(/\.(jpg|jpeg)$/i, '.webp');
            await sharp(inputPath)
                .resize(config.maxWidth, config.maxHeight, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: config.quality + 5 })
                .toFile(webpPath);
            
            const webpSize = await getFileSize(webpPath);
            console.log(`   WebP: ${formatBytes(webpSize)}`);
        }
        
        return { originalSize, compressedSize };
    } catch (error) {
        console.error(`❌ ${fileName}: ${error.message}`);
        return { originalSize, compressedSize: originalSize };
    }
}

// 处理目录
async function processDirectory(inputDir, outputDir) {
    // 确保输出目录存在
    if (!isReplaceMode) {
        await fs.mkdir(outputDir, { recursive: true });
    }
    
    const items = await fs.readdir(inputDir);
    let totalOriginal = 0;
    let totalCompressed = 0;
    let count = 0;
    
    for (const item of items) {
        const inputPath = path.join(inputDir, item);
        const outputPath = path.join(outputDir, item);
        const stat = await fs.stat(inputPath);
        
        if (stat.isDirectory()) {
            const subOutputDir = isReplaceMode ? inputPath : outputPath;
            const result = await processDirectory(inputPath, subOutputDir);
            totalOriginal += result.totalOriginal;
            totalCompressed += result.totalCompressed;
            count += result.count;
        } else if (stat.isFile() && /\.(jpg|jpeg)$/i.test(item)) {
            const result = await compressImage(inputPath, outputPath);
            totalOriginal += result.originalSize;
            totalCompressed += result.compressedSize;
            count++;
        }
    }
    
    return { totalOriginal, totalCompressed, count };
}

// 主函数
async function main() {
    console.log('🖼️  婚礼照片压缩工具');
    console.log('==========================================');
    console.log(`模式: ${isReplaceMode ? '替换原文件' : '创建压缩副本'}`);
    console.log(`输入目录: ${config.inputDir}`);
    console.log(`输出目录: ${config.outputDir}`);
    console.log(`质量设置: ${config.quality}%`);
    console.log(`最大尺寸: ${config.maxWidth}x${config.maxHeight}`);
    console.log('==========================================\n');
    
    if (isReplaceMode) {
        console.log('⚠️  警告：将替换原文件！建议先备份。');
        console.log('   继续请等待3秒...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    const startTime = Date.now();
    
    try {
        const result = await processDirectory(config.inputDir, config.outputDir);
        
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        const savings = result.totalOriginal > 0 
            ? ((result.totalOriginal - result.totalCompressed) / result.totalOriginal * 100).toFixed(1)
            : 0;
        
        console.log('\n🎉 压缩完成！');
        console.log('==========================================');
        console.log(`处理文件: ${result.count} 个`);
        console.log(`原始大小: ${formatBytes(result.totalOriginal)}`);
        console.log(`压缩后: ${formatBytes(result.totalCompressed)}`);
        console.log(`节省: ${formatBytes(result.totalOriginal - result.totalCompressed)} (${savings}%)`);
        console.log(`用时: ${duration} 秒`);
        console.log('==========================================');
        
        if (!isReplaceMode) {
            console.log('\n💡 如果效果满意，可以替换原文件：');
            console.log('   npm run compress-images:replace');
        }
        
    } catch (error) {
        console.error('❌ 压缩失败:', error);
        process.exit(1);
    }
}

main().catch(console.error); 