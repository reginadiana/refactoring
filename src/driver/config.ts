import express, { Express } from "express";

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

export const URL = `http://localhost:${port}`

export const connection = app.listen(port, () => {
  console.log(`[server]: Server is running at ${URL}`);
});

export const close = () => {
  connection.close();
}

export default app;