import { Container, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CurrencyState } from '../../contexts/currencyContext';
import { colorPercentage } from '../../utils/colorText';
import { numberWithCommas } from '../../utils/convert';

import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { getCoinChart } from '../../pages/api/coins/[coinID]/market_chart';



const BitcoinID = 'btc';

export default function CoinChart({ props: coin }) {

  const [timeSpan, setTimeSpan] = useState('24h'); //TODO dyamic
  const { currency, symbol } = CurrencyState();

  const currencyLow = currency.toLowerCase();
  const { current_price: price, price_change_percentage_24h_in_currency: price24h } = coin.market_data

  const formatPrice = (cur) => price[cur] > 1.1 ? numberWithCommas(price[cur].toFixed(2)) : price[cur]
  const formatPriceChangePercentage = (cur) => colorPercentage(coin.market_data[`price_change_percentage_${timeSpan}_in_currency`][cur].toFixed(2));


  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }

  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "My chart"
    },
    series: [{ data: [] }]
  });

  useEffect(() => {
    getCoinChart(coin.id, currency.toLowerCase(), { hours: 7 })
      .then(data => { setChartOptions({ series: [{ data: data }] }); });


  }, []);

  return (
    <Container className='bg-slate-800 rounded'>
      {/* Main column */}
      <div className='flex flex-col'>
        {/* Header */}
        <div className='flex flex-col'>
          {/* Price in CURRENCY */}
          <div className='flex flex-row flex-wrap items-center gap-2 font-bold'>
            <span className='text-3xl'>{symbol}{formatPrice(currencyLow)} {currency}</span>
            <span className='text-xl'>{formatPriceChangePercentage(currencyLow)}
              <span className='text-sm'> ({timeSpan.toUpperCase()})</span>
            </span>
          </div>
          {/* Price in BTC */}
          <div className='flex flex-row flex-wrap items-center gap-2 text-gray-400'>
            <span className=''>{formatPrice(BitcoinID)} BTC</span>
            <span className='text-sm'>
              {formatPriceChangePercentage(BitcoinID)}
              <span className='text-xxs'> ({timeSpan.toUpperCase()})</span>
            </span>
          </div>
        </div>

        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>




      </div>
    </Container >

  )
}
