import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

const params = {
	name: 'Diana Rodriguez',
	email:`diana.rodriguez${Math.random()}@gmail.com`,
	cpf: "87748248800",
	isPassenger: true
}

test("should create passenger account successfully", async function () {	
	const result = await axios.post("http://localhost:3000/signup", params);

	expect(result.status).toBe(200);
	expect(result.data.accountId).toBeDefined();
});

test("should create driver account successfully", async function () {	
	const payload = {
		...params,
		isPassenger: false,
		isDriver: true,
		carPlate: 'ABC1234'
	}

	const result = await axios.post("http://localhost:3000/signup", payload);

	expect(result.status).toBe(200);
	expect(result.data.accountId).toBeDefined();
});

it('CPF should be valid', async () => {
	const payload = {
		...params,
		cpf: '1111111',
	};
	
	const result = await axios.post("http://localhost:3000/signup", payload);

	expect(result.status).toBe(422);
	expect(result.data).toBe(-1);
	expect(result.data.accountId).not.toBeDefined();
})

it('email should be valid', async () => {
	const payload = {
		...params,
		email: 'invalid-email',
	};
	
	const result = await axios.post("http://localhost:3000/signup", payload);

	expect(result.status).toBe(422);
	expect(result.data).toBe(-2);
	expect(result.data.accountId).not.toBeDefined();
})

it('name should not be empty', async () => {
	const payload = {
		...params,
		name: '',
	};

	const result = await axios.post("http://localhost:3000/signup", payload);

	expect(result.status).toBe(422);
	expect(result.data).toBe(-3);
	expect(result.data.accountId).not.toBeDefined();
});

it('name should be valid', async () => {
	const payload = {
		...params,
		name: 'Diana',
	};

	const result = await axios.post("http://localhost:3000/signup", payload);

	expect(result.status).toBe(422);
	expect(result.data).toBe(-3);
	expect(result.data.accountId).not.toBeDefined();
});

test("car plate should be valid", async function () {	
	const payload = {
		...params,
		isPassenger: false,
		isDriver: true,
		carPlate: '1111'
	}

	const result = await axios.post("http://localhost:3000/signup", payload);

	expect(result.status).toBe(422);
	expect(result.data).toBe(-5);
	expect(result.data.accountId).not.toBeDefined();
});