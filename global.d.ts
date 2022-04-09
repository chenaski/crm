export type Nullable<T> = { [K in keyof T]: T[K] | null };

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
