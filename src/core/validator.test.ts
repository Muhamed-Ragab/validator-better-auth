import { betterAuth } from "better-auth";
import { describe, it } from "bun:test";
import { z } from "zod";
import { validator } from "./validator";

describe("validator", () => {
  it("initializes without errors with zod", () => {
    const signupSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(12),
    });

    betterAuth({
      plugins: [validator([{ path: "/sign-up/email", schema: signupSchema }])],
    });
  });
});
