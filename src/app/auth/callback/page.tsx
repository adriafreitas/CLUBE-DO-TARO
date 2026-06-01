"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function processAuth() {
      try {
        const url = new URL(window.location.href);

        const code = url.searchParams.get("code");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            alert(error.message);
            return;
          }
        }

        router.replace("/auth/reset-password");
      } catch (err) {
        console.error(err);
      }
    }

    processAuth();
  }, [router]);

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