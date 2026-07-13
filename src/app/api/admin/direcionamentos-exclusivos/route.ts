import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("exclusive_questions")
    .select(`
id,
nome_cliente,
plano,
categoria,
pergunta,
urgente,
status,
referencia_mes,
created_at
`)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}