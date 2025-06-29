import React from 'react';

export function CryptoPredictions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Aliza Crypto Forecaster</h1>
        <div className="text-sm text-gray-400">
          AI-Powered Crypto Predictions
        </div>
      </div>

      {/* Integration Notice */}
      <div className="bg-purple-800 border border-purple-600 rounded-lg p-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🔮</span>
          <div>
            <h3 className="font-medium text-purple-100 mb-2">Integration Point</h3>
            <p className="text-purple-200 text-sm">
              This module integrates with the existing Aliza-Crypto-Forecaster package. 
              The full implementation can be found in the packages/Aliza-Crypto-Forecaster directory.
            </p>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Prediction Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">📈</div>
            <h3 className="font-medium text-white mb-2">Price Predictions</h3>
            <p className="text-sm text-gray-400">
              AI-powered price forecasts for major cryptocurrencies
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-medium text-white mb-2">Market Analysis</h3>
            <p className="text-sm text-gray-400">
              Real-time market data and trend analysis
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-medium text-white mb-2">Investment Simulation</h3>
            <p className="text-sm text-gray-400">
              Test investment strategies with historical data
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🌟</div>
            <h3 className="font-medium text-white mb-2">Personalized Insights</h3>
            <p className="text-sm text-gray-400">
              Birth chart-based personalized crypto recommendations
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">📱</div>
            <h3 className="font-medium text-white mb-2">Mobile Responsive</h3>
            <p className="text-sm text-gray-400">
              Optimized experience across all devices
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🔔</div>
            <h3 className="font-medium text-white mb-2">Smart Alerts</h3>
            <p className="text-sm text-gray-400">
              Intelligent notifications for price movements
            </p>
          </div>
        </div>
      </div>

      {/* Sample Predictions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Sample Predictions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-gray-400">Asset</th>
                <th className="text-left py-2 text-gray-400">Current Price</th>
                <th className="text-left py-2 text-gray-400">24h Prediction</th>
                <th className="text-left py-2 text-gray-400">7d Prediction</th>
                <th className="text-left py-2 text-gray-400">Confidence</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-gray-700">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs">₿</div>
                    <span>Bitcoin (BTC)</span>
                  </div>
                </td>
                <td className="py-3">$43,250</td>
                <td className="py-3 text-green-400">↗ $44,100 (+2.0%)</td>
                <td className="py-3 text-green-400">↗ $46,800 (+8.2%)</td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-xs text-gray-400">85%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">E</div>
                    <span>Ethereum (ETH)</span>
                  </div>
                </td>
                <td className="py-3">$2,580</td>
                <td className="py-3 text-red-400">↘ $2,520 (-2.3%)</td>
                <td className="py-3 text-green-400">↗ $2,750 (+6.6%)</td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                    <span className="text-xs text-gray-400">72%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs">S</div>
                    <span>Solana (SOL)</span>
                  </div>
                </td>
                <td className="py-3">$98.40</td>
                <td className="py-3 text-green-400">↗ $102.50 (+4.2%)</td>
                <td className="py-3 text-green-400">↗ $115.20 (+17.1%)</td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <span className="text-xs text-gray-400">78%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Model Information */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">AI Model Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-3">Data Sources</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Real-time price feeds from major exchanges</li>
              <li>• On-chain transaction data</li>
              <li>• Social sentiment analysis</li>
              <li>• Market indicators and technical analysis</li>
              <li>• News and events correlation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-3">Model Features</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• LSTM neural networks for time series</li>
              <li>• Transformer architecture for pattern recognition</li>
              <li>• Ensemble methods for improved accuracy</li>
              <li>• Real-time model retraining</li>
              <li>• Confidence scoring for predictions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Astrological Integration */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Astrological Insights</h2>
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌟</span>
            <div>
              <h3 className="font-medium text-white">Unique Feature: Astro-Finance Correlation</h3>
              <p className="text-sm text-purple-200">
                Aliza combines traditional financial analysis with astrological patterns to provide unique market insights
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-xl mb-2">♈</div>
            <div className="text-sm text-gray-400">Birth Chart Analysis</div>
            <div className="font-medium text-white">Personalized Recommendations</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-xl mb-2">🌙</div>
            <div className="text-sm text-gray-400">Lunar Cycles</div>
            <div className="font-medium text-white">Market Timing</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-xl mb-2">🪐</div>
            <div className="text-sm text-gray-400">Planetary Movements</div>
            <div className="font-medium text-white">Trend Prediction</div>
          </div>
        </div>
      </div>

      {/* Launch External App */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Launch Full Application</h2>
        <p className="text-gray-400 mb-4">
          Access the complete Aliza Crypto Forecaster with full prediction models, personalized insights, and interactive charts.
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors">
            Launch Aliza Forecaster
          </button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors">
            View API Documentation
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-800 border border-yellow-600 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-lg mr-2">⚠️</span>
          <div>
            <h3 className="font-medium text-yellow-100 mb-1">Investment Disclaimer</h3>
            <p className="text-xs text-yellow-200">
              All predictions are for educational and entertainment purposes only. Cryptocurrency investments are highly risky and volatile. 
              Past performance does not guarantee future results. Always conduct your own research and consult with financial advisors 
              before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
