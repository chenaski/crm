import { Static, Type } from "@sinclair/typebox";

import { UserSchema } from "~/dto/user";

export const SignUpReplySchema = Type.Object({
  user: UserSchema,
});
export type SignUpReply = Static<typeof SignUpReplySchema>;
