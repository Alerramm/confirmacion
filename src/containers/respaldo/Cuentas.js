import React, { Component, Fragment } from 'react';
import {
	Layout,
	Table,
	Badge,
	Button,
	Row,
	Input,
	Form,
	Select,
	DatePicker,
	Modal,
	List,
	Col,
	Tag,
	Typography,
} from 'antd';
const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
class Cuentas extends Component {
	state = {
		data: [],
		dataFilter: [],
		loading: false,
		columns: [],
		mostrar: '',
	};
	changeMostrar = value => {
		this.setState({
			mostrar: value,
		});
	};
	handleCerrar = () => {
		this.setState({
			visible: false,
		});
	};

	modalClientes = () => {
		this.setState({
			visible: true,
		});
	};
	infoModalClientes = () => {
		const { data } = this.state;

		let clientes = data.map(item => {
			return item.cliente;
		});

		clientes = clientes.filter(
			(valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual
		);
		let dataForm = clientes.map(item => {
			return [item, 0];
		});
		data.map(item => {
			dataForm[clientes.indexOf(item.cliente)] = [
				dataForm[clientes.indexOf(item.cliente)][0],
				dataForm[clientes.indexOf(item.cliente)][1] + item.total,
			];
		});
		return (
			<List
				bordered
				dataSource={dataForm}
				renderItem={item => (
					<List.Item>
						<Col span={12}>{item[0]}</Col>
						<Col span={12}>
							<Tag color="red">{item[1]}</Tag>
						</Col>
					</List.Item>
				)}
			/>
		);
	};
	Filtros = () => {
		const { mostrar } = this.state;
		return (
			<Fragment>
				<Row type="flex">
					<Form layout="inline" size={'small'}>
						<Form.Item label="Filtrar">
							<Select
								defaultValue={mostrar}
								style={{ width: 120 }}
								onChange={this.changeMostrar}
							>
								<Option value="">Sin filtro</Option>
								<Option value="tiempo">Fecha</Option>
							</Select>
						</Form.Item>
						{mostrar === 'tiempo' && <RangePicker />}
						{mostrar === '' && (
							<Button type="primary" onClick={this.modalClientes}>
								Totales Clientes
							</Button>
						)}
					</Form>
				</Row>
			</Fragment>
		);
	};
	Totales = () => {
		const { dataFilter } = this.state;
		let total = 0;
		let cont = 0;
		dataFilter.map(item => {
			cont = ++cont;
			total = item.total + total;
			return item;
		});
		return (
			<Fragment>
				<Row type="flex" justify="end">
					<Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} size={'large'}>
						<Form.Item label="FACTURAS">
							<Input disabled value={cont} />
						</Form.Item>
						<Form.Item label="TOTAL">
							<Input disabled value={total} />
						</Form.Item>
					</Form>
				</Row>
			</Fragment>
		);
	};
	renderContent = (value, row, index) => {
		const obj = {
			children: value,
			props: {},
		};
		if (index === 4) {
			obj.props.colSpan = 0;
		}
		return (
			<span>
				<Badge status="warning" />
				{value}
			</span>
		);
	};
	componentDidMount = () => {
		const { data } = this.state;
		let columns = [
			{
				title: 'Folio',
				dataIndex: 'folio',
				key: 'folio',
			},
			{
				title: 'Cliente',
				dataIndex: 'cliente',
				key: 'cliente',
				filters: [],
			},
			{
				title: 'Fecha expedicion',
				dataIndex: 'fechaVencimiento',
				key: 'fechaVencimiento',
			},
			{
				title: 'Fecha vencimineto',
				dataIndex: 'fechaExpedicion',
				key: 'fechaExpedicion',
			},
			{ title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal' },
			{ title: 'Iva', dataIndex: 'iva', key: 'iva' },

			{
				title: 'Retencion',
				dataIndex: 'retencion',
				key: 'retencion',
			},
			{
				title: 'Importe Pendinete',
				dataIndex: 'importePendiente',
				key: 'importePendiente',
			},
			{ title: 'Total', dataIndex: 'total', key: 'total' },
			{
				title: 'Estatus',
				key: 'estatus',
				dataIndex: 'estatus',
				render: value => (
					<span>
						<Badge status={value === 'Pendiente' ? 'warning' : 'success'} />
						{value}
					</span>
				),
				filters: [],
			},
		];
		this.setState({
			loading: true,
		});

		for (let i = 0; i < 3; ++i) {
			data.push({
				key: 135648 + (1 + i),
				folio: 135648 + (1 + i),
				cliente: 'DILTEX',
				fechaExpedicion: '2020-01-01',
				fechaVencimiento: '2020-01-01',
				subtotal: 10000,
				iva: 1600,
				retencion: 2000,
				importePendiente: 9600,
				total: 11600,
				estatus: 'Pagado',
			});
		}
		for (let i = 0; i < 3; ++i) {
			data.push({
				key: 135651 + (1 + i),
				folio: 135651 + (1 + i),
				cliente: 'AQUAPRIMA',
				fechaExpedicion: '2020-01-01',
				fechaVencimiento: '2020-01-01',
				subtotal: 10000,
				iva: 1600,
				retencion: 2000,
				importePendiente: 9600,
				total: 11600,
				estatus: 'Pendiente',
			});
		}
		for (let i = 0; i < 3; ++i) {
			data.push({
				key: 135654 + (1 + i),
				folio: 135648 + (1 + i),
				cliente: 'BACARDI',
				fechaExpedicion: '2020-01-01',
				fechaVencimiento: '2020-01-01',
				subtotal: 10000,
				iva: 1600,
				retencion: 2000,
				importePendiente: 9600,
				total: 11600,
				estatus: 'Pagado',
			});
		}
		for (let i = 0; i < 3; ++i) {
			data.push({
				key: 135658 + (1 + i),
				folio: 135651 + (1 + i),
				cliente: 'AQUAPRIMA',
				fechaExpedicion: '2020-01-01',
				fechaVencimiento: '2020-01-01',
				subtotal: 10000,
				iva: 1600,
				retencion: 2000,
				importePendiente: 9600,
				total: 11600,
				estatus: 'Pendiente',
			});
		}
		data.map(item => {
			if (columns[1].filters.find(element => element.text === item.cliente) === undefined) {
				columns[1].filters.push({ text: item.cliente, value: item.cliente });
			}
			if (columns[9].filters.find(element => element.text === item.estatus) === undefined) {
				columns[9].filters.push({ text: item.estatus, value: item.estatus });
			}
			return item;
		});
		this.setState({
			data,
			loading: false,
			dataFilter: data,
			columns,
		});
	};
	handleChange = (page, filters) => {
		let filtros = Object.keys(filters);
		let { data } = this.state;
		let dataFilter = data;
		filtros.map(element => {
			if (filters[element].length === 0) {
			} else {
				dataFilter = dataFilter.filter(item => {
					if (filters[element].find(x => x === item[element]) !== undefined) {
						return true;
					}
					return false;
				});
			}
			return element;
		});
		this.setState({ dataFilter });
	};
	render() {
		const { dataFilter, loading, columns, visible } = this.state;
		return (
			<Content>
				<Layout style={{ padding: '24px 24px', background: '#fff' }}>
					<Table
						className="components-table-demo-nested"
						columns={columns}
						dataSource={dataFilter}
						footer={this.Totales}
						title={this.Filtros}
						loading={loading}
						onChange={this.handleChange}
						summary={pageData => {
							let totalBorrow = 0;
							let totalRepayment = 0;
							pageData.forEach(({ total }) => {
								totalBorrow += total;
								++totalRepayment;
							});

							return (
								<>
									<tr>
										<th>Total</th>
										<td>
											<Text type="danger">{totalBorrow}</Text>
										</td>
										<td>
											<Text>{totalRepayment}</Text>
										</td>
									</tr>
									<tr>
										<th>Balance</th>
										<td colSpan={2}>
											<Text type="danger">
												{totalBorrow - totalRepayment}
											</Text>
										</td>
									</tr>
								</>
							);
						}}
					/>
				</Layout>
				{visible && (
					<Modal
						title="Totales clientes"
						visible={visible}
						footer={[
							<Button key="submit" type="primary" onClick={this.handleCerrar}>
								Cerrar
							</Button>,
						]}
					>
						{this.infoModalClientes()}
					</Modal>
				)}
			</Content>
		);
	}
}
export default Cuentas;
