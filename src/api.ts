import crypto from "crypto";
import express, { Express, Request, Response } from "express";
import pgp from "pg-promise";
import { validate } from "./validateCpf";

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

type CreateUserParams = {
	name: string;
	email: string;
	cpf: string;
	isDriver: boolean;
	carPlate: string;
}

type Error = {
	message: string;
}

type Data = {
	accountId: number;
}

type CreateUserResponse = {
	status: number;
	error?: Error;
	data?: Data;
}

export function createUser(params: Partial<CreateUserParams>): CreateUserResponse {
	const isValid = validateParams(params);

	return { status: 200 }
}

function validateParams(params: Partial<CreateUserParams>): { isValid: boolean } {
	return { isValid: true };
}

async function postSignUp() {

}

app.post("/signup", async function (req, res) {
	const { name, cpf, email, isDriver, carPlate } = req.body;

	if (!name) {
		return res.status(422).send({
			error: {
				message: "Nome é obrigatório"
			}
		})
	}

	if (!email) {
		return res.status(422).send({
			error: {
				message: "Email é obrigatório"
			}
		})
	}

	if (!cpf) {
		return res.status(422).send({
			error: {
				message: "CPF é obrigatório"
			}
		})
	}

	if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) {
		return res.status(422).send({
			error: {
				message: "Nome precisa ser completo"
			}
		})
	}

	if (!email.match(/^(.+)@(.+)$/)) {
		return res.status(422).send({
			error: {
				message: "Email inválido"
			}
		})
	}

	if (!validate(cpf)) {
		return res.status(422).send({
			error: {
				message: "CPF inválido"
			}
		})
	}

	if (!isDriver) {
		return res.json({ accountId: crypto.randomUUID() })
	}

	if (carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
		return res.json({ accountId: crypto.randomUUID() })
	} else {
		return res.status(422).send({
			error: {
				message: "Placa do carro inválida"
			}
		})
	}
}
);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
