import crypto from "crypto";
import express, { Express, Request, Response } from "express";
import pgp from "pg-promise";
import { validate } from "./validateCpf";

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post("/signup", async function (req, res) {
	let result;

	const id = crypto.randomUUID();

	if (req.body.name.match(/[a-zA-Z] [a-zA-Z]+/)) {
		if (req.body.email.match(/^(.+)@(.+)$/)) {

			if (validate(req.body.cpf)) {
				if (req.body.isDriver) {
					if (req.body.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
						const obj = {
							accountId: id
						};
						result = obj;
					} else {
						// invalid car plate
						result = -5;
					}
				} else {
					const obj = {
						accountId: id
					};
					result = obj;
				}
			} else {
				// invalid cpf
				result = -1;
			}
		} else {
			// invalid email
			result = -2;
		}

	} else {
		// invalid name
		result = -3;
	}

	if (typeof result === "number") {
		res.status(422).send(result + "");
	} else {
		res.json(result);
	}
}
);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
