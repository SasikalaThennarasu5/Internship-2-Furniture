function ServicesSection({ data }) {

  const serviceIcons = [
    "/images/services1.png",
    "/images/services2.png",
    "/images/services3.png",
    "/images/services4.png",
    "/images/services5.png",
    "/images/services6.png",
    "/images/services7.png",
    "/images/services8.png",
  ];

  return (
    <div className="px-20 py-24 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
        {data.map((service, index) => (
          <div key={service.id}>
            <img
              src={serviceIcons[index]}
              alt={service.title}
              className="h-10 mb-6 object-contain"
            />

            <h3 className="font-semibold text-lg mb-3">
              {service.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;