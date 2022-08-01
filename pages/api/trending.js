// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const getTrendingCoins = async (currency) => {

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=20&page=1&sparkline=false`)
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
