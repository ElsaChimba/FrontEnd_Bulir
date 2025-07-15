'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrNif, setEmailOrNif] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(emailOrNif, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'CLIENTE') {
        router.push('/cliente');
      } else {
        router.push('/adm');
      }
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#D4AF37]">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block mb-1 text-sm">E-mail ou NIF</label>
          <input
            type="text"
            value={emailOrNif}
            onChange={(e) => setEmailOrNif(e.target.value)}
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
      </form>
    </div>
  );
}
