// هذا الملف لازم يكون: src/app/server-sitemap.xml/route.js

export async function GET() {
  const links = [
    'https://repeat-store.com/game/id/pubg-mobile',
    'https://repeat-store.com/game/id/free',
    'https://repeat-store.com/game/id/call-of-duty',
    'https://repeat-store.com/game/id/genshin-impact',
    'https://repeat-store.com/game/id/mobile-legends',
    'https://repeat-store.com/game/id/pubg-lite',
    'https://repeat-store.com/game/acount/pubg-acount',
    'https://repeat-store.com/game/acount/tik-tok',
    'https://repeat-store.com/game/acount/clash-of-clans',
    'https://repeat-store.com/game/acount/clash-royale',
    'https://repeat-store.com/game/acount/brawl-stars',
    'https://repeat-store.com/game/acount/hay-day',
    'https://repeat-store.com/card/amazon',
    'https://repeat-store.com/card/paypal',
    'https://repeat-store.com/card/google-play',
    'https://repeat-store.com/card/noon',
    'https://repeat-store.com/card/uber',
    'https://repeat-store.com/card/steam',
    'https://repeat-store.com/card/razer-gold',
    'https://repeat-store.com/card/netflex',
    'https://repeat-store.com/card/apple-card',
    'https://repeat-store.com/card/playstation',
    'https://repeat-store.com/card/shahid',
    'https://repeat-store.com/card/roblox',
  ];

  const urls = links.map(
    (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
