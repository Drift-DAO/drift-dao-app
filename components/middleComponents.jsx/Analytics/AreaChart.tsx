import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			// position: 'top',
		},
		title: {
			display: true,
			text: '',
		},
	},
};

const labels = [
	'Proposal 1',
	'Proposal 2',
	'Proposal 3',
	'Proposal 4',
	'Proposal 5',
	'Proposal 6',
];

export const data = {
	labels,
	datasets: [
		{
			fill: true,
			label: 'Total participation in proposals',
			data: [315, 325, 413, 377, 431, 401],
			borderColor: 'rgb(53, 162, 235)',
			backgroundColor: 'rgba(53, 162, 235, 0.8)',
		},
	],
};

export default function AreaChart() {
	return (
		<div
			style={{ height: '600px', width: '800' }}
			className="container mx-auto my-32 bg-white py-10 px-5 rounded-2xl"
		>
			<div
				className="text-xl font-bold text-pink-500"
				style={{ textAlign: 'center' }}
			>
				Total participation in different proposals
			</div>
			<Line options={options} data={data} />
		</div>
	);
}
