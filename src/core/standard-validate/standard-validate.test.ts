import * as v from "valibot";
import { describe, expect, it } from "vitest";
import * as y from "yup";
import * as z from "zod";

import { standardValidate } from "./index";

describe("standardValidate", () => {
  it("initializes without errors with zod", async () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const input = {
      name: "John",
      age: 30,
    };

    const result = await standardValidate(schema, input);

    expect(result).toEqual(input);
  });

  it("initializes without errors with yup", async () => {
    const schema = y.object({
      name: y.string().required(),
      age: y.number().required(),
    });

    const input = {
      name: "John",
      age: 30,
    };

    const result = await standardValidate(schema, input);
    console.log(result);

    expect(result).toEqual(input);
  });

  it("initializes without errors with valibot", async () => {
    const schema = v.object({
      name: v.string(),
      age: v.number(),
    });

    const input = {
      name: "John",
      age: 30,
    };

    const result = await standardValidate(schema, input);

    expect(result).toEqual(input);
  });
});
