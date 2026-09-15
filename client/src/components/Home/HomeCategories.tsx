import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const HomeCategories = () => {
  return (
    <section className="py-18 sm:py-22">
      <div>
        <div>
          <p className="section-kicker mb-2">Shop your way</p>
          <h2 className="section-title">Browse by aisle</h2>
          <p className="text-sm text-app-text-light mt-1">
            Everything for the week, thoughtfully organised.
          </p>
        </div>
        <div className="grid grid-flow-col auto-cols-[108px] sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-5 lg:grid-cols-10 gap-3 mt-8 overflow-x-auto sm:overflow-visible no-scrollbar pb-2">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-app-green/5"
            >
              <div className="size-20 sm:size-24 p-2 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100/70 group-hover:-translate-y-1 transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain rounded-full transition-all"
                />
              </div>
              <span className="text-xs font-bold text-app-green text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
