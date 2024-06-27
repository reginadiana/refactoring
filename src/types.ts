export type CreateUserParams = {
  name: string;
  email: string;
  cpf: string;
  isDriver: boolean;
  carPlate: string;
}

export type Data = {
  accountId: number;
}

export type CreateUserResponse = {
  status: number;
  error?: { message: string };
  data?: Data;
}