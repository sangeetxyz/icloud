import SignInWithGithub from "@/components/buttons/github-signin";
import SignInWithPasskey from "@/components/buttons/passkey-signin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/dashboard");

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription className="">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <SignInWithGithub />
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <SignInWithPasskey />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
