'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Reservation = {
  id: string;
  service: {
    name: string;
    price: number;
  };
  details: any;
  createdAt: string;
};

const MinhasReservasPage = () => {
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/reservations/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setReservas(res.data))
      .catch((err) => console.error('Erro ao buscar reservas:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white p-10">Carregando reservas...</p>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">Minhas Reservas</h1>
      {reservas.length === 0 ? (
        <p>Você ainda não fez nenhuma reserva.</p>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva) => (
            <li
              key={reserva.id}
              className="bg-white/10 backdrop-blur-md p-4 rounded shadow"
            >
              <p className="text-lg font-semibold">{reserva.service.name}</p>
              <p className="text-sm text-gray-300">
                Preço: {reserva.service.price} kz
              </p>
              <p className="text-sm text-gray-400">
                Detalhes: {reserva.details?.label || 'Sem detalhes'}
              </p>
              <p className="text-xs text-gray-500">
                Criada em: {new Date(reserva.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MinhasReservasPage;
