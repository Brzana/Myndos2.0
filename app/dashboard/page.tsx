import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type UserScores } from "@/components/MindMap";
import { DashboardClient } from "@/components/DashboardClient";

// Mockowe dane wyników użytkownika (w przyszłości pobierane z bazy)
const mockUserScores: UserScores = {
  cell: 85, // Zielony - opanowany
  nucleus: 62, // Żółty - w trakcie nauki
  mitochondrium: 45, // Żółty - w trakcie nauki
  ribosome: 28, // Czerwony - do poprawy
  er: null, // Szary - nieodkryty
  golgi: null, // Szary - nieodkryty
  respiration: 91, // Zielony - opanowany
  division: 15, // Czerwony - do poprawy
};

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">Mapa Myśli</h1>
        <p className="text-slate-400">
          Witaj, {user.email}! Kliknij w węzeł, aby zobaczyć szczegóły.
        </p>
      </header>

      {/* Legenda kolorów */}
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-500"></div>
          <span className="text-slate-300">Nieodkryty</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span className="text-slate-300">Do poprawy (0-39%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500"></div>
          <span className="text-slate-300">W trakcie nauki (40-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span className="text-slate-300">Opanowany (80-100%)</span>
        </div>
      </div>

      {/* Mapa myśli z modalem */}
      <DashboardClient userScores={mockUserScores} />
    </div>
  );
}
