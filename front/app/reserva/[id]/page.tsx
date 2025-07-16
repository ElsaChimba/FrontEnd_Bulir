'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const mesas = [
  { label: 'Mesa para 2', capacity: 2, price: 5000 },
  { label: 'Mesa para 5', capacity: 5, price: 12000 },
  { label: 'Mesa para 14', capacity: 14, price: 25000 },
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
      const response = await axios.post(
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

      setMessage('Reserva realizada com sucesso!');
      setTimeout(() => {
        router.push('/minhas-reservas');
      }, 1000);
    } catch (error) {
      setMessage('Erro ao realizar reserva.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Reservar Serviço</h1>
      <select
        value={selectedMesa.label}
        onChange={(e) => {
          const mesa = mesas.find((m) => m.label === e.target.value);
          if (mesa) setSelectedMesa(mesa);
        }}
        className="w-full p-2 mb-4 bg-white/20 text-white rounded"
      >
        {mesas.map((mesa) => (
          <option key={mesa.label} value={mesa.label}>
            {mesa.label} - {mesa.capacity} pessoas - {mesa.price} kz
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#D4AF37] text-black py-2 rounded hover:bg-black hover:text-[#D4AF37] transition"
      >
        {loading ? 'Reservando...' : 'Confirmar Reserva'}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ReservaPage;
