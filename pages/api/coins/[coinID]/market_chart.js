import { getUnixTime } from "date-fns";
import { subUnixTimestamp } from "../../../../utils/convert";

export const getCoinChart = async (id, currency, interval) => {

    if (interval.max) {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=max
        `)
        const data = await res.json()
        return data;

    }
    const startTimestamp = subUnixTimestamp(interval)
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=${currency}&from=${startTimestamp}&to=${getUnixTime(Date.now())}`)
    const data = await res.json()
    return data;

}


export default function handler(req, res) {
    getCoinChart(req.body.id, req.body.currency, req.body.interval)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((e) => {
            return res.status(500).send(e.message || e)
        });
}
