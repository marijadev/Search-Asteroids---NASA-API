export const API_KEY = "x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2";

export const NASA_URL = (startDate, endDate) => {
  return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
};
