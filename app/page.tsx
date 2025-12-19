"use client";

import { useState } from "react";
import { BrowserProvider, type Eip1193Provider } from "ethers";

type LogEntry = {
  message: string;
  time: string;
};

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [demoMessage, setDemoMessage] = useState(
    "Hello from Demo Contract"
  );
  const [inputMessage, setInputMessage] = useState("");

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [txStatus, setTxStatus] = useState<
    "idle" | "pending" | "success"
  >("idle");
  const [txHash, setTxHash] = useState<string | null>(null);

  const addLog = (message: string) => {
    setLogs((prev) => [
      { message, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  const connectWallet = async () => {
    setError(null);
    const ethereum = (window as unknown as {
      ethereum?: Eip1193Provider;
    }).ethereum;

    if (!ethereum) {
      setError("Wallet not found. Please install Rabby or another Web3 wallet.");
      return;
    }

    try {
      const provider = new BrowserProvider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        addLog("Wallet connected (read-only)");
      }
    } catch {
      setError("Wallet connection was rejected.");
    }
  };

  const updateDemoMessage = () => {
    if (!inputMessage.trim()) return;
    setDemoMessage(inputMessage);
    setInputMessage("");
    addLog("Demo message updated");
  };

  const readDemoMessage = () => {
    addLog("Demo message read");
  };

  const resetDemo = () => {
    setDemoMessage("Hello from Demo Contract");
    setLogs([]);
    setTxStatus("idle");
    setTxHash(null);
  };

  const runSimulatedTransaction = () => {
    if (!address) {
      addLog("Demo transaction blocked: wallet not connected");
      return;
    }

    setTxStatus("pending");
    addLog("Demo transaction submitted");

    setTimeout(() => {
      const fakeHash =
        "0x" +
        Math.random().toString(16).substring(2, 10) +
        Math.random().toString(16).substring(2, 10);

      setTxHash(fakeHash);
      setTxStatus("success");
      addLog("Demo transaction confirmed");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Demo Token Platform
          </h1>
          <p className="mt-3 text-gray-600">
            Premium Teaching POC · Demo Mode Only   
          </p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border bg-white p-5 shadow-sm text-sm text-gray-600">
          ⚠️ <strong>Disclaimer:</strong> This application is a sandbox demo.
          No real blockchain, wallet signing, or financial transactions occur.
        </div>

        {/* Wallet Card */}
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Wallet (Read-Only)</h2>
            {address ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                Connected
              </span>
            ) : (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                Not Connected
              </span>
            )}
          </div>

          <button
            onClick={connectWallet}
            className="mt-4 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800 transition"
          >
            Connect Wallet
          </button>

          {address && (
            <p className="mt-3 font-mono text-sm break-all text-gray-700">
              {address}
            </p>
          )}

          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Demo Contract */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">
            Contract State (Demo)
          </h2>

          <p className="text-sm mb-3">
            Current Message:
            <span className="ml-2 font-mono text-blue-700">
              {demoMessage}
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Enter new message"
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              onClick={updateDemoMessage}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Update
            </button>
            <button
              onClick={readDemoMessage}
              className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
            >
              Read
            </button>
            <button
              onClick={resetDemo}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Simulated Transaction */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">
            Simulated Transaction
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Transaction UX demo without wallet signing.
          </p>

          <button
            onClick={runSimulatedTransaction}
            disabled={txStatus === "pending"}
            className="rounded-lg bg-yellow-600 px-5 py-2 text-white hover:bg-yellow-700 disabled:opacity-50"
          >
            Execute Demo Transaction
          </button>

          {txStatus === "pending" && (
            <p className="mt-3 text-sm text-gray-600">
              Processing transaction…
            </p>
          )}

          {txStatus === "success" && txHash && (
            <p className="mt-3 text-sm text-green-700 font-mono break-all">
              Tx Confirmed: {txHash}
            </p>
          )}
        </div>

        {/* Activity Log */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold mb-3">
            Activity Log
          </h2>
          {logs.length === 0 ? (
            <p className="text-sm text-gray-500">
              No activity yet.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((log, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{log.message}</span>
                  <span className="text-gray-400">{log.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          Demo Environment · In-Memory · No Blockchain · No Assets
        </div>
      </div>
    </main>
  );
}
