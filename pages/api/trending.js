// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const getTrendingCoins = async (currency, amount = 20) => {

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency?.toLowerCase()}&order=market_cap_desc&per_page=${amount}&page=1&sparkline=false`).catch((e) => console.log(e))

  const data = await res.json()
  return data;
}

export default function handler(req, res) {
  getTrendingCoins(req.body.currency)
    .then((data) => {

      res.status(200).json({ data })
    });

}
