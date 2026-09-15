import { ArrowRightIcon, CheckIcon, LeafIcon, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { heroSectionData } from "../../assets/assets";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[570px] mb-6 rounded-[2rem] flex items-center shadow-[0_24px_60px_rgba(20,61,42,0.18)]">
      <img
        src={heroSectionData.hero_image}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-app-green via-app-green/85 to-app-green/10" />
      <div className="absolute -right-10 -bottom-16 size-72 rounded-full bg-orange-300/20 blur-2xl" />

      <div className="relative w-full px-6 sm:px-12 lg:px-16 py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wide text-orange-100 bg-white/10 border border-white/15 rounded-full mb-6">
            <LeafIcon className="size-3" /> Farm-Fresh & Organic
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.96] tracking-tight mb-6">
            Better groceries,
            <span className="block text-orange-300">brighter days.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
            {heroSectionData.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="button-primary px-6 py-3.5"
            >
              Shop Now <ArrowRightIcon className="size-4" />
            </Link>

            <Link
              to="/products"
              className="px-6 py-3.5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 border border-white/20"
            >
              Browse Categories
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-10 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-orange-300" /> Picked with care</span>
            <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-orange-300" /> Same-day delivery</span>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-12 bottom-10 items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl">
          <div className="size-10 rounded-xl bg-orange-100 text-app-orange flex-center"><StarIcon className="size-5 fill-current" /></div>
          <div><p className="text-sm font-extrabold text-app-green">Loved by local families</p><p className="text-xs text-app-text-light">Freshness guaranteed</p></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
