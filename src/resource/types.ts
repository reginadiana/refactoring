export type CreateUserParams = {
  name: string;
  email: string;
  cpf: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate: string | null;
}