
export const getMarketChart = async (currency, coins, sparkline = false) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${coins ? `ids=${coins}` : ''}&order=market_cap_desc&per_page=100&page=1&sparkline=${sparkline}&price_change_percentage=7d%2C30d%2C1h`)
    const data = await res.json()
    return data;
}



export default function handler(req, res) {
    getMarketChart(req.body.currency)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((e) => {
            return res.status(500).send(e.message || e)
        });
}
