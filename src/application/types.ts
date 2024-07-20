type Data = {
  accountId: number;
}

export type CreateUserResponse = {
  status: number;
  error?: { message: string };
  data?: Data;
}

export type Error = {
  error?: { message: string };
}