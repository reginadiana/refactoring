import { connection } from "./config";
import { Account } from "../types";

export async function getAccountByEmail(email?: string) {
  const [acc] = await connection.query("select * from cccat16.account where email = $1", [email])
  return acc;
}

export async function getAccountById(id: string) {
  const [acc] = await connection.query("select * from cccat16.account where account_id = $1", [id])
  return acc;
}

export async function saveAccount(account: Account) {
  const { account_id, name, cpf, email, isDriver, isPassenger, carPlate } = account;

  return await connection.query("insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [account_id, name, email, cpf, carPlate, !!isPassenger, !!isDriver]);
}