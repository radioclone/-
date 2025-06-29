import React from 'react';
import { VorteXProvider } from './providers/VorteXProvider';
import { AuthProvider } from './providers/AuthProvider';
import { Web3Provider } from './providers/Web3Provider';
import { Layout } from './components/Layout';
import { Router } from './components/Router';
import './styles/globals.css';

function App() {
  return (
    <VorteXProvider>
      <AuthProvider>
        <Web3Provider>
          <Layout>
            <Router />
          </Layout>
        </Web3Provider>
      </AuthProvider>
    </VorteXProvider>
  );
}

export default App;
