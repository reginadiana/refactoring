import axios from "axios";
import app, { URL } from './config';
import { signUp } from "../application/sign-up";
import { getAccountById } from "../resource";

app.post("/signup", async function (req, res) {
	const params = req.body;

	try {
		const response = await signUp(params);

		res.json({ accountId: response.data.account_id })
	} catch (error) {
		res.status(422).send(error);
	}
});

app.get('/account/:accountId', async function(req, res) {
	const account = await getAccountById(req.params.accountId)

	return res.json(account)
})
