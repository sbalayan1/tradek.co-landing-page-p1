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


export default function Stock({ stock }: { stock: string}) {
    const graphData = {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [{
            data: [5,10,15,20,25,30,35,40,45,50],
            borderColor: '#FF0000',
            backgroundColor: '#FF0000',
            pointStyle: false
        }]
    }
  
    return (
        <div className="flex justify-between">
            <div>
                <Line options={options} data={graphData}/>
            </div>
            <div>
                <h1>Current Price</h1>
                <h2>% change</h2>
            </div>
        </div>
    )
}