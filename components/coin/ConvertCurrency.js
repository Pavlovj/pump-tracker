import { Divider, InputAdornment, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CurrencyState } from '../../contexts/currencyContext'
import { numberWithCommas } from '../../utils/convert'
import ContainerLayout from './ContainerLayout'
import { BsGithub, BsGlobe2, BsReddit, BsStar, BsTwitter } from 'react-icons/bs';
const currencyAbbr = {
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    "ANG": "Netherlands Antillean Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AWG": "Aruban Florin",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia-Herzegovina Convertible Mark",
    "BBD": "Barbadian Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BMD": "Bermudan Dollar",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar",
    "BTC": "Bitcoin",
    "BTN": "Bhutanese Ngultrum",
    "BWP": "Botswanan Pula",
    "BYN": "Belarusian Ruble",
    "BYR": "Belarusian Ruble (pre-2016)",
    "BZD": "Belize Dollar",
    "CAD": "Canadian Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLF": "Chilean Unit of Account (UF)",
    "CLP": "Chilean Peso",
    "CNH": "Chinese Yuan (Offshore)",
    "CNY": "Chinese Yuan",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colón",
    "CUC": "Cuban Convertible Peso",
    "CUP": "Cuban Peso",
    "CVE": "Cape Verdean Escudo",
    "CYP": "Cypriot Pound",
    "CZK": "Czech Republic Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EEK": "Estonian Kroon",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "EUR": "Euro",
    "FJD": "Fijian Dollar",
    "FKP": "Falkland Islands Pound",
    "GBP": "British Pound Sterling",
    "GEL": "Georgian Lari",
    "GGP": "Guernsey Pound",
    "GHS": "Ghanaian Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambian Dalasi",
    "GNF": "Guinean Franc",
    "GRD": "Greek Drachma",
    "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanaese Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "IEP": "Irish Punt",
    "ILS": "Israeli New Sheqel",
    "IMP": "Manx pound",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Króna",
    "JEP": "Jersey Pound",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KGS": "Kyrgystani Som",
    "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc",
    "KPW": "North Korean Won",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge",
    "LAK": "Laotian Kip",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar",
    "LSL": "Lesotho Loti",
    "LTL": "Lithuanian Litas",
    "LVL": "Latvian Lats",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Myanma Kyat",
    "MNT": "Mongolian Tugrik",
    "MOP": "Macanese Pataca",
    "MRO": "Mauritanian Ouguiya (pre-2018)",
    "MRU": "Mauritanian Ouguiya",
    "MTL": "Maltese Lira",
    "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa",
    "MWK": "Malawian Kwacha",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Nuevo Sol",
    "PGK": "Papua New Guinean Kina",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Zloty",
    "PYG": "Paraguayan Guarani",
    "QAR": "Qatari Rial",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychellois Rupee",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SIT": "Slovenian Tolar",
    "SKK": "Slovak Koruna",
    "SLL": "Sierra Leonean Leone",
    "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar",
    "SSP": "South Sudanese Pound",
    "STD": "São Tomé and Príncipe Dobra (pre-2018)",
    "STN": "São Tomé and Príncipe Dobra",
    "SVC": "Salvadoran Colón",
    "SYP": "Syrian Pound",
    "SZL": "Swazi Lilangeni",
    "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni",
    "TMT": "Turkmenistani Manat",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "USD": "United States Dollar",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistan Som",
    "VEB": "Venezuelan Bolívar (pre-2008)",
    "VEF": "Venezuelan Bolívar Fuerte (Old)",
    "VES": "Venezuelan Bolívar Soberano",
    "VND": "Vietnamese Dong",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tala",
    "XAF": "CFA Franc BEAC",
    "XAG": "Silver Ounce",
    "XAU": "Gold Ounce",
    "XCD": "East Caribbean Dollar",
    "XCP": "Copper Ounce",
    "XDR": "Special Drawing Rights",
    "XOF": "CFA Franc BCEAO",
    "XPD": "Palladium Ounce",
    "XPF": "CFP Franc",
    "XPT": "Platinum Ounce",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMK": "Zambian Kwacha (pre-2013)",
    "ZMW": "Zambian Kwacha",
    "ZWD": "Zimbabwean Dollar (pre-2009)",
    "ZWL": "Zimbabwean Dollar"
}
export default function ConvertCurrency({ coin, currencyAbbreviation }) {
    const { currency: pageCurrency, symbol: pageSymbol } = CurrencyState();

    const [targetName, setTargetname] = useState({ short: pageCurrency, long: currencyAbbr[pageCurrency.toLowerCase()] });

    const [coinInputValue, setCoinInputValue] = useState(1.00)

    const [targetRate, setTargetRate] = useState(coin.market_data.current_price[targetName.short.toLowerCase()]);

    const [targetInputValue, setTargetInputValue] = useState(targetRate)

    useEffect(() => {



    }, [targetRate, pageCurrency])



    const calculateRate = (primary, secondary) => {
        console.log(targetRate)
        console.log(primary * targetRate)
        return (primary * targetRate)
    }

    const changeCoinInput = ({ target: { value } }) => {
        setCoinInputValue(value)
        setTargetInputValue(value * targetRate)
    }
    const changeTargetInput = ({ target: { value } }) => {
        setTargetInputValue(value)
        setCoinInputValue(value / targetRate)
    }

    return (
        <ContainerLayout>
            <div className='flex flex-col gap-3'>
                <span className='text-xl font-semibold'>Currency Converter</span>
                <TextField
                    type="number"
                    onChange={changeCoinInput}
                    value={coinInputValue}
                    InputProps={{
                        step: "1", lang: "en-US", style: { color: 'white'},
                        sx: { "& input": { textAlign: "right" } },
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className='text-white'>{coin.symbol.toUpperCase()}</span>
                            </InputAdornment>

                        ),
                    }}
                />

                <TextField
                    type="number"
                    onChange={changeTargetInput}
                    value={targetInputValue}
                    InputProps={{
                        step: "1", lang: "en-US", style: { color: 'white' },
                        sx: { "& input": { textAlign: "right" } },
                        startAdornment: (
                            <InputAdornment position="start">
                                <span className='text-white'>{targetName.short}</span>
  
                            </InputAdornment>
                        ),
                    }}
                />

                <span className='text-sm'>1 {coin.name} = {targetRate} {targetName.short}</span>
            </div>
        </ContainerLayout>
    )
}

// export async function getServerSideProps() {
//     const data = (await (await fetch('https://openexchangerates.org/api/currencies.json?prettyprint=true&=true&show_inactive=true')).json())
//     return {
//         props: { currencyAbbreviation: data }, // will be passed to the page component as props
//     }
// }