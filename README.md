# Demo Token Platform – Teaching POC

## Overview
This project is a **Proof of Concept (POC)** created strictly for **educational, teaching, and demonstration purposes**.

It showcases:
- A modern frontend UI
- Wallet connection awareness (read-only)
- Simulated smart-contract behavior
- Simulated transaction flow

⚠️ **No real blockchain, cryptocurrency, or financial transaction is involved.**

---

## Key Characteristics

- **Demo Mode Only**
- **Zero Financial Risk**
- **No Real Blockchain Interaction**
- **No Wallet Signing**
- **No Asset Transfer**

All features are implemented using **in-memory UI simulation**.

---

## Technology Stack

- **Frontend:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Wallet Detection:** Ethers.js (read-only usage)
- **State Management:** React Hooks (`useState`)

---

## What This POC Demonstrates

### 1. Wallet Readiness (Read-Only)
- Detects presence of a Web3 wallet (e.g., Rabby)
- Reads and displays the public wallet address
- Does **not** request signing or transactions

### 2. Simulated Contract State
- Demonstrates read/write flow similar to a smart contract
- State exists only in browser memory
- Resets on page refresh

### 3. Simulated Transaction Flow
- Shows a realistic transaction lifecycle:
  - Submitted
  - Pending
  - Confirmed
- Uses UI simulation only (no wallet popups)

### 4. Activity Log
- Displays user actions (connect, read, update, transaction)
- Mimics transaction history UX
- Fully in-memory

---

## How to Run Locally

```bash
npm install
npm run dev
