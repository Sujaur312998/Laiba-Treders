import { auth } from "@/auth"

export default async function Home() {
  const session: any = await auth()

  return (
    <div>
      <p>Welcome {session?.user.name}!</p>
    </div>
  );
}
