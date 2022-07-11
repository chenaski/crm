import { Static, Type } from "@sinclair/typebox";

export const SignInInputSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});
export type SignInInput = Static<typeof SignInInputSchema>;
