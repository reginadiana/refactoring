import pgp from "pg-promise";
import crypto from "crypto";
import { CreateUserParams } from "./types";

const pgport = 5432;
export const connection = pgp()(`postgres://postgres:123456@localhost:${pgport}/appp`);

export async function createNewAccount(params: CreateUserParams) {
  try {
    const accounts = await selectAccountsByEmail(params.email);

    if (accounts.length) {
      throw new Error("Conta já existe com este email");
    }

    await insertNewAccount(params)

    return { created: true }
  } catch (error) {
    // @ts-ignore
    return { created: false, error: error.message }
  }
}

export async function selectAccountsByEmail(email: string) {
  return await connection.query("select * from cccat16.account where email = $1", [email])
}

async function insertNewAccount(params: CreateUserParams) {
  const id = crypto.randomUUID();
  const { name, cpf, email, isDriver, isPassenger, carPlate } = params;

  return await connection.query("insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, name, email, cpf, carPlate, !!isPassenger, !!isDriver]);
}

export async function close() {
  await connection.$pool.end();
}
