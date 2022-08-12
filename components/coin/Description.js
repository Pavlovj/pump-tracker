import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { BsGithub, BsGlobe2, BsReddit, BsStar, BsTwitter } from 'react-icons/bs';

import { CurrencyState } from '../../contexts/currencyContext';
import { colorPercentage } from '../../utils/colorText';
import { abbreviateNumber } from '../../utils/convert';
import ContainerLayout from './ContainerLayout'

export default function Description({ props: coin }) {
    const { currency, symbol } = CurrencyState();
    const [showMore, setShowMore] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const LANGUAGE = 'en';
    const MAX_DESCRIPTION_PREVIEW_LENGTH = 300;



    const openInNewTab = (url) => {
        // 👇️ setting target to _blank with window.open
        if (typeof window !== "undefined") {

            window.open(url, '_blank', 'noopener,noreferrer');
        }

    };

    return (
        <ContainerLayout>
            <div className='flex flex-col gap-3'>
                <div className='text-lg'>{coin.name} Price Live Data</div>

                <div className='text-gray-300'>{coin.symbol.toUpperCase()}&apos;s price today is {symbol}{coin.market_data.current_price[currency.toLowerCase()]} with a 24-hour market cap of {symbol}{abbreviateNumber(coin.market_data.market_cap[currency.toLowerCase()])}. {coin.symbol.toUpperCase()} price is {colorPercentage(coin.market_data.price_change_24h_in_currency[currency.toLowerCase()].toFixed(2))} in the last 24 hours. It has a circulating supply of {abbreviateNumber(coin.market_data.circulating_supply)} {coin.symbol.toUpperCase()} coins and a total supply of {abbreviateNumber(coin.market_data.total_supply)}.</div>

                <Divider className='bg-gray-400 opacity-40' />

                <div className='text-lg'>What is {coin.name}?</div>

                <p
                    className={`text-gray-300 description-text ${showMore ? '' : 'bg-gradient-to-b from-transparent via-transparent to-gray-900/80'}`}
                    dangerouslySetInnerHTML={{
                        __html:
                            showMore
                                ? coin.description[LANGUAGE]
                                : `${coin.description[LANGUAGE].substring(0, MAX_DESCRIPTION_PREVIEW_LENGTH)}...`
                    }}
                />

                {/* Show more button */}
                <div
                    className='self-center flex flex-row font-medium gap-1 cursor-pointer select-none hover:font-bold '
                    onClick={() => setShowMore(showMore ? false : true)}
                >
                    Show {showMore ? 'less' : 'more'}
                    <span className='text-xs mt-1.5'>{showMore ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                </div>

                {/* More about section */}
                <div className='text-lg'>More about {coin.name}</div>
                <div className='flex flex-row justify-around text-blue-400'>
                    <a
                        className='flex flex-row gap-1'
                        href={coin.links.homepage[0]}>
                        <BsGlobe2 className='mt-1' /> Website
                    </a>
                    <a
                        className='flex flex-row gap-1'
                        href={`https://twitter.com/${coin.links.subreddit_url}`}
                    >
                        <BsTwitter className='mt-1' /> Twitter
                    </a>
                    <a
                        className='flex flex-row gap-1'
                        href={coin.links.subreddit_url}
                    >
                        <BsReddit className='mt-1' /> Reddit
                    </a>
                </div>
            </div>

        </ContainerLayout >
    )
}
