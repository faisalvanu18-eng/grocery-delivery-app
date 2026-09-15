import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import HomeCategories from "../components/Home/HomeCategories";
import PopularProducts from "../components/Home/PopularProducts";
import AppPromoBanner from "../components/Home/AppPromoBanner";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen page-shell py-7 sm:py-10">
      <Hero />
      <Features />
      <HomeCategories />
      <PopularProducts />
      <AppPromoBanner />
      <Newsletter />
    </div>
  );
};

export default Home;
