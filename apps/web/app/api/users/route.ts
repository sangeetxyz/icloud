import { env } from "@/env";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== env.API_KEY_SECRET) {
    return NextResponse.json(
      { error: "Authentication Failed" },
      { status: 401 }
    );
  }
  const { searchParams } = req.nextUrl;
  const { name, email } = Object.fromEntries(searchParams.entries());

  let user = null;

  switch (true) {
    case !!email:
      user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      break;
    case !!name:
      user = await db.query.users.findFirst({
        where: eq(users.name, name),
      });
      break;
    default:
      return NextResponse.json(
        { error: "Invalid search parameters" },
        { status: 400 }
      );
  }

  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: "User Not Found" }, { status: 404 });
}
