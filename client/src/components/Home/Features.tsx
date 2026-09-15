import { heroSectionData } from "../../assets/assets";

const Features = () => {
  return (
    <section className="surface-card relative -mt-12 mx-3 sm:mx-8 lg:mx-12 z-10 py-4 sm:py-5 rounded-2xl">
      <div className="mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {heroSectionData.hero_features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 py-2 sm:py-3 sm:px-2">
              <div className="size-10 rounded-xl bg-orange-50 text-app-orange flex-center shrink-0">
                <feature.icon className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-app-green">
                  {feature.title}
                </p>
                <p className="text-xs text-app-text-light">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
