// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const getTrendingCoins = async (currency, amount = 20) => {

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency?.toLowerCase()}&order=market_cap_desc&per_page=${amount}&page=1&sparkline=false`).catch((e) => console.log(e))

  const data = await res.json()
  return data;
}

export const getMarketChart = async (currency, coins, sparkline = false) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${coins ? `ids=${coins}` : ''}&order=market_cap_desc&per_page=100&page=1&sparkline=${sparkline}&price_change_percentage=7d%2C30d%2C1h`).catch((e) => console.log(e))

  const data = await res.json()
  return data;

}
export const globalStats = async()=>{
    const res = await fetch(`https://api.coingecko.com/api/v3/global`).catch((e) => console.log(e))
  const data = await res.json()
  return data;
}

export default function handler(req, res) {
  console.log(req)
  getTrendingCoins(req.body.currency)
    .then((data) => {

      res.status(200).json({ data })
    });

}
