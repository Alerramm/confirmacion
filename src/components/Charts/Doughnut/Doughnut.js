import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

const data = {
	labels: ['AQUAPRIMA', 'BACARDI', 'DILTEX'],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
			hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
		},
	],
};

const Dona = () => {
	return (
		<Card title="Clientes" bordered={false}>
			<Doughnut data={data} height={100} />
		</Card>
	);
};
export default Dona;
