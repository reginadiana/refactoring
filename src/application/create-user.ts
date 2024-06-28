import { postSignUp } from "../driver/api";
import { VALID_CAR_PLATE, VALID_COMPLETE_NAME, VALID_EMAIL } from "./regex";
import { validate } from "./validate-cpf";
import { CreateUserParams, CreateUserResponse } from './types';

export async function createUser(params: Partial<CreateUserParams>): Promise<CreateUserResponse> {
  try {
    validateParams(params)
    return await postSignUp(params);;

  } catch (error) {
    // @ts-ignore
    return { error: { message: error.message } }
  }
}

function validateParams(params: Partial<CreateUserParams>) {
  const { name, cpf, email, isDriver, carPlate } = params;

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

  if (!validate(cpf)) {
    throw new Error("CPF inválido")
  }

  if (isDriver && !carPlate?.match(VALID_CAR_PLATE)) {
    throw new Error("Placa do carro inválida")
  }
}

