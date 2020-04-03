import React, { Component, Fragment } from 'react';
import { Layout, Table, InputNumber, Badge, Dropdown, Button, message, Modal } from 'antd';
import {
	consultaViajes,
	consultaTramos,
	consultaTipoViajes,
	confirmaViaje,
} from './ConfirmacionActions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { confirm } = Modal;

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
		tipoViaje: [],
		selectedRowKeys: [],
	};
	dias = (distancia, id) => {
		const { tipoViaje, data } = this.state;
		let dias;
		tipoViaje.map((tipos) => {
			if (distancia + 1 - 1 < tipos.kmsFin && distancia + 1 - 1 > tipos.kmsIni) {
				dias = tipos.numDias;
			}
			return tipos;
		});
		data.map((viaje) => {
			if (id === viaje.key) {
				viaje['diasD'] = dias;
			}
			return viaje;
		});
		return dias;
	};
	disel = (record) => {
		const { tipoViaje, data } = this.state;
		let disel,
			tipo = 'Loc';
		if (record.totalDistancia > 150) tipo = 'For';
		tipoViaje.map((tipos) => {
			if (
				record.totalDistancia + 1 - 1 < tipos.kmsFin &&
				record.totalDistancia + 1 - 1 > tipos.kmsIni
			) {
				disel =
					(record.totalDistancia /
						tipos[record.unidad.slice(0, record.unidad.search('-')) + '_Rend' + tipo]) *
					record.disel;
			}
			return tipos;
		});
		data.map((viaje) => {
			if (record.key === viaje.key) {
				viaje['diselD'] = parseFloat(disel).toFixed(2);
			}
			return viaje;
		});
		return parseFloat(disel).toFixed(2);
	};

	diselTramo = (distancia, diselP, unidad) => {
		const { tipoViaje } = this.state;
		let disel,
			tipo = 'Loc';
		if (distancia > 150) tipo = 'For';
		tipoViaje.map((tipos) => {
			if (distancia + 1 - 1 < tipos.kmsFin && distancia + 1 - 1 > tipos.kmsIni) {
				disel =
					(distancia / tipos[unidad.slice(0, unidad.search('-')) + '_Rend' + tipo]) *
					diselP;
			}
			return tipos;
		});
		return parseFloat(disel).toFixed(2);
	};
	comision = (record) => {
		const { tipoViaje, data } = this.state;
		let comision;
		tipoViaje.map((tipos) => {
			if (
				record.totalDistancia + 1 - 1 < tipos.kmsFin &&
				record.totalDistancia + 1 - 1 > tipos.kmsIni
			) {
				comision = tipos[record.unidad.slice(0, record.unidad.search('-')) + '_comision'];
			}
			return tipos;
		});
		data.map((viaje) => {
			if (record.key === viaje.key) {
				viaje['comisionD'] = parseFloat(comision).toFixed(2);
			}
			return viaje;
		});
		return parseFloat(comision).toFixed(2);
	};
	alimentos = (distancia, id) => {
		const { tipoViaje, data } = this.state;
		let alimentos;
		tipoViaje.map((tipos) => {
			if (distancia + 1 - 1 < tipos.kmsFin && distancia + 1 - 1 > tipos.kmsIni) {
				alimentos = tipos.viaticos;
			}
			return tipos;
		});
		data.map((viaje) => {
			if (id === viaje.key) {
				viaje['alimentosD'] = alimentos;
			}
			return viaje;
		});
		return alimentos;
	};
	grupo = (distancia) => {
		const { tipoViaje } = this.state;
		let grupo;

		tipoViaje.map((tipos) => {
			if (distancia + 1 - 1 < tipos.kmsFin && distancia + 1 - 1 > tipos.kmsIni) {
				grupo = tipos.descripcion;
			}
			return tipos;
		});
		return grupo;
	};
	handleChange = (id, value, columna) => {
		const { data } = this.state;
		data.map((viaje) => {
			if (id === viaje.key) {
				viaje[columna] = value;
			}
			return viaje;
		});
		this.setState({
			data,
		});
	};
	estatus = (label) => {
		let badge = 'error';
		if (label === 'Pendiente') {
			badge = 'warning';
		}
		if (label === 'Aprobado') {
			badge = 'success';
		}
		return (
			<Dropdown>
				<div>
					{label} <Badge status={badge} />
				</div>
			</Dropdown>
		);
	};
	expandedRowRender = (record) => {
		const columns = [
			{ title: 'Numero Tramo', dataIndex: 'indexRoute', key: 'idexRoute' },
			{ title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
			{ title: 'Destino', dataIndex: 'destino', key: 'destino' },
			{ title: 'Entrega', dataIndex: 'entrega', key: 'entrega' },
			{ title: 'Distancia', dataIndex: 'distancia', key: 'distancia' },
			{
				title: 'DISEL',
				dataIndex: 'disel',
				key: 'disel',
				render: (text, recordT) => (
					<InputNumber
						defaultValue={this.diselTramo(
							recordT.distancia,
							record.disel,
							record.unidad
						)}
						style={{ width: '75px' }}
						disabled
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					/>
				),
			},
			{ title: 'Casetas', dataIndex: 'casetas', key: 'casetas' },
		];
		return <Table columns={columns} dataSource={record.tramos} pagination={false} />;
	};
	monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

	componentDidMount = () => {
		const { data } = this.state;
		this.setState({
			loading: true,
		});

		consultaTipoViajes().then((response) => {
			this.setState({
				tipoViaje: response.payload,
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
					render: (text) => (
						<InputNumber
							value={text}
							style={{ width: '75px' }}
							disabled
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
					render: (text, record) => (
						<InputNumber
							style={{ width: '50px' }}
							defaultValue={this.dias(record.totalDistancia, record.key)}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) => this.handleChange(record.key, value, 'dias')}
						/>
					),
				},
				{
					title: 'PRECIO',
					dataIndex: 'precio',
					key: 'precio',
					render: (text, record) => (
						<InputNumber
							style={{ width: '100%' }}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) => this.handleChange(record.key, value, 'precio')}
						/>
					),
				},
				{
					title: 'DIESEL',
					dataIndex: 'disel',
					key: 'disel',
					render: (text, record) => (
						<InputNumber
							defaultValue={this.disel(record)}
							style={{ width: '75px' }}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) =>
								this.handleChange(record.key, value, 'diselChange')
							}
						/>
					),
				},
				{
					title: 'TOTAL DE CASETAS',
					dataIndex: 'totalDeCasetas',
					key: 'totalDeCasetas',
					render: (text, record) => (
						<InputNumber
							value={text}
							style={{ width: '70px' }}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) =>
								this.handleChange(record.key, value, 'totalDeCasetas')
							}
						/>
					),
				},
				{
					title: 'ALIMENTOS',
					dataIndex: 'alimentos',
					key: 'alimentos',
					render: (text, record) => (
						<InputNumber
							style={{ width: '100%' }}
							defaultValue={this.alimentos(record.totalDistancia, record.key)}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) => this.handleChange(record.key, value, 'alimentos')}
						/>
					),
				},
				{
					title: 'TRANSITO',
					dataIndex: 'transito',
					key: 'transito',
					render: (text, record) => (
						<InputNumber
							style={{ width: '100%' }}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) => this.handleChange(record.key, value, 'transito')}
						/>
					),
				},
				{
					title: 'MANIOBRAS',
					dataIndex: 'maniobras',
					key: 'maniobras',
					render: (text, record) => (
						<InputNumber
							style={{ width: '100%' }}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) => this.handleChange(record.key, value, 'maniobras')}
						/>
					),
				},
				{
					title: 'COMISION',
					dataIndex: 'comision',
					key: 'comision',
					render: (text, record) => (
						<InputNumber
							style={{ width: '100%' }}
							defaultValue={this.comision(record)}
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							onChange={(value) => this.handleChange(record.key, value, 'comision')}
						/>
					),
				},
				{
					title: 'APP',
					dataIndex: 'app',
					key: 'app',
				},
			];
			consultaViajes().then((response) => {
				let viajes = response.payload;
				if (response.headerResponse.code === 404) {
					viajes = [];
					this.setState({
						columns,
						data: viajes,
						loading: false,
					});
				} else {
					viajes.map((item, index) => {
						consultaTramos(item.id).then((response) => {
							const tram = [];
							if (Array.isArray(response.payload)) {
								response.payload.map((item, index) => {
									tram.push({
										key: 'T' + item.id,
										indexRoute: item.tramo,
										fecha: item.fecha,
										origen: item.origen,
										destino: item.destino,
										entrega: item.entrega,
										casetas: item.casetas,
										distancia: item.distancia,
									});
									return item;
								});
							}
							data.push({
								key: item.id,
								baseDeOperaciones: item.base_operaciones,
								cliente: item.cliente,
								destino: item.destino,
								entrega: item.ruta,
								fechaDeCarga: item.fecha_carga,
								fechaDeEntrega: item.fechaEntregaTemporal,
								unidad: item.unidad,
								operador: item.operador,
								disel: item.diesel,
								totalDeCasetas: item.casetas,
								totalDistancia: parseFloat(item.distancia).toFixed(2),
								grupo: this.grupo(item.distancia),
								tramos: tram,
								app: this.estatus(item.estatusOperador),
								appEstatus: item.estatusOperador,
								precio: 0,
								transito: 0,
								maniobras: 0,
							});
							this.setState({
								columns,
								data,
								loading: false,
							});
							return tram;
						});
						return item;
					});
				}
			});
		});
	};
	onSelectChange = (selectedRowKeys) => {
		const { data } = this.state;
		let mod = false,
			id,
			operador,
			cliente;
		const selectItems = selectedRowKeys.filter((item) => {
			let re = false;
			data.map((element) => {
				if (element.key === item) {
					if (element.appEstatus === 'Aprobado') {
						re = true;
					} else {
						mod = true;
						id = item;
						operador = element.operador;
						cliente = element.cliente;
					}
				}
				return element;
			});
			return re;
		});
		if (mod) {
			confirm({
				title: `El conductor ${operador} no ha aceptado el viaje del cliente ${cliente}. ¿Quieres continuar?`,
				icon: <ExclamationCircleOutlined />,
				okText: 'Si',
				cancelText: 'No',
				onOk: () => {
					this.handleChange(id, 'Aprobado', 'appEstatus');
					/* this.handleChange(id, this.estatus('Aprobado'), 'app'); */
					this.onSelectChange(selectedRowKeys);
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		}
		this.setState({ selectedRowKeys: selectItems });
	};
	confirmaViaje = () => {
		const { selectedRowKeys, data } = this.state;
		let viajeDelete;
		selectedRowKeys.map((item) => {
			data.map((element) => {
				if (element.key === item) {
					const request = {
						idViaje: element.key,
						precio: element.precio,
						dias: element.dias ? element.dias : element.diasD,
						disel: element.diselChange ? element.diselChange : element.diselD,
						casetas: element.totalDeCasetas,
						alimentos: element.alimentos ? element.alimentos : element.alimentosD,
						comision: element.comisionD,
						transito: element.transito,
						maniobras: element.maniobras,
						direccion_cliente: element.tramos[0].entrega,
					};
					confirmaViaje(request).then((response) => {
						if (response.headerResponse.code === 400) {
							message.error(
								'No puedes mandar campos vacios ' + response.payload.Faltantes
							);
						}
						if (response.headerResponse.code === 200) {
							message.success('Viaje confirmado exitosamente');
							viajeDelete = response.payload.sqlEstatusUpdate;
							const { data } = this.state;
							this.setState({
								data: data.filter((via) => viajeDelete !== via.key),
							});
						}
					});
				}
				return element;
			});
			return item;
		});
	};
	render() {
		const { data, columns, loading, selectedRowKeys } = this.state;
		const hasSelected = selectedRowKeys.length > 0;
		return (
			<Fragment>
				<Content>
					<Layout style={{ padding: '24px 24px', background: '#fff' }}>
						<div style={{ marginBottom: 16 }}>
							<Button
								type="primary"
								onClick={this.confirmaViaje}
								disabled={!hasSelected}
								loading={loading}
							>
								PLANEAR
							</Button>
							<span style={{ marginLeft: 8 }}>
								{hasSelected ? `Seleccionado ${selectedRowKeys.length} viajes` : ''}
							</span>
						</div>
						<Table
							rowSelection={{
								type: 'checkbox',
								selectedRowKeys,
								onChange: this.onSelectChange,
							}}
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
