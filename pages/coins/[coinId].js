import { useRouter } from 'next/router'
import React from 'react'
import { Header } from '../../components/Header';

const Coin = () => {
    const router = useRouter();
    const { coinID } = router.query

    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            <Header />
        {coinID} 
        </div>
    )
}

export default Coin