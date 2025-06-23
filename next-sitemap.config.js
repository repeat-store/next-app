/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://repeat-store.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/auth/*',
    '/admin/*',
    '/pay_page',
    '/my_orders',
    '/my_profile',
  ],
  defaultLocale: 'ar',
  additionalSitemaps: [
    'https://repeat-store.com/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/auth',
          '/admin',
          '/pay_page',
          '/my_orders',
          '/my_profile',
        ],
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
