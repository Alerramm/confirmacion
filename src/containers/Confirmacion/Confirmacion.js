import React, { Component, Fragment } from 'react';
import { Layout, Table, InputNumber, Button, message, Modal, Tag, Typography, Select } from 'antd';
import {
	consultaViajes,
	confirmaViaje,
	modificarOperador,
	modificarDiesel,
	modificarGasto,
	modificarPrecio,
} from './ConfirmacionActions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { confirm } = Modal;
const { Title } = Typography;
const { Option } = Select;

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

	handleChangeDiesel = (idViaje, diesel) => {
		modificarDiesel({
			idViaje,
			diesel,
		}).then((response) => {
			const { data } = this.state;
			if (response.headerResponse.code == 200) {
				this.setState({
					data: data.map((element) => {
						if (element.idViaje === idViaje) {
							element.rendimiento = response.payload.Rendimiento;
							modificarGasto({
								idViaje,
								TipoGasto: 'Diesel',
								presupuesto: diesel,
							}).then((response) => {
								if (response.headerResponse.code == 200) {
									//aqui va si e modifico dato en la base de datos
								}
							});
							element['diesel'] = diesel.replace(/,/g, '');
						}
						return element;
					}),
				});
			}
		});
	};
	handleChangePrecio = (viaje, value) => {
		const precio = value ? value.toString().replace(/,/g, '') : value;
		if (precio > 0) {
			const idMetricasPrecio = viaje.idMetricasPrecio;
			const totalGastos =
				parseInt(viaje.diesel ? viaje.diesel : 0) +
				parseInt(viaje.casetas ? viaje.casetas : 0) +
				parseInt(viaje.viaticos ? viaje.viaticos : 0) +
				parseInt(viaje.comision ? viaje.comision : 0) +
				parseInt(viaje.maniobras ? viaje.maniobras : 0) +
				parseInt(viaje.custodia ? viaje.custodia : 0) +
				parseInt(viaje.externo ? viaje.externo : 0);
			const { data } = this.state;
			this.setState({
				data: data.map((element) => {
					if (viaje.idViaje === element.idViaje) {
						modificarPrecio({
							idViaje: viaje.idViaje,
							precio,
							idMetricasPrecio,
							totalGastos,
						}).then((response) => {
							if (response.headerResponse.code == 200) {
							}
						});

						element.porcentaje_gasto = 100;
						if (precio >= totalGastos) {
							element.porcentaje_gasto = (totalGastos / 1.16 / precio).toFixed(2);
						}
						element.precio = precio ? precio.toString().replace(/,/g, '') : precio;
					}
					return element;
				}),
			});
		}
	};

	//ok
	handleChange = (id, value, columna) => {
		const { data } = this.state;
		this.setState({
			data: data.map((viaje) => {
				if (id === viaje.key) {
					if (columna == 'diesel') {
						this.handleChangeDiesel(id, value);
					} else {
						modificarGasto({
							idViaje: id,
							TipoGasto: columna[0].toUpperCase() + columna.slice(1),
							presupuesto: value,
						}).then((response) => {
							if (response.headerResponse.code == 200) {
								//aqui va si se modifico gasto en la base de datos
							}
						});
					}
					viaje[columna] = value ? value.toString().replace(/,/g, '') : value;
				}
				return viaje;
			}),
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
			{
				title: 'Fecha',
				dataIndex: 'fecha_tramo',
				key: 'fecha_tramo',
				render: (record) => {
					return this.diaSemana(record) + ' ' + record;
				},
			},
			{ title: 'Destino', dataIndex: 'destino_tramo', key: 'destino_tramo' },
			{ title: 'Entrega', dataIndex: 'entrega_tramo', key: 'entrega_tramo' },
			{ title: 'Distancia', dataIndex: 'distancia_tramo', key: 'distancia_tramo' },
			{ title: 'Casetas', dataIndex: 'casetas_tramo', key: 'casetas_tramo' },
		];
		return <Table columns={columns} dataSource={record.tramos} pagination={false} />;
	};
	menu = (viaje, arreglo, tipo) => {
		let botones = arreglo.map((element) => {
			let key;
			switch (tipo) {
				case 'empresa':
					key = element.key + 'e';
					break;
				case 'camion':
					key = element.key + 'c';
					break;
				case 'operador':
					key = element.key + 'o';
					break;
				default:
					key = element.key;
					break;
			}
			return (
				<Option value={element.nombre} name={viaje.key} key={key}>
					{element.nombre}
				</Option>
			);
		});

		return botones;
	};

	diaSemana = (record) => {
		const fecha = new Date(record);
		const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		return dias[fecha.getUTCDay()];
	};

	handleChangeEmpresa = (record, text, value) => {};
	handleChangeOperador = (record, text, value) => {
		this.setState({
			loading: true,
		});

		modificarOperador([
			{
				idViaje: text.props.name,
				estatus_app: 'Pendiente',
				estatus: 'Confirmado',
				operador: record,
				unidad: '',
			},
		]).then((response) => {
			this.setState({
				loading: false,
			});
		});
	};
	handleChangeUnidad = (record, text, value) => {
		this.setState({
			loading: true,
		});

		modificarOperador([
			{
				idViaje: text.props.name,
				estatus_app: 'Pendiente',
				estatus: 'Confirmado',
				unidad: record,
				operador: '',
			},
		]).then((response) => {
			this.setState({
				loading: false,
			});
		});
	};

	handleCancelarViaje = (record) => {
		this.setState({
			loading: true,
		});

		modificarOperador([
			{
				idViaje: record.idViaje,
				estatus_app: record.estatus_operador,
				estatus: 'Cancelado',
				unidad: record.unidadSeleccionada,
				operador: record.operadorSeleccionado,
			},
		]).then((response) => {
			const { data } = this.state;
			if (response.headerResponse.code === 200) {
				this.setState({
					data: data.filter((element) => element.idViaje != record.idViaje),
				});
			}

			this.setState({
				loading: false,
			});
		});
	};

	cancelarViaje = (record) => {
		confirm({
			title: `¿Seguro que deseas cancelar el viaje con id ${record.idViaje}`,
			icon: <ExclamationCircleOutlined />,
			okText: 'Si',
			cancelText: 'No',
			onOk: () => {
				this.handleCancelarViaje(record);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
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
				title: 'INFORMACION DE CARGA',
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
						render: (record) => {
							return this.diaSemana(record) + ' ' + record;
						},
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
						render: (record, text, x) => (
							<Select
								style={{ width: 80 }}
								onChange={this.handleChangeEmpresa}
								defaultValue="Beluga"
								size="small"
							>
								{this.menu(text, record, 'empresa')}
							</Select>
						),
					},
					{
						title: 'OPERADOR',
						dataIndex: 'operador',
						key: 'operador',
						render: (record, text, x) => (
							<Select
								style={{ width: 150 }}
								onChange={this.handleChangeOperador}
								defaultValue={text.operadorSeleccionado}
								size="small"
							>
								{this.menu(text, record, 'operador')}
							</Select>
						),
					},
					{
						title: 'TIPO DE ADECUACION',
						dataIndex: 'unidad_tipo',
						key: 'unidad_tipo',
					},
					{
						title: 'TIPO DE UNIDAD',
						dataIndex: 'unidad_modelo',
						key: 'unidad_modelo',
					},
					{
						title: 'UNIDAD',
						dataIndex: 'unidad',
						key: 'unidad',
						render: (record, text, x) => (
							<Select
								style={{ width: 150 }}
								onChange={this.handleChangeUnidad}
								size="small"
								defaultValue={text.unidadSeleccionada}
							>
								{this.menu(text, record, 'unidad')}
							</Select>
						),
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
						render: (record) => {
							return this.diaSemana(record) + ' ' + record;
						},
					},
				],
			},
			{
				title: 'TIPO SERVICIO',
				dataIndex: 'tipoPrecio',
				key: 'tipoPrecio',
			},
			{
				title: 'PRECIO',
				dataIndex: 'precio',
				key: 'precio',
				render: (text, record) => (
					<InputNumber
						defaultValue={text}
						style={{
							width: '80px',
							background: '#DFF9D8',
							color: 'green',
						}}
						formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						onBlur={(value) => this.handleChangePrecio(record, value.target.value)}
					/>
				),
			},
			{
				title: 'INFORMACION DE GASTOS',
				children: [
					{
						title: 'KILOMETRAJE',
						dataIndex: 'kilometraje',
						key: 'kilometraje',
					},
					{
						title: 'RENDIMIENTO',
						dataIndex: 'rendimiento',
						key: 'rendimiento',
					},
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'diesel')
								}
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'casetas')
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'viaticos')
								}
							/>
						),
					},
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'comision')
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'maniobras')
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'custodia')
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
								onBlur={(value) =>
									this.handleChange(record.key, value.target.value, 'externo')
								}
							/>
						),
					},
					{
						title: 'TOTAL DE GASTO',
						dataIndex: 'total_gasto',
						key: 'total_gasto',
						render: (text, record) => (
							<Tag color="red">
								{(
									parseInt(record.diesel ? record.diesel : 0) +
									parseInt(record.casetas ? record.casetas : 0) +
									parseInt(record.viaticos ? record.viaticos : 0) +
									parseInt(record.comision ? record.comision : 0) +
									parseInt(record.maniobras ? record.maniobras : 0) +
									parseInt(record.custodia ? record.custodia : 0) +
									parseInt(record.externo ? record.externo : 0)
								).toString()}
							</Tag>
						),
					},
					{
						title: '% DE GASTO',
						dataIndex: 'porcentaje_gasto',
						key: 'porcentaje_gasto',
						render: (text, record) => <Title level={4}>{text}%</Title>,
					},
					{
						title: 'CANCELAR',
						dataIndex: 'cancelar',
						key: 'cancelar',
						render: (text, record, x) => (
							<Button type="danger" onClick={() => this.cancelarViaje(record)}>
								Cancelar
							</Button>
						),
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
			cliente,
			title;
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
						cliente = element.cliente;
						console.log(element.operador);
						title = `El operador no ha aceptado el viaje con id ${element.key} del cliente ${cliente}. ¿Quieres continuar?`;
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
								presupuesto: element.casetas ? element.casetas : 0,
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
