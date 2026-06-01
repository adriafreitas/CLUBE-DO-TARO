"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get("code");

      alert("CODE: " + code);

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          alert("ERRO: " + error.message);
          return;
        }

        alert("SESSÃO CRIADA COM SUCESSO");
      }

      router.replace("/auth/reset-password");
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div style={{ color: "white" }}>
      Validando acesso...
    </div>
  );
}