type Restaurant = {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
};

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Restaurante Tamariz",
    description: "Frutos do mar e vista para a Ilha de Luanda.",
    address: "Ilha de Luanda, próximo à Marina",
    image: "/tamariz.jpg",
  },
  {
    id: 2,
    name: "Lookal Mar",
    description: "Cozinha contemporânea à beira-mar.",
    address: "Ilha de Luanda, Av. Murtala Mohamed",
    image: "lookal.jpg",
  },
  {
    id: 3,
    name: "Cais de Quatro",
    description: "Gastronomia refinada com ambiente elegante.",
    address: "Marginal de Luanda, próximo ao Banco Nacional",
    image: "/caisLuanda.jpg",
  },
  {
    id: 4,
    name: "Miami Beach",
    description: "Ambiente descontraído com pratos tropicais.",
    address: "Ilha de Luanda, Zona Sul",
    image: "/miami.webp",
  },
  {
    id: 5,
    name: "O Naval",
    description: "mbiente sofisticado e vista para a baía de Luanda.",
    address: "Av. Murtala Mohamed – Ilha do Cabo – Luanda, Angola",
    image: "/naval.webp",
  },
  {
    id: 6,
    name: "Bessangana",
    description: "Sabores típicos num espaço cultural.",
    address: "Rua Rainha Ginga, Baixa de Luanda",
    image: "/bessangana.png",
  },
];

const RestaurantList = () => {
  return (
    <section className="flex-1 px-6 py-12 text-white">
      <h2 className="text-3xl font-semibold mb-8 text-[#D4AF37]">Restaurantes em destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:bg-white/20 transition"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1 text-[#D4AF37]">{restaurant.name}</h3>
              <p className="text-sm mb-1">{restaurant.description}</p>
              <p className="text-xs text-gray-300 italic mb-4">{restaurant.address}</p>
              <button className="px-4 py-2 rounded-full bg-[#D4AF37] text-black hover:bg-black hover:text-[#D4AF37] border border-[#D4AF37] transition">
                Fazer Reserva
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RestaurantList;
