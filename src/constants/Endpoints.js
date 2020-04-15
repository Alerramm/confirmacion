const BASE_CONFIRMATION_URL = 'http://www.misistema.mx/beluga/Finanzas/endpoints/confirmacion/QA/';
const BASE_CLIENT_URL = 'http://www.misistema.mx/beluga/Finanzas/endpoints/cuentas/QA/';

/** CONSULTA CLIENTES */
export const CONSULTAR_VIAJES =
	BASE_CONFIRMATION_URL + 'get/viajes.php';
/** CONSULTA FACTURAS */
export const CONSULTAR_TRAMOS =
	BASE_CONFIRMATION_URL + 'get/tramos.php';
/** ACTUALIZA ESTATUS FACTURA */
export const ACTUALIZA_ESTATUS_FACTURAS =
	BASE_CLIENT_URL  + 'put/abonar.php';
/** CONSULTA TIPO DE VIAJES */
export const CONSULTAR_TIPO_VIAJES =
	BASE_CONFIRMATION_URL + 'get/tipoViaje.php';
/** CONFIRMACION DE VIAJE */
export const CONFIRMACION_VIAJE =
	BASE_CONFIRMATION_URL + 'post/confirmar.php';


