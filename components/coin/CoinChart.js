import { Container, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CurrencyState } from '../../contexts/currencyContext';
import { colorPercentage } from '../../utils/colorText';
import { numberWithCommas } from '../../utils/convert';

import Highcharts from 'highcharts/highstock'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { getCoinChart } from '../../pages/api/coins/[coinID]/market_chart';
import ContainerLayout from './ContainerLayout';

function format_output(output) {
  var n = Math.log(output) / Math.LN10;
  var x = 4 - n;
  if (x < 0)
    x = 0;
  output = output.toFixed(x);
  return output;
}

const BitcoinID = 'btc';

export default function CoinChart({ props: coin }) {

  const [timeSpan, setTimeSpan] = useState('24h'); //TODO dynamic
  const { currency, symbol } = CurrencyState();

  const currencyLow = currency.toLowerCase();
  const { current_price: price, price_change_percentage_24h_in_currency: price24h } = coin.market_data

  const formatPrice = (cur) => price[cur] > 1.1 ? numberWithCommas(price[cur].toFixed(2)) : price[cur]
  const formatPriceChangePercentage = (cur) => colorPercentage(coin.market_data[`price_change_percentage_${timeSpan}_in_currency`][cur].toFixed(2));
  
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (typeof Highcharts === 'object') {
      HighchartsExporting(Highcharts) //FIXME chart settings
      setChartOptions({
        chart: {
          // zoomType: 'x'
          backgroundColor: 'transparent',
          style: {
            // fontFamily: 'monospace',
            // color: "#09d624"
          }
        },
        title: {
          text: `${coin.name} Price Chart (${coin.symbol.toUpperCase()}/${currency})`,
          align: 'left'
        },
        series: [{
          color: "#9ec2d9", // line color
          name: 'Price',
          type: "area",
          threshold: null,
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            enabled: false,
          },
          shadow: false,
          data: [],

        }],

        credits: {
          enabled: true,
          href: '',
          text: '© Pump Tracker',
          style: {
            color: "#c95726", //TODO colors
            cursor: 'default',
            fontSize: '9px'
          }
        },

        xAxis: {
          type: 'datetime',
          labels: {
            style: {
              color: 'white'
            }
          }
        },
        yAxis: {
          title: {
            text: '',
          },
          labels: {
            style: {
              color: 'white'
            }
          }
        },
        legend: {
          enabled: false
        },

        rangeSelector: {
          enabled: true,
          inputEnabled: false, // Date range picker
          allButtonsEnabled: true,
          buttons: [{
            event: { click: (e) => { console.log(123) }, },
            type: 'hour',
            count: 1,
            text: '1H'
          }, {
            type: 'hour',
            count: 24,
            text: '24H'
          }, {
            type: 'day',
            count: 7,
            text: '7D'
          }, {
            type: 'minute',
            count: 1,
            text: '1M'
          }, {
            type: 'minute',
            count: 3,
            text: '3M'
          }, {
            type: 'minute',
            count: 6,
            text: '6M'
          }, {
            type: 'year',
            count: 1,
            text: '1Y'
          }, {
            type: 'all',
            text: 'ALL'
          }
          ],
          buttonTheme: {
            style: {},
            width: 30
          },
          buttonPosition: {
            align: 'right'
          },
          selected: 1
        },
        tooltip: {
          shared: true,
          // formatter: function () {

          //   return this.y + '</b><br/>' + this.x
          // },
          // headerFormat: '<b>{series.name}</b><br>',
          // pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              chart: {
                height: 300
              },
              subtitle: {
                text: null
              },
              navigator: {
                enabled: false
              }
            }
          }]
        }
      })
    }

    getCoinChart(coin.id, currency.toLowerCase(), { days: 2000 })
      .then(data => {
        console.log(data)
        setChartOptions({ series: [{ data: data.prices }] });
      });


  }, [currency]);

  return (
    <ContainerLayout>
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
          {chartOptions ?
            (<HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
            />)
            : null
          }

        </div>

      </div>

    </ContainerLayout>

  )
}
