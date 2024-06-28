import axios from "axios";
import app, { URL } from './config';
import { CreateUserParams } from './types';
import { createNewAccount } from "../resource/create-account";

export async function postSignUp(params: Partial<CreateUserParams>) {
	return await axios.post(`${URL}/signup`, params)
}

app.post("/signup", async function (req, res) {
	const params = req.body;

	try {
		const response = await createNewAccount(params);

		res.json({ accountId: response.data.account_id })
	} catch (error) {
		res.status(422).send(error);
	}
});
