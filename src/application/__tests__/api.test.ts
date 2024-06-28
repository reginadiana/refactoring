import { createUser } from "../create-user";

const params = {
	name: 'Diana Rodriguez',
	email: `diana.rodriguez${Math.random()}@gmail.com`,
	cpf: "87748248800",
	isPassenger: true,
}

it('should create passenger account successfully', async () => {
	const result = await createUser(params);

	expect(result.status).toBe(200);
	expect(result.data?.accountId).toBeDefined();
	expect(result.error?.message).toBeUndefined();
});

it("should create driver account successfully", async function () {
	const payload = {
		...params,
		email: `diana.rodriguez${Math.random()}@gmail.com`,
		isPassenger: false,
		isDriver: true,
		carPlate: 'ABC1234'
	}

	const result = await createUser(payload);

	expect(result.status).toBe(200);
	expect(result.data?.accountId).toBeDefined();
});

it('CPF should be valid', async () => {
	const payload = {
		...params,
		cpf: '1111111',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("CPF inválido");
	expect(result.data?.accountId).toBeUndefined();
})

it('CPF should not be empty', async () => {
	const payload = {
		...params,
		cpf: '',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("CPF é obrigatório");
	expect(result.data?.accountId).toBeUndefined();
});

it('email should be valid', async () => {
	const payload = {
		...params,
		email: 'invalid-email',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("Email inválido");
	expect(result.data?.accountId).toBeUndefined();
});


it('email should not be empty', async () => {
	const payload = {
		...params,
		email: '',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("Email é obrigatório");
	expect(result.data?.accountId).toBeUndefined();
});

it('name should not be empty', async () => {
	const payload = {
		...params,
		name: '',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("Nome é obrigatório");
	expect(result.data?.accountId).toBeUndefined();
});

it('name should not be empty', async () => {
	const payload = {
		...params,
		name: '',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("Nome é obrigatório");
	expect(result.data?.accountId).toBeUndefined();
});

it('name should be valid', async () => {
	const payload = {
		...params,
		name: 'Diana',
	};

	const result = await createUser(payload);

	expect(result.error?.message).toBe("Nome precisa ser completo");
	expect(result.data?.accountId).toBeUndefined();
});

it("car plate should be valid", async function () {
	const payload = {
		...params,
		isPassenger: false,
		isDriver: true,
		carPlate: '1111'
	}

	const result = await createUser(payload);

	expect(result.error?.message).toBe("Placa do carro inválida");
	expect(result.data?.accountId).toBeUndefined();
});