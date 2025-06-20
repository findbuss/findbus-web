'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { autenticarUsuario } from '@/services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await autenticarUsuario({ email, password });

    if (response.success) {
      // No futuro, você salvaria o token (ex: em cookies)
      router.push('/'); // Redireciona para a página principal
    } else {
      setError(response.message || 'Falha na autenticação. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61BB46] focus:border-[#61BB46]"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61BB46] focus:border-[#61BB46]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-white bg-[#61BB46] rounded-md hover:bg-[#4fa53a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#61BB46] transition-colors duration-200"
            >
              Entrar
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="text-sm text-center">
            <Link href="/signup" className="font-medium text-[#61BB46] hover:text-[#4fa53a]">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
