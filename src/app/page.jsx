import React from 'react'
import Header from '../components/Header/Header'
import './home.css';
import BottomNav from '../components/NavButton/ButtonList';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import CreativeSlider from '@/components/CreativeSlider';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../components/Home/TitleCard.css';

config.autoAddCss = false;

const games = [
  { name: 'pubg-mobile', image: '/images/home/pubg-mobile.webp' } ,
  { name: 'free', image: '/images/home/free-fire.webp' } ,
  { name: 'mobile-legends', image: '/images/home/mobile-legends.webp' } ,
  { name: 'pubg-lite', image: '/images/home/pubg-lite.webp' } ,
]

const gamesbyAcount = [
  { name: 'pubg-acount', image: '/images/home/pubg-acount2.png'} ,
  { name: 'tik-tok', image: '/images/home/tik-tok.webp' } ,
  { name: 'clash-of-clans', image: '/images/home/clash-of-clans.webp'} ,
  { name: 'clash-royale', image: '/images/home/clash-of-royale.webp' } ,
  { name: 'brawl-stars', image: '/images/home/brawl-stars.png' } ,    
  { name: 'hay-day', image: '/images/home/hay-day.webp' } ,    
]

export default function Home() {
  return (
    <div className='home_parent'>
      <div className="container  dark:bg-gray-900 bg-gray-100">
        <Header />

        <div className="box">
          {/* <img src="/images/CY6cY9DlQtvjxGSV5zcp4hVIFZbv1jnQr1qtguM8.png" alt="no" /> */}
          <CreativeSlider/>
        </div>

         
          <div className="line home-card after:bg-gray-200 text-indigo-900 dark:text-gray-400">
            <h2> ID الشحن عبر ال </h2>
          </div>
         

        <div className="sections grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {games.map(game => (
            <Link key={game.name} href={`/game/id/${game.name}`}>
              <img src={game.image} alt={game.name} className='rounded-3xl'/>
            </Link>
          ))}
        </div>
         
          <div className="line home-card after:bg-gray-200 text-indigo-900 dark:text-gray-400">
            <h2 id='super-sell-section'>  الشحن عبر الحساب </h2>
          </div>

        <div className="sections grid  grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {gamesbyAcount.map(game => (
            <Link key={game.name} href={`/game/acount/${game.name}`}>
              <img src={game.image} alt={game.name} className='rounded-3xl'/>
            </Link>
          ))}
        </div>
          <div id='footer' className='mt-8'>
        <Footer />

          </div>
        <BottomNav />
      </div>
    </div>
  )
}
