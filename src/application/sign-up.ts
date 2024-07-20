import { VALID_CAR_PLATE, VALID_COMPLETE_NAME, VALID_EMAIL } from "./regex";
import { validate as validateCPF } from "./validate-cpf";
import { Account } from '../types';
import crypto from "crypto";
import { getAccountByEmail, saveAccount } from "../resource";

export async function signUp(account: Partial<Account>) {
  await validate(account);
  await saveAccount({...account, account_id: crypto.randomUUID() } as Account)
  const response = await getAccountByEmail(account.email)

  return response;
}

async function validate(params: Partial<Account>) {
  const { name, cpf, email, isDriver, carPlate } = params;

  const account = await getAccountByEmail(email);
  
  if (account) {
    throw new Error("Conta já existe com este email");
  }

  if (!name) {
    throw new Error("Nome é obrigatório")
  }

  if (!cpf) {
    throw new Error("CPF é obrigatório")
  }

  if (!email) {
    throw new Error("Email é obrigatório")
  }

  if (!name.match(VALID_COMPLETE_NAME)) {
    throw new Error("Nome precisa ser completo")
  }

  if (!email.match(VALID_EMAIL)) {
    throw new Error("Email inválido")
  }

  if (!validateCPF(cpf)) {
    throw new Error("CPF inválido")
  }

  if (isDriver && !carPlate?.match(VALID_CAR_PLATE)) {
    throw new Error("Placa do carro inválida")
  }
}

