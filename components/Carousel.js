import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { CurrencyState } from '../contexts/currencyContext'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";


import swiper, { Autoplay, FreeMode } from "swiper";
import { getTrendingCoins } from '../pages/api/trending';
import Link from 'next/link';


export const Carousel = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [trending, setTrending] = useState([])
    const { currency, symbol } = CurrencyState();


    const fetchTrending = async () => {
        // const test = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false`)
        // console.log(test)
        const data = await getTrendingCoins(currency)

        setTrending(data);
        return true;
    }

    useEffect(() => {
        setIsLoading(true);
        fetchTrending().then(() => {
            setIsLoading(false)
        });
    }, [currency])

    return (
        <div className='flex items-center h-[50%] '>

            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                // freeMode={true}
                centeredSlides={true}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false,
                }}
                loop={true}
                speed={5000}
                grabCursor={true}
                modules={[Autoplay]}
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 40
                    }
                }}
            >

                {
                    trending.map((coin, idx) => {
                        return (
                            <SwiperSlide key={idx} className='flex flex-col items-center cursor-pointer text-white uppercase'>
                                <Image
                                    className=''
                                    src={coin.image}
                                    alt=""
                                    height={80}
                                    width={80}
                                    unoptimized={true}
                                />
                                <span>{coin.symbol ?? '&nbsp;'}
                                    <span className=''>{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                                </span>
                                <span>{symbol} {coin?.current_price.toFixed(2)}</span>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

        </div >
    )
}

