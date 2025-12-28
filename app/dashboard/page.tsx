import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Mapa Myśli</h1>
      <p className="text-text-muted">
        Witaj, {user.email}! Tutaj będzie wyświetlana mapa myśli.
      </p>
      <p className="text-sm text-text-muted mt-2">
        (Funkcjonalność mapy myśli będzie zaimplementowana w kolejnych krokach)
      </p>
    </div>
  );
}
