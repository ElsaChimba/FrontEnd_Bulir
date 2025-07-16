'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const ProviderDashboard = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const fetchServices = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setServices(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const data = {
      name,
      description,
      price: parseFloat(price),
    };

    if (editingServiceId) {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/services/${editingServiceId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/services`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    setName('');
    setDescription('');
    setPrice('');
    setEditingServiceId(null);
    fetchServices();
  };

  const handleEdit = (service: Service) => {
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price.toString());
    setEditingServiceId(service.id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchServices();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url('/restaurante1.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#D4AF37]">Painel do Prestador</h1>

        <div className="bg-white/10 p-6 rounded-lg mb-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-4">Cadastrar Serviço</h2>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 bg-white/20 text-white rounded"
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 bg-white/20 text-white rounded"
            />
            <input
              type="number"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 bg-white/20 text-white rounded"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#D4AF37] text-black py-2 rounded hover:bg-black hover:text-[#D4AF37] transition"
            >
              {editingServiceId ? 'Atualizar Serviço' : 'Cadastrar Serviço'}
            </button>
          </div>
        </div>

        {loading ? (
          <p>Serviços Cadastrados</p>
        ) : (
          <div className="grid gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 p-4 rounded shadow backdrop-blur-md"
              >
                <h3 className="text-xl font-bold text-[#D4AF37]">{service.name}</h3>
                <p>{service.description}</p>
                <p className="text-sm text-gray-300">Preço: {service.price} kz</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-[#D4AF37] text-black px-4 py-1 rounded hover:bg-black hover:text-[#D4AF37]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-800"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
