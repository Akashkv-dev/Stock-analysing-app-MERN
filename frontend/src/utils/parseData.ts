import axios from 'axios';

export async function  getData() {
    const response =await axios.get('https://api.upstox.com/v2/historical-candle/NSE_EQ|INE397D01024/day/2024-06-21',{
        headers:{
            'Accept': 'application/json'
        }
    })
   const data=response.data.data.candles
   const parsedData = data.map((d: (string | number)[]) => ({
    date:new Date(d[0]),
    open: +d[1],
    high: +d[2],
    low: +d[3],
    close: +d[4],
    volume: +d[5],
}));
const sortedData = parsedData.sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => a.date.getTime() - b.date.getTime());

console.log("Sorted Data:", sortedData);
return sortedData;
}
