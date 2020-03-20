import { cuentasApiGet, cuentasApiPut } from './CuentasApi';
import {
	CONSULTAR_CLIENTES,
	CONSULTAR_FACTURAS,
	ACTUALIZA_ESTATUS_FACTURAS,
} from './../../constants/Endpoints';
export const consultaClientes = async () => {
	const queryView = {
		endpoint: CONSULTAR_CLIENTES,
		method: 'GET',
	};
	return cuentasApiGet(queryView);
};

export const consultaFacturas = async () => {
	const queryView = {
		endpoint: CONSULTAR_FACTURAS,
		method: 'GET',
	};
	return cuentasApiGet(queryView);
};
export const actualizaEstatus = async data => {
	const queryView = {
		endpoint: ACTUALIZA_ESTATUS_FACTURAS,
		method: 'PUT',
		data,
	};
	return cuentasApiPut(queryView);
};
