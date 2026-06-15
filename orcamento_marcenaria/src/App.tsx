import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Orcamentos } from './pages/Orcamentos';
import { Clientes } from './pages/Clientes';
import { Contratos } from './pages/Contratos';
import { Configuracoes } from './pages/Configuracoes';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/orcamentos"
          element={
            <Layout>
              <Orcamentos />
            </Layout>
          }
        />
        <Route
          path="/clientes"
          element={
            <Layout>
              <Clientes />
            </Layout>
          }
        />
        <Route
          path="/contratos"
          element={
            <Layout>
              <Contratos />
            </Layout>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <Layout>
              <Configuracoes />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
