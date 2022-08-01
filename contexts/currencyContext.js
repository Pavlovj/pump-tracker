import React, { createContext, useContext, useState, useEffect } from 'react'
const Currency = createContext();

const currenciesDumps = {
    EUR: {
        short: 'EUR',
        long: 'Euro',
        symbol: '€'
    },
    USD: {
        short: 'USD',
        long: 'US Dollar',
        symbol: '$'
    }
}


export const CurrencyContext = ({ children }) => {
    const [currency, setCurrency] = useState('EUR');
    const [symbol, setSymbol] = useState('')

    useEffect(() => {
        if (currenciesDumps[currency]) setSymbol(currenciesDumps[currency].symbol)
    }, [currency])

    return <Currency.Provider value={{ currency, setCurrency, symbol }}>{children}</Currency.Provider>;
}


export const CurrencyState = () => {
    return useContext(Currency)
}


