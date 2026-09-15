import { MailIcon } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="surface-card py-14 sm:py-18 px-5 sm:px-8 rounded-[2rem] mx-auto mt-14 mb-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="size-14 bg-orange-50 rounded-2xl flex-center mx-auto mb-6">
          <MailIcon className="size-6 text-app-orange" strokeWidth={1.8} />
        </div>
        <p className="section-kicker mb-2">A little freshness</p>
        <h2 className="section-title mb-4">
          Good food, in your inbox.
        </h2>
        <p className="text-app-text-light mb-8 text-base">
          Get weekly updates on fresh produce, seasonal offers, and exclusive
          discounts right to your inbox.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-3.5 rounded-full border border-app-green/15 focus:border-app-green bg-white text-sm transition-all"
          />

          <button
            type="submit"
            className="px-8 py-3.5 bg-app-green text-white font-bold rounded-full hover:bg-app-green-light transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
