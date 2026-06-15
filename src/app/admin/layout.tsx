"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#120018",
      }}
    >
      <aside
        style={{
          width: "280px",
          background: "#1a001f",
          borderRight: "1px solid rgba(255,255,255,.08)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            color: "#f4d46a",
            marginBottom: "30px",
          }}
        >
          🔮 Clube do Tarô
        </h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            flex: 1,
          }}
        >
          <a href="/admin">🏠 Dashboard</a>

          <a href="/admin/assinantes">
            👥 Assinantes
          </a>

          <a href="#">
            🔮 Direcionamentos
          </a>

          <a href="#">
            🎁 Benefícios
          </a>

          <a href="#">
            🌟 Convites
          </a>

          <a href="#">
            🎂 Aniversários
          </a>

          <a href="#">
            📚 Cursos
          </a>

          <a href="#">
            📖 Biblioteca Ádria Freitas
          </a>

          <a href="#">
            ⚙️ Configurações
          </a>
        </nav>

        <button
          onClick={sair}
          style={{
            marginTop: "30px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(244,212,106,.3)",
            background: "transparent",
            color: "#f4d46a",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          🚪 Sair
        </button>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {children}
      </main>
    </div>
  );
}