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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
      title: {
        text: 'Chart.js Line Chart',
      },
      legend: {
        display: false
      }
    },
    legend: {
        display: false
      },
      scales: {
        x: {
          ticks: {
            display: false
          }
        },
        y: {
          ticks: {
            display: false
          }
        }
      }
};

interface Quote {
    t: string, // time
    o: number, // open
    h: number, // high
    l: number, // low
    c: number, // close
    v: number, // volume
    n: number // ? 
    vw: number // ?
}

export default function StockClientComponent({ stockName, stockData }: { stockName: string, stockData: Quote[]}) {
    const openPrice = stockData[0].c
    const currentPrice = stockData[stockData.length-1].c
    const percentageChange: string = (((currentPrice - openPrice)/ openPrice) * 100).toFixed(2)
    const graphColor = parseFloat(percentageChange) > 0 ? true : false
    const color = graphColor ? "#00FF00" : "#FF0000"

    const graphData = {
        labels: stockData.map(quote => quote.t.split('T')[1]),
        datasets: [{
            data: stockData.map(quote => quote.c),
            borderColor: color,
            backgroundColor: color,
            pointStyle: false
        }]
    }
  
    return (
        <div className="flex justify-evenly w-80">
            <div className="w-2/3 flex justify-center ">
                <Line options={options} data={graphData}/>
            </div>
            <div>
                <h1>{currentPrice}</h1>
                <h2 className={`text-sm ${graphColor ? "text-green-500": "text-red-500"}`}>{percentageChange}%</h2>
            </div>
        </div>
    )
}