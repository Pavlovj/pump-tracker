import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import React, { useState } from 'react'
import { CurrencyState } from '../contexts/currencyContext'

export const Header = () => {
    const router = useRouter()

    const { currency, setCurrency, symbol } = CurrencyState()

    return (

        <AppBar className='bg-gray-900  static top-0'>
            <Container className='px-0'>
                <Toolbar className='flex flex-wrap justify-between items-center mx-auto'>
                    <div
                        className='flex flex-row text-blue-300 cursor-pointer font-bold text-2xl '
                        onClick={() => { router.push('/') }}
                    >

                        <img src="https://www.svgrepo.com/show/1924/line-chart.svg" className="mr-3 h-8" alt="" />
                        <span>Pump Tracker</span>
                    </div>



                    <Select
                        variant='outlined'
                        className='px-2 h-11 border-white text-white border'
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem className value={'EUR'}>EUR</MenuItem>
                        <MenuItem value={'USD'}>USD</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar >


    )
}

