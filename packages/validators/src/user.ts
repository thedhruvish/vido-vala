import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  userName: z.string(),
  picture: z.string(),
  banner: z.string(),
});
