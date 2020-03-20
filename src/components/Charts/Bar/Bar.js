import React from 'react';
import { Bar } from 'react-chartjs-2';
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
			label: 'Ventas',
			backgroundColor: 'rgba(156, 242, 110, 0.84)',
			borderColor: 'rgba(88, 215, 20, 1)',
			borderWidth: 2,
			hoverBackgroundColor: 'rgba(88, 215, 20, 1)',
			hoverBorderColor: 'rgba(88, 215, 20, 1)',
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

const Barras = () => {
	return (
		<Card title="Ventas 2019" bordered={false}>
			<Bar
				data={data}
				height={100}
				options={{
					maintainAspectRatio: true,
				}}
			/>
		</Card>
	);
};
export default Barras;
