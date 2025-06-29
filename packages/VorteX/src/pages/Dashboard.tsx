import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useWeb3 } from '../providers/Web3Provider';
import { useVorteX } from '../providers/VorteXProvider';

interface SystemStatus {
  soneium: boolean;
  privy: boolean;
  smartSessions: boolean;
}

interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  features: string[];
  port: number;
  status: 'active' | 'inactive' | 'pending';
}

// Temporary components maintaining original VorteX design
const Button = ({ children, onClick, disabled, className = '' }: any) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`terminal-button ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = '' }: any) => (
  <div className={`terminal-card ${className}`}>
    {children}
  </div>
);

export function Dashboard() {
  const { state: authState } = useAuth();
  const { state: web3State } = useWeb3();
  const { state: vortexState } = useVorteX();
  
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    soneium: web3State.isConnected && web3State.chainId === 1946,
    privy: authState.isAuthenticated,
    smartSessions: authState.smartAccount !== null
  });

  // Original VorteX module configuration
  const modules: ModuleInfo[] = [
    {
      id: 'scs-wallet',
      name: 'scs_wallet',
      description: 'social_login + smart_accounts + gasless_tx',
      features: ['privy_oauth', 'erc4337_accounts', 'session_keys'],
      port: 3005,
      status: vortexState.config.modules.auth ? 'active' : 'inactive'
    },
    {
      id: 'aliza-ai',
      name: 'aliza_ai', 
      description: 'price_predictions + portfolio_sim + analysis',
      features: ['ml_models', 'market_data', 'risk_engine'],
      port: 3006,
      status: vortexState.config.modules.predictions ? 'active' : 'inactive'
    },
    {
      id: 'smart-sessions',
      name: 'smart_sessions',
      description: 'automated_trading + temp_permissions + ai_agents',
      features: ['session_mgmt', 'auto_execute', 'time_limits'],
      port: 3007,
      status: vortexState.features.smartAccounts ? 'active' : 'pending'
    }
  ];

  const handleModuleLaunch = (module: ModuleInfo) => {
    if (module.status === 'active') {
      window.open(`http://localhost:${module.port}`, '_blank');
    }
  };

  const StatusIndicator = ({ status, label }: { status: boolean; label: string }) => (
    <div className={`api-status ${status ? 'api-online' : 'api-offline'} text-xs`}>
      {label}
    </div>
  );

  return (
    <main className="terminal-container py-8">
      {/* System Status - Original VorteX Style */}
      <Card>
        <div className="text-sm font-bold mb-4">system_status</div>
        <div className="grid grid-3">
          <StatusIndicator status={systemStatus.soneium} label="soneium_network" />
          <StatusIndicator status={systemStatus.privy} label="privy_auth" />
          <StatusIndicator status={systemStatus.smartSessions} label="smart_sessions" />
        </div>
      </Card>

      {/* Module Navigation - Core VorteX Architecture */}
      <div className="grid grid-3">
        {modules.map((module) => (
          <div 
            key={module.id}
            className="module-card"
            onClick={() => handleModuleLaunch(module)}
          >
            <div className="text-sm font-bold mb-2">{module.name}</div>
            <div className="text-xs status-inactive mb-4">
              {module.description}
            </div>
            <div className="space-y-1 text-xs status-inactive">
              {module.features.map((feature, index) => (
                <div key={index}>→ {feature}</div>
              ))}
            </div>
            <Button 
              className="mt-4 w-full text-xs"
              disabled={module.status === 'pending'}
              onClick={() => handleModuleLaunch(module)}
            >
              {module.status === 'pending' ? 'pending' : 'launch'}
            </Button>
          </div>
        ))}
      </div>

      {/* Configuration - Original VorteX Config Display */}
      <Card className="mt-8">
        <div className="text-sm font-bold mb-4">config</div>
        <div className="grid grid-2">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="status-inactive">chain_id</span>
              <span>{web3State.chainId || '1946'}</span>
            </div>
            <div className="flex justify-between">
              <span className="status-inactive">network</span>
              <span>soneium_minato</span>
            </div>
            <div className="flex justify-between">
              <span className="status-inactive">privy_app</span>
              <span className={authState.isAuthenticated ? 'status-active' : 'status-inactive'}>
                {authState.isAuthenticated ? 'configured' : 'pending'}
              </span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="status-inactive">bundler</span>
              <span className="status-active">online</span>
            </div>
            <div className="flex justify-between">
              <span className="status-inactive">paymaster</span>
              <span className="status-active">online</span>
            </div>
            <div className="flex justify-between">
              <span className="status-inactive">ai_services</span>
              <span className="status-inactive">pending</span>
            </div>
          </div>
        </div>
      </Card>

      {/* API Endpoints - Developer Reference */}
      <Card className="mt-8">
        <div className="text-sm font-bold mb-4">api_endpoints</div>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between">
            <span className="status-inactive">auth</span>
            <span>/api/auth/login</span>
          </div>
          <div className="flex justify-between">
            <span className="status-inactive">wallet</span>
            <span>/api/wallet/create</span>
          </div>
          <div className="flex justify-between">
            <span className="status-inactive">content</span>
            <span>/api/content/upload</span>
          </div>
          <div className="flex justify-between">
            <span className="status-inactive">ai</span>
            <span>/api/ai/enhance</span>
          </div>
          <div className="flex justify-between">
            <span className="status-inactive">nft</span>
            <span>/api/nft/create</span>
          </div>
        </div>
      </Card>

      {/* Creator Tools Preview - Future Features */}
      <Card className="mt-8">
        <div className="text-sm font-bold mb-4">creator_tools</div>
        <div className="grid grid-2">
          <div className="space-y-2 text-xs">
            <div className="status-inactive">→ audio_upload</div>
            <div className="status-inactive">→ story_loops</div>
            <div className="status-inactive">→ ai_enhancement</div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="status-inactive">→ nft_creation</div>
            <div className="status-inactive">→ token_gating</div>
            <div className="status-inactive">→ analytics</div>
          </div>
        </div>
      </Card>
    </main>
  );
}
