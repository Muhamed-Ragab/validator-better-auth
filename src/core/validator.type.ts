import type { APIError } from "better-auth";
import type { ZodError, ZodType } from "zod";

export type ValidatorOptions = {
  customError?: (errors: ZodError) => APIError;
};

export type ValidatorConfig = {
  path: string;
  schema: ZodType;
};
