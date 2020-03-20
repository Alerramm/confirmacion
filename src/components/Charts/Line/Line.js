import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';

const data = {
	labels: [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	],
	datasets: [
		{
			label: 'Cobrado',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(166, 166, 166, 0.81)',
			borderColor: 'rgba(0, 0, 0, 0.81)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(0, 0, 0, 0.81)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(59, 59, 59, 0.81)',
			pointHoverBorderColor: 'rgba(59, 59, 59, 0.81)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [
				195000,
				230000,
				150000,
				250000,
				201000,
				110000,
				200000,
				260000,
				200000,
				204000,
				183000,
				200000,
			],
		},
		{
			label: 'Vendido',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(255, 0, 0, 0.62)',
			borderColor: 'rgba(255, 0, 0, 0.78)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(255, 0, 0, 1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
			pointHoverBorderColor: 'rgba(255, 0, 0, 1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [
				200526,
				251000,
				190000,
				300000,
				201000,
				195000,
				210000,
				250000,
				198000,
				205000,
				183000,
				186000,
			],
		},
	],
};

const Linea = () => {
	return (
		<Card title="Cobranza 2019" bordered={false}>
			<Line data={data} height={50} weight={300} />
		</Card>
	);
};
export default Linea;
