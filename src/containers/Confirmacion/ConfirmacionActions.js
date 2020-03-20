import { confirmacionApiGet, cuentasApiPut,confirmacionApiGetJson } from './ConfirmacionApi';
import {
	CONSULTAR_VIAJES,
	CONSULTAR_TRAMOS,
	ACTUALIZA_ESTATUS_FACTURAS,
} from '../../constants/Endpoints';
export const consultaViajes = async () => {
	const queryView = {
		endpoint: CONSULTAR_VIAJES,
		method: 'GET',
	};
	return confirmacionApiGet(queryView);
};

export const consultaTramos = async (id) => {
	const queryView = {
		endpoint: CONSULTAR_TRAMOS,
		method: 'POST',
		data:{id}
	};
	return confirmacionApiGetJson(queryView);
};
export const actualizaEstatus = async data => {
	const queryView = {
		endpoint: ACTUALIZA_ESTATUS_FACTURAS,
		method: 'PUT',
		data,
	};
	return cuentasApiPut(queryView);
};
