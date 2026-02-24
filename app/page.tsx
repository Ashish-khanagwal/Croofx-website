"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const croofxRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
        email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("");
      setShowToast(true);
      setEmail("");
    } else {
      setStatus(data.error || "Something went wrong.");
      setShowToast(false);
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {/* Base image */}
        <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-80" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(248,113,113,0.55),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(168,85,247,0.5),transparent_40%)]" />
      </div>

      <div className="relative z-10">
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
                  fontSize: "16px",
                  fontWeight: 700,
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
                  fontSize: "16px",
                  fontWeight: 700,
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
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "21px",
                }}
              >
                Founder
              </a>

            <button
              onClick={scrollToCroofx}
              className="px-5 py-2 rounded-md border border-white/20 hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.45)] transition cursor-pointer"
            >
                Join Waitlist
              </button>
            </div>

            <button
              className="nav-menu-button flex flex-col gap-1 items-end p-2"
              onClick={() => setIsNavOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${
                  isNavOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-opacity duration-300 ${
                  isNavOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-transform duration-300 ${
                  isNavOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile / tablet full-screen menu */}
        <div
          className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl transform transition-transform duration-300 ease-out ${
            isNavOpen
              ? "translate-y-0 pointer-events-auto"
              : "-translate-y-full pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={() => setIsNavOpen(false)}>
              <Image src="/croovi.png" alt="Croovi" width={140} height={40} />
            </Link>

            <button
              onClick={() => setIsNavOpen(false)}
              aria-label="Close navigation menu"
              className="p-2"
            >
              <span className="block h-[2px] w-6 bg-white rotate-45 translate-y-[1px]" />
              <span className="block h-[2px] w-6 bg-white -rotate-45 -translate-y-[1px]" />
            </button>
          </div>

          <div className="mt-8 px-6 flex flex-col gap-6 text-left">
            <a
              href="https://github.com/croovi-org"
              target="_blank"
              rel="noreferrer"
              className="text-base text-white/90"
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
              className="text-base text-white/90"
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
              className="text-base text-white/90"
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
              className="mt-6 w-full px-4 py-3 rounded-md border border-white/20 text-white hover:border-purple-500 transition"
            >
              Join Waitlist
            </button>
          </div>
        </div>

        {/* CROOFX SECTION */}
        <section ref={croofxRef} className="px-6 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className="-mt-10 font-[900]"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "80px",
                lineHeight: "72px",
              }}
            >
              CrooFx
            </h1>

            <h3
              className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white/90"
              style={{
                fontFamily: '"Anthropic Serif", Arial, sans-serif',
                fontSize: "24px",
                lineHeight: "32px",
              }}
            >
              That turns AI from a code assistant into a controlled execution
              system
            </h3>

            <p
              className="mt-6 text-base md:text-lg text-white/70 max-w-3xl mx-auto"
              style={{
                fontFamily: '"Anthropic Sans", Arial, sans-serif',
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Built for engineering teams using AI to build, review, and ship
              production software
            </p>

            <p className="mt-6 text-sm md:text-base text-white/60 max-w-2xl mx-auto">
              Understands your codebase, sends only the right context to LLMs,
              and validates every AI-generated change before it lands
            </p>

            {/* WAITLIST CARD */}
            <div className="mt-14 max-w-2xl mx-auto rounded-[32px] bg-white/5 border border-white/10 px-8 py-10 sm:px-10 sm:py-12 shadow-[0_0_80px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
              <h3 className="text-2xl sm:text-3xl font-semibold">
                Join our waitlist!
              </h3>

              <p className="mt-3 text-sm sm:text-base text-white/70">
                Sign up to receive the latest Croofx updates and product
                insights straight to your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <div className="flex-1 rounded-full bg-black/70 border border-white/15 overflow-hidden flex items-center shadow-[0_0_40px_rgba(0,0,0,0.9)]">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-6 py-3.5 text-sm sm:text-base focus:outline-none placeholder:text-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="sm:ml-3 px-7 py-3.5 rounded-full bg-white text-black text-sm sm:text-base font-medium whitespace-nowrap hover:bg-purple-500 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition cursor-pointer"
                >
                  Join Waitlist
                </button>
              </form>

              {status && <p className="mt-4 text-sm text-white/70">{status}</p>}

              {/* Social proof + social icons */}
              <div className="mt-8">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_0_18px_rgba(0,0,0,0.6)]">
                      <Image
                        src="/avatar-1.jpg"
                        alt="Early Croofx user 1"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_0_18px_rgba(0,0,0,0.6)]">
                      <Image
                        src="/avatar-2.jpg"
                        alt="Early Croofx user 2"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_0_18px_rgba(0,0,0,0.6)]">
                      <Image
                        src="/avatar-3.jpg"
                        alt="Early Croofx user 3"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_0_18px_rgba(0,0,0,0.6)]">
                      <Image
                        src="/avatar-4.jpg"
                        alt="Early Croofx user 4"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70">
                    Join{" "}
                    <span className="font-semibold text-white">110+</span>{" "}
                    others on the waitlist
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-10">
                  <a
                    href="https://x.com/CrooviOfficial"
                    target="_blank"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-xl opacity-80 hover:opacity-100 hover:border-white/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition"
                    aria-label="Twitter / X"
                  >
                    <Image
                      src="/twitter-logo.png"
                      alt="Twitter"
                      width={30}
                      height={30}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/crooviofficial/"
                    target="_blank"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-xl opacity-80 hover:opacity-100 hover:border-white/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/instagram-logo.png"
                      alt="Instagram"
                      width={30}
                      height={30}
                    />
                  </a>
                  <a
                    href="https://discord.com/invite/6j37AVAcSH"
                    target="_blank"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-xl opacity-80 hover:opacity-100 hover:border-white/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition"
                    aria-label="Discord"
                  >
                    <Image
                      src="/discord-logo.png"
                      alt="Discord"
                      width={60}
                      height={60}
                      className="scale-110"
                    />
                  </a>
                  <a
                    href="https://github.com/croovi-org"
                    target="_blank"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-xl opacity-80 hover:opacity-100 hover:border-white/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition"
                    aria-label="GitHub"
                  >
                    <Image
                      src="/github-logo.png"
                      alt="GitHub"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success toast */}
        <div
          className={`fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-all duration-300 ${
            showToast
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-md w-full bg-black border border-white/15 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black text-xl">
              ✦
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Congratulations!</p>
              <p className="text-xs text-white/70">
                You'll be notified when we're live.
              </p>
            </div>

            <button
              onClick={() => setShowToast(false)}
              className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-purple-500 hover:text-white transition"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
