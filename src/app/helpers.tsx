interface Profit {
    date: Date
    balance: number
}


const createProfitLoss = (balance: number) => {
    const direction = Math.random()
    const amount = Math.floor(Math.random() * 100)
    balance = direction >= 0.5 ? balance + amount : balance - amount
    return balance
}

const buildData = () => {
    const result: Profit[] = [{date: new Date('9/13/2020'), balance: 0}]
    const start: any = new Date('1/1/1970')
    const today: any = new Date()
    const oneDay = 1000*60*60*24 // calculates the number of milliseconds in one day

    for (let i = 0; i < 1000; i++) {
        const current = result[i]
        const daysPrior = oneDay * (1000 - i - 1)
        const pastDate = new Date(today - start - daysPrior)

        // creates the NEXT obj in the list
        const obj: Profit = {
            date: pastDate,
            balance: createProfitLoss(current.balance)
        }
        result.push(obj)
    }

    return result
}


const getSubData = (tgt: string, arr: Profit[]) => {
    console.log('creating subdata')
    let res = arr.slice()
    if (tgt === "1d") res = arr.slice(-2)
    if (tgt === "1w") res = arr.slice(-7)
    if (tgt === "1m") res = arr.slice(-30)
    if (tgt === "3m") res = arr.slice(-90)
    if (tgt === "YTD") res = arr.slice(-266)
    if (tgt === "1y") res = arr.slice(-365)
    console.log('done')
    return res
}

const calculateProfit = (arr: Profit[]) => {
    let result = 0
    for (let i = 1; i<arr.length; i++) {
        const curr = arr[i]
        const prev = arr[i-1]
        result += curr.balance - prev.balance 
    }

    return result
}

export { getSubData, calculateProfit, buildData }