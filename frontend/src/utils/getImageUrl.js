export const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const api_BASE = import.meta.env.VITE_api_BASE_URL;
  return `${api_BASE}${path}`;
};