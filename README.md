# StellarZK Demo: Zero-Knowledge Proving & Shielded Transfer Dashboard

[![Stellar Wave 5](https://img.shields.io/badge/Drips_Wave-5-blueviolet?style=for-the-badge)](https://www.drips.network/wave)
[![Language: React](https://img.shields.io/badge/Language-React-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Styling: Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

**A high-fidelity, premium React interface showcasing client-side zero-knowledge proof synthesis and on-chain verification. Features private transfer forms and real-time proving console logs.**

---

# 🔐 Overview

`stellarzk-demo` is the frontend playground and demonstration portal for the StellarZK cryptographic suite. Designed with sleek dark-mode aesthetics, custom glassmorphism containers, and glowing card states, this application lets developers experience on-chain privacy firsthand.

### Key Interactive Areas:
*   **Private Transfer Prover Form:** Input shields to transfer assets secretly by specifying the value and a shielded destination address (`zk19v82x...`).
*   **Prover Console Logs Terminal:** An interactive, live-streaming console showing step-by-step browser-side WASM witness generation, Groth16 cryptographic coordinate calculations, and proof serialization metrics.
*   **On-Chain Verification Registry:** Telemetry widgets highlighting total generated proofs, successfully verified transactions, and live ledger updates.

---

# 🏗️ Internal Structure

```mermaid
graph TD
    subgraph "Visual Containers"
        App[App.tsx] --> Layout[Layout Component]
        Layout --> Sidebar[Sidebar Navigation]
    end

    subgraph "Visual Pages"
        Layout --> ProverPage[Private Prover Page]
        Layout --> ProofsRegistry[Proofs Registry Page]
        Layout --> CircuitsView[ZK Circuits View Page]
        Layout --> PrivacyInfo[Privacy Info Page]
    end

    subgraph "Cryptographic Invocations"
        ProverPage -- "Launches local WASM proving" --> SDK[stellarzk-sdk]
    end
```

---

# 📂 Repository Structure

```text
stellarzk-demo/
├── src/
│   ├── components/       # Visual Layout, Sidebars, and Terminal boxes
│   ├── pages/            # Prover, Proofs, Circuits, and Privacy info views
│   ├── App.tsx           # Router and page allocations
│   ├── index.css         # Styling system and Tailwind directives
│   └── main.tsx          # Application entry point
├── tailwind.config.js    # Design tokens and font families
├── postcss.config.js     # PostCSS configurations (Tailwind integration)
├── package.json          # Dependency definitions
└── README.md             # You are here
```

---

# 🛠️ Development & Serving

### Local Serving (Development Mode)
1. **Clone the Repo:** `git clone https://github.com/stellarzk-phantom/stellarzk-demo.git`
2. **Install Dependencies:** `npm install`
3. **Run Dev Server:** `npm run dev`
4. **Access in Browser:** `http://localhost:5179`

### Production Compilation & Preview
To serve the final compiled production assets locally using a preview server:
```bash
npm run build
npx vite preview --port 5179
```

---

# 📄 License

This project is licensed under the **Apache License 2.0**.
