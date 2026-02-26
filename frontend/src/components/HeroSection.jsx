function HeroSection({ hero }) {
  if (!hero) return null;

  let imageUrl = hero.background_image;

  // If image starts with /media → Django
  if (hero.background_image?.startsWith("/media")) {
    imageUrl = `http://127.0.0.1:8000${hero.background_image}`;
  }

  return (
    <div
      className="h-[400px] bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className=" p-8 rounded text-white max-w-2xl">
        <h1 className="text-4xl font-bold">{hero.title}</h1>

        {hero.subtitle && (
          <p className="mt-4 text-lg">{hero.subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default HeroSection;