import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        { error: "userId e password são obrigatórios." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      {
        password,
      }
    );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro interno." },
      { status: 500 }
    );
  }
}