import AuthButtons from "@/components/AuthButtons";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is logged in, redirect to dashboard (mapa myśli)
  if (user) {
    redirect("/dashboard");
  }

  return <AuthButtons />;
}
