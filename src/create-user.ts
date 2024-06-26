import { validate } from "./validateCpf";

export function createUser(params: Partial<CreateUserParams>): CreateUserResponse {
  // TODO: chamar em um try catch, dentro do try chamar a API

  try {
    validateParams(params)

    return { status: 200 }

  } catch (error) {
    // @ts-ignore
    return { status: 422, error: { message: error.message } }
  }
}

function validateParams(params: Partial<CreateUserParams>) {
  // TODO: validar campos aqui, disparar new Error
  const { name, cpf, email, isDriver, carPlate } = params;

  if (!name) {
    throw new Error("Nome é obrigatório")
  }
}

