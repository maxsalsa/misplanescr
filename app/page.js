import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) redirect("/dashboard");
  
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <LoginForm />
    </main>
  );
}