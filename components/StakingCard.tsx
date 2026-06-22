import React, { useState, useEffect, useCallback } from 'react';

const HIRO_API = 'https://api.mainnet.hiro.so';
const CONTRACT = 'SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N';
const VAULT_CONTRACT = `${CONTRACT}.b2s-staking-vault-v2`;
const TOKEN_CONTRACT = `${CONTRACT}.b2s-token`;

interface StakingCardProps {
  userAddress?: string;
  onStakeSuccess?: (amount: number) => void;
  onUnstakeSuccess?: (amount: number) => void;
}

interface StakingData {
  stakedBalance: number;
  pendingRewards: number;
  apy: number;
  totalStaked: number;
  loading: boolean;
  lockPeriod?: number;  
  lockStartTime?: number;  
  currentBlock?: number;  
}

export const StakingCard: React.FC<StakingCardProps> = ({
  userAddress = '',
  onStakeSuccess,
  onUnstakeSuccess,
}) => {
  const [amount, setAmount] = useState('');
  const [tab, setTab] = useState<'stake' | 'unstake'>('stake');
  const [txLoading, setTxLoading] = useState(false);
  const [data, setData] = useState<StakingData>({
    stakedBalance: 0,
    pendingRewards: 0,
    apy: 12.5,
    totalStaked: 0,
    loading: true,
  });
  const [pulse, setPulse] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userAddress) {
      setData(prev => ({ ...prev, loading: false }));
      return;
    }
    try {
      const [vaultRes, tokenRes] = await Promise.all([
        fetch(`${HIRO_API}/extended/v1/address/${VAULT_CONTRACT}/transactions?limit=1`),
        fetch(`${HIRO_API}/v2/contracts/call-read/${CONTRACT}/b2s-staking-vault-v2/get-staking-info`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender: userAddress, arguments: [] }),
        }),
      ]);
      const vaultData = await vaultRes.json();
      setData(prev => ({
        ...prev,
        totalStaked: vaultData.total || 0,
        loading: false,
      }));
    } catch {
      setData(prev => ({ ...prev, loading: false }));
    }
  }, [userAddress]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      setPulse(p => !p);
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const projectedRewards = () => {
    const a = parseFloat(amount) || 0;
    return (a * (data.apy / 100)).toFixed(2);
  };

  const handleAction = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setTxLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      if (tab === 'stake') {
        onStakeSuccess?.(parseFloat(amount));
        setData(prev => ({ ...prev, stakedBalance: prev.stakedBalance + parseFloat(amount) }));
      } else {
        onUnstakeSuccess?.(parseFloat(amount));
        setData(prev => ({ ...prev, stakedBalance: Math.max(0, prev.stakedBalance - parseFloat(amount)) }));
      }
      setAmount('');
    } catch (e) {
      console.error(e);
    } finally {
      setTxLoading(false);
    }
  };

  const claimRewards = async () => {
    if (data.pendingRewards === 0) return;
    setTxLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setData(prev => ({ ...prev, pendingRewards: 0 }));
    setTxLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap');

        .sc-root {
          font-family: 'Fira Code', 'Courier New', monospace;
          background: #050a0e;
          color: #e2e8f0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .sc-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,255,159,0.015) 2px,
            rgba(0,255,159,0.015) 4px
          );
          pointer-events: none;
          z-index: 0;
        }

        .sc-glow-orb {
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .sc-glow-orb.tl { top: -100px; left: -100px; background: rgba(0,255,159,0.06); }
        .sc-glow-orb.br { bottom: -100px; right: -100px; background: rgba(0,212,255,0.06); }

        .sc-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          background: rgba(5,15,20,0.95);
          border: 1px solid rgba(0,255,159,0.2);
          border-radius: 2px;
          box-shadow:
            0 0 0 1px rgba(0,255,159,0.05),
            0 0 40px rgba(0,255,159,0.08),
            inset 0 1px 0 rgba(0,255,159,0.1);
          overflow: hidden;
        }

        .sc-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: #00ff9f;
          border-style: solid;
          opacity: 0.6;
        }
        .sc-corner.tl { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
        .sc-corner.tr { top: 6px; right: 6px; border-width: 1px 1px 0 0; }
        .sc-corner.bl { bottom: 6px; left: 6px; border-width: 0 0 1px 1px; }
        .sc-corner.br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }

        .sc-header {
          padding: 24px 28px 0;
          border-bottom: 1px solid rgba(0,255,159,0.1);
          padding-bottom: 20px;
        }

        .sc-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .sc-title {
          font-size: 11px;
          letter-spacing: 0.35em;
          font-weight: 700;
          color: #00ff9f;
          text-transform: uppercase;
        }

        .sc-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #00ff9f;
          letter-spacing: 0.15em;
          opacity: 0.7;
        }

        .sc-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ff9f;
          animation: sc-blink 2s ease-in-out infinite;
          box-shadow: 0 0 6px #00ff9f;
        }

        @keyframes sc-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .sc-subtitle {
          font-size: 22px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: 0.05em;
          margin-top: 6px;
        }

        .sc-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1px;
          background: rgba(0,255,159,0.1);
          margin: 0;
        }

        .sc-stat {
          background: rgba(5,15,20,0.95);
          padding: 16px 20px;
          text-align: center;
        }

        .sc-stat-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .sc-stat-value {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .sc-stat-value.green { color: #00ff9f; text-shadow: 0 0 12px rgba(0,255,159,0.4); }
        .sc-stat-value.cyan  { color: #00d4ff; text-shadow: 0 0 12px rgba(0,212,255,0.4); }
        .sc-stat-value.gold  { color: #ffd700; text-shadow: 0 0 12px rgba(255,215,0,0.4); }

        .sc-body {
          padding: 24px 28px;
        }

        .sc-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          margin-bottom: 24px;
          background: rgba(0,255,159,0.04);
          border: 1px solid rgba(0,255,159,0.1);
          border-radius: 2px;
          padding: 4px;
        }

        .sc-tab {
          padding: 10px;
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          border-radius: 1px;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #64748b;
        }

        .sc-tab.active {
          background: rgba(0,255,159,0.12);
          color: #00ff9f;
          box-shadow: 0 0 12px rgba(0,255,159,0.1);
        }

        .sc-tab:hover:not(.active) { color: #94a3b8; }

        .sc-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }

        .sc-input-wrap {
          position: relative;
          margin-bottom: 16px;
        }

        .sc-input {
          width: 100%;
          padding: 14px 60px 14px 16px;
          font-family: 'Fira Code', monospace;
          font-size: 16px;
          font-weight: 600;
          background: rgba(0,255,159,0.04);
          border: 1px solid rgba(0,255,159,0.2);
          border-radius: 2px;
          color: #f1f5f9;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .sc-input:focus {
          border-color: rgba(0,255,159,0.5);
          box-shadow: 0 0 0 3px rgba(0,255,159,0.06), inset 0 0 20px rgba(0,255,159,0.03);
        }

        .sc-input::placeholder { color: #334155; }

        .sc-input-badge {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #00ff9f;
          opacity: 0.7;
        }

        .sc-projection {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: rgba(0,212,255,0.05);
          border: 1px solid rgba(0,212,255,0.15);
          border-radius: 2px;
          margin-bottom: 20px;
          font-size: 12px;
        }

        .sc-proj-label { color: #64748b; letter-spacing: 0.1em; }
        .sc-proj-value { color: #00d4ff; font-weight: 700; font-size: 14px; }

        .sc-btn {
          width: 100%;
          padding: 15px;
          font-family: 'Fira Code', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }

        .sc-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s;
        }

        .sc-btn:hover:not(:disabled)::after { transform: translateX(100%); }

        .sc-btn-primary {
          background: linear-gradient(135deg, rgba(0,255,159,0.15), rgba(0,255,159,0.08));
          border: 1px solid rgba(0,255,159,0.4);
          color: #00ff9f;
          box-shadow: 0 0 20px rgba(0,255,159,0.1);
        }

        .sc-btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(0,255,159,0.25), rgba(0,255,159,0.12));
          box-shadow: 0 0 30px rgba(0,255,159,0.2);
          transform: translateY(-1px);
        }

        .sc-btn-secondary {
          background: rgba(0,212,255,0.06);
          border: 1px solid rgba(0,212,255,0.2);
          color: #00d4ff;
        }

        .sc-btn-secondary:hover:not(:disabled) {
          background: rgba(0,212,255,0.12);
          box-shadow: 0 0 20px rgba(0,212,255,0.15);
          transform: translateY(-1px);
        }

        .sc-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .sc-rewards-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: rgba(255,215,0,0.05);
          border: 1px solid rgba(255,215,0,0.15);
          border-radius: 2px;
          margin-bottom: 10px;
        }

        .sc-rewards-info {}
        .sc-rewards-label { font-size: 9px; letter-spacing: 0.2em; color: #64748b; text-transform: uppercase; }
        .sc-rewards-value { font-size: 18px; font-weight: 700; color: #ffd700; margin-top: 2px;
          text-shadow: 0 0 12px rgba(255,215,0,0.4); }

        .sc-btn-claim {
          padding: 10px 18px;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: rgba(255,215,0,0.1);
          border: 1px solid rgba(255,215,0,0.3);
          color: #ffd700;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .sc-btn-claim:hover:not(:disabled) {
          background: rgba(255,215,0,0.2);
          box-shadow: 0 0 20px rgba(255,215,0,0.2);
        }

        .sc-btn-claim:disabled { opacity: 0.3; cursor: not-allowed; }

        .sc-footer {
          padding: 14px 28px;
          border-top: 1px solid rgba(0,255,159,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sc-footer-text {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #334155;
          text-transform: uppercase;
        }

        .sc-address {
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #1e3a2f;
        }

        .sc-divider {
          height: 1px;
          background: rgba(0,255,159,0.08);
          margin: 20px 0;
        }

        .sc-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(0,255,159,0.2);
          border-top-color: #00ff9f;
          border-radius: 50%;
          animation: sc-spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes sc-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="sc-root">
        <div className="sc-glow-orb tl" />
        <div className="sc-glow-orb br" />

        <div className="sc-card">
          <div className="sc-corner tl" />
          <div className="sc-corner tr" />
          <div className="sc-corner bl" />
          <div className="sc-corner br" />

          {/* Header */}
          <div className="sc-header">
            <div className="sc-header-top">
              <span className="sc-title">B2S // Staking Interface</span>
              <div className="sc-live">
                <div className="sc-live-dot" />
                MAINNET
              </div>
            </div>
            <div className="sc-subtitle">Stake $B2S · Earn Rewards</div>
          </div>

          {/* Stats */}
          <div className="sc-stats">
            <div className="sc-stat">
              <div className="sc-stat-label">Staked</div>
              <div className="sc-stat-value green">
                {data.loading ? '...' : data.stakedBalance.toFixed(0)}
              </div>
            </div>
            <div className="sc-stat">
              <div className="sc-stat-label">APY</div>
              <div className="sc-stat-value gold">{data.apy}%</div>
            </div>
            <div className="sc-stat">
              <div className="sc-stat-label">TVL Txns</div>
              <div className="sc-stat-value cyan">
                {data.loading ? '...' : data.totalStaked.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="sc-body">

            {/* Pending rewards */}
            <div className="sc-rewards-box">
              <div className="sc-rewards-info">
                <div className="sc-rewards-label">Pending Rewards</div>
                <div className="sc-rewards-value">{data.pendingRewards.toFixed(4)} $B2S</div>
              </div>
              <button
                className="sc-btn-claim"
                onClick={claimRewards}
                disabled={txLoading || data.pendingRewards === 0}
              >
                {txLoading ? <><span className="sc-spinner" />WAIT</> : 'CLAIM'}
              </button>
            </div>

            <div className="sc-divider" />

            {/* Tabs */}
            <div className="sc-tabs">
              <button
                className={`sc-tab ${tab === 'stake' ? 'active' : ''}`}
                onClick={() => setTab('stake')}
              >
                ▲ Stake
              </button>
              <button
                className={`sc-tab ${tab === 'unstake' ? 'active' : ''}`}
                onClick={() => setTab('unstake')}
              >
                ▼ Unstake
              </button>
            </div>

            {/* Amount input */}
            <label className="sc-label">
              {tab === 'stake' ? 'Amount to stake' : 'Amount to unstake'}
            </label>
            <div className="sc-input-wrap">
              <input
                className="sc-input"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                disabled={txLoading}
              />
              <span className="sc-input-badge">$B2S</span>
            </div>

            {/* Projection */}
            {amount && parseFloat(amount) > 0 && tab === 'stake' && (
              <div className="sc-projection">
                <span className="sc-proj-label">Projected yearly rewards</span>
                <span className="sc-proj-value">+{projectedRewards()} $B2S</span>
              </div>
            )}

            {/* Action button */}
            <button
              className={tab === 'stake' ? 'sc-btn sc-btn-primary' : 'sc-btn sc-btn-secondary'}
              onClick={handleAction}
              disabled={txLoading || !amount || parseFloat(amount) <= 0}
            >
              {txLoading
                ? <><span className="sc-spinner" />PROCESSING...</>
                : tab === 'stake'
                  ? '▲ STAKE TOKENS'
                  : '▼ UNSTAKE TOKENS'
              }
            </button>
          </div>

          {/* Footer */}
          <div className="sc-footer">
            <span className="sc-footer-text">b2s-staking-vault-v2 · Stacks Mainnet</span>
            <span className="sc-address">SP936Y...ARQ96</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingCard;
