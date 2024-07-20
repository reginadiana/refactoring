export type Account = {
  account_id: string;
  name: string;
  email: string;
  cpf: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate: string | null;
}