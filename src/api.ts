import crypto from "crypto";
import axios from "axios";
import express, { Express } from "express";
import { CreateUserParams } from './types';

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

export const connection = app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

export async function postSignUp(params: Partial<CreateUserParams>) {
	const response = await axios.post(`http://localhost:${port}/signup`, params)

	return { status: response.status, data: response.data };
}

app.post("/signup", async function (_req, res) {
	// TODO: bater no banco de dados
	res.json({ accountId: crypto.randomUUID() })
});
