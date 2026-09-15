import { ArrowRightIcon, CheckIcon, SearchIcon, ShoppingBagIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { categoriesData, heroSectionData } from "../../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const quickPicks = categoriesData.slice(0, 4);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative overflow-hidden mb-6 rounded-[2rem] bg-app-green shadow-[0_24px_60px_rgba(20,61,42,0.18)]">
      <div className="absolute -left-20 -bottom-28 size-80 rounded-full bg-emerald-300/15 blur-3xl" />
      <div className="absolute -right-24 -top-28 size-96 rounded-full bg-orange-300/15 blur-3xl" />

      <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide text-orange-100 bg-white/10 border border-white/15 rounded-full mb-6">
            <ShoppingBagIcon className="size-3.5" /> Dastagir Daily Essentials
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl text-white leading-[0.98] tracking-tight mb-5">
            The everyday store
            <span className="block text-orange-300">in your pocket.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-7">
            {heroSectionData.description}
          </p>

          <form onSubmit={search} className="relative mb-5 max-w-lg">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-app-green/60" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rice, snacks, shampoo..." className="w-full rounded-2xl bg-white pl-12 pr-28 py-4 text-sm font-medium text-app-green shadow-xl outline-none" />
            <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 rounded-xl bg-app-orange px-4 text-xs font-extrabold text-white hover:bg-app-orange-dark">Search</button>
          </form>

          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="button-primary px-6 py-3.5">Shop essentials <ArrowRightIcon className="size-4" /></Link>
            <Link to="/deals" className="px-6 py-3.5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 border border-white/20">Today's deals</Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-xs sm:text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-orange-300" /> Everyday low prices</span>
            <span className="inline-flex items-center gap-1.5"><CheckIcon className="size-4 text-orange-300" /> Fast doorstep delivery</span>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-3 self-center max-w-md justify-self-end">
          {quickPicks.map((category, index) => (
            <Link key={category.slug} to={`/products?category=${category.slug}`} className={`group relative min-h-42 overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-4 ${index === 0 ? "col-span-2 min-h-48" : ""}`}>
              <p className="relative z-10 max-w-[9rem] text-sm font-extrabold text-white">{category.name}</p>
              <p className="relative z-10 mt-1 text-xs text-white/65">Shop now</p>
              <img src={category.image} alt="" className="absolute -right-4 -bottom-5 size-32 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
