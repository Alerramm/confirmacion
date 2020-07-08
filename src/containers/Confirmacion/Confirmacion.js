import React, { Component, Fragment } from 'react';
import {
	Layout,
	Table,
	InputNumber,
	Badge,
	Dropdown,
	Button,
	message,
	Modal,
	Tag,
	Typography,
} from 'antd';
import {
	consultaViajes,
	consultaTramos,
	consultaTipoViajes,
	confirmaViaje,
} from './ConfirmacionActions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { confirm } = Modal;
const { Title } = Typography;

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
		empresa: '',
	};
	/* 	dias = (distancia, id) => {
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
	diesel = (record) => {
		const { tipoViaje, data } = this.state;
		let diesel,
			tipo = 'Loc';
		if (record.totalDistancia > 150) tipo = 'For';
		tipoViaje.map((tipos) => {
			if (
				record.totalDistancia + 1 - 1 < tipos.kmsFin &&
				record.totalDistancia + 1 - 1 > tipos.kmsIni
			) {
				diesel =
					(record.totalDistancia /
						tipos[record.unidad.slice(0, record.unidad.search('-')) + '_Rend' + tipo]) *
					record.diesel;
			}
			return tipos;
		});
		data.map((viaje) => {
			if (record.key === viaje.key) {
				viaje['dieselD'] = parseFloat(diesel).toFixed(2);
			}
			return viaje;
		});
		return parseFloat(diesel).toFixed(2);
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
 */
	//ok
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

	//ok
	estatus = (label) => {
		let badge = '';
		switch (label) {
			case 'Pendiente':
				badge = 'orange';
				break;
			case 'Aprobado':
				badge = 'green';
				break;
			case 'Confirmado':
				badge = 'green';
				break;
			case 'Rechazado':
				badge = 'red';
				break;
			default:
				badge = 'blue';
				break;
		}
		return <Tag color={badge}>{label}</Tag>;
	};

	//ok
	expandedRowRender = (record) => {
		const columns = [
			{ title: 'Id', dataIndex: 'id', key: 'id' },
			{ title: 'Numero Tramo', dataIndex: 'tramo', key: 'tramo' },
			{ title: 'Fecha', dataIndex: 'fecha_tramo', key: 'fecha_tramo' },
			{ title: 'Destino', dataIndex: 'destino_tramo', key: 'destino_tramo' },
			{ title: 'Entrega', dataIndex: 'entrega_tramo', key: 'entrega_tramo' },
			{ title: 'Distancia', dataIndex: 'distancia_tramo', key: 'distancia_tramo' },
			{ title: 'Casetas', dataIndex: 'casetas_tramo', key: 'casetas_tramo' },
		];
		return <Table columns={columns} dataSource={record.tramos} pagination={false} />;
	};

	//ok
	componentDidMount = () => {
		this.setState({
			loading: true,
		});
		let columns = [
			{ title: 'Id', dataIndex: 'idViaje', key: 'idViaje' },
			{
				title: 'ESTATUS',
				children: [
					{
						title: 'OPERADOR',
						dataIndex: 'estatus_operador',
						key: 'estatus_operador',
						render: (record) => {
							return this.estatus(record);
						},
					},
					{
						title: 'EMPRESA',
						dataIndex: 'estatus_empresa',
						key: 'estatus_empresa',
						render: (record) => {
							return this.estatus(record);
						},
					},
				],
			},
			{
				title: 'INFORMACION DE SOLICITUD',
				children: [
					{
						title: 'CLIENTE',
						dataIndex: 'cliente',
						key: 'cliente',
					},
					{
						title: 'DIRECCION DE CARGA',
						dataIndex: 'direccion_carga',
						key: 'direccion_carga',
					},
					{
						title: 'FECHA DE CARGA',
						dataIndex: 'fecha_carga',
						key: 'fecha_carga',
					},
				],
			},
			{
				title: 'INFORMACION DE EMPRESA DE TRANSPORTE',
				children: [
					{
						title: 'EMPRESA',
						dataIndex: 'empresa',
						key: 'empresa',
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
				],
			},
			{
				title: 'INFORMACION DE ENTREGA',
				children: [
					{
						title: 'ENTREGA',
						dataIndex: 'entrega',
						key: 'entrega',
					},
					{
						title: 'DESTINO',
						dataIndex: 'destino',
						key: 'destino',
					},
					{
						title: 'FECHA DE ENTREGA',
						dataIndex: 'fecha_entrega',
						key: 'fecha_entrega',
					},
				],
			},
			{
				title: 'PRECIO',
				dataIndex: 'precio',
				key: 'precio',
				render: (text, record) => (
					<InputNumber
						defaultValue={text}
						style={{ width: '80px' }}
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						onChange={(value) => this.handleChange(record.key, value, 'precio')}
					/>
				),
			},
			{
				title: 'INFORMACION DE GASTOS',
				children: [
					/* {
							title: 'TOTAL DISTANCIA KM',
							dataIndex: 'totalDistancia',
							key: 'totalDistancia',
							render: (text) => (
								<InputNumber
									value={text}
									style={{ width: '75px' }}
									disabled
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
								/>
							),
						}, */
					{
						title: 'DIESEL',
						dataIndex: 'diesel',
						key: 'diesel',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) => this.handleChange(record.key, value, 'diesel')}
							/>
						),
					},

					{
						title: 'CASETAS',
						dataIndex: 'casetas',
						key: 'casetas',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) =>
									this.handleChange(record.key, value, 'casetas')
								}
							/>
						),
					},
					{
						title: 'VIATICOS',
						dataIndex: 'viaticos',
						key: 'viaticos',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) =>
									this.handleChange(record.key, value, 'viaticos')
								}
							/>
						),
					},
					/* {
							title: 'TRANSITO',
							dataIndex: 'transito',
							key: 'transito',
							render: (text, record) => (
								<InputNumber
									style={{ width: '100%' }}
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									onChange={(value) =>
										this.handleChange(record.key, value, 'transito')
									}
								/>
							),
						},
						{
							title: 'DIAS',
							dataIndex: 'dias',
							key: 'dias',
							render: (text, record) => (
								<InputNumber
									style={{ width: '50px' }}
									defaultValue={this.dias(record.totalDistancia, record.key)}
									formatter={(value) =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									onChange={(value) =>
										this.handleChange(record.key, value, 'dias')
									}
								/>
							),
						}, */
					{
						title: 'COMISION',
						dataIndex: 'comision',
						key: 'comision',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) =>
									this.handleChange(record.key, value, 'comision')
								}
							/>
						),
					},
					{
						title: 'MANIOBRAS',
						dataIndex: 'maniobras',
						key: 'maniobras',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) =>
									this.handleChange(record.key, value, 'maniobras')
								}
							/>
						),
					},
					{
						title: 'CUSTODIA',
						dataIndex: 'custodia',
						key: 'custodia',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) =>
									this.handleChange(record.key, value, 'custodia')
								}
							/>
						),
					},
					{
						title: 'EXTERNO',
						dataIndex: 'externo',
						key: 'externo',
						render: (text, record) => (
							<InputNumber
								defaultValue={text}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								onChange={(value) =>
									this.handleChange(record.key, value, 'externo')
								}
							/>
						),
					},
					{
						title: 'TOTAL DE GASTO',
						dataIndex: 'total_gasto',
						key: 'total_gasto',
						render: (text, record) => (
							<InputNumber
								value={
									parseInt(record.diesel ? record.diesel : 0) +
									parseInt(record.casetas ? record.casetas : 0) +
									parseInt(record.viaticos ? record.viaticos : 0) +
									parseInt(record.comision ? record.comision : 0) +
									parseInt(record.maniobras ? record.maniobras : 0) +
									parseInt(record.custodia ? record.custodia : 0) +
									parseInt(record.externo ? record.externo : 0)
								}
								style={{ width: '80px' }}
								formatter={(value) =>
									`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								}
								disabled
							/>
						),
					},
					{
						title: '% DE GASTO',
						dataIndex: 'porcentaje_gasto',
						key: 'porcentaje_gasto',
						render: (text, record) => <Title level={4}>{text}%</Title>,
					},
				],
			},
		];
		consultaViajes().then((response) => {
			let viajes = response.payload;
			this.setState({
				columns,
				data: viajes,
				loading: false,
			});
		});
	};

	onSelectChange = (selectedRowKeys) => {
		const { data } = this.state;
		let mod = false,
			id,
			operador,
			cliente,
			title,
			empresa,
			titleOperador = '',
			titleEmpresa = '';
		const selectItems = selectedRowKeys.filter((item) => {
			let re = false;
			data.map((element) => {
				if (element.key === item) {
					if (
						element.estatus_operador === 'Aprobado' &&
						element.estatus_empresa === 'Confirmado'
					) {
						re = true;
					} else {
						mod = true;
						id = item;
						operador = element.operador;
						cliente = element.cliente;
						empresa = element.empresa;
						if (element.estatus_operador !== 'Aprobado') {
							titleOperador = ` -El conductor ${operador} `;
						}
						if (element.estatus_empresa !== 'Confirmado') {
							titleEmpresa = ` -La empresa ${empresa} `;
						}
						title = `Los estatus de ${titleOperador}${titleEmpresa} no ha aceptado el viaje del cliente ${cliente}. ¿Quieres continuar?`;
					}
				}
				return element;
			});
			return re;
		});
		if (mod) {
			confirm({
				title,
				icon: <ExclamationCircleOutlined />,
				okText: 'Si',
				cancelText: 'No',
				onOk: () => {
					this.handleChange(id, 'Aprobado', 'estatus_operador');
					this.handleChange(id, 'Confirmado', 'estatus_empresa');
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
		let viajeDeleteArray,
			request = [];
		selectedRowKeys.map((item) => {
			data.map((element) => {
				if (element.key === item) {
					request.push({
						idViaje: element.key,
						precio: element.precio,
						gastos: [
							{
								tipo: 'Diesel',
								presupuesto: element.diesel ? element.diesel : 0,
							},
							{
								tipo: 'Casetas',
								presupuesto: element.diesel ? element.diesel : 0,
							},
							{
								tipo: 'Viaticos',
								presupuesto: element.viaticos ? element.viaticos : 0,
							},
							{
								tipo: 'Comision',
								presupuesto: element.comision ? element.comision : 0,
							},

							{
								tipo: 'Maniobras',
								presupuesto: element.maniobras ? element.maniobras : 0,
							},
							{
								tipo: 'Custodia',
								presupuesto: element.custodia ? element.custodia : 0,
							},
							{
								tipo: 'Externo',
								presupuesto: element.externo ? element.externo : 0,
							},
						],
						diesel: element.diesel ? element.diesel : 0,
						casetas: element.casetas ? element.casetas : 0,
						comision: element.comision ? element.comision : 0,
						viaticos: element.viaticos ? element.viaticos : 0,
						maniobras: element.maniobras ? element.maniobras : 0,
						custodia: element.custodia ? element.custodia : 0,
						externo: element.externo ? element.externo : 0,
						direccion_cliente: element.tramos[0].entrega,
					});
				}
				return element;
			});
			return item;
		});
		console.log(request);
		confirmaViaje(request).then((response) => {
			if (response.headerResponse.code === 400) {
				message.error('No puedes mandar campos vacios ' + response.payload.Faltantes);
			}
			if (response.headerResponse.code === 200) {
				message.success('Viaje confirmado exitosamente');
				viajeDeleteArray = response.payload;
				viajeDeleteArray.map((viajeD) => {
					const viajeDelete = viajeD.sqlEstatusUpdate;
					const { data } = this.state;
					this.setState({
						data: data.filter((via) => viajeDelete !== via.key),
					});
					return viajeD;
				});
			}
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
