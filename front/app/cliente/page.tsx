'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  providerId: number;
};

const ClientePage = () => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'CLIENT') {
      router.push('/login');
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(response.data);
      } catch (error) {
        console.error('Erro ao buscar serviços', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [router]);

  if (loading) return <p className="text-white p-10">Carregando serviços...</p>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">Serviços disponíveis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-2">{service.name}</h2>
            <p className="text-sm mb-1">{service.description}</p>
            <p className="text-sm text-gray-300 mb-4">Preço: {service.price} kz</p>
            <button
              onClick={() => router.push(`/reserva/${service.id}`)}
              className="bg-[#D4AF37] text-black px-4 py-2 rounded hover:bg-black hover:text-[#D4AF37] transition"
            >
              Fazer Reserva
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientePage;
