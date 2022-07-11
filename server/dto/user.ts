import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  id: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});
export type User = Static<typeof UserSchema>;

export type UserWithPassword = User & {
  password: string;
};
