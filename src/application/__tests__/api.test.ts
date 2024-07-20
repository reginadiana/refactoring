import { signUp } from "../sign-up";

const params = {
	name: 'Diana Rodriguez',
	cpf: "87748248800",
	isPassenger: true,
	isDriver: false,
	carPlate: ''
}

it('should create passenger account successfully', async () => {
	const payload = {
		...params,
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	}
	const account = await signUp(payload);

	expect(account.error?.message).toBeUndefined();

	expect(account.name).toBe(payload.name);
	expect(account.email).toBe(payload.email);
	expect(account.cpf).toBe(payload.cpf);
	expect(account.is_passenger).toBe(payload.isPassenger);
	expect(account.is_driver).toBe(payload.isDriver);
	expect(account.car_plate).toBe(payload.carPlate);
});

it('should not create passenger account when account already exists', async () => {
	const payload = {
		...params,
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	}

	await signUp(payload)

	// Try create again
	await expect(() => signUp(payload)).rejects.toThrowError('Conta já existe com este email')
});

it("should create driver account successfully", async function () {
	const payload = {
		...params,
		email: `diana.rodriguez${Math.random()}@gmail.com`,
		isPassenger: false,
		isDriver: true,
		carPlate: 'ABC1234'
	}

	const account = await signUp(payload);

	expect(account.error?.message).toBeUndefined();

	expect(account.name).toBe(payload.name);
	expect(account.email).toBe(payload.email);
	expect(account.cpf).toBe(payload.cpf);
	expect(account.is_passenger).toBe(payload.isPassenger);
	expect(account.is_driver).toBe(payload.isDriver);
	expect(account.car_plate).toBe(payload.carPlate);
});

it('CPF should be valid', async () => {
	const payload = {
		...params,
		cpf: '1111111',
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	};

	await expect(() => signUp(payload)).rejects.toThrowError('CPF inválido')
})

it('CPF should not be empty', async () => {
	const payload = {
		...params,
		cpf: '',
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	};

	await expect(() => signUp(payload)).rejects.toThrowError('CPF é obrigatório')
});

it('email should be valid', async () => {
	const payload = {
		...params,
		email: 'invalid-email',
	};

	await expect(() => signUp(payload)).rejects.toThrowError('Email inválido')
});

it('email should not be empty', async () => {
	const payload = {
		...params,
		email: '',
	};

	await expect(() => signUp(payload)).rejects.toThrowError('Email é obrigatório')
});

it('name should not be empty', async () => {
	const payload = {
		...params,
		name: '',
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	};

	await expect(() => signUp(payload)).rejects.toThrowError('Nome é obrigatório')
});

it('name should be valid', async () => {
	const payload = {
		...params,
		name: 'Diana',
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	};
	
	await expect(() => signUp(payload)).rejects.toThrowError('Nome precisa ser completo')
});

it("car plate should be valid", async function () {
	const payload = {
		...params,
		isPassenger: false,
		isDriver: true,
		carPlate: '1111',
		email: `diana.rodriguez${Math.random()}@gmail.com`,
	}

	await expect(() => signUp(payload)).rejects.toThrowError('Placa do carro inválida')
});