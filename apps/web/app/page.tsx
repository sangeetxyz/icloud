import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Home</CardTitle>
          <CardDescription className="">
            Experience the new iCloud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Link href={"/auth"}>
              <Button>Authenticate</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
