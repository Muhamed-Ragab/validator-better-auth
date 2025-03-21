import type { BetterAuthPlugin, ZodError, ZodIssue } from "better-auth";
import { APIError } from "better-auth/api";
import { createAuthMiddleware } from "better-auth/plugins";

import { standardValidate } from "./standard-validate";
import type { ValidatorOptions } from "./validator.types";

export const validator = ({ middlewares }: ValidatorOptions) =>
  ({
    id: "validator",
    middlewares: middlewares.map(({ path, schemas, handler }) => ({
      path,
      middleware: createAuthMiddleware(async (ctx) => {
        try {
          const { body, query, params } = ctx;

          await Promise.all([
            schemas.body && standardValidate(schemas.body, body),
            schemas.query && standardValidate(schemas.query, query),
            schemas.params && standardValidate(schemas.params, params),
          ]);

          if (handler) {
            return handler(ctx);
          }
        } catch (e: unknown) {
          const error =
            e instanceof Error
              ? (JSON.parse(e.message) as ZodError["issues"])
              : [];

          throw new APIError("BAD_REQUEST", {
            message: error[0]?.message,
            errors: error.map((issue: ZodIssue) => ({
              message: issue.message,
              path: issue.path.join("."),
              code: issue.code,
            })),
          });
        }
      }),
    })),
  }) as BetterAuthPlugin;
