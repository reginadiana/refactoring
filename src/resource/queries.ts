import crypto from "crypto";
import { connection } from "./config";
import { CreateUserParams } from "./types";

export async function selectAccountsByEmail(email: string) {
  return await connection.query("select * from cccat16.account where email = $1", [email])
}

export async function insertNewAccount(params: CreateUserParams) {
  const id = crypto.randomUUID();
  const { name, cpf, email, isDriver, isPassenger, carPlate } = params;

  return await connection.query("insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, name, email, cpf, carPlate, !!isPassenger, !!isDriver]);
}