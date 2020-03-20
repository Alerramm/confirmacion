import React, { Component } from 'react';
import Barras from './../../components/Charts/Bar/Bar';
import Dona from './../../components/Charts/Doughnut/Doughnut';
import Linea from './../../components/Charts/Line/Line';
import { Row, Col } from 'antd';

class Analitycs extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col span={12}>
						<Barras />
					</Col>
					<Col span={12}>
						<Dona />
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Linea />
					</Col>
				</Row>
			</div>
		);
	}
}
export default Analitycs;
