import React, { useState, useEffect } from 'react';

interface StakingDashboardProps {
  userAddress: string;
  contractAddress?: string;
  contractName?: string;
  theme?: 'light' | 'dark';
  onStakeSuccess?: (amount: number) => void;
  onUnstakeSuccess?: (amount: number) => void;
}

export const StakingDashboard: React.FC<StakingDashboardProps> = ({
  userAddress,
  contractAddress = 'ST936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96',
  contractName = 'b2s-token',
  theme = 'dark',
  onStakeSuccess,
  onUnstakeSuccess,
}) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [apy, setApy] = useState(12.5);

  useEffect(() => {
    fetchStakingData();
  }, [userAddress]);

  const fetchStakingData = async () => {
    // Fetch staked amount and rewards
    // Implementation will connect to smart contract
    setStakedBalance(0);
    setRewards(0);
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // Staking logic here
      console.log(`Staking ${stakeAmount} tokens`);
      onStakeSuccess?.(parseFloat(stakeAmount));
      setStakeAmount('');
      await fetchStakingData();
    } catch (error) {
      console.error('Staking failed:', error);
      alert('Staking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (stakedBalance === 0) {
      alert('No tokens staked');
      return;
    }

    setLoading(true);
    try {
      // Unstaking logic here
      console.log(`Unstaking ${stakedBalance} tokens`);
      onUnstakeSuccess?.(stakedBalance);
      await fetchStakingData();
    } catch (error) {
      console.error('Unstaking failed:', error);
      alert('Unstaking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateProjectedRewards = () => {
    const amount = parseFloat(stakeAmount) || 0;
    const dailyRate = apy / 365 / 100;
    return (amount * dailyRate * 365).toFixed(2);
  };

  return (
    <div className={`staking-dashboard ${theme}`}>
      <div className="dashboard-header">
        <h2>🔒 Stake Your $B2S Tokens</h2>
        <p>Earn {apy}% APY on staked tokens</p>
      </div>

      {/* Current Staking Info */}
      <div className="staking-info">
        <div className="info-card">
          <h3>Your Staked Amount</h3>
          <p className="amount">{stakedBalance.toFixed(2)} $B2S</p>
        </div>
        <div className="info-card">
          <h3>Rewards Earned</h3>
          <p className="amount rewards">{rewards.toFixed(2)} $B2S</p>
        </div>
        <div className="info-card">
          <h3>Current APY</h3>
          <p className="amount apy">{apy}%</p>
        </div>
      </div>

      {/* Stake Input */}
      <div className="stake-section">
        <div className="input-group">
          <label>Amount to Stake</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={loading}
            min="0"
            step="0.01"
          />
          <span className="currency">$B2S</span>
        </div>

        {stakeAmount && (
          <div className="projection">
            <p>
              💰 Projected yearly rewards: <strong>{calculateProjectedRewards()} $B2S</strong>
            </p>
          </div>
        )}

        <div className="button-group">
          <button
            onClick={handleStake}
            disabled={loading || !stakeAmount}
            className="btn btn-primary"
          >
            {loading ? '⏳ Processing...' : '🔒 Stake Tokens'}
          </button>
          <button
            onClick={handleUnstake}
            disabled={loading || stakedBalance === 0}
            className="btn btn-secondary"
          >
            {loading ? '⏳ Processing...' : '🔓 Unstake All'}
          </button>
        </div>
      </div>

      {/* Info Note */}
      <div className="info-note">
        <p>
          ℹ️ <strong>Note:</strong> Staked tokens earn continuous rewards based on current APY.
          You can unstake at any time without penalties.
        </p>
      </div>

      <style jsx>{`
        .staking-dashboard {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 12px;
          background: ${theme === 'dark' ? '#1e293b' : '#ffffff'};
          color: ${theme === 'dark' ? '#ffffff' : '#000000'};
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .staking-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .info-card {
          padding: 20px;
          background: ${theme === 'dark' ? '#334155' : '#f1f5f9'};
          border-radius: 8px;
          text-align: center;
        }

        .info-card h3 {
          font-size: 14px;
          margin-bottom: 10px;
          opacity: 0.8;
        }

        .amount {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }

        .rewards {
          color: #10b981;
        }

        .apy {
          color: #3b82f6;
        }

        .stake-section {
          margin-bottom: 20px;
        }

        .input-group {
          position: relative;
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 2px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'};
          border-radius: 8px;
          background: ${theme === 'dark' ? '#334155' : '#ffffff'};
          color: ${theme === 'dark' ? '#ffffff' : '#000000'};
        }

        .currency {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.6;
        }

        .projection {
          padding: 12px;
          background: #10b98120;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn {
          padding: 14px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .btn-secondary {
          background: ${theme === 'dark' ? '#475569' : '#e2e8f0'};
          color: ${theme === 'dark' ? '#ffffff' : '#000000'};
        }

        .info-note {
          padding: 15px;
          background: #3b82f620;
          border-left: 4px solid #3b82f6;
          border-radius: 4px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};