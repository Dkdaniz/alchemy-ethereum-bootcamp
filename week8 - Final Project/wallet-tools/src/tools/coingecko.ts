import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3'

interface prices {
    coin: string;
    price: number;
}

const getPriceCoins = async (symbols: string[]): Promise<prices[]> => {
    const coinListResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);

    const coingekoDataCoins = [];

    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];

        for (let j = 0; j < coinListResponse.data.length; j++) {
            const coin = coinListResponse.data[j];
            coin.symbol === symbol.toLowerCase() ? coingekoDataCoins.push({ name: coin.id, symbol: symbol }) : ''
        }
    }

    const symbolsCoingeko = coingekoDataCoins.map(((coin: any) => coin.name))

    const coinsParam = symbolsCoingeko.join().toLowerCase()

    const priceResponse = await axios.get(`${BASE_URL}/simple/price?ids=${coinsParam}&vs_currencies=usd&precision=8`)

    const pricesArray = Object.entries(priceResponse.data);

    const prices = [];

    for (let i = 0; i < coingekoDataCoins.length; i++) {
        const coinInfo = coingekoDataCoins[i];
        for (let j = 0; j < pricesArray.length; j++) {
            const coinPrice: any = pricesArray[j];

            if (coinPrice[0] === coinInfo.name){
                prices.push({ coin: coinInfo.symbol, price: parseFloat(coinPrice[1].usd) })
            }
        }
    }
    
    return [...new Map(prices.map((m) => [m.coin, m])).values()];
}

const getPriceChart =  async (symbol: string): Promise<any> => {
    const coinListResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=30`);
    const {prices} = coinListResponse.data;

    return prices;
}

export {
    getPriceCoins,
    getPriceChart
}