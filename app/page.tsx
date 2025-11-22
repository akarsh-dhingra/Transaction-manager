"use client";

import { useState } from "react";

export default function Home() {
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  async function handleTransfer() {
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromId: Number(fromId),
        toId: Number(toId),
        amount: Number(amount),
      }),
    });

    const data = await res.json();
    setMessage(JSON.stringify(data));
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Money Transfer (ACID)</h1>

      <input
        type="number"
        placeholder="Sender ID"
        onChange={(e) => setFromId(e.target.value)}
        className="border p-2 mb-2 block"
      />

      <input
        type="number"
        placeholder="Receiver ID"
        onChange={(e) => setToId(e.target.value)}
        className="border p-2 mb-2 block"
      />

      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 block"
      />

      <button
        onClick={handleTransfer}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Transfer
      </button>

      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
