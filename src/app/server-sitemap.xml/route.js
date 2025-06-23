import { getServerSideSitemap } from 'next-sitemap';
import { NextResponse } from 'next/server';

export async function GET() {
  // روابط تكتبها يدويًا
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

  const fields = links.map((url) => ({
    loc: url,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const sitemap = await getServerSideSitemap(fields);

  return new NextResponse(sitemap.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
