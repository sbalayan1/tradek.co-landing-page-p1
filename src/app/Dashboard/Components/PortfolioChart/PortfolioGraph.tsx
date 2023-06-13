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

export const options = {
    // responsive: true,
    plugins: {
      title: {
        text: 'Chart.js Line Chart',
      },
    },
};


interface Profit {
    date: Date
    balance: number
}

export default function PortfolioGraph({ data }: { data: Profit[] }) {
  const graphData = {
      labels: data.map(obj => obj.date.toLocaleDateString()),
      datasets: [{
          data: data.map(obj => obj.balance),
          borderColor: '#FF0000',
          backgroundColor: '#FF0000',
          pointStyle: false
      }]
  }

    return (<Line options={options} data={graphData}/>)
}