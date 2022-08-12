import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { getMostTrending } from '../../pages/api/most-trending'
import ContainerLayout from './ContainerLayout'

export default function Trending({ trending: { coins } }) {
    const router = useRouter()

    return (
        <ContainerLayout>
            <div className='flex flex-col'>

                <h2 className='text-xl font-semibold pb-2'>Trending 🔥</h2>


                {coins.map(({ item: coin }, idx) => {
                    return (

                        <div
                            key={idx}
                            className='flex flex-row justify-between items-center gap-2 p-2 text-sm  cursor-pointer hover:bg-gray-700 rounded-sm active:cursor-wait'
                            onClick={() => router.push(`/coins/${coin.id}`).then(() => router.reload())}
                        >
                            <Image alt={coin.name} src={coin.small} unoptimized={true} height={30} width={30} />

                            <span className='mr-auto'>

                                {coin.name} <span className='text-gray-400 font-semibold'>{coin.symbol}</span>
                            </span>

                            <div>
                                <span className='bg-slate-700 text-gray-400 px-1.5 rounded-sm text-xs'>#{coin.market_cap_rank}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ContainerLayout>
    )
}


