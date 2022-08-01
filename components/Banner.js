import { Container, makeStyles, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { Carousel } from './Carousel'

export const Banner = () => {


    return (
        <>
            {/* BG image */}
            <div className="bg-[url('../public/banner_2.jpg')] " >
                {/* Banner Content */}
                <Container className='flex flex-col pt-4 justify-around h-[350px]'>
                    {/* Banner Text */}
                    <div className='flex flex-col justify-center text-center h-[40%] hover:text-blue-200'>

                        <span className='text-5xl font-extrabold mb-1'>Pump Tracker</span>
                        <span className='text-gl font-mono '>Cryptocurrency Prices by Market Cap </span>
                    </div>

                    <Carousel />
                </Container >
            </div>
        </>
    )
}

