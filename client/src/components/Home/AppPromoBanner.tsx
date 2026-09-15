import { appPromoBannerData, assets } from "../../assets/assets";

const AppPromoBanner = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 px-6 sm:px-12 my-10 bg-app-green rounded-[2rem]">
      <div className="absolute -right-24 -top-24 size-72 bg-orange-300/15 rounded-full blur-3xl" />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side content */}
        <div className="text-center md:text-left">
          <p className="text-orange-300 text-xs font-extrabold uppercase tracking-[0.15em] mb-3">Dastagir delivery</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-3">
            {appPromoBannerData.title}
          </h2>
          <p className="text-white/70 mb-6 max-w-md">
            {appPromoBannerData.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="px-6 py-3 bg-white text-app-green font-bold rounded-full hover:bg-orange-100">
              App Store
            </button>
            <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors border border-white/20">
              Google Play
            </button>
          </div>
        </div>

        {/* Right side image */}
        <img
          src={assets.delivery_truck}
          alt="Delivery Truck"
          className="max-w-60 sm:max-w-90 xl:pr-6 drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default AppPromoBanner;
