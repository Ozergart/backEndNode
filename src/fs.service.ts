import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./interfaces/user.interface";

const usersFilePath = path.join(process.cwd(), "db", "users.json");

async function readFile(): Promise<IUser[]> {
  const data = await fs.readFile(usersFilePath, "utf-8");
  return JSON.parse(data);
}
async function writeFile(users: IUser[]): Promise<void> {
  await fs.writeFile(usersFilePath, JSON.stringify(users));
  console.log("база данных оновлена");
}

export { writeFile, readFile };
