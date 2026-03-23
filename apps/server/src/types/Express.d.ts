import z from "zod";
import { userSchema } from "@vido-vala/validators";

type UserType = z.infer<typeof userSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
