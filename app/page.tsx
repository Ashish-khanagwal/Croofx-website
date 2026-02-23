"use client";
import { useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Joining...");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        country: country,
        email: email,
      }),
    });

    if (res.ok) {
      setStatus("You're on the list.");
      setFirstName("");
      setLastName("");
      setCountry("");
      setEmail("");
    } else {
      setStatus("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Brand */}
      <h1 className="text-6xl sm:text-7xl font-bold tracking-tight mb-8">
        Croofx
      </h1>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-4xl font-semibold text-center max-w-3xl leading-tight mb-6">
        Run AI on real repositories - without losing control.
      </h2>

      {/* Subheading */}
      <p className="text-gray-400 text-lg text-center max-w-3xl mb-4 leading-relaxed">
        Croofx analyzes your project structure, sends only relevant context to
        LLMs, validates every generated patch, and prevents unnecessary token
        waste.
      </p>

      <p className="text-gray-500 text-md text-center mb-10">
        AI generates. Croofx makes it production-ready.
      </p>

      {/* Waitlist Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        {/* First Name */}
        <input
          type="text"
          required
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="px-4 py-3 rounded bg-gray-900 border border-gray-700 w-full focus:outline-none focus:border-white"
        />

        {/* Last Name */}
        <input
          type="text"
          required
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="px-4 py-3 rounded bg-gray-900 border border-gray-700 w-full focus:outline-none focus:border-white"
        />

        {/* Country */}
        <input
          type="text"
          required
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-3 rounded bg-gray-900 border border-gray-700 w-full focus:outline-none focus:border-white"
        />

        {/* Email */}
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded bg-gray-900 border border-gray-700 w-full focus:outline-none focus:border-white"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-white text-black rounded font-semibold hover:opacity-90 transition"
        >
          Join Waitlist
        </button>
      </form>

      <p className="mt-4 text-gray-500 text-sm">{status}</p>
    </main>
  );
}
