import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PageHeaders from './components/PageHeader/PageHeader';
import Confirmacion from './containers/Confirmacion/Confirmacion';
import Analitycs from './containers/Analitycs/Analitycs';

import './App.css';
import 'antd/dist/antd.css';
const { Sider, Content } = Layout;
class App extends Component {
	state = {
		collapsed: true,
		opcion: 'tabla',
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	option = e => {
		this.setState({
			opcion: e.item.props.name,
		});
	};

	render() {
		const { opcion } = this.state;
		return (
			<Layout style={{ position: 'fixed', zIndex: 1, width: '100%', height: '100%' }}>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
						<div className="collapse" onClick={this.toggle}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							/>
						</div>

						<Menu.Item key="1" name="tabla" onClick={this.option}>
							<Icon type="table" />
							<span>Control</span>
						</Menu.Item>
						<Menu.Item key="2" name="analitycs" onClick={this.option}>
							<Icon type="bar-chart" />
							<span>Analitycs</span>
						</Menu.Item>

						<Menu.Item key="3" name="upload" onClick={this.option}>
							<Icon type="upload" />
							<span>Agregar Facturas</span>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<PageHeaders />
					<Content>
						{opcion === 'tabla' && <Confirmacion />}
						{opcion === 'analitycs' && <Analitycs />}
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default App;
