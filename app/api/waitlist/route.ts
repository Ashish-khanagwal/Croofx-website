import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { first_name, last_name, country, email } = await req.json();

  if (!first_name || !last_name || !country || !email) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert([{ first_name, last_name, country, email }]);

  if (error) {
    // Postgres duplicate email error
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You are already on the waitlist." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
