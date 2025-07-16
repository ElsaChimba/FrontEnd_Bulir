'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const mesas = [
  { label: 'Mesa para 2', capacity: 2, price: 5000 },
  { label: 'Mesa para 5', capacity: 5, price: 12000 },
  { label: 'Mesa para 14', capacity: 14, price: 25000 },
];

const ReservaPage = () => {
  const { id } = useParams();
  const [selectedMesa, setSelectedMesa] = useState(mesas[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
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
      setMessage('Reserva realizada com sucesso!');
      setSuccess(true);
    } catch {
      setMessage('Erro ao realizar reserva.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/restaurante1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#D4AF37]">Reservar Mesa</h1>

        <label className="block mb-2 text-sm font-semibold">Selecione a mesa:</label>
        <select
          value={selectedMesa.label}
          onChange={(e) => {
            const mesa = mesas.find((m) => m.label === e.target.value);
            if (mesa) setSelectedMesa(mesa);
          }}
          className="w-full p-2 rounded bg-white/20 text-white mb-6 outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
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
          className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] transition"
        >
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              success ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReservaPage;
