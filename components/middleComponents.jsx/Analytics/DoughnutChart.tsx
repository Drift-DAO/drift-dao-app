import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
	labels: ['Passed', 'Failed', 'Pending'],
	datasets: [
		{
			label: '',
			data: [12, 19, 3],
			backgroundColor: [
				'rgba(124,252,0, 0.8)',
				'rgba(255, 0, 0, 0.7)',
				'rgba(108, 122, 137, 0.7)',
			],
			borderColor: [
				'rgba(60, 179, 113, 1)',
				'rgba(255, 0, 0, 1)',
				'rgba(108, 122, 137, 1)',
			],
			borderWidth: 1,
		},
	],
};

export default function DoughnutChart() {
	return (
		<div
			style={{ height: 600, width: 600 }}
			className="container mx-auto my-32 bg-white py-10 px-5 rounded-2xl"
		>
			<div
				className="text-xl pb-4 font-bold text-pink-500"
				style={{ textAlign: 'center' }}
			>
				Proposal status
			</div>
			<Doughnut data={data} />
		</div>
	);
}
