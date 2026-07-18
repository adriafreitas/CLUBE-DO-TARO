import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("exclusive_questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID não informado." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("exclusive_questions")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}