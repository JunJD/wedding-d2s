/**
 * 将日期字符串格式化为中文格式
 * @param {string} isoString - 要格式化的ISO日期字符串
 * @param {('full'|'short'|'time')} [format='full'] - 使用的格式类型
 * @returns {string} 格式化后的中文日期字符串
 * 
 * @example
 * // returns "星期一，2024年1月1日"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 * 
 * // returns "2024年1月1日"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 * 
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    // 中文月份名称映射
    const monthsChinese = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];

    // 中文星期名称映射
    const daysChinese = [
        '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
    ];

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const weekday = date.getDay();

    // 处理时间格式
    if (format === 'time') {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // 处理短格式
    if (format === 'short') {
        return `${year}年${monthsChinese[month]}${day}日`;
    }

    // 处理完整格式
    if (format === 'full') {
        return `${daysChinese[weekday]}，${year}年${monthsChinese[month]}${day}日`;
    }

    return `${year}年${monthsChinese[month]}${day}日`;
};