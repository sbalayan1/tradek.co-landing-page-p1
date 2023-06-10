// import React from 'react';
"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
      title: {
        text: 'Chart.js Line Chart',
      },
    },
};

const createProfitLoss = (balance: number) => {
    const direction = Math.random()
    const amount = Math.floor(Math.random() * 100)
    balance = direction >= 0.5 ? balance + amount : balance - amount
    return balance
}

interface Profit {
    date: Date
    profit: number
}

const buildData = () => {
    const result: Profit[] = [{date: new Date('9/13/2020'), profit: 0}]
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
            profit: createProfitLoss(current.profit)
        }
        result.push(obj)
    }

    return result
}
 
const profitData: Profit[] = buildData();

export default function PortfolioGraph({ selected }: { selected: string}) {
    const getSubData = () => {
        if (selected === "1d") return profitData.slice(-1)
        if (selected === "1w") return profitData.slice(-7)
        if (selected === "1m") return profitData.slice(-30)
        if (selected === "3m") return profitData.slice(-90)
        if (selected === "YTD") return profitData.slice(-266)
        if (selected === "1y") return profitData.slice(-365)
        return profitData.slice()
    }

    const subData = getSubData()
    // const today = new Date()// get today's date
    // const sortedData = subData.sort()

    const graphData = {
        labels: subData.map(obj => obj.date.toLocaleDateString()),
        datasets: [{
            data: subData.map(obj => obj.profit),
            borderColor: '#FF0000',
            backgroundColor: '#FF0000',
            pointStyle: false
        }]
    }

    return <Line options={options} data={graphData} />
}