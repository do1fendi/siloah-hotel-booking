/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  // images: {
  //   loader: "imgix",
  //   path: "",
  // },
  images: {
    domains: ["localhost", "www.taiwanviptravel.com", "do1fendi.github.io", "192.168.12.3:3000"],
    loader: "imgix",
    path:"/",
    unoptimized: true,
  },
  env: {
    // BASEURL: "http://localhost:3000",
    BASEURL: "http://192.168.12.3:3000",
    SERVER: "http://localhost:3001",
  },
};

module.exports = nextConfig;
