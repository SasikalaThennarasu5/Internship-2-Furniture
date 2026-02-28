function WhyChooseUs({ data, subtitle }) {
  const api_BASE = import.meta.env.VITE_api_BASE_URL;

  return (
    <div className="px-20 py-20 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Why Choose Us
          </h2>

          {subtitle && (
            <p className="text-gray-600 mb-10 max-w-md">
              {subtitle}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data.map((item) => {
              const iconUrl =
                item.icon?.startsWith("http")
                  ? item.icon
                  : `${api_BASE}${item.icon}`;

              return (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={iconUrl}
                    alt={item.title}
                    className="h-10 w-10 object-contain"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE STATIC IMAGE */}
        <div>
          <img
            src="/images/whychoose.png"
            alt="Why Choose Us"
            className="w-full h-[500px] object-cover rounded-[40px]"
          />
        </div>

      </div>
    </div>
  );
}

export default WhyChooseUs;