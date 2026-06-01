"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function processAuth() {
      const code = searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          alert("Erro: " + error.message);
          return;
        }
      }

      router.replace("/auth/reset-password");
    }

    processAuth();
  }, [router, searchParams]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a002e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Validando acesso...
    </div>
  );
}