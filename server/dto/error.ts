import { Static, Type } from "@sinclair/typebox";

export const ErrorSchema = Type.Object({
  error: Type.Object({
    message: Type.String(),
  }),
});
export type Error = Static<typeof ErrorSchema>;
