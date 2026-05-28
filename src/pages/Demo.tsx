import { useState } from 'react'

export default function Demo() {
  const [amount, setAmount] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="zk-panel">
        <h2 className="text-2xl font-bold text-white mb-6">Private Transfer Demo</h2>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {[
            { label: 'Proofs Generated', value: '1,234', icon: '🔐' },
            { label: 'Verified On-Chain', value: '1,198', icon: '✅' },
            { label: 'Gas Saved', value: '45%', icon: '⚡' },
          ].map((stat) => (
            <div key={stat.label} className="proof-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{stat.icon}</span>
              </div>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="proof-card">
          <h3 className="text-lg font-semibold text-white mb-4">Generate Private Transfer Proof</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Amount (XLM)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="zk-input"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Recipient (Shielded Address)</label>
              <input
                type="text"
                placeholder="zk1..."
                className="zk-input"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="zk-button w-full disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  Generating Proof...
                </span>
              ) : (
                'Generate & Send'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
