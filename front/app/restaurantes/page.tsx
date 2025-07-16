import Navbar from "@/components/navbar";
import RestaurantList from "@/components/restaurantList";
import Footer from "@/components/footer";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/restaurante1.jpg')" }}
    >
     
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <RestaurantList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
