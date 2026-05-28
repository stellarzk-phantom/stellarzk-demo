export default function CircuitsPage() {
  const circuits = [
    { name: 'bn254_verifier', constraints: '1.2M', proving: '3.2s', verifying: '0.8s' },
    { name: 'poseidon_hasher', constraints: '450K', proving: '1.1s', verifying: '0.3s' },
    { name: 'private_transfer', constraints: '2.1M', proving: '5.4s', verifying: '1.2s' },
  ]

  return (
    <div className="space-y-6">
      <div className="zk-panel">
        <h2 className="text-2xl font-bold text-white mb-6">ZK Circuits</h2>
        <div className="grid gap-4">
          {circuits.map((circuit) => (
            <div key={circuit.name} className="proof-card">
              <div className="mb-4">
                <code className="text-lg font-mono text-cyan-300">{circuit.name}</code>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Constraints</p>
                  <p className="text-white font-medium">{circuit.constraints}</p>
                </div>
                <div>
                  <p className="text-slate-500">Proving Time</p>
                  <p className="text-white font-medium">{circuit.proving}</p>
                </div>
                <div>
                  <p className="text-slate-500">Verify Time</p>
                  <p className="text-white font-medium">{circuit.verifying}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
