import { auth } from "@/auth"

export default async function Home() {
  const session: any = await auth()

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      
      
    </div>

  );
}
