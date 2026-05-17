import React, { useState } from 'react'

interface Proof {
  id: string
  type: string
  status: 'verified' | 'pending' | 'failed'
  gas: string
  time: string
  circuit: string
  hash: string
}

export default function ProofsPage() {
  const [proofs, setProofs] = useState<Proof[]>([
    { id: '1', type: 'Private Transfer', status: 'verified', gas: '0.0012 XLM', time: '2m ago', circuit: 'private_transfer', hash: '8f3a9e...1b4c' },
    { id: '2', type: 'Shielded Balance check', status: 'verified', gas: '0.0008 XLM', time: '12m ago', circuit: 'poseidon_hasher', hash: 'e2d19f...6a8b' },
    { id: '3', type: 'Multi-Asset Swap', status: 'pending', gas: '0.0024 XLM', time: 'Just now', circuit: 'batch_swap_verifier', hash: 'a4f5c9...3d9e' },
    { id: '4', type: 'Signature Verification', status: 'verified', gas: '0.0009 XLM', time: '1h ago', circuit: 'ed25519_signature', hash: '1b7c4d...9e5f' },
  ])

  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Proof Audit Vault
          </h2>
          <p className="text-sm text-slate-400">View and audit historically submitted cryptographic proofs along with gas metrics.</p>
        </div>
      </div>

      {/* Proof List Cards */}
      <div className="space-y-4">
        {proofs.map((proof) => {
          const isExpanded = expandedId === proof.id
          const isPending = proof.status === 'pending'
          const isVerified = proof.status === 'verified'

          return (
            <div 
              key={proof.id} 
              className="zk-panel p-5 border border-white/10 ring-1 ring-white/5 bg-slate-900/20 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Proof Core Information */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 shadow-md">
                    <span className="text-xl">🔐</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-none mb-1.5">{proof.type}</h3>
                    <p className="text-xs text-slate-400">
                      Circuit: <code className="text-cyan-300 font-mono">{proof.circuit}</code> • {proof.time}
                    </p>
                  </div>
                </div>

                {/* Right side stats and expand button */}
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Gas cost</p>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">{proof.gas}</p>
                  </div>

                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${
                    isVerified 
                      ? 'bg-green-500/10 text-green-300 border-green-500/20 shadow-sm shadow-green-500/10' 
                      : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20'
                  }`}>
                    {proof.status.toUpperCase()}
                  </span>

                  <button 
                    onClick={() => toggleExpand(proof.id)}
                    className="p-1.5 bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-white/10 rounded-lg text-slate-400 hover:text-white transition-all text-xs"
                  >
                    {isExpanded ? 'Collapse' : 'Audit Details'}
                  </button>
                </div>

              </div>

              {/* Expansion Details */}
              {isExpanded && (
                <div className="mt-5 border-t border-white/5 pt-5 grid gap-4 sm:grid-cols-2 text-xs animate-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">On-Chain Transaction Hash</p>
                    <code className="block bg-slate-950 p-3 border border-white/5 rounded-xl text-cyan-300 font-mono truncate">
                      tx_{proof.hash}a7b9e02c5f1d3e8
                    </code>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Parameters Verification Key</p>
                    <code className="block bg-slate-950 p-3 border border-white/5 rounded-xl text-emerald-400 font-mono truncate">
                      vk_groth16_{proof.circuit}_bn254
                    </code>
                  </div>
                </div>
              )}

            </div>
          )
        })}
      </div>

    </div>
  )
}
