'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registrarUsuario } from '@/services/authService';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const response = await registrarUsuario({ name, email, password });

    if (response.success) {
      setMessage(response.message || 'Cadastro realizado com sucesso!');
      setTimeout(() => router.push('/login'), 2000); // Redireciona para o login após 2s
    } else {
      setError(response.message || 'Falha no cadastro. Tente novamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61BB46] focus:border-[#61BB46]"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61BB46] focus:border-[#61BB46]"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61BB46] focus:border-[#61BB46]"
            />
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          {message && <p className="text-sm text-center text-green-600">{message}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#61BB46] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#61BB46]"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-medium text-[#61BB46] hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}

