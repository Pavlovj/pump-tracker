import { Container, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'
import { BsGithub, BsGlobe2, BsReddit, BsStar, BsTwitter } from 'react-icons/bs';
import Breadcrumbs from '../../components/Breadcrumbs';
import CoinChart from '../../components/coin/CoinChart';
import { Header } from '../../components/Header';
import { CurrencyState } from '../../contexts/currencyContext';
import { getCoinStats } from '../api/coins/[coinID]';

const CoinContext = createContext();

const Coin = (props) => {
    const router = useRouter();

    const { currency, symbol } = CurrencyState();
    const [coin, setCoin] = useState(props.coin)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getCoinStats(coin.id)
            .then((coin) => {
                setCoin(coin)
                setLoading(false);
            });

    }, [currency])

    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            <Header />

            <Container className='flex flex-col'>
                <div className='pt-6 pb-3'>
                    <Breadcrumbs props={coin} />
                </div>

                <div className='flex flex-col justify-between md:flex-row pb-3'>

                    <div className='flex flex-col gap-3 '>
                        <div className='text-xl flex gap-3 '>
                            <Image alt={coin.name} src={coin.image.small} unoptimized={true} height={20} width={30} />
                            {coin.name}
                            <span className='mt-1 text-base font-extrabold text-gray-400'>{coin.symbol.toUpperCase()}</span>
                        </div>
                        <div className='flex gap-3'>
                            <button className="text-xxs bg-blue-500 text-white py-1 px-3 rounded opacity-90 cursor-default">
                                Rank #{coin.market_cap_rank}
                            </button>
                            <button className="text-xxs bg-blue-500 text-white py-1 px-3 rounded opacity-90 cursor-default">
                                On {0} wishlists
                            </button>
                        </div>
                    </div>

                    <div className='flex text-base gap-4 flex-row flex-wrap'>
                        <div className='flex gap-1 text-blue-400 cursor-pointer hover:text-blue-200'><BsStar className='mt-0.5' /> Add to Watchlist</div>
                        {/* <div className='flex flex-row flex-wrap gap-2 text-blue-400 mt-0.5 pointer'>
                            <BsGlobe2 />
                            <BsTwitter />
                            <BsGithub />
                            <BsReddit />
                        </div> */}

                    </div>
                </div>
                <Container className='p-0 flex gap-5'>

                    <CoinChart props={coin} />


                    <div className='flex flex-col'>

                    </div>

                </Container>
            </Container>

        </div>
    )
}

export default Coin


export async function getServerSideProps({ query: { coinID } }) {
    const data = await getCoinStats(coinID)
    return {
        props: { coin: data }, // will be passed to the page component as props
    }
}