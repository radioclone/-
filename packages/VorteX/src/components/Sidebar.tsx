import React from 'react';
import { useVorteX } from '../providers/VorteXProvider';

export function Sidebar() {
  const { state, dispatch } = useVorteX();

  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '🏠',
      enabled: true,
    },
    {
      id: 'auth',
      name: 'Authentication',
      icon: '🔐',
      enabled: state.config.modules.auth,
    },
    {
      id: 'web3',
      name: 'Web3 Tools',
      icon: '⛓️',
      enabled: state.config.modules.web3,
    },
    {
      id: 'scs-demo',
      name: 'SCS AA Demo',
      icon: '🚀',
      enabled: true,
    },
    {
      id: 'predictions',
      name: 'Crypto Predictions',
      icon: '📈',
      enabled: state.config.modules.predictions,
    },
  ];

  const handleModuleClick = (moduleId: string) => {
    dispatch({ type: 'SET_MODULE', payload: { module: moduleId } });
  };

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Modules</h2>
        <nav className="space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              disabled={!module.enabled}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                state.currentModule === module.id
                  ? 'bg-blue-600 text-white'
                  : module.enabled
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="text-lg">{module.icon}</span>
              <span className="text-sm font-medium">{module.name}</span>
              {!module.enabled && (
                <span className="ml-auto text-xs bg-gray-600 px-2 py-1 rounded">
                  Disabled
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Feature Flags */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Features</h3>
          <div className="space-y-2">
            {Object.entries(state.features).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
