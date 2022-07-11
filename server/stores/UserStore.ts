import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import path from "path";

import { SignUpInput } from "~/dto/sign-up-input";
import { UserWithPassword } from "~/dto/user";

export class UserStore {
  private static FILE_PATH = path.resolve(__dirname, "../data/users.json");
  private users: UserWithPassword[] = [];

  async init() {
    const fileContent = await this.getUsersFromDisk();

    await fs.mkdir("data", { recursive: true });

    if (fileContent) {
      try {
        const users = JSON.parse(fileContent.toString());
        if (Array.isArray(users)) {
          this.users = users;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  private async saveUsersToDisk() {
    return await fs.writeFile(UserStore.FILE_PATH, JSON.stringify(this.users, null, 2));
  }

  private async getUsersFromDisk() {
    try {
      return await fs.readFile(UserStore.FILE_PATH);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async create({ firstName, lastName, email, password }: SignUpInput): Promise<UserWithPassword> {
    const user = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(user);
    await this.saveUsersToDisk();

    return user;
  }

  async findOneById(id: string): Promise<UserWithPassword | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findOneByEmail(email: string): Promise<UserWithPassword | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

export const userStore = new UserStore();
