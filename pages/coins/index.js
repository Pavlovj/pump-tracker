import React from 'react'
import { Header } from '../../components/Header'
import { TrendingTable } from '../../components/TrendingTable'

export default function Coins() {
    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            <Header />
            <TrendingTable />
        </div>
    )
}

