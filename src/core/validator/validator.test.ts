import { describe, it } from "bun:test";
import { betterAuth } from "better-auth";
import * as v from "valibot";
import * as y from "yup";
import { z } from "zod";

import { validator } from "../validator";

describe("validator", () => {
	it("initializes without errors with zod", () => {
		const signupSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(12),
		});

		betterAuth({
			plugins: [
				validator({
					middlewares: [
						{ path: "/sign-up/email", schemas: { body: signupSchema } },
					],
				}),
			],
		});
	});

	it("initializes without errors with yup", () => {
		const signupSchema = y.object().shape({
			name: y.string().required(),
			email: y.string().email().required(),
			password: y.string().min(12).required(),
		});

		betterAuth({
			plugins: [
				validator({
					middlewares: [
						{ path: "/sign-up/email", schemas: { body: signupSchema } },
					],
				}),
			],
		});
	});

	it("initializes without errors with valibot", () => {
		const signupSchema = v.object({
			name: v.string(),
			email: v.pipe(v.string(), v.email()),
			password: v.pipe(v.string(), v.minLength(12)),
		});

		betterAuth({
			plugins: [
				validator({
					middlewares: [
						{ path: "/sign-up/email", schemas: { body: signupSchema } },
					],
				}),
			],
		});
	});

	it("returns an error with zod", async () => {
		const signupSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(12),
		});

		validator({
			middlewares: [
				{ path: "/sign-up/email", schemas: { body: signupSchema } },
			],
		});
	});
});
