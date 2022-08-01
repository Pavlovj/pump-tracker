import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import React, { useState } from 'react'
import { CurrencyState } from '../contexts/currencyContext'

export const Header = () => {
    const router = useRouter()

    const { currency, setCurrency, symbol } = CurrencyState()

    return (

        <AppBar className='bg-transparent static'>
            <Container>
                <Toolbar className='flex flex-wrap justify-between items-center mx-auto'>
                    <Typography
                        className='text-blue-500 cursor-pointer font-bold text-2xl'
                        onClick={() => { router.push('/') }}
                    >
                        Pump Tracker
                    </Typography>

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

