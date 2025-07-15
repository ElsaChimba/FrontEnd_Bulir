import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-md text-white text-center py-6 text-sm z-10">
      <div className="mb-3">
        <p>
          © {new Date().getFullYear()} <span className="text-[#D4AF37] font-semibold">E. Restaurants</span>Todos os direitos reservados.
        </p>
      </div>

      <div className="flex justify-center gap-6 text-xl text-[#D4AF37] mb-2">
        <a href="https://www.linkedin.com/in/elsa-chimba-1a25012a0/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/elsa_chimba/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/ely.chimba.1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
          <FaFacebook />
        </a>
      </div>

      <p className="text-xs text-gray-300">
        Feito por{" "}
        <a
          href="https://www.linkedin.com/in/elsa-chimba-1a25012a0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#D4AF37]"
        >
          Elsa Chimba
        </a>
      </p>
    </footer>
  );
};

export default Footer;
