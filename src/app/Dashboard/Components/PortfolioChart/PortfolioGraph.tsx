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
      border: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    },
    y: {
      border: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    }
  }
};

import { Profit } from '@/app/globalInterfaces'


export default function PortfolioGraph({ data, profit }: { data: Profit[], profit: number }) {
  const color = profit > 0 ? "#00FF00" : "#FF0000"
  const graphData = {
      labels: data.map(obj => obj.date.toLocaleDateString()),
      datasets: [{
          data: data.map(obj => obj.balance),
          borderColor: color,
          backgroundColor: color,
          pointStyle: false
      }]
  }

    return (<Line options={options} data={graphData}/>)
}