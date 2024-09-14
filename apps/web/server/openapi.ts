import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { generateOpenApi } from "@ts-rest/open-api";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

extendZodWithOpenApi(z);

const c = initContract();

const contract = c.router({
  getUser: {
    method: "GET",
    path: "/api/users",
    headers: z.object({
      "x-api-key": z.string().openapi({
        description: "API key for authentication",
      }),
    }),
    query: z
      .object({
        name: z.string().optional().openapi({
          description: "User's name to search for",
        }),
        email: z.string().email().optional().openapi({
          description: "User's email to search for",
        }),
      })
      .refine((data) => data.name || data.email, {
        message: "Either name or email must be provided",
      })
      .openapi({
        description: "Search parameters for finding a user",
      }),
    responses: {
      200: z
        .object({
          id: z.string().uuid().openapi({
            title: "Unique ID",
            description: "A UUID for the user",
          }),
          name: z.string().openapi({
            description: "The user's full name",
          }),
          email: z.string().email().openapi({
            description: "The user's email address",
          }),
          emailVerified: z.string().datetime().nullable().openapi({
            description:
              "Timestamp of email verification, or null if not verified",
          }),
          image: z.string().url().nullable().openapi({
            description: "URL of the user's profile image",
          }),
        })
        .openapi({
          title: "User",
          description: "A user object",
          mediaExamples: {
            userExample: {
              value: {
                id: "028f58e1-43db-4552-8099-743dc9a92f9a",
                name: "Sangeet Banerjee",
                email: "sangeetbanerjee777@gmail.com",
                emailVerified: null,
                image: "https://avatars.githubusercontent.com/u/70732470?v=4",
              },
              summary: "Example of a user object",
            },
          },
        }),
      400: z
        .object({
          error: z.literal("Invalid search parameters"),
        })
        .openapi({
          description: "Bad request error",
        }),
      401: z
        .object({
          error: z.literal("Authentication Failed"),
        })
        .openapi({
          description: "Unauthorized error",
        }),
      404: z
        .object({
          error: z.literal("User Not Found"),
        })
        .openapi({
          description: "User not found error",
        }),
    },
  },
});

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Posts API",
    version: "1.0.0",
  },
});
