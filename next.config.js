/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_GIPHY_API_KEY: "xGPv302Yn7mIfkbtGDyGgwUvpuqzZznS",
    baseURL: "https://api.giphy.com/v1/gifs",
    RECAPTCHA_SITE_KEY: "6LfvIjQpAAAAAMBQ1fvcfhbz1nuOUrVOQHlJybUS",
    RECAPTCHA_SECRET_KEY: "6LfvIjQpAAAAAOjIujJnWGdOwM-LuXmURCXydWST",
    MONGO:
      "mongodb+srv://leif:leif711@cluster0.29towa7.mongodb.net/giphy?retryWrites=true&w=majority",
  },
  images: {
    domains: Array.from({ length: 5 }, (_, i) => `media${i}.giphy.com`),
    formats: ["image/avif", "image/webp"],
    remotePatterns: Array.from({ length: 6 }).map((_, index) => ({
      protocol: "https",
      hostname: `media${index}.giphy.com`,
      port: "",
      pathname: "/media/**",
    })),
  },
};

module.exports = nextConfig;
