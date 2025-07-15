'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'ADMIN') {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p className="text-white p-10">Carregando...</p>;

  return (
    <div
  className="relative min-h-screen bg-cover bg-center text-white"
  style={{ backgroundImage: `url('/fundo.jpg')` }}
>
  <div className="absolute inset-0 bg-black/60 z-0" />
  <div className="relative z-10 p-10">
    <h1 className="text-3xl font-bold text-[#D4AF37] mb-4">Painel do Administrador</h1>
    <p>Bem-vindo! Aqui você poderá visualizar e gerenciar o sistema.</p>
  </div>
</div>

  );
};

export default AdminPage;
