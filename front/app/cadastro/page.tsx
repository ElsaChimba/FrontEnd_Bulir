'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function CadastroPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        nif: '',
        password: '',
        role: 'CLIENT',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, form);
            setSuccess(true);
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError('E-mail ou NIF já cadastrado.');
            } else {
                setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center text-white px-4 bg-cover bg-center" style={{ backgroundImage: `url('/restaurante1.jpg')` }}>
            <div className="absolute inset-0 bg-black/60 z-0" />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#D4AF37]">Cadastro</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {success && (
                    <p className="text-green-400 text-sm text-center">
                        Usuário criado com sucesso.{' '}
                        <Link href="/" className="underline text-[#D4AF37]">
                            Faça login aqui
                        </Link>
                    </p>
                )}

                {!success && (
                    <>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nome completo"
                            value={form.fullName}
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
                            name="password"
                            placeholder="Senha"
                            value={form.password}
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
                            <option value="CLIENT">CLIENTE</option>
                            <option value="PROVIDER">Prestador de Serviço</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] transition"
                        >
                            Cadastrar
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}
