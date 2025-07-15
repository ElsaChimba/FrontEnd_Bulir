'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

type TableType = {
  id: string;
  name: string;
  capacity: number;
  price: number;
};

const ReservaPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tableTypes, setTableTypes] = useState<TableType[]>([]);
  const [selectedTableId, setSelectedTableId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTableTypes = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tables`);
      setTableTypes(response.data);
    };
    fetchTableTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
        {
          serviceId: id,
          tableTypeId: selectedTableId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Reserva realizada com sucesso!');
    } catch {
      setMessage('Erro ao realizar reserva.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Selecionar tipo de mesa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedTableId}
          onChange={(e) => setSelectedTableId(e.target.value)}
          className="w-full p-2 bg-white/20 text-white rounded"
          required
        >
          <option value="">Selecione uma mesa</option>
          {tableTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} - {t.capacity} pessoas - {t.price} kz
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] text-black py-2 rounded hover:bg-black hover:text-[#D4AF37] transition"
        >
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ReservaPage;
