'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    nif: '',
    senha: '',
    role: 'CLIENTE',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, form);
      const login = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        emailOrNif: form.email,
        password: form.senha,
      });

      localStorage.setItem('token', login.data.token);
      localStorage.setItem('user', JSON.stringify(login.data.user));

      router.push(form.role === 'CLIENTE' ? '/cliente' : '/adm');
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#D4AF37]">Cadastro</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white outline-none"
          required
        />

        <input
          type="text"
          name="nif"
          placeholder="NIF"
          value={form.nif}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white outline-none"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white outline-none"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/20 text-white outline-none"
        >
          <option value="CLIENTE">Cliente</option>
          <option value="PRESTADOR">Prestador de Serviço</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
