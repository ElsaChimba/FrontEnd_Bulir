const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md text-white z-10">
      <h1 className="text-2xl font-bold text-white hover:text-[#D4AF37] transition">E. Restaurants</h1>
      <ul className="flex gap-6 text-sm">
        <li><a href="#" className="text-[#D4AF37] hover:text-white">Início</a></li>
        <li><a href="#" className="text-[#D4AF37] hover:text-white">Restaurantes</a></li>
        <li><a href="#" className="text-[#D4AF37] hover:text-white">Reservas</a></li>
        <li><a href="#" className="text-[#D4AF37] hover:text-white">Contato</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
