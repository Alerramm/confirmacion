export const confirmacionApiGet = async queryView => {
	const method = queryView.method;
	const instance = await fetch(queryView.endpoint, {
		method,
	});
	const response = await instance.json();
	return response;
};

export const confirmacionApiGetJson = async queryView => {
	const method = queryView.method;
	const instance = await fetch(queryView.endpoint, {
		method,
		body: JSON.stringify(queryView.data),
	});
	const response = await instance.json();
	return response;
};

export const cuentasApiPut = async queryView => {
	const method = queryView.method;
	const instance = await fetch(queryView.endpoint, {
		method,
		body: JSON.stringify(queryView.data),
	});
	const response = await instance.json();
	return response;
};
