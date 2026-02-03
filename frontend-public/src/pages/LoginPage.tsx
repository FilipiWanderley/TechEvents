import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNextFromSearch, loginUser } from '../auth';

export function LoginPage() {
  const [tab, setTab] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextFromSearch(location.search) || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex">
          <button
            onClick={() => setTab('user')}
            className={`w-1/2 py-4 text-sm font-semibold ${tab === 'user' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 border-b border-gray-200'}`}
          >
            Usuário
          </button>
          <button
            onClick={() => setTab('admin')}
            className={`w-1/2 py-4 text-sm font-semibold ${tab === 'admin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 border-b border-gray-200'}`}
          >
            Administrador
          </button>
        </div>

        {tab === 'user' && (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Entrar como Usuário</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Senha</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="••••••••" />
              </div>
              <button
                onClick={() => {
                  if (email && password) {
                    loginUser();
                    navigate(next);
                  }
                }}
                className="w-full mt-2 rounded-lg bg-blue-600 text-white font-semibold py-2.5 hover:bg-blue-500"
              >
                Entrar
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center">Ao continuar você concorda com os termos e política de privacidade.</p>
          </div>
        )}

        {tab === 'admin' && (
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Entrar como Administrador</h2>
            <p className="text-sm text-gray-600">A gestão administrativa acontece no Backoffice.</p>
            <a
              href="http://localhost:4200"
              target="_self"
              className="w-full inline-flex justify-center rounded-lg bg-gray-900 text-white font-semibold py-2.5 hover:bg-gray-800"
            >
              Ir para o Painel Admin
            </a>
            <div className="text-center">
              <Link to="/" className="text-xs text-blue-600 hover:text-blue-500">Voltar para Home</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
