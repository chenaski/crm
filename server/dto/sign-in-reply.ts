import { Static, Type } from "@sinclair/typebox";

import { UserSchema } from "~/dto/user";

export const SignInReplySchema = Type.Object({
  user: UserSchema,
});
export type SignInReply = Static<typeof SignInReplySchema>;
