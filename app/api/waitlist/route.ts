import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("waitlist").insert([{ email }]);

  if (error) {
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
  await Promise.allSettled([
    resend.emails.send({
      from: "Croofx <waitlist@croovi.com>",
      to: email,
      subject: "You're on the Croofx waitlist 🚀",
      html: `
<div style="font-family: monospace; background: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4ade80; margin-bottom: 16px;">Hey, thank you for signing up! 🚀</h2>
  
  <p style="color: #ccc; line-height: 1.8;">
    You're now on the Croofx early access waitlist, and that means a lot.
  </p>
  <p style="color: #ccc; line-height: 1.8;">
    We're building Croofx for engineers who are tired of AI-generated code 
    slipping through reviews and breaking production. Croofx sits between 
    your AI tooling and your CI/CD pipeline, enforcing rules, flagging unsafe 
    patches, and making sure only clean, validated code ships.
  </p>
  <p style="color: #ccc; line-height: 1.8;">
    The MVP is actively being built. You'll be among the first to know 
    when early access opens, and your feedback will directly shape what 
    Croofx becomes.
  </p>
  <p style="color: #ccc; line-height: 1.8;">
    Until then, if you have thoughts, pain points, or just want to talk 
    shop — reply to this email or find me on X at 
    <a href="https://x.com/TheAshrex" style="color: #4ade80;">@TheAshrex</a>.
  </p>

  <!-- Cross-product section -->
  <div style="border-top: 1px solid #222; margin-top: 32px; padding-top: 24px;">
    <p style="color: #888; font-size: 13px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Also building under Croovi</p>
    
     <p style="color: #ccc; line-height: 1.8; margin-bottom: 8px;">
    🔁 <strong style="color: #fff;">CroFlux</strong> — Turn your startup idea into structured milestones, track execution daily, and actually ship — with streaks, leaderboards, and boss battles keeping you accountable. →
    <a href="https://croflux.vercel.app/" style="color: #4ade80;">Join the waitlist</a>
  </p>
    
    <p style="color: #ccc; line-height: 1.8;">
      👁️ <strong style="color: #fff;">CroVew</strong> — Real-time behavioral analytics for SaaS founders. Drop in a script tag, see who's active, what they're doing, and where they're dropping off — in under 5 minutes. 
      <span style="color: #555;">Waitlist coming soon.</span>
    </p>
  </div>

<p style="color: #666; margin-top: 32px; font-size: 13px; border-top: 1px solid #222; padding-top: 16px;">
  — Ashish Khanagwal, Founder @<a href="https://x.com/CrooviOfficial" style="color: #4ade80; text-decoration: none;">Croovi</a>
</p></div>
`,
    }),

    resend.emails.send({
      from: "Croofx <waitlist@croovi.com",
      to: "ashishkhanagwal2001@gmail.com",
      subject: "New Croofx waitlist signup",
      html: `<p>New signup: <strong>${email}</strong></p>`,
    }),
  ]);

  return NextResponse.json({ success: true });
}
