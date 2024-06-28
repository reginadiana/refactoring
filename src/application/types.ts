export type CreateUserParams = {
  name: string;
  email: string;
  cpf: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate: string | null;
}

export type Data = {
  accountId: number;
}

export type CreateUserResponse = {
  status: number;
  error?: { message: string };
  data?: Data;
}