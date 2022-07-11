import { Static, Type } from "@sinclair/typebox";

export const SignUpInputSchema = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String(),
  password: Type.String(),
});
export type SignUpInput = Static<typeof SignUpInputSchema>;
