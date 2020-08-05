import { confirmacionApiGet, cuentasApiPut, confirmacionApiGetJson } from './ConfirmacionApi';
import {
	CONSULTAR_VIAJES,
	CONSULTAR_TRAMOS,
	CONSULTAR_TIPO_VIAJES,
	CONFIRMACION_VIAJE,
	MODIFY_OPERADOR,
	RENDIMIENTO,
	MODIFICAR_GASTO,
	MODIFICAR_PRECIO,
} from '../../constants/Endpoints';

export const consultaTipoViajes = async () => {
	const queryView = {
		endpoint: CONSULTAR_TIPO_VIAJES,
		method: 'GET',
	};
	return confirmacionApiGet(queryView);
};

export const consultaViajes = async () => {
	const queryView = {
		endpoint: CONSULTAR_VIAJES,
		method: 'POST',
	};
	return confirmacionApiGet(queryView);
};

export const consultaTramos = async (id) => {
	const queryView = {
		endpoint: CONSULTAR_TRAMOS,
		method: 'POST',
		data: { id },
	};
	return confirmacionApiGetJson(queryView);
};

export const confirmaViaje = async (data) => {
	const queryView = {
		endpoint: CONFIRMACION_VIAJE,
		method: 'POST',
		data,
	};
	return cuentasApiPut(queryView);
};

export const modificarOperador = async (data) => {
	const queryView = {
		endpoint: MODIFY_OPERADOR,
		method: 'POST',
		data,
	};
	return cuentasApiPut(queryView);
};

export const modificarDiesel = async (data) => {
	const queryView = {
		endpoint: RENDIMIENTO,
		method: 'POST',
		data,
	};
	return cuentasApiPut(queryView);
};

export const modificarGasto = async (data) => {
	const queryView = {
		endpoint: MODIFICAR_GASTO,
		method: 'POST',
		data,
	};
	return cuentasApiPut(queryView);
};

export const modificarPrecio = async (data) => {
	const queryView = {
		endpoint: MODIFICAR_PRECIO,
		method: 'POST',
		data,
	};
	return cuentasApiPut(queryView);
};
