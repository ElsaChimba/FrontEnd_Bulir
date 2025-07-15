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
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-4">Painel do Administrador</h1>
      <p>Bem-vindo! Aqui você poderá visualizar e gerenciar o sistema.</p>
    </div>
  );
};

export default AdminPage;
