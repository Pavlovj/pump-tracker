import { format, formatDistanceToNow } from 'date-fns';
import React from 'react'
import { CurrencyState } from '../../contexts/currencyContext';
import { colorPercentage } from '../../utils/colorText';
import { numberWithCommas } from '../../utils/convert';
import ContainerLayout from './ContainerLayout'

export default function PriceStatistics({ coin }) {
    const { currency, symbol } = CurrencyState();
    const { market_data: coinData } = coin

    const getDate = (date) => {
        const newDate = new Date(date)
        const distance = formatDistanceToNow(newDate, { addSuffix: true })
        const formatDate = format(newDate, 'MMM dd, yyyy')
        return (<small className='text-xs'>{formatDate} ({distance})</small>)
    }
    return (
        <ContainerLayout>
            <div className='flex flex-col'>
                <h2 className='text-xl font-semibold'>{coin.symbol.toUpperCase()} Price Statistics</h2>
                <table className='table-auto'>
                    <tbody>
                        {[
                            [`${coin.name} Price`, symbol + numberWithCommas(coinData.current_price[currency.toLowerCase()])],
                            ['Price change',
                                <span
                                    key={'p%'}
                                    className=''>
                                    {symbol}{coinData.price_change_24h.toFixed(4)}
                                    <sup>{colorPercentage(coinData.price_change_percentage_24h.toFixed(2))}</sup>
                                </span>],
                            ['24h Low / 24h High', symbol + numberWithCommas(coinData.low_24h[currency.toLowerCase()]) + ' / ' + numberWithCommas(coinData.high_24h[currency.toLowerCase()])],
                            ['Market Cap Rank', `#${coinData.market_cap_rank}`],
                            ['Market Cap', symbol + numberWithCommas(coinData.market_cap[currency.toLowerCase()])],
                            ['Volume / Market Cap', (coinData.total_volume[currency.toLowerCase()] / coinData.market_cap[currency.toLowerCase()]).toFixed(4)],
                            ['All-Time High',
                                <span
                                    key={'ath'}
                                    className=''>
                                    {symbol + numberWithCommas(coinData.ath[currency.toLowerCase()])}
                                    <sup>{colorPercentage(coinData.ath_change_percentage[currency.toLowerCase()])}</sup>
                                    <br />
                                    {getDate(coinData.ath_date[currency.toLowerCase()])}
                                </span>
                            ],
                            ['All-Time Low',
                                <span
                                    key={'ath'}
                                    className=''>
                                    {symbol + numberWithCommas(coinData.atl[currency.toLowerCase()])}
                                    <sup>{colorPercentage(coinData.atl_change_percentage[currency.toLowerCase()])}</sup>
                                    <br />
                                    {getDate(coinData.atl_date[currency.toLowerCase()])}
                                </span>
                            ],


                        ].map(([title, val], idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope='row' className='text-gray-400 font-normal text-xs text-left py-2 border-b'>{title}</th>
                                    <td className='text-right border-b text-xs py-2'>{val}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </ContainerLayout >
    )
}
