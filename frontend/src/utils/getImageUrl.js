export const getImageUrl = (path) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  if (!path) return "/placeholder.jpg"; // fallback if image missing
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};