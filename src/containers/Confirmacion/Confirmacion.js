import React, { Component, Fragment } from 'react';
import { Layout, Table, InputNumber } from 'antd';
import { consultaViajes, consultaTramos } from './ConfirmacionActions';
const { Content } = Layout;
class Confirmacion extends Component {
	state = {
		data: [],
		columns: [],
		loading: false,
		id: 0,
		parcial: false,
		monto: 0,
		tipo: '',
		btnAplicar: true,
		idKey: '',
	};
	expandedRowRender =  record => {
		const columns = [
			{ title: 'Numero Tramo', dataIndex: 'indexRoute', key: 'idexRoute' },
			{ title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
			{ title: 'Destino', dataIndex: 'destino', key: 'destino' },
			{ title: 'Entrega', dataIndex: 'entrega', key: 'entrega' },
			{ title: 'Casetas', dataIndex: 'casetas', key: 'casetas' },
			{ title: 'Distancia', dataIndex: 'distancia', key: 'distancia' },
		];
		return <Table columns={columns} dataSource={record.tramos} pagination={false} />;
	};
	monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

	componentDidMount = () => {
		const { data } = this.state;
		this.setState({
			loading: true,
		});
		let columns = [
			{
				title: 'BASE DE OPERACIONES',
				dataIndex: 'baseDeOperaciones',
				key: 'baseDeOperaciones',
			},
			{
				title: 'CLIENTE',
				dataIndex: 'cliente',
				key: 'cliente',
			},
			{
				title: 'DESTINO',
				dataIndex: 'destino',
				key: 'destino',
			},
			{
				title: 'FECHA DE CARGA',
				dataIndex: 'fechaDeCarga',
				key: 'fechaDeCarga',
			},
			{
				title: 'FECHA DE ENTREGA',
				dataIndex: 'fechaDeEntrega',
				key: 'fechaDeEntrega',
			},
			{
				title: 'UNIDAD',
				dataIndex: 'unidad',
				key: 'unidad',
			},
			{
				title: 'OPERADOR',
				dataIndex: 'operador',
				key: 'operador',
			},
			{
				title: 'TOTAL DE CASETAS',
				dataIndex: 'totalDeCasetas',
				key: 'totalDeCasetas',
				render: text => (
					<InputNumber
						value={text}
						style={{ width: '100%' }}
						disabled
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				),
			},
			{
				title: 'DISEL',
				dataIndex: 'disel',
				key: 'disel',
			},
			{
				title: 'TOTAL DISTANCIA KM',
				dataIndex: 'totalDistancia',
				key: 'totalDistancia',
				render: text => (
					<InputNumber
						value={text}
						style={{ width: '100%' }}
						disabled
						formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				),
			},
		];
		
		consultaViajes().then(response => {
			let viajes = response.payload;
			/* const semana1 = new Date(
				Date.UTC(semanaUno.getFullYear(), semanaUno.getMonth(), semanaUno.getDate(), 6, 0, 0)
			); */
			if (viajes === null){
				viajes=[];
				this.setState({
					columns,
					data:viajes,
					loading:false
				});
			} else {
				viajes.map((item, index) => {
					consultaTramos(item.id).then(response => {
						const tram=[];
						if(Array.isArray(response.payload)){
							response.payload.map((item, index) => {
								tram.push({
									key: "T"+item.id,
									indexRoute:item.tramo,
									fecha:item.fecha,
									origen:item.origen,
									destino:item.destino,
									entrega:item.entrega,
									casetas:item.casetas,
									distancia:item.distancia,
								});
								return item;
							});
						}
						data.push({
							key: item.id,
							baseDeOperaciones:item.base_operaciones,
							cliente: item.cliente,
							destino:item.destino,
							fechaDeCarga:item.fecha_carga,
							fechaDeEntrega:item.fechaEntregaTemporal,
							unidad:item.unidad,
							operador:item.operador,
							disel: item.diesel,
							totalDeCasetas:item.casetas,
							totalDistancia:item.distancia,
							tramos:tram,
						});
						this.setState({
							columns,
							data,
							loading:false
						});
						return tram;
					});	
					return item;
				});
			}
			
		});
	};
	render() {
		const { data, columns, loading } = this.state;
		return (
			<Fragment>
				<Content>
					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<Table
							className="components-table-demo-nested"
							columns={columns}
							dataSource={data}
							loading={loading}
							expandedRowRender={this.expandedRowRender}
							bordered
							pagination={{ position: 'top' }}
						/>
					</Layout>
				</Content>
			</Fragment>
		);
	}
}
export default Confirmacion;
