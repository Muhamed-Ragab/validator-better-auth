import type { createAuthMiddleware } from "better-auth/plugins";
import type { StandardSchema } from "../standard-validate/types";

export type MiddlewareHandlerContext = Parameters<
	Parameters<typeof createAuthMiddleware>[0]
>[0];

export type MiddlewareOptions = {
	/**
	 * @description Path to apply middleware
	 * @property path string
	 */
	path: string;
	/**
	 * @description Schemas to validate
	 * @property body Schema
	 * @property query Schema
	 * @property params Schema
	 */
	schemas: {
		body?: StandardSchema;
		query?: StandardSchema;
		params?: StandardSchema;
	};
	/**
	 * @description Optional handler to run after validation
	 * @param ctx MiddlewareHandlerContext
	 * @returns void
	 */
	handler?: (ctx: MiddlewareHandlerContext) => void;
};

export type ValidatorOptions = {
	middlewares: MiddlewareOptions[];
};
