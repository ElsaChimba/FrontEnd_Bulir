'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const mesas = [
  { label: 'Mesa para 2', capacity: 2, price: 15000 },
  { label: 'Mesa para 5', capacity: 5, price: 50000 },
  { label: 'Mesa para 14', capacity: 14, price: 100000 },
];

const ReservaPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [selectedMesa, setSelectedMesa] = useState(mesas[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
        {
          serviceId: id,
          details: selectedMesa,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push('/minhas-reservas');
    } catch {
      setMessage('Erro ao realizar reserva.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/restaurante1.jpg')] bg-cover bg-center flex items-center justify-center p-6">
      <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 w-full max-w-md text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-[#D4AF37]">Reservar Serviço</h1>
        <div className="mb-4">
          <label className="block text-sm mb-2">Escolha uma mesa</label>
          <select
            value={selectedMesa.label}
            onChange={(e) => {
              const mesa = mesas.find((m) => m.label === e.target.value);
              if (mesa) setSelectedMesa(mesa);
            }}
            className="w-full p-3 rounded bg-white/20 text-white"
          >
            {mesas.map((mesa) => (
              <option key={mesa.label} value={mesa.label} className="text-black">
                {mesa.capacity} pessoas - {mesa.price} kz
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#D4AF37] text-black font-semibold py-2 rounded hover:bg-black hover:text-[#D4AF37] transition"
        >
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </div>
    </div>
  );
};

export default ReservaPage;
