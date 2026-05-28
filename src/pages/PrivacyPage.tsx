export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <div className="zk-panel">
        <h2 className="text-2xl font-bold text-white mb-6">Shielded Balance</h2>
        <div className="proof-card mb-6">
          <div className="text-center py-8">
            <p className="text-sm text-slate-400 mb-2">Your Private Balance</p>
            <p className="text-5xl font-bold text-white mb-4">••••••</p>
            <button className="zk-button">Reveal Balance</button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Recent Private Transactions</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="proof-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Private Transfer</p>
                  <p className="text-sm text-slate-400">Amount: ••••• XLM</p>
                </div>
                <span className="zk-badge">Shielded</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
