/**
 * 微信分享优化工具
 * 确保微信分享卡片正确显示
 */

// 微信分享配置
export const setupWeChatShare = () => {
  // 确保页面有正确的分享标签
  const ensureMetaTag = (property, content, name = null) => {
    const selector = property.startsWith('og:') ? `meta[property="${property}"]` : `meta[name="${property}"]`;
    let meta = document.querySelector(selector);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property.startsWith('og:')) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', property);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // 获取当前页面的完整URL
  const currentUrl = window.location.href;
  const imageUrl = `${window.location.origin}/photos/classic/image2.jpg`;
  
  // 设置微信分享必需的标签
  ensureMetaTag('og:title', '丁俊杰 & 邵倩楠的婚礼');
  ensureMetaTag('og:description', '我们将于2025年10月4日举行婚礼，诚挚邀请您见证我们的幸福时刻。');
  ensureMetaTag('og:image', imageUrl);
  ensureMetaTag('og:url', currentUrl);
  ensureMetaTag('og:type', 'website');
  ensureMetaTag('og:image:type', 'image/jpeg');
  ensureMetaTag('og:image:width', '720');
  ensureMetaTag('og:image:height', '1080');
  
  // 微信专用标签
  ensureMetaTag('wechat:title', '丁俊杰 & 邵倩楠的婚礼');
  ensureMetaTag('wechat:description', '我们将于2025年10月4日举行婚礼，诚挚邀请您见证我们的幸福时刻。');
  ensureMetaTag('wechat:image', imageUrl);
  
  console.log('微信分享配置已设置:', {
    title: '丁俊杰 & 邵倩楠的婚礼',
    description: '我们将于2025年10月4日举行婚礼，诚挚邀请您见证我们的幸福时刻。',
    image: imageUrl,
    url: currentUrl
  });
};

// 检查图片是否可访问
export const checkImageAccessibility = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      console.log('分享图片加载成功:', imageUrl);
      resolve(true);
    };
    img.onerror = () => {
      console.error('分享图片加载失败:', imageUrl);
      resolve(false);
    };
    img.src = imageUrl;
  });
};

// 微信分享调试信息
export const debugWeChatShare = () => {
  const metas = {
    'og:title': document.querySelector('meta[property="og:title"]')?.content,
    'og:description': document.querySelector('meta[property="og:description"]')?.content,
    'og:image': document.querySelector('meta[property="og:image"]')?.content,
    'og:url': document.querySelector('meta[property="og:url"]')?.content,
  };
  
  console.table(metas);
  
  // 检查图片
  if (metas['og:image']) {
    checkImageAccessibility(metas['og:image']);
  }
  
  return metas;
}; 