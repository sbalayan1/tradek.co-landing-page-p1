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

import { isValidProfitData } from '@/app/utils/UserDataUtils/buildPortfolioData';
import { Profit, Quote } from '@/app/globalInterfaces'

interface GraphData {
	[key: string]: Number[] | string[] 
}

function createDataAndLabels(data: Profit[] | Quote[]): GraphData {
	const res: GraphData = {}
	if (isValidProfitData(data)) {
		res['labels'] = data.map(obj => obj.date.toLocaleDateString())
		res['data'] = data.map(obj => obj.balance)
	} else {
		res['labels'] = data.map(quote => quote.t.split('T')[1])
		res['data'] = data.map(quote => quote.c)
	}
	return res
}


export default function Graph({ data, profit }: { data: Profit[] | Quote[], profit: number }) {
  const color = profit > 0 ?  '#4A8532': '#B80300'
  const graphData = {
      labels: createDataAndLabels(data).labels,
      datasets: [{
				data: createDataAndLabels(data).data,
				borderColor: color,
				backgroundColor: color,
				pointStyle: false
      }]
  }

	return (
		<div className="w-full h-full">
			<Line className="w-full" options={options} data={graphData}/>
		</div>)
}