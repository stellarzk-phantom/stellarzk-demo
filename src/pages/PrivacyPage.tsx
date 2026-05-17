import React, { useState } from 'react'

interface Tx {
  id: string
  hash: string
  amount: string
  time: string
  revealed: boolean
}

export default function PrivacyPage() {
  const [balanceRevealed, setBalanceRevealed] = useState(false)
  const [revealingBalance, setRevealingBalance] = useState(false)
  
  const [txs, setTxs] = useState<Tx[]>([
    { id: '1', hash: 'zk_tx_8f9a2b', amount: '1,500.00 XLM', time: '5m ago', revealed: false },
    { id: '2', hash: 'zk_tx_3c4d7e', amount: '25,000.00 XLM', time: '20m ago', revealed: false },
    { id: '3', hash: 'zk_tx_1e2f9a', amount: '800.00 XLM', time: '1h ago', revealed: false },
  ])

  const [revealingTxId, setRevealingTxId] = useState<string | null>(null)

  const handleRevealBalance = async () => {
    if (balanceRevealed) {
      setBalanceRevealed(false)
      return
    }
    setRevealingBalance(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setBalanceRevealed(true)
    setRevealingBalance(false)
  }

  const handleRevealTx = async (id: string) => {
    const target = txs.find(t => t.id === id)
    if (!target) return
    if (target.revealed) {
      setTxs(prev => prev.map(t => t.id === id ? { ...t, revealed: false } : t))
      return
    }
    setRevealingTxId(id)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setTxs(prev => prev.map(t => t.id === id ? { ...t, revealed: true } : t))
    setRevealingTxId(null)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Shielded Privacy Pool
          </h2>
          <p className="text-sm text-slate-400">Interact with your anonymized deposits and cryptographically shielded account states.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Left balance panel */}
        <div className="md:col-span-5">
          <div className="zk-panel p-6 border border-white/10 ring-1 ring-white/5 bg-slate-900/20 backdrop-blur-md rounded-2xl shadow-xl text-center space-y-6 flex flex-col justify-center min-h-[300px]">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-2">Shielded Vault Balance</p>
              <div className="h-16 flex items-center justify-center">
                {revealingBalance ? (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <div className="h-4 w-4 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
                    <span className="text-sm font-mono font-semibold uppercase tracking-wider">Decrypting State...</span>
                  </div>
                ) : (
                  <p className="text-4xl font-extrabold text-white font-mono tracking-tight transition-all duration-300">
                    {balanceRevealed ? '245,670.00 XLM' : '••••••••••••'}
                  </p>
                )}
              </div>
            </div>

            <button 
              onClick={handleRevealBalance}
              disabled={revealingBalance}
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-40 text-white py-3 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-cyan-500/20"
            >
              {revealingBalance ? 'COMPUTING DECRYPTION WITNESS...' : balanceRevealed ? 'HIDE SHIELDED BALANCE' : 'REVEAL SHIELDED BALANCE'}
            </button>
          </div>
        </div>

        {/* Right transaction list */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest px-1">Shielded Vault Ledger Logs</h3>
          
          <div className="space-y-3">
            {txs.map((tx) => {
              const isRevealing = revealingTxId === tx.id
              return (
                <div 
                  key={tx.id} 
                  className="p-5 border border-white/10 ring-1 ring-white/5 bg-slate-900/20 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-between gap-4 transition-all duration-300 hover:border-cyan-500/30"
                >
                  <div className="space-y-1">
                    <code className="text-xs font-mono font-bold text-cyan-300 bg-slate-950/60 border border-white/5 px-2.5 py-1 rounded-md">
                      {tx.hash}
                    </code>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs text-slate-500">Value:</span>
                      {isRevealing ? (
                        <div className="h-3 w-3 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"></div>
                      ) : (
                        <code className="text-xs font-mono font-semibold text-slate-300 transition-all">
                          {tx.revealed ? tx.amount : '••••••••••••'}
                        </code>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 hidden sm:block">{tx.time}</span>
                    <button 
                      onClick={() => handleRevealTx(tx.id)}
                      disabled={isRevealing}
                      className="px-3 py-1.5 bg-slate-950/60 hover:bg-slate-950 border border-white/5 hover:border-white/10 text-[11px] font-semibold text-slate-300 rounded-lg transition-all"
                    >
                      {isRevealing ? 'Decrypting...' : tx.revealed ? 'Hide Amount' : 'Decrypt Amount'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
