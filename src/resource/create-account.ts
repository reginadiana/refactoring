import { CreateUserParams } from "../driver/types";
import { insertNewAccount, selectAccountsByEmail } from "./queries";

export async function createNewAccount(params: CreateUserParams) {
  try {
    await validateParams(params)
    await insertNewAccount(params)
    const response = await getAccountByEmail(params.email)

    return { created: true, data: response }
  } catch (error) {
    // @ts-ignore
    return { created: false, error: error.message }
  }
}


async function validateParams(params: CreateUserParams) {
  const accounts = await selectAccountsByEmail(params.email);

  if (accounts.length === 0) return;

  throw new Error("Conta já existe com este email");
}

async function getAccountByEmail(email: string) {
  const accounts = await selectAccountsByEmail(email);

  return accounts[0]
}