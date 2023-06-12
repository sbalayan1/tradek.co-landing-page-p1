const Alpaca = require('@alpacahq/alpaca-trade-api');

const alpaca = new Alpaca({
  keyId: 'PK7H5L487HMEI0TOC0DT',
  secretKey: 'RBJ0MUgBbo6edCFUT29LOJOnW1OYDrbemQZgExAv',
  paper: true
});

const getTrades = async () => {
    try {
        const trades = await alpaca.getQuotesV2('AAPL', {
            start: "2022-03-10T00:00:00Z",
            end: "2022-03-10T23:59:59Z",
            limit: 5
        });

        const quoteData = []
        for await (const t of trades) {
            console.log('firing')
            quoteData.push(t)
        }

        return quoteData
    } catch(err) {
        console.log(err)
    }
};

const trades = getTrades()
trades.then(res => console.log(res))