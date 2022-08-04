
export const getCoinOHLC = async (id) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/ohlc`)
    const data = await res.json()
    return data;
}


export default function handler(req, res) {
    getCoinOHLC(req.body.currency)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((e) => {
            return res.status(500).send(e.message || e)
        });
}