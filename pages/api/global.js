
export const globalStats = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/global`).catch((e) => console.log(e))
    const data = await res.json()
    return data;
}


export default function handler(req, res) {
    globalStats(req.body.currency)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((e) => {
            return res.status(500).send(e.message || e)
        });
}