import { createNewAccount, close } from "../src/db";

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

