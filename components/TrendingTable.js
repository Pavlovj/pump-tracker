
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container, FormControl, Input, InputAdornment, InputLabel, LinearProgress, OutlinedInput, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMarketChart, getTrendingCoins, globalStats } from '../pages/api/trending';
import { CurrencyState } from '../contexts/currencyContext';
import Image from 'next/image';
import { colorPercentage } from '../utils/colorText';
import { abbreviateNumber, numberWithCommas } from '../utils/convert';
import { FaSearch } from 'react-icons/fa';

function createData(coin, idx) {
    return {
        rank: idx,
        coin: [coin.name, coin.symbol, coin.image],
        price: coin.current_price.toFixed(2),
        '1h': coin.price_change_percentage_1h_in_currency.toFixed(1),
        '24h': coin.price_change_percentage_24h.toFixed(1),
        '7d': coin.price_change_percentage_7d_in_currency.toFixed(1),
        ath: [coin.ath.toFixed(3), coin.ath_change_percentage.toFixed(1)],
        mktCap: coin.market_cap,
        '7dGraph': coin.sparkline_in_7d.price
    };
}

;

export const TrendingTable = () => {
    const columns = [
        { id: 'rank', label: '#', minWidth: 40, align: 'center', format: (val) => ++val },
        {
            id: 'coin', label: 'Coin', minWidth: 130, format: ([name, symbol, image]) => {
                return (<div className='flex flex-wrap'>
                    <Image
                        className=''
                        src={image}
                        alt={name}
                        height={20}
                        width={20}
                        unoptimized={true}
                    />
                    <span className='font-extrabold px-2 text-white'>{name}</span>
                    <span className='top-1 align-super text-xs'>{symbol?.toUpperCase()}</span>

                </div>)
            }
        },
        { id: 'price', label: 'Price', align: 'right', format: (val) => `${symbol}${numberWithCommas(val)}` },
        { id: '1h', label: '1h', align: 'center', format: (val) => colorPercentage(val) },
        { id: '24h', label: '24h', align: 'center', format: (val) => colorPercentage(val) },
        { id: '7d', label: '7d', align: 'center', format: (val) => colorPercentage(val) },
        {
            id: 'ath', label: 'All Time High (ATH)', align: 'right', format: ([ath, percentage]) => {
                return (
                    <div className='flex flex-wrap justify-end'>
                        <span className=''>{symbol}{numberWithCommas(ath)}</span>
                        <span className='top-1 align-super  pl-1 text-xs'>{colorPercentage(percentage)}</span>
                    </div>
                )

            }
        },
        { id: 'mktCap', label: 'Market Cap', align: 'right', format: (val) => `${symbol}${numberWithCommas(val)}` },
        // { id: '7dGraph', label: 'Last 7 days', align: 'center' },
    ];



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [loading, setLoading] = useState(true)

    const [rows, setRows] = useState([])
    const [search, setSearch] = useState('');
    const [globalCap, setGlobalCap] = useState(0)

    const { currency, symbol } = CurrencyState();



    const fetchCoins = async () => {
        setLoading(true);
        const data = await getMarketChart(currency, undefined, true)

        setRows(data.map((x, y) => createData(x, y)))
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency])


    const handleSearch = () => {
        return search.length
            ? rows.filter(({ coin: [name, symbol] }) => {
                return name.toLowerCase().indexOf(search.toLowerCase()) > -1 || symbol.toLowerCase().indexOf(search.toLowerCase()) > -1;
            })
            : rows
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container>
            <div className='flex flex-col justify-center py-6'>
                <span className='text-2xl'>Today&apos;s Cryptocurrency Prices</span>
                <span className='text-sm'>The global cryptocurrency market cap today is <span className='text-blue-300'>$$$</span> a -99% change in the last 24 hours.</span>
                <TextField
                    sx={{ input: { color: 'white' } }}
                    color='primary'
                    className='min-w-full mt-5 '
                    label='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {loading ?

                    (<LinearProgress />) :
                    (
                        <>
                            <TableContainer sx={{}} className='bg-gray-900'>
                                <Table stickyHeader aria-label="sticky table" >
                                    <TableHead >
                                        <TableRow >
                                            {columns.map((column) => (
                                                <TableCell className='bg-blue-400 border-0 font-bold'
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch()
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow
                                                        // TODO add onClick history dynamic path slug
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.rank}
                                                    >
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    className='text-slate-400'
                                                                >
                                                                    {column.format
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                className='bg-blue-400 '
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>)}


            </Paper>

        </Container>
    );
}
