'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const ReservaPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'CLIENT') {
      router.push('/login');
    }

    const found = mockRestaurants.find(r => r.id === Number(id));
    setRestaurant(found);
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
        {
          serviceId: Number(id),
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Reserva realizada com sucesso!');
    } catch (error) {
      setMessage('Erro ao realizar reserva.');
    } finally {
      setLoading(false);
    }
  };

  if (!restaurant) return <p className="text-white p-10">Carregando restaurante...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Fazer reserva em {restaurant.name}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Data da reserva:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded bg-white/10 text-white"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#D4AF37] text-black py-2 px-4 rounded hover:bg-black hover:text-[#D4AF37] transition"
        >
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default ReservaPage;

const mockRestaurants = [
  {
    id: 1,
    name: "Restaurante Tamariz",
  },
  {
    id: 2,
    name: "Lookal Mar",
  },
  {
    id: 3,
    name: "Cais de Quatro",
  },
  {
    id: 4,
    name: "Miami Beach",
  },
  {
    id: 5,
    name: "O Naval",
  },
  {
    id: 6,
    name: "Bessangana",
  },
];
