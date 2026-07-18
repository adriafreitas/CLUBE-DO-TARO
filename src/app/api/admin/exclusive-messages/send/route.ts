import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { question_id, autor, mensagem } = body;

  const { data, error } = await supabaseAdmin
    .from("exclusive_messages")
    .insert({
      question_id,
      autor,
      mensagem,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}