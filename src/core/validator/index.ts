import type { BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
import { createAuthMiddleware } from "better-auth/plugins";

import { standardValidate } from "../standard-validate";
import type { ValidatorOptions } from "./types";

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
        } catch (error) {
          if (error instanceof APIError) {
            throw error;
          }

          throw new APIError("BAD_REQUEST", { error: JSON.stringify(error) });
        }
      }),
    })),
  }) as BetterAuthPlugin;
