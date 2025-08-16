// 婚礼网站配置文件
const config = {
  data: {
    title: "丁俊杰 & 邵倩楠的婚礼", 
    description:
      "我们将于2025年10月4日举行婚礼，诚挚邀请您见证我们的幸福时刻。", 
    groomName: "丁俊杰",
    brideName: "邵倩楠",
    parentGroom: "丁先生 & 丁夫人",
    parentBride: "邵先生 & 邵夫人",
    date: "2025-10-04",
    // 地图服务配置 - 支持多种地图服务
    mapProvider: "amap", // 可选: "amap"(高德), "baidu"(百度), "google"(谷歌-国外)
    
    // 高德地图配置
    amap: {
      url: "https://uri.amap.com/marker?position=117.494926,30.671530&name=葡萄园大酒店(清风东路)&src=wedding&coordinate=gaode&callnative=0",
      embed_script: "https://webapi.amap.com/maps?v=2.0&key=YOUR_AMAP_KEY", // 需要申请高德地图API Key
      center: [117.494926, 30.671530], // [经度, 纬度]
    },
    
    // 百度地图配置 (备选)
    baidu: {
      url: "https://map.baidu.com/search/葡萄园大酒店(清风东路)/@13390896.285,3602215.79,19z?querytype=s&da_src=shareurl&wd=葡萄园大酒店&c=池州&src=0",
      center: [117.494926, 30.671530],
    },
    
    // 保留原Apple Maps链接作为备选
    apple_maps_url: "https://maps.apple.com/?address=%E4%B8%AD%E5%9B%BD%E5%AE%89%E5%BE%BD%E7%9C%81%E6%B1%A0%E5%B7%9E%E5%B8%82%E8%B4%B5%E6%B1%A0%E5%8C%BA%E6%B8%85%E9%A3%8E%E8%B7%AF86%E5%8F%B7(%E5%B8%82%E5%A7%94%E5%AF%B9%E9%9D%A2)&auid=1117323144836024&ll=30.671530,117.494926&lsp=57879&q=%E8%91%A1%E8%90%84%E5%9B%AD%E5%A4%A7%E9%85%92%E5%BA%97(%E6%B8%85%E9%A3%8E%E4%B8%9C%E8%B7%AF)",
    
    // 主要地图链接 (当前使用高德地图)
    maps_url: "https://uri.amap.com/marker?position=117.494926,30.671530&name=葡萄园大酒店(清风东路)&src=wedding&coordinate=gaode&callnative=0",
    time: "10:00 - 21:00",
    location: "葡萄园大酒店(清风东路)",
    address: "安徽省池州市贵池区清风路86号(市委对面)",
    ogImage: "/photos/classic/image2.webp",
    favicon: "/images/favicon.ico",
    agenda: [
      {
        title: "婚礼仪式",
        date: "2025-10-04",
        startTime: "10:00",
        endTime: "12:00",
        location: "葡萄园大酒店(清风东路)",
        address: "安徽省池州市贵池区清风路86号(市委对面)",
      },
      {
        title: "婚宴庆典",
        date: "2025-10-04",
        startTime: "18:00",
        endTime: "21:00",
        location: "葡萄园大酒店(清风东路)",
        address: "安徽省池州市贵池区清风路86号(市委对面)",
      }
    ],
    audio: {
      src: "/audio/fulfilling-humming.mp3", // or /audio/nature-sound.mp3
      title: "温馨背景音乐", // or Nature Sound
      autoplay: true,
      loop: true
    },
    banks: [
      {
        bank: "中国工商银行",
        accountNumber: "1234567890123456789",
        accountName: "丁俊杰",
      },
      {
        bank: "中国建设银行",
        accountNumber: "9876543210987654321",
        accountName: "邵倩楠",
      }
    ]
  }
};

export default config;
