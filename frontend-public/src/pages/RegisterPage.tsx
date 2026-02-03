import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function RegisterPage() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Inscrição no Evento</h1>
        <p className="text-sm text-gray-600 mb-6">Evento #{id}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nome completo</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600" placeholder="seu@email.com" />
          </div>
          <button
            disabled={sending || !name || !email}
            onClick={async () => {
              setSending(true);
              await new Promise((r) => setTimeout(r, 800));
              toast.success('Inscrição realizada com sucesso!');
              setSending(false);
            }}
            className={`w-full rounded-lg py-2.5 font-semibold ${sending || !name || !email ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
          >
            {sending ? 'Enviando...' : 'Confirmar Inscrição'}
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-500">Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
}
