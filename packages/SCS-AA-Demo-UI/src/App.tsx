import "./App.css";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import startaleLogo from "../public/startale_logo.webp";
import { SmartAccount } from "./StartaleAccount";
import { Output, type OutputHandle } from "./Output";

function App() {
  const [loadingText, setLoadingText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const outputRef = useRef<OutputHandle | null>(null);
  const { isConnected, address } = useAccount();
  const { login } = useLogin();
  const { ready, authenticated, user } = usePrivy();
  const { logout } = useLogout();
  
  const handleAddLine = (line: string, level?: string) => {
    outputRef.current?.addLine(`> ${line}`, level);
  };

  const handleClearLines = () => {
    outputRef.current?.clearLines();
  };

  useEffect(() => {
    handleClearLines();
    if (isConnected && address) {
      handleAddLine(`Connected with address: ${address}`, 'success');
      handleAddLine(`Network: ${isConnected ? 'Connected' : 'Disconnected'}`, 'info');
    }
  }, [address, isConnected]);

  const isLoginDisabled = !ready;
  const isLoggedIn = authenticated && ready;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="header flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <img src={startaleLogo} alt="Startale logo" className="h-10 w-auto" />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              Smart Contract Starter (SCS) - Account Abstraction Demo
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <div className="connect flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.email ? user.email.address : user?.google?.email || 'Connected User'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No address'}
                    </span>
                  </div>
                  <button 
                    type="button" 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  disabled={isLoginDisabled}
                  type="button"
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                  onClick={() => login()}
                >
                  {isLoginDisabled ? 'Loading...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="content py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Smart Account Operations
              </h2>
              <SmartAccount
                addLine={handleAddLine}
                setLoadingText={setLoadingText}
                clearLines={handleClearLines}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Console Output
              </h2>
              <Output ref={outputRef} loadingText={loadingText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
