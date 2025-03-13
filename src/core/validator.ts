import { APIError } from "better-auth/api";
import type { BetterAuthPlugin } from "better-auth/types";
import type { ValidatorConfig, ValidatorOptions } from "./validator.type";

export const validator = (
  configs: ValidatorConfig[],
  { customError }: ValidatorOptions = {},
): BetterAuthPlugin => {
  return {
    id: "validator-better-auth",
    hooks: {
      before: configs.map(({ path, schema }) => ({
        matcher(ctx) {
          return ctx.path.startsWith(path);
        },
        async handler(ctx) {
          const { success, error, data } = schema.safeParse(ctx.body);

          if (!success) {
            const errors = error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
              code: issue.code,
            }));

            if (customError) {
              console.log("Custom error handler called");

              throw customError(error);
            }

            throw new APIError("BAD_REQUEST", {
              message: "Invalid request body",
              details: errors,
            });
          }

          ctx.body = data;
        },
      })),
    },
  };
};
