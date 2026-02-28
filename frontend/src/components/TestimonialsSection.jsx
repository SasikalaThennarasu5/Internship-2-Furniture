import { useEffect, useState } from "react";

function TestimonialsSection({ data }) {
  const [current, setCurrent] = useState(0);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  if (!data || data.length === 0) return null;

  const testimonial = data[current];

  const imageUrl =
    testimonial.image?.startsWith("http")
      ? testimonial.image
      : `${API_BASE}${testimonial.image}`;

  return (
    <div className="px-20 py-24 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-8 underline underline-offset-8">
        Testimonials
      </h2>

      <div className="transition-opacity duration-700 ease-in-out">
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg mb-12">
          “{testimonial.message}”
        </p>

        <div className="flex justify-center mb-6">
          <img
            src={imageUrl}
            alt={testimonial.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <h4 className="text-xl font-semibold">
          {testimonial.name}
        </h4>

        <p className="text-gray-600 mt-1">
          {testimonial.designation}
        </p>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index
                ? "bg-orange-500"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialsSection;