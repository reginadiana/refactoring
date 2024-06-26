type CreateUserParams = {
  name: string;
  email: string;
  cpf: string;
  isDriver: boolean;
  carPlate: string;
}

type Data = {
  accountId: number;
}

type CreateUserResponse = {
  status: number;
  error?: { message: string };
  data?: Data;
}