const BASE_CONFIRMATION_URL = 'http://www.misistema.mx/beluga/Finanzas/endpoints/confirmacion/';
const BASE_CLIENT_URL = 'http://www.misistema.mx/beluga/Finanzas/endpoints/cuentas/';

/** CONSULTA CLIENTES */
export const CONSULTAR_VIAJES = BASE_CONFIRMATION_URL + 'get/viajes.php';
/** CONSULTA FACTURAS */
export const CONSULTAR_TRAMOS = BASE_CONFIRMATION_URL + 'get/tramos.php';
/** ACTUALIZA ESTATUS FACTURA */
export const ACTUALIZA_ESTATUS_FACTURAS = BASE_CLIENT_URL + 'put/abonar.php';
/** CONSULTA TIPO DE VIAJES */
export const CONSULTAR_TIPO_VIAJES = BASE_CONFIRMATION_URL + 'get/tipoViaje.php';
/** CONFIRMACION DE VIAJE */
export const CONFIRMACION_VIAJE = BASE_CONFIRMATION_URL + 'post/confirmar.php';
/** ACTUALIZA OPERADOR */
export const MODIFY_OPERADOR = BASE_CONFIRMATION_URL + 'post/modifyStatusTravel.php';
/** ACTUALIZA RENDIMIENTO */
export const RENDIMIENTO = BASE_CONFIRMATION_URL + 'post/diesel.php';
/** MODIFICAR GASTO */
export const MODIFICAR_GASTO = BASE_CONFIRMATION_URL + 'post/modificarGasto.php';
/** MODIFICAR PRECIO */
export const MODIFICAR_PRECIO = BASE_CONFIRMATION_URL + 'put/porcentajeGasto.php';
