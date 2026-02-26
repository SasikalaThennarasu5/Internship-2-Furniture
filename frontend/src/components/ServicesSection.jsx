import { getImageUrl } from "../utils/getImageUrl";

function ServicesSection({ data }) {
  // Ensure data is always an array
  const services = Array.isArray(data) ? data : data?.results || [];

  if (!services.length) return null;

  return (
    <div className="px-20 py-24 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
        {services.map((service) => (
          <div key={service.id}>
            <img
              src={getImageUrl(service.icon)}
              alt={service.title}
              className="h-10 mb-6"
            />
            <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
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