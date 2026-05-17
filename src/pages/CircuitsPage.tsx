import React, { useState } from 'react'

interface Circuit {
  name: string
  constraints: string
  proving: string
  verifying: string
  complexity: 'High' | 'Medium' | 'Low'
  code: string
}

export default function CircuitsPage() {
  const [circuits, setCircuits] = useState<Circuit[]>([
    { 
      name: 'bn254_verifier', 
      constraints: '1.2M', 
      proving: '3.2s', 
      verifying: '0.8s', 
      complexity: 'High',
      code: `template BN254Verifier() {\n    signal input proof[8];\n    signal input public_inputs[2];\n    signal output verified;\n    // MSM computation steps...\n}`
    },
    { 
      name: 'poseidon_hasher', 
      constraints: '450K', 
      proving: '1.1s', 
      verifying: '0.3s', 
      complexity: 'Medium',
      code: `template PoseidonHasher() {\n    signal input inputs[4];\n    signal output hash;\n    // Poseidon matrix multiplications...\n}`
    },
    { 
      name: 'private_transfer', 
      constraints: '2.1M', 
      proving: '5.4s', 
      verifying: '1.2s', 
      complexity: 'High',
      code: `template PrivateTransfer() {\n    signal input secret_key;\n    signal input recipient_hash;\n    signal input amount;\n    // Nullifier & Merkle commitment proofs...\n}`
    },
  ])

  const [activeName, setActiveName] = useState<string>('private_transfer')
  const [compiling, setCompiling] = useState<string | null>(null)

  const activeCircuit = circuits.find(c => c.name === activeName) ?? circuits[0]

  const handleCompile = async (name: string) => {
    setCompiling(name)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setCompiling(null)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            R1CS Arithmetic Circuits
          </h2>
          <p className="text-sm text-slate-400">Compile and manage math constraints designed to prove statements without exposing raw private secrets.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left list */}
        <div className="lg:col-span-5 space-y-4">
          {circuits.map(c => {
            const isActive = c.name === activeName
            const isCompilingThis = compiling === c.name

            return (
              <div 
                key={c.name}
                onClick={() => !isCompilingThis && setActiveName(c.name)}
                className={`p-5 border rounded-2xl cursor-pointer backdrop-blur-md transition-all duration-300 ${
                  isActive 
                    ? 'border-cyan-500/50 bg-cyan-950/10 shadow-lg shadow-cyan-500/5' 
                    : 'border-white/10 bg-slate-900/20 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <code className={`text-sm font-mono font-bold ${isActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                    {c.name}
                  </code>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                    c.complexity === 'High' ? 'bg-red-500/10 text-red-300 border border-red-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  }`}>
                    {c.complexity} complexity
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-white/5 pt-3 mt-3">
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Constraints</p>
                    <p className="font-bold text-slate-200 mt-0.5">{c.constraints}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Prover</p>
                    <p className="font-bold text-slate-200 mt-0.5">{c.proving}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Verifier</p>
                    <p className="font-bold text-slate-200 mt-0.5">{c.verifying}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCompile(c.name) }}
                    disabled={compiling !== null}
                    className="w-full bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-slate-300 py-2 rounded-xl transition-all disabled:opacity-40"
                  >
                    {isCompilingThis ? 'Compiling in WebAssembly...' : 'Verify Compiler'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Code/Details display */}
        <div className="lg:col-span-7 flex flex-col h-[460px] bg-slate-950/80 border border-white/10 ring-1 ring-white/5 rounded-2xl shadow-xl overflow-hidden font-mono">
          <div className="bg-slate-900/60 px-5 py-3 border-b border-white/10 flex justify-between items-center text-xs font-sans">
            <span className="text-cyan-400 font-bold tracking-wider">CIRCOM SOURCE CODE</span>
            <span className="text-slate-500 text-[10px] font-mono">{activeCircuit.name}.circom</span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar text-[11px] leading-relaxed text-slate-300">
            <pre className="bg-slate-950 p-4 border border-white/5 rounded-xl text-cyan-300 overflow-x-auto max-h-[380px]">
              {activeCircuit.code}
            </pre>
          </div>
        </div>
      </div>

    </div>
  )
}
