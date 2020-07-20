import { confirmacionApiGet, cuentasApiPut, confirmacionApiGetJson } from './ConfirmacionApi';
import {
	CONSULTAR_VIAJES,
	CONSULTAR_TRAMOS,
	CONSULTAR_TIPO_VIAJES,
	CONFIRMACION_VIAJE,
	MODIFY_OPERADOR,
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
