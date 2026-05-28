export default function ProofsPage() {
  const proofs = [
    { id: 1, type: 'Transfer', status: 'verified', gas: '0.0012 XLM', time: '2m ago' },
    { id: 2, type: 'Balance', status: 'verified', gas: '0.0008 XLM', time: '5m ago' },
    { id: 3, type: 'Transfer', status: 'pending', gas: '0.0011 XLM', time: '8m ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="zk-panel">
        <h2 className="text-2xl font-bold text-white mb-6">Proof History</h2>
        <div className="space-y-3">
          {proofs.map((proof) => (
            <div key={proof.id} className="proof-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-teal-600">
                    <span className="text-xl">🔐</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{proof.type} Proof</p>
                    <p className="text-sm text-slate-400">Gas: {proof.gas} • {proof.time}</p>
                  </div>
                </div>
                <span className={`zk-badge ${proof.status === 'verified' ? 'bg-green-500/10 text-green-300 border-green-500/20' : 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20'}`}>
                  {proof.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
