"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const croofxRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const scrollToCroofx = () => {
    croofxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        country,
        email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("You're on the waitlist.");
      setFirstName("");
      setLastName("");
      setCountry("");
      setEmail("");
    } else {
      setStatus(data.error || "Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1020] via-[#0B1020] to-[#070B16] text-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 -mt-10 -mb-8 max-w-7xl mx-auto">
        <Link href="/">
          <Image src="/croovi.png" alt="Croovi" width={200} height={10} />
        </Link>

        <div className="flex items-center gap-4">
          <div className="nav-links flex items-center gap-6">
            <a
              href="https://github.com/croovi-org"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:underline underline-offset-4 transition"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              GitHub
            </a>

            <a
              href="https://github.com/croovi-org/croofx"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:underline underline-offset-4 transition"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Croofx
            </a>

            <a
              href="https://ashishkhanagwal.bio.link/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:underline underline-offset-4 transition"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Founder
            </a>

            <button
              onClick={scrollToCroofx}
              className="px-5 py-2 rounded-md border border-white/20 hover:border-purple-500 transition"
            >
              Join Waitlist
            </button>
          </div>

          <button
            className="nav-menu-button flex flex-col gap-1 items-end p-2"
            onClick={() => setIsNavOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            <span className="h-[1px] w-6 bg-white" />
            <span className="h-[1px] w-6 bg-white" />
            <span className="h-[1px] w-6 bg-white" />
          </button>
        </div>
      </nav>

      {isNavOpen && (
        <div className="px-8 pt-4 pb-6">
          <div className="flex flex-col items-end gap-4 text-right">
            <a
              href="https://github.com/croovi-org"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:underline underline-offset-4 transition"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              GitHub
            </a>

            <a
              href="https://github.com/croovi-org/croofx"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:underline underline-offset-4 transition"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Croofx
            </a>

            <a
              href="https://ashishkhanagwal.bio.link/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 hover:underline underline-offset-4 transition"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              Founder
            </a>

            <button
              onClick={() => {
                setIsNavOpen(false);
                scrollToCroofx();
              }}
              className="mt-2 px-5 py-2 rounded-md border border-white/20 hover:border-purple-500 transition"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}

      {/* CROOVI SECTION */}
      <section className="px-6 py-32">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="text-center md:text-left md:w-2/3">
            <h1
              className="text-white text-[64px] leading-[70.4px] font-bold tracking-tight"
              style={{ fontFamily: '"Anthropic Sans", Arial, sans-serif' }}
            >
            Croovi builds deterministic AI infrastructure.
            </h1>

            <p
              className="mt-6 text-lg text-white/70"
              style={{ fontFamily: '"Anthropic Sans", Arial, sans-serif' }}
            >
              Systems built to make complex industries simple and reliable.
            </p>
          </div>

          <div className="text-center md:text-left md:w-1/2 md:pt-3">
            <p
              className="text-white/60 text-[24px] leading-[33.6px] font-normal"
              style={{ fontFamily: '"Anthropic Serif", Georgia, sans-serif' }}
            >
              Croovi develops execution layers that make AI reliable across
              real-world software environments structured, validated, and
              governed.
            </p>
          </div>
        </div>
      </section>

      {/* CROOFX SECTION */}
      <section ref={croofxRef} className="px-6 py-20">
        <div className="max-w-6xl mx-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="px-8 py-16 md:px-16 md:py-20 text-center">
            <h1 className="text-7xl md:text-7xl font-semibold">Croofx</h1>

            <h3 className="mt-6 text-2xl md:text-3xl font-semibold">
              Run AI on real repositories without losing control.
            </h3>

            <p className="mt-8 text-base md:text-lg text-white/70 max-w-3xl mx-auto">
              Croofx analyzes your project structure, sends only relevant context to LLMs,
              validates every generated patch, and prevents unnecessary token waste.
            </p>

            <p className="mt-4 text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              AI generates. Croofx makes it production-ready.
            </p>

            {/* WAITLIST CARD */}
            <div className="mt-16 max-w-xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
              <h3 className="text-xl font-medium mb-6">
                Join the Croofx Waitlist
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
                />

                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
                />

                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                  className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-purple-500"
                />

                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-3 rounded-md bg-white text-black font-medium hover:bg-purple-500 hover:text-white transition"
                >
                  Join Waitlist
                </button>
              </form>

              {status && <p className="mt-4 text-sm text-white/70">{status}</p>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
