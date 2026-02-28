function ServicesSection({ data }) {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="px-20 py-24 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
        {data.map((service) => {
          const iconUrl =
            service.icon?.startsWith("http")
              ? service.icon
              : `${API_BASE}${service.icon}`;

          return (
            <div key={service.id}>
              <img
                src={iconUrl}
                alt={service.title}
                className="h-10 mb-6"
              />

              <h3 className="font-semibold text-lg mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServicesSection;