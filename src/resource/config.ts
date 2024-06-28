import pgp from "pg-promise";

const pgport = 5432;
export const connection = pgp()(`postgres://postgres:123456@localhost:${pgport}/appp`);

export async function close() {
  await connection.$pool.end();
}