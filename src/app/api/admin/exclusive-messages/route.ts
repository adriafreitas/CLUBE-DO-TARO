import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const questionId = req.nextUrl.searchParams.get("questionId");

  if (!questionId) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabaseAdmin
    .from("exclusive_messages")
    .select("*")
    .eq("question_id", questionId)
    .order("created_at", { ascending: true });
    
await supabaseAdmin
  .from("exclusive_messages")
  .insert({
    question_id: data.id,
    autor: "cliente",
    mensagem: data.pergunta,
  });

  if (error) {
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}