// 精选照片配置 - 贯穿整个电子请帖的重要照片
export const featuredPhotos = {
  // 主要展示照片 - 用于Hero页面背景
  hero: {
    main: '/photos/classic/image1.jpg',
    secondary: '/photos/outdoor/image1.jpg',
    accent: '/photos/vintage/image1.jpg'
  },
  
  // Events页面的照片
  events: {
    ceremony: '/photos/ceremony/image1.jpg',
    reception: '/photos/hotel/image1.jpg'
  },
  
  // Location页面的照片  
  location: {
    venue: '/photos/hotel/image1.jpg',
    hotel: '/photos/hotel/image2.jpg'
  },
  
  // Gallery页面精选照片
  gallery: {
    featured: '/photos/classic/image1.jpg',
    lifestyle: '/photos/outdoor/image1.jpg',
    fashion: '/photos/fashion/image1.jpg',
    traditional: '/photos/traditional/image1.jpg'
  },
  
  // Wishes页面装饰照片
  wishes: {
    left: '/photos/vintage/image1.jpg',
    right: '/photos/traditional/image1.jpg',
    background: '/photos/fashion/image1.jpg'
  }
};

// Gallery页面的完整照片列表 - 重新设计为滚动布局
export const galleryPhotos = [
  // 第一组：经典棚拍
  {
    id: 'classic-1',
    src: '/photos/classic/image1.jpg',
    alt: '经典棚拍 1',
    title: '经典时刻',
    category: 'classic',
    size: 'large', // 大图
    description: '最美好的瞬间，定格永恒'
  },
  {
    id: 'classic-2',
    src: '/photos/classic/image2.jpg',
    alt: '经典棚拍 2',
    title: '经典魅力',
    category: 'classic',
    size: 'medium',
    description: '典雅与浪漫的完美结合'
  },
  
  // 第二组：浪漫户外
  {
    id: 'outdoor-1', 
    src: '/photos/outdoor/image1.jpg',
    alt: '浪漫户外 1',
    title: '户外浪漫',
    category: 'outdoor',
    size: 'large',
    description: '自然光下的甜蜜时光'
  },
  {
    id: 'outdoor-2',
    src: '/photos/outdoor/image2.jpg',
    alt: '浪漫户外 2',
    title: '阳光恋人',
    category: 'outdoor',
    size: 'medium',
    description: '金色夕阳见证爱情'
  },
  
  // 第三组：婚礼仪式
  {
    id: 'ceremony-1',
    src: '/photos/ceremony/image1.jpg',
    alt: '婚礼仪式 1',
    title: '神圣时刻',
    category: 'ceremony',
    size: 'large',
    description: '爱的誓言，永恒承诺'
  },
  {
    id: 'ceremony-2',
    src: '/photos/ceremony/image2.jpg',
    alt: '婚礼仪式 2',
    title: '幸福见证',
    category: 'ceremony',
    size: 'medium',
    description: '亲友们的美好祝福'
  },
  
  // 第四组：时尚艺术
  {
    id: 'fashion-1',
    src: '/photos/fashion/image1.jpg',
    alt: '时尚艺术 1', 
    title: '时尚艺术',
    category: 'fashion',
    size: 'large',
    description: '艺术与爱情的碰撞'
  },
  {
    id: 'fashion-2',
    src: '/photos/fashion/image2.jpg',
    alt: '时尚艺术 2',
    title: '创意之美',
    category: 'fashion',
    size: 'medium',
    description: '独特视角的浪漫诠释'
  },
  
  // 第五组：中式传统
  {
    id: 'traditional-1',
    src: '/photos/traditional/image1.jpg',
    alt: '中式传统 1',
    title: '传统之美',
    category: 'traditional',
    size: 'large',
    description: '传统文化的现代演绎'
  },
  {
    id: 'traditional-2',
    src: '/photos/traditional/image2.jpg',
    alt: '中式传统 2',
    title: '古典雅韵',
    category: 'traditional',
    size: 'medium',
    description: '东方美学的极致体现'
  },
  
  // 第六组：复古怀旧
  {
    id: 'vintage-1',
    src: '/photos/vintage/image1.jpg',
    alt: '复古怀旧 1',
    title: '复古怀旧',
    category: 'vintage',
    size: 'large',
    description: '时光倒流的浪漫情怀'
  },
  {
    id: 'vintage-2',
    src: '/photos/vintage/image2.jpg',
    alt: '复古怀旧 2',
    title: '岁月如歌',
    category: 'vintage',
    size: 'medium',
    description: '经典永不过时的美'
  }
];

// 为Gallery页面设计的布局配置
export const galleryLayouts = {
  // 瀑布流布局配置
  masonryLayout: [
    { photos: ['classic-1'], type: 'hero', cols: 2 }, // 大图开场
    { photos: ['outdoor-1', 'outdoor-2'], type: 'duo', cols: 2 }, // 双图并排
    { photos: ['ceremony-1'], type: 'featured', cols: 1 }, // 特色大图
    { photos: ['fashion-1', 'fashion-2', 'classic-2'], type: 'trio', cols: 3 }, // 三图组合
    { photos: ['traditional-1'], type: 'spotlight', cols: 1 }, // 聚光灯
    { photos: ['vintage-1', 'vintage-2'], type: 'vintage-pair', cols: 2 } // 复古双图结尾
  ],
  
  // 分组信息（移除venue分组）
  groups: [
    { category: 'classic', title: '经典时刻', subtitle: '永恒的美丽瞬间' },
    { category: 'outdoor', title: '户外浪漫', subtitle: '自然光下的爱情' },
    { category: 'ceremony', title: '神圣仪式', subtitle: '爱的誓言见证' },
    { category: 'fashion', title: '时尚艺术', subtitle: '创意与美的结合' },
    { category: 'traditional', title: '传统之美', subtitle: '东方古典韵味' },
    { category: 'vintage', title: '复古情怀', subtitle: '时光的浪漫回忆' }
  ]
}; 