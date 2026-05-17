import React, { useState } from 'react'

interface LogMessage {
  text: string
  status: 'info' | 'success' | 'warn'
  timestamp: string
}

export default function Demo() {
  const [amount, setAmount] = useState('100.00')
  const [recipient, setRecipient] = useState('zk19v82x3k7d4...')
  const [isGenerating, setIsGenerating] = useState(false)
  const [provingLogs, setProvingLogs] = useState<LogMessage[]>([])
  const [proofJson, setProofJson] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    'Synthesizing R1CS arithmetic circuits...',
    'Computing witness values with Poseidon Hash...',
    'Executing Groth16 Prover (MSM & NTT math)...',
    'Broadcasting proof & verifying on Soroban...'
  ]

  const now = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const addLog = (text: string, status: LogMessage['status'] = 'info') => {
    setProvingLogs(prev => [...prev, { text, status, timestamp: now() }])
  }

  const handleGenerate = async () => {
    if (!amount || !recipient) return
    setIsGenerating(true)
    setProofJson(null)
    setProvingLogs([])
    setCurrentStep(1)

    // Phase 1: R1CS
    addLog('Synthesizing R1CS arithmetic circuits...', 'info')
    addLog('Loading circuit "private_transfer.r1cs" containing 2,105,482 constraints.', 'info')
    await sleep(900)
    addLog('Circuit constraints mapped successfully.', 'success')
    setCurrentStep(2)

    // Phase 2: Witness
    addLog('Computing witness values with Poseidon Hash...', 'info')
    addLog(`Witness variables assigned: Amount = ${amount} XLM, Recipient = ${recipient}`, 'info')
    await sleep(800)
    addLog('Poseidon hash chain computed. Root state updated.', 'success')
    setCurrentStep(3)

    // Phase 3: Prover
    addLog('Executing Groth16 Prover (MSM & NTT math)...', 'info')
    addLog('Calculating Multi-Scalar Multiplications (MSM) on BN254 curve.', 'info')
    await sleep(1000)
    addLog('Generating Proof components: [pi_A, pi_B, pi_C].', 'success')
    setCurrentStep(4)

    // Phase 4: Soroban verification
    addLog('Broadcasting proof & verifying on Soroban...', 'info')
    addLog('Invoking ZKVerifier Smart Contract on Stellar Ledger.', 'info')
    await sleep(900)
    addLog('Stellar transaction: SUCCESS. Verified in 0.8s on-chain!', 'success')
    
    // Finalize
    setProofJson(JSON.stringify({
      proof: {
        a: ["0x1a83...3fc", "0x2d8a...b71"],
        b: [["0x03bc...4ad", "0x192d...cf3"], ["0x25a9...482", "0x09bc...182"]],
        c: ["0x13c7...fba", "0x2d1a...04a"]
      },
      inputs: [`0x${Math.random().toString(16).substring(2, 10)}`, "0x0000000000000000000000000000000000000000000000000000000000000064"]
    }, null, 2))
    setIsGenerating(false)
    setCurrentStep(0)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Private Transfer Prover
          </h2>
          <p className="text-sm text-slate-400">Synthesize, compile, and execute zero-knowledge proofs verified directly by Soroban contracts.</p>
        </div>
        
        {/* Metric Badges */}
        <div className="flex gap-4">
          {[
            { label: 'Proofs Generated', value: '1,234' },
            { label: 'Verified On-Chain', value: '1,198' }
          ].map(stat => (
            <div key={stat.label} className="bg-slate-900/40 px-4 py-2 border border-white/10 rounded-xl text-center backdrop-blur-md">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">{stat.label}</p>
              <p className="text-base font-extrabold text-cyan-400 font-mono mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="zk-panel p-6 border border-white/10 ring-1 ring-white/5 bg-slate-900/20 backdrop-blur-md rounded-2xl shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              🔒 Generate Proof
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">Transfer Amount (XLM)</label>
                <input 
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="100.00"
                  className="zk-input font-mono"
                  disabled={isGenerating}
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">Recipient Address (Shielded)</label>
                <input 
                  type="text"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  placeholder="zk1..."
                  className="zk-input font-mono"
                  disabled={isGenerating}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !amount || !recipient}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-40 disabled:hover:from-cyan-600 disabled:hover:to-teal-600 text-white py-3 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-cyan-500/20 flex justify-center items-center gap-2"
              >
                {isGenerating ? 'GENERATING GRAPH PROOF...' : 'GENERATE & SEND SHIELDED'}
              </button>
            </div>
          </div>

          {/* Stepper Display */}
          {isGenerating && (
            <div className="zk-panel p-5 border border-white/10 bg-slate-900/20 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Compilation Progress</h4>
              <div className="space-y-3.5">
                {steps.map((step, idx) => {
                  const stepNum = idx + 1
                  const isActive = currentStep === stepNum
                  const isDone = currentStep > stepNum
                  return (
                    <div key={idx} className="flex items-center gap-3 transition-opacity duration-300">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                        isDone ? 'bg-cyan-500 border-cyan-400 text-slate-950' :
                        isActive ? 'border-cyan-500 text-cyan-400 animate-pulse' :
                        'border-white/10 text-slate-600'
                      }`}>
                        {isDone ? '✓' : stepNum}
                      </div>
                      <span className={`text-xs ${isActive ? 'text-cyan-300 font-semibold' : isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                        {step}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Log Console & Proof JSON */}
        <div className="lg:col-span-7 flex flex-col h-[460px] bg-slate-950/80 border border-white/10 ring-1 ring-white/5 rounded-2xl shadow-xl overflow-hidden font-mono">
          
          {/* Header tabs */}
          <div className="bg-slate-900/60 px-5 py-3 border-b border-white/10 flex justify-between items-center text-xs font-sans">
            <span className="text-cyan-400 font-bold tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              PROVER CONSOLE LOGS
            </span>
            <span className="text-slate-500 font-mono text-[10px]">poseidon_v1.0.2</span>
          </div>

          {/* Console / Output area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2 text-xs">
            {provingLogs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-600 font-sans text-center">
                <div>
                  <p className="text-3xl mb-2">💻</p>
                  <p className="text-xs">Initialize proof generation to stream console events</p>
                </div>
              </div>
            ) : (
              provingLogs.map((log, idx) => (
                <div key={idx} className="flex gap-4 animate-in fade-in duration-200">
                  <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                  <span className={log.status === 'success' ? 'text-emerald-400 font-semibold' : log.status === 'warn' ? 'text-amber-400' : 'text-slate-300'}>
                    {log.status === 'success' ? '✔ ' : log.status === 'warn' ? '⚠ ' : 'i '} {log.text}
                  </span>
                </div>
              ))
            )}

            {proofJson && (
              <div className="mt-6 border-t border-white/10 pt-4 space-y-2 animate-in fade-in duration-500">
                <span className="text-cyan-400 text-xs font-sans font-bold uppercase tracking-wider block">Generated Cryptographic Proof (Groth16 JSON)</span>
                <pre className="bg-slate-950 p-4 border border-white/5 rounded-xl text-emerald-400 text-[10px] leading-relaxed overflow-x-auto max-h-[160px] custom-scrollbar">
                  {proofJson}
                </pre>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
