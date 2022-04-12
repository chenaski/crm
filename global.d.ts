export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserWithPassword = User & {
  password: string;
};

export type SignInData = Pick<UserWithPassword, "email" | "password">;

export type SignUpData = Pick<UserWithPassword, "firstName" | "lastName" | "email" | "password">;
