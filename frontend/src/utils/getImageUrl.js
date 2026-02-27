export const getImageUrl = (path) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!path) return "/placeholder.jpg"; // fallback

  // If path is already full URL
  if (path.startsWith("http")) return path;

  // Make sure there is exactly one slash between BASE_URL and path
  const fixedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${fixedPath}`;
};