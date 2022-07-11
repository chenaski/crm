import { Static, Type } from "@sinclair/typebox";

import { UserSchema } from "~/dto/user";

export const UserReplySchema = Type.Object({
  user: UserSchema,
});
export type UserReply = Static<typeof UserReplySchema>;
