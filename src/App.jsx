/**
 * Copyright (c) 2024-present mrofisr
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// src/App.jsx
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import MainContent from '@/pages/MainContent';
import LandingPage from '@/pages/LandingPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import config from '@/config/config';

/**
 * App component serves as the root of the application.
 *
 * It manages the state to determine whether the invitation content should be shown.
 * Initially, the invitation is closed and the LandingPage component is rendered.
 * Once triggered, the Layout component containing MainContent is displayed.
 *
 * This component also uses HelmetProvider and Helmet to set up various meta tags:
 *   - Primary meta tags: title and description.
 *   - Open Graph tags for Facebook.
 *   - Twitter meta tags for summary and large image preview.
 *   - Favicon link and additional meta tags for responsive design and theme color.
 *
 * @component
 * @example
 * // Renders the App component
 * <App />
 */
function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{config.data.title}</title>
        <meta name="title" content={config.data.title} />
        <meta name="description" content={config.data.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={config.data.title} />
        <meta property="og:description" content={config.data.description} />
        <meta property="og:image" content={`${window.location.origin}${config.data.ogImage}`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="丁俊杰 & 邵倩楠的婚礼邀请函" />
        <meta property="og:site_name" content="丁俊杰 & 邵倩楠的婚礼" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="article:author" content="丁俊杰, 邵倩楠" />
        <meta property="article:published_time" content="2025-10-04T10:00:00+08:00" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@wedding" />
        <meta property="twitter:creator" content="@wedding" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={config.data.title} />
        <meta property="twitter:description" content={config.data.description} />
        <meta property="twitter:image" content={`${window.location.origin}${config.data.ogImage}`} />
        <meta property="twitter:image:alt" content="丁俊杰 & 邵倩楠的婚礼邀请函" />

        {/* 微信分享优化 */}
        <meta name="wechat:card" content="summary_large_image" />
        <meta name="wechat:title" content={config.data.title} />
        <meta name="wechat:description" content={config.data.description} />
        <meta name="wechat:image" content={`${window.location.origin}${config.data.ogImage}`} />

        {/* QQ分享优化 */}
        <meta name="qq:title" content={config.data.title} />
        <meta name="qq:description" content={config.data.description} />
        <meta name="qq:image" content={`${window.location.origin}${config.data.ogImage}`} />

        {/* 微博分享优化 */}
        <meta name="weibo:title" content={config.data.title} />
        <meta name="weibo:description" content={config.data.description} />
        <meta name="weibo:image" content={`${window.location.origin}${config.data.ogImage}`} />

        {/* 钉钉分享优化 */}
        <meta name="dingtalk:title" content={config.data.title} />
        <meta name="dingtalk:description" content={config.data.description} />
        <meta name="dingtalk:image" content={`${window.location.origin}${config.data.ogImage}`} />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href={config.data.favicon} />

        {/* 结构化数据 - 婚礼事件 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": config.data.title,
            "description": config.data.description,
            "startDate": "2025-10-04T10:00:00+08:00",
            "endDate": "2025-10-04T21:00:00+08:00",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
              "@type": "Place",
              "name": config.data.location,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": config.data.address,
                "addressLocality": "池州市",
                "addressRegion": "安徽省",
                "addressCountry": "CN"
              }
            },
            "image": [`${window.location.origin}${config.data.ogImage}`],
            "organizer": [
              {
                "@type": "Person",
                "name": config.data.groomName
              },
              {
                "@type": "Person", 
                "name": config.data.brideName
              }
            ],
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CNY",
              "availability": "https://schema.org/InStock",
              "validFrom": new Date().toISOString()
            }
          })}
        </script>

        {/* 额外的SEO优化标签 */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=yes, date=yes, email=yes, address=yes" />
        <meta name="theme-color" content="#f43f5e" />
        <meta name="msapplication-TileColor" content="#f43f5e" />
        <meta name="apple-mobile-web-app-title" content="婚礼邀请函" />
        <meta name="application-name" content="婚礼邀请函" />
        <meta name="msapplication-tooltip" content={config.data.description} />
        
        {/* 婚礼特定关键词 */}
        <meta name="keywords" content="婚礼,邀请函,丁俊杰,邵倩楠,电子请帖,结婚,婚庆,2025年10月4日,池州婚礼,葡萄园大酒店" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDA4AF" /> {/* Rose-300 color */}
      </Helmet>

      <AnimatePresence mode='wait'>
        {!isInvitationOpen ? (
          <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
        ) : (
          <Layout>
            <MainContent />
          </Layout>
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
}

export default App;