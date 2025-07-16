'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Reserva = {
  id: string;
  createdAt: string;
  service: {
    name: string;
    price: number;
  };
  client: {
    fullName: string;
    email: string;
  };
};

const ReservasAdmin = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservas(response.data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#D4AF37]">Todas as Reservas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid gap-6">
          {reservas.map((reserva) => (
            <div
              key={reserva.id}
              className="bg-white/10 p-4 rounded-lg shadow-md backdrop-blur-md"
            >
              <p>
                <span className="font-semibold text-[#D4AF37]">Cliente:</span>{' '}
                {reserva.client.fullName} ({reserva.client.email})
              </p>
              <p>
                <span className="font-semibold text-[#D4AF37]">Serviço:</span>{' '}
                {reserva.service.name} - {reserva.service.price} kz
              </p>
              <p>
                <span className="font-semibold text-[#D4AF37]">Data:</span>{' '}
                {new Date(reserva.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservasAdmin;
