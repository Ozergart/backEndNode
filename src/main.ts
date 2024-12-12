import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { readFile, writeFile } from "./fs.service";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

let users = [];

app.get("/users", async (req: Request, res: Response) => {
  users = await readFile();
  res.json(users).status(200);
});
app.post("/users", async (req: Request, res: Response) => {
  users = await readFile();
  const user = {
    id: users[users.length - 1].id + 1,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };
  users.push(user);
  await writeFile(users);
  res.status(201).json(user);
});
app.get("/users/:userId", async (req: Request, res: Response) => {
  users = await readFile();
  const user = users.find((user) => user.id === +req.params.userId);
  res.json(user);
});
app.delete("/users/:userId", async (req: Request, res: Response) => {
  users = await readFile();
  const userIndex = users.findIndex((user) => user.id === +req.params.userId);
  if (userIndex === -1) {
    res.sendStatus(404);
  } else {
    users.splice(userIndex, 1);
    await writeFile(users);
    res.sendStatus(204);
  }
});
app.put("/users/:userId", async (req: Request, res: Response) => {
  users = await readFile();
  const userIndex = users.findIndex((user) => user.id === +req.params.userId);
  if (userIndex === -1) {
    res.sendStatus(404);
  } else {
    users[userIndex].email = req.body.email;
    users[userIndex].name = req.body.name;
    users[userIndex].password = req.body.password;
    const user = users[userIndex];
    await writeFile(users);
    res.status(201).json(user);
  }
});
app.listen(port, () => {
  console.log(`Server work on http://localhost:${port}`);
});
