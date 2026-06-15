import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiUsers, FiSettings, FiLogOut, FiFileText as FiContract } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/orcamentos', label: 'Orçamentos', icon: FiFileText },
    { path: '/clientes', label: 'Clientes', icon: FiUsers },
    { path: '/contratos', label: 'Contratos', icon: FiFileText },
    { path: '/configuracoes', label: 'Configurações', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">OrcamentApp</h1>
          <p className="text-sm text-gray-400 mt-1">Gestão de Orçamentos</p>
        </div>

        <nav className="mt-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <FiLogOut className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => isActive(item.path))?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
