import React, { useState, useEffect, useCallback } from 'react';

const HIRO_API = 'https://api.mainnet.hiro.so';
const CONTRACT_ADDRESS = 'SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96';
const VAULT_CONTRACT = `${CONTRACT_ADDRESS}.b2s-staking-vault-v2`;
const TOKEN_CONTRACT = `${CONTRACT_ADDRESS}.b2s-token`;

interface StakingDashboardProps {
  userAddress: string;
  contractAddress?: string;
  contractName?: string;
  onStakeSuccess?: (amount: number) => void;
  onUnstakeSuccess?: (amount: number) => void;
}

export const StakingDashboard: React.FC<StakingDashboardProps> = ({
  userAddress,
  contractAddress = CONTRACT_ADDRESS,
  contractName = 'b2s-staking-vault-v2',
  onStakeSuccess,
  onUnstakeSuccess,
}) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [apy] = useState(12.5);
  const [holders, setHolders] = useState(0);
  const [vaultTxns, setVaultTxns] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('');
  const [tab, setTab] = useState<'stake' | 'unstake'>('stake');

  const fetchStakingData = useCallback(async () => {
    try {
      const [holderRes, vaultRes] = await Promise.all([
        fetch(`${HIRO_API}/extended/v1/tokens/ft/${TOKEN_CONTRACT}/holders?limit=1`),
        fetch(`${HIRO_API}/extended/v1/address/${VAULT_CONTRACT}/transactions?limit=1`),
      ]);
      const [holderData, vaultData] = await Promise.all([holderRes.json(), vaultRes.json()]);
      setHolders(holderData.total || 0);
      setVaultTxns(vaultData.total || 0);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('fetchStakingData:', err);
    }
  }, []);

  useEffect(() => {
    fetchStakingData();
    const interval = setInterval(fetchStakingData, 30000);
    return () => clearInterval(interval);
  }, [fetchStakingData]);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      setStakedBalance(prev => prev + parseFloat(stakeAmount));
      onStakeSuccess?.(parseFloat(stakeAmount));
      setStakeAmount('');
    } catch (error) {
      console.error('Staking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (stakedBalance === 0) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      onUnstakeSuccess?.(stakedBalance);
      setStakedBalance(0);
    } catch (error) {
      console.error('Unstaking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProjectedRewards = () => {
    const amount = parseFloat(stakeAmount) || 0;
    return (amount * (apy / 100)).toFixed(2);
  };

  const claimRewards = () => setRewards(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap');

        .sd-wrap {
          font-family: 'Fira Code', 'Courier New', monospace;
          background: #050a0e;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          position: relative;
          overflow: hidden;
        }

        .sd-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,255,159,0.012) 2px, rgba(0,255,159,0.012) 4px
          );
          pointer-events: none;
        }

        .sd-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
        }
        .sd-orb.a { width: 500px; height: 500px; top: -150px; left: -150px; background: rgba(0,255,159,0.05); }
        .sd-orb.b { width: 400px; height: 400px; bottom: -100px; right: -100px; background: rgba(0,212,255,0.05); }

        .sd-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 600px;
        }

        /* Top bar */
        .sd-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #334155;
        }

        .sd-live {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #00ff9f;
        }

        .sd-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00ff9f;
          box-shadow: 0 0 8px #00ff9f;
          animation: sd-blink 2s ease-in-out infinite;
        }

        @keyframes sd-blink { 0%,100%{opacity:1}50%{opacity:.2} }

        /* Main card */
        .sd-card {
          background: rgba(5,15,20,0.97);
          border: 1px solid rgba(0,255,159,0.18);
          border-radius: 2px;
          box-shadow:
            0 0 0 1px rgba(0,255,159,0.04),
            0 0 60px rgba(0,255,159,0.07),
            inset 0 1px 0 rgba(0,255,159,0.08);
          overflow: hidden;
          position: relative;
        }

        .sd-c { position: absolute; width: 10px; height: 10px; border-color: #00ff9f; border-style: solid; opacity: .45; }
        .sd-c.tl { top:6px;left:6px; border-width:1px 0 0 1px; }
        .sd-c.tr { top:6px;right:6px; border-width:1px 1px 0 0; }
        .sd-c.bl { bottom:6px;left:6px; border-width:0 0 1px 1px; }
        .sd-c.br { bottom:6px;right:6px; border-width:0 1px 1px 0; }

        /* Header */
        .sd-header {
          padding: 24px 28px 20px;
          border-bottom: 1px solid rgba(0,255,159,0.08);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .sd-header-left {}
        .sd-eyebrow { font-size: 10px; letter-spacing: .35em; color: #00ff9f; text-transform: uppercase; margin-bottom: 6px; }
        .sd-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: .04em; }
        .sd-subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }

        .sd-apy-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .sd-apy-label { font-size: 9px; letter-spacing: .2em; color: #64748b; text-transform: uppercase; }
        .sd-apy-value { font-size: 28px; font-weight: 700; color: #ffd700; text-shadow: 0 0 16px rgba(255,215,0,.5); line-height: 1; }

        /* Stats row */
        .sd-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(0,255,159,0.08);
        }

        .sd-stat { background: rgba(5,15,20,.97); padding: 14px 12px; text-align: center; }
        .sd-stat-label { font-size: 9px; letter-spacing: .2em; color: #64748b; text-transform: uppercase; margin-bottom: 5px; }
        .sd-stat-value { font-size: 18px; font-weight: 700; }
        .sd-stat-value.g { color: #00ff9f; text-shadow: 0 0 12px rgba(0,255,159,.4); }
        .sd-stat-value.c { color: #00d4ff; text-shadow: 0 0 12px rgba(0,212,255,.4); }
        .sd-stat-value.p { color: #ff00ff; text-shadow: 0 0 12px rgba(255,0,255,.4); }
        .sd-stat-value.w { color: #e2e8f0; }

        /* Body */
        .sd-body { padding: 24px 28px; }

        /* Rewards */
        .sd-rewards {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: rgba(255,215,0,.04);
          border: 1px solid rgba(255,215,0,.14);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .sd-rewards-label { font-size: 9px; letter-spacing: .2em; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
        .sd-rewards-val { font-size: 20px; font-weight: 700; color: #ffd700; text-shadow: 0 0 12px rgba(255,215,0,.4); }

        .sd-btn-claim {
          padding: 9px 16px;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          background: rgba(255,215,0,.09);
          border: 1px solid rgba(255,215,0,.28);
          color: #ffd700;
          border-radius: 2px;
          cursor: pointer;
          transition: all .2s;
          white-space: nowrap;
        }
        .sd-btn-claim:hover { background: rgba(255,215,0,.18); box-shadow: 0 0 20px rgba(255,215,0,.2); }
        .sd-btn-claim:disabled { opacity: .3; cursor: not-allowed; }

        .sd-divider { height: 1px; background: rgba(0,255,159,.08); margin: 0 0 20px; }

        /* Tabs */
        .sd-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          background: rgba(0,255,159,.04);
          border: 1px solid rgba(0,255,159,.1);
          border-radius: 2px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .sd-tab {
          padding: 10px;
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          border: none;
          border-radius: 1px;
          cursor: pointer;
          transition: all .2s;
          background: transparent;
          color: #64748b;
        }
        .sd-tab.active { background: rgba(0,255,159,.11); color: #00ff9f; box-shadow: 0 0 12px rgba(0,255,159,.08); }

        /* Input */
        .sd-input-label { display: block; font-size: 9px; letter-spacing: .25em; color: #64748b; text-transform: uppercase; margin-bottom: 8px; }

        .sd-input-wrap { position: relative; margin-bottom: 16px; }

        .sd-input {
          width: 100%;
          padding: 14px 60px 14px 16px;
          font-family: 'Fira Code', monospace;
          font-size: 16px;
          font-weight: 600;
          background: rgba(0,255,159,.03);
          border: 1px solid rgba(0,255,159,.2);
          border-radius: 2px;
          color: #f1f5f9;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .sd-input:focus { border-color: rgba(0,255,159,.45); box-shadow: 0 0 0 3px rgba(0,255,159,.05); }
        .sd-input::placeholder { color: #1e3a2f; }

        .sd-input-badge {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 10px; font-weight: 700;
          letter-spacing: .15em; color: #00ff9f; opacity: .6;
        }

        /* Projection */
        .sd-proj {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: rgba(0,212,255,.04);
          border: 1px solid rgba(0,212,255,.12);
          border-radius: 2px;
          margin-bottom: 16px;
          font-size: 12px;
        }
        .sd-proj-label { color: #64748b; }
        .sd-proj-val { color: #00d4ff; font-weight: 700; }

        /* Buttons */
        .sd-btn {
          width: 100%;
          padding: 15px;
          font-family: 'Fira Code', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .25em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all .2s;
          overflow: hidden;
        }
        .sd-btn:disabled { opacity: .3; cursor: not-allowed; transform: none !important; }

        .sd-btn-stake {
          background: linear-gradient(135deg, rgba(0,255,159,.14), rgba(0,255,159,.07));
          border: 1px solid rgba(0,255,159,.35);
          color: #00ff9f;
          box-shadow: 0 0 20px rgba(0,255,159,.08);
        }
        .sd-btn-stake:hover:not(:disabled) { background: linear-gradient(135deg, rgba(0,255,159,.22), rgba(0,255,159,.1)); box-shadow: 0 0 30px rgba(0,255,159,.18); transform: translateY(-1px); }

        .sd-btn-unstake {
          background: rgba(0,212,255,.06);
          border: 1px solid rgba(0,212,255,.2);
          color: #00d4ff;
        }
        .sd-btn-unstake:hover:not(:disabled) { background: rgba(0,212,255,.12); box-shadow: 0 0 20px rgba(0,212,255,.12); transform: translateY(-1px); }

        /* Note */
        .sd-note {
          display: flex;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(0,212,255,.04);
          border-left: 2px solid rgba(0,212,255,.3);
          border-radius: 0 2px 2px 0;
          margin-top: 16px;
          font-size: 12px;
          color: #64748b;
          line-height: 1.6;
        }

        /* Footer */
        .sd-footer {
          padding: 12px 28px;
          border-top: 1px solid rgba(0,255,159,.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sd-footer-text { font-size: 9px; letter-spacing: .15em; color: #1e3a2f; text-transform: uppercase; }

        /* Spinner */
        .sd-spinner {
          display: inline-block;
          width: 11px; height: 11px;
          border: 2px solid rgba(0,255,159,.2);
          border-top-color: #00ff9f;
          border-radius: 50%;
          animation: sd-spin .7s linear infinite;
          vertical-align: middle;
          margin-right: 7px;
        }
        @keyframes sd-spin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .sd-stats { grid-template-columns: repeat(2, 1fr); }
          .sd-header { flex-direction: column; gap: 12px; }
          .sd-apy-badge { align-items: flex-start; }
        }
      `}</style>

      <div className="sd-wrap">
        <div className="sd-orb a" />
        <div className="sd-orb b" />

        <div className="sd-inner">
          <div className="sd-topbar">
            <span>{userAddress ? `${userAddress.slice(0, 8)}...${userAddress.slice(-4)}` : 'NOT CONNECTED'}</span>
            <div className="sd-live"><div className="sd-dot" />STACKS MAINNET</div>
          </div>

          <div className="sd-card">
            <div className="sd-c tl" /><div className="sd-c tr" />
            <div className="sd-c bl" /><div className="sd-c br" />

            {/* Header */}
            <div className="sd-header">
              <div className="sd-header-left">
                <div className="sd-eyebrow">B2S // Staking Dashboard</div>
                <div className="sd-title">Stake $B2S Tokens</div>
                <div className="sd-subtitle">Earn continuous rewards · No lock-up period</div>
              </div>
              <div className="sd-apy-badge">
                <span className="sd-apy-label">Current APY</span>
                <span className="sd-apy-value">{apy}%</span>
              </div>
            </div>

            {/* Stats */}
            <div className="sd-stats">
              <div className="sd-stat">
                <div className="sd-stat-label">Staked</div>
                <div className="sd-stat-value g">{stakedBalance.toFixed(0)}</div>
              </div>
              <div className="sd-stat">
                <div className="sd-stat-label">Rewards</div>
                <div className="sd-stat-value p">{rewards.toFixed(4)}</div>
              </div>
              <div className="sd-stat">
                <div className="sd-stat-label">Holders</div>
                <div className="sd-stat-value c">{holders > 0 ? holders.toLocaleString() : '—'}</div>
              </div>
              <div className="sd-stat">
                <div className="sd-stat-label">Vault Txns</div>
                <div className="sd-stat-value w">{vaultTxns > 0 ? vaultTxns.toLocaleString() : '—'}</div>
              </div>
            </div>

            {/* Body */}
            <div className="sd-body">

              {/* Pending rewards */}
              <div className="sd-rewards">
                <div>
                  <div className="sd-rewards-label">Pending Rewards</div>
                  <div className="sd-rewards-val">{rewards.toFixed(4)} $B2S</div>
                </div>
                <button className="sd-btn-claim" onClick={claimRewards} disabled={loading || rewards === 0}>
                  CLAIM ALL
                </button>
              </div>

              <div className="sd-divider" />

              {/* Tabs */}
              <div className="sd-tabs">
                <button className={`sd-tab ${tab === 'stake' ? 'active' : ''}`} onClick={() => setTab('stake')}>▲ Stake</button>
                <button className={`sd-tab ${tab === 'unstake' ? 'active' : ''}`} onClick={() => setTab('unstake')}>▼ Unstake</button>
              </div>

              {/* Input */}
              <label className="sd-input-label">
                {tab === 'stake' ? 'Amount to stake' : 'Amount to unstake'}
              </label>
              <div className="sd-input-wrap">
                <input
                  className="sd-input"
                  type="number"
                  value={stakeAmount}
                  onChange={e => setStakeAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={loading}
                  min="0"
                  step="0.01"
                />
                <span className="sd-input-badge">$B2S</span>
              </div>

              {/* Projection */}
              {stakeAmount && parseFloat(stakeAmount) > 0 && tab === 'stake' && (
                <div className="sd-proj">
                  <span className="sd-proj-label">Projected yearly rewards</span>
                  <span className="sd-proj-val">+{calculateProjectedRewards()} $B2S</span>
                </div>
              )}

              {/* CTA */}
              {tab === 'stake' ? (
                <button
                  className="sd-btn sd-btn-stake"
                  onClick={handleStake}
                  disabled={loading || !stakeAmount || parseFloat(stakeAmount) <= 0}
                >
                  {loading ? <><span className="sd-spinner" />PROCESSING...</> : '▲ STAKE TOKENS'}
                </button>
              ) : (
                <button
                  className="sd-btn sd-btn-unstake"
                  onClick={handleUnstake}
                  disabled={loading || stakedBalance === 0}
                >
                  {loading ? <><span className="sd-spinner" />PROCESSING...</> : '▼ UNSTAKE ALL'}
                </button>
              )}

              {/* Note */}
              <div className="sd-note">
                ℹ️ Staked tokens earn continuous rewards at {apy}% APY. Unstake at any time — no penalties.
              </div>
            </div>

            {/* Footer */}
            <div className="sd-footer">
              <span className="sd-footer-text">{contractAddress}.{contractName}</span>
              {lastUpdate && <span className="sd-footer-text">Updated {lastUpdate}</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingDashboard;