import { validate } from "@typeschema/main";
import { type BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
import { createAuthMiddleware } from "better-auth/plugins";

import type { ValidatorOptions } from "./types";

const standardValidate = async <T>(schema: any | never, data: T) => {
  const result = await validate(schema as never, data);

  if (!result.success) {
    throw new APIError("BAD_REQUEST", {
      message: result.issues[0]?.message,
      errors: result.issues.map(({ message, path }) => ({
        message,
        path,
        code: "BAD_REQUEST",
      })),
    });
  }
};

export const validator = ({ middlewares }: ValidatorOptions) =>
  ({
    id: "validator",
    middlewares: middlewares.map(({ path, schemas, handler }) => ({
      path,
      middleware: createAuthMiddleware(async (ctx) => {
        const { body, query, params } = ctx;

        await Promise.all([
          schemas.body && standardValidate(schemas.body, body),
          schemas.query && standardValidate(schemas.query, query),
          schemas.params && standardValidate(schemas.params, params),
        ]);

        if (handler) {
          return handler(ctx);
        }
      }),
    })),
  }) as BetterAuthPlugin;
