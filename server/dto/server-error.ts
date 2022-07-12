import { Static, Type } from "@sinclair/typebox";

export const ServerErrorSchema = Type.Object({
  error: Type.Object({
    message: Type.String(),
  }),
});
export type ServerError = Static<typeof ServerErrorSchema>;
