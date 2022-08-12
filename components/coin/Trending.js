import React from 'react'
import { getMostTrending } from '../../pages/api/most-trending'
import ContainerLayout from './ContainerLayout'

export default function Trending({ trending: { coins } }) {
    console.log(coins)
    return (
        <ContainerLayout>
            <div className='flex flex-col'>

                <h2 className='text-xl font-semibold'>Trending</h2>
                
            </div>
        </ContainerLayout>
    )
}


