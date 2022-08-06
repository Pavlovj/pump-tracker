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

import { numberWithCommas } from '../utils/convert';
import { colorPercentage } from '../utils/colorText';
import { CircularProgress } from '@mui/material';


export const Carousel = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [trending, setTrending] = useState([])
    const { currency, symbol } = CurrencyState();


    const fetchTrending = async () => {
        setIsLoading(true);
        const data = await getTrendingCoins(currency)

        setTrending(data);
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTrending();
    }, [currency])

    return (
        <>
            {
                isLoading ? (
                    <div className='flex justify-center'>
                        <CircularProgress
                            style={{ color: '#60a5fa' }}
                            thickness={2}
                            size={75}
                        />
                    </div>
                ) :
                    (
                        <div className='flex items-center h-[50%]'>

                            <Swiper

                                slidesPerView={5}
                                spaceBetween={10}
                                freeMode={true}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                loop={true}
                                speed={2000}
                                grabCursor={true}
                                modules={[Autoplay, FreeMode]}
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
                                                <SwiperSlide
                                                    key={idx}
                                                    className='flex flex-col items-center cursor-pointer text-white uppercase p-5 hover:scale-125 hover:text-blue-300 hover:font-extrabold transition ease-in-out delay-350 select-none'

                                                >
                                                    <Image
                                                        className=''
                                                        src={coin.image}
                                                        alt={coin.name}
                                                        height={80}
                                                        width={80}
                                                        unoptimized={true}
                                                    />
                                                    <span className='flex flex-wrap gap-1 pt-2 text-xs'>
                                                        {coin.symbol ?? '&nbsp;'}
                                                        {colorPercentage(coin?.price_change_percentage_24h?.toFixed(2))}

                                                    </span>
                                                    <span >{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</span>
                                                </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div >
                    )

            }
        </>


    )
}

