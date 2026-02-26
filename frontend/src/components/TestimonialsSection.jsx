import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

function TestimonialsSection({ data }) {
  const [current, setCurrent] = useState(0);

  // Make sure data is always an array
  const testimonials = Array.isArray(data) ? data : data?.results || [];

  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) return null;

  const testimonial = testimonials[current];

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
            src={getImageUrl(testimonial.image)}
            alt={testimonial.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <h4 className="text-xl font-semibold">{testimonial.name}</h4>
        <p className="text-gray-600 mt-1">{testimonial.designation}</p>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-orange-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialsSection;