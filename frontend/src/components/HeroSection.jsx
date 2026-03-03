function HeroSection({ hero }) {
  if (!hero) return null;

  return (
    <div
      className="h-[400px] bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(/images/hero.png)`,
      }}
    >
      <div className="p-8 rounded text-white max-w-2xl bg-black/40">
        <h1 className="text-4xl font-bold">
          {hero.title}
        </h1>

        {hero.subtitle && (
          <p className="mt-4 text-lg">
            {hero.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default HeroSection;