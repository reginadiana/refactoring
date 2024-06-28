import { createNewAccount } from "../create-account";
import { close } from '../config'

const params = {
	name: 'Diana Rodriguez',
	email: `diana.rodriguez${Math.random()}@gmail.com`,
	cpf: "87748248800",
	isPassenger: true,
	isDriver: false,
	carPlate: null
}

it('should create passenger account successfully', async () => {
	const result = await createNewAccount(params)

	expect(result?.created).toBe(true);
	expect(result.data.account_id).toBeDefined();
	expect(result.data.name).toBe(params.name);
	expect(result.data.email).toBe(params.email);
	expect(result.data.cpf).toBe(params.cpf);
	expect(result.data.is_passenger).toBe(params.isPassenger);
	expect(result.data.is_driver).toBe(params.isDriver);
	expect(result.data.car_plate).toBe(params.carPlate);
});

it('should not create passenger account when account already exists', async () => {
	const payload = {
		...params,
		email: 'diana.rodriguez@gmail.com'
	}

	await createNewAccount(params)

	// Try create again
	const result = await createNewAccount(payload)

	expect(result?.created).toBe(false);
	expect(result.error).toBe("Conta já existe com este email")
	close()
});

