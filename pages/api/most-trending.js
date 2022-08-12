
export const getMostTrending = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`).catch((e) => console.log(e))
    const data = await res.json()
    return data;
  }
  
  export default function handler(req, res) {
    getMostTrending()
      .then((data) => {
  
        res.status(200).json({ data })
      });
  
  }
  