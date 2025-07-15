'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'CLIENT') {
        router.push('/cliente');
      } else {
        router.push('/adm');
      }
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-white px-4 bg-cover bg-center"
      style={{ backgroundImage: `url('/restaurante1.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#D4AF37]">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block mb-1 text-sm">E-mail ou NIF</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-white/20 text-white outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-white/20 text-white outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] transition"
        >
          Entrar
        </button>

        <p className="text-sm text-center mt-4">
          Não tem uma conta?{' '}
          <button
            type="button"
            onClick={() => router.push('/cadastro')}
            className="text-[#D4AF37] underline hover:text-white transition"
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  );
}
