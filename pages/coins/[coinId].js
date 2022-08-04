import { Container } from '@mui/material';
import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'
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
                <Breadcrumbs props={coin}/>

                <div className='flex justify-between'>
                    <span>Eth</span>
                    <span>Wishlist</span>
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