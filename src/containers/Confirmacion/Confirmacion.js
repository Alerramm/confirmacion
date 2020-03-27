import React, { Component, Fragment } from 'react';
import { Layout, Table, InputNumber } from 'antd';
import { consultaViajes, consultaTramos, consultaTipoViajes } from './ConfirmacionActions';
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
		tipoViaje:[],
	};
	dias = (distancia) => {
		const { tipoViaje } = this.state;
		let dias;
		tipoViaje.map(tipos => {
			if (distancia < tipos.kmsFin && distancia >tipos.kmsIni){
				dias=tipos.numDias;
			}
			return tipos;
		});
		return dias;
	}
	disel = (record) => {
		const { tipoViaje } = this.state;
		let disel,tipo="Loc";
		if (record.totalDistancia > 150) tipo="For";
		 tipoViaje.map(tipos => {
			 if (record.totalDistancia < tipos.kmsFin && record.totalDistancia >tipos.kmsIni){
				disel=record.totalDistancia/tipos[record.unidad.slice(0,record.unidad.search("-"))+"_Rend"+tipo]*record.disel;
			} 
			return tipos;
		}); 
		return parseFloat(disel).toFixed(2);
	}
	comision = (record) => {
		const { tipoViaje } = this.state;
		let comision;
		 tipoViaje.map(tipos => {
			 if (record.totalDistancia < tipos.kmsFin && record.totalDistancia >tipos.kmsIni){
				comision=tipos.numDias*tipos[record.unidad.slice(0,record.unidad.search("-"))+"_comision"];
			} 
			return tipos;
		}); 
		return parseFloat(comision).toFixed(2);
	}
	alimentos = (distancia) => {
		const { tipoViaje } = this.state;
		let alimentos;
		tipoViaje.map(tipos => {
			if (distancia < tipos.kmsFin && distancia >tipos.kmsIni){
				alimentos=tipos.viaticos;
			}
			return tipos;
		});
		return alimentos;
	}
	grupo = (distancia) => {
		const { tipoViaje } = this.state;
		let grupo;
		tipoViaje.map(tipos => {
			if (distancia < tipos.kmsFin && distancia >tipos.kmsIni){
				grupo=tipos.descripcion;
			}
			return tipos;
		});
		return grupo;
	}
	handleChange = (id,value,columna) => {
		const { data } = this.state;
		data.map(viaje => {
			if (id === viaje.key) {
				viaje[columna]=value;
			}
			return viaje;
		});
		this.setState({
			data
		});
	}
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
		
		consultaTipoViajes().then(response => {
			this.setState({
				tipoViaje:response.payload,
			});
			let columns = [
				{
					title: 'FECHA DE CARGA',
					dataIndex: 'fechaDeCarga',
					key: 'fechaDeCarga',
				},
				{
					title: 'CLIENTE',
					dataIndex: 'cliente',
					key: 'cliente',
				},
				{
					title: 'OPERADOR',
					dataIndex: 'operador',
					key: 'operador',
				},
				{
					title: 'UNIDAD',
					dataIndex: 'unidad',
					key: 'unidad',
				},
				{
					title: 'FECHA DE ENTREGA',
					dataIndex: 'fechaDeEntrega',
					key: 'fechaDeEntrega',
				},
				{
					title: 'DESTINO',
					dataIndex: 'destino',
					key: 'destino',
				},
				{
					title: 'ENTREGA',
					dataIndex: 'entrega',
					key: 'entrega',
				},
				{
					title: 'TOTAL DISTANCIA KM',
					dataIndex: 'totalDistancia',
					key: 'totalDistancia',
					render: text => (
						<InputNumber
							value={text}
							style={{ width: '90px' }}
							disabled
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						/>
					),
				},
				{
					title: 'GRUPO',
					dataIndex: 'grupo',
					key: 'grupo',
				},
				{
					title: 'DIAS',
					dataIndex: 'dias',
					key: 'dias',
					render: (text,record) => (
						<InputNumber
							style={{ width: '50px' }}
							defaultValue={this.dias(record.totalDistancia)}
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange = {value => this.handleChange(record.key,value,"dias")}
						/>
					),
				},
				{
					title: 'PRECIO',
					dataIndex: 'precio',
					key: 'precio',
					render: (text,record) => (
						<InputNumber
							style={{ width: '90px' }}
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange = {value => this.handleChange(record.key,value,"precio")}
						/>
					),
				},
				{
					title: 'DISEL',
					dataIndex: 'disel',
					key: 'disel',
					render: (text,record) => (
						<InputNumber
							defaultValue={this.disel(record)}
							style={{ width: '90px' }}
							disabled
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						/>
					),
				},
				{
					title: 'TOTAL DE CASETAS',
					dataIndex: 'totalDeCasetas',
					key: 'totalDeCasetas',
					render: text => (
						<InputNumber
							value={text}
							style={{ width: '70px' }}
							disabled
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						/>
					),
				},
				{
					title: 'ALIMENTOS',
					dataIndex: 'alimentos',
					key: 'alimentos',
					render: (text,record) => (
						<InputNumber
							style={{ width: '100%' }}
							defaultValue={this.alimentos(record.totalDistancia)}
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange = {value => this.handleChange(record.key,value,"alimentos")}
						/>
					),
					
				},
				{
					title: 'TRANSITO',
					dataIndex: 'transito',
					key: 'transito',
					render: (text,record) => (
						<InputNumber
							style={{ width: '100%' }}
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange = {value => this.handleChange(record.key,value,"transito")}
						/>
					),
				},
				{
					title: 'MANIOBRAS',
					dataIndex: 'maniobras',
					key: 'maniobras',
					render: (text,record) => (
						<InputNumber
							style={{ width: '100%' }}
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange = {value => this.handleChange(record.key,value,"maniobras")}
						/>
					),
				},
				{
					title: 'COMISION',
					dataIndex: 'comision',
					key: 'comision',
					render: (text,record) => (
						<InputNumber
							style={{ width: '100%' }}
							defaultValue={this.comision(record)}
							formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange = {value => this.handleChange(record.key,value,"comision")}
						/>
					),
				},
				{
					title: 'APP',
					dataIndex: 'app',
					key: 'app',
				},
			];
			consultaViajes().then(response => {
				let viajes = response.payload;
				if ( response.headerResponse.code === 404){
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
								entrega:item.ruta,
								fechaDeCarga:item.fecha_carga,
								fechaDeEntrega:item.fechaEntregaTemporal,
								unidad:item.unidad,
								operador:item.operador,
								disel: item.diesel,
								totalDeCasetas:item.casetas,
								totalDistancia:parseFloat(item.distancia).toFixed(2),
								grupo:this.grupo(item.distancia),
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
