/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: '/siloah-hotel-booking',
  trailingSlash: true,
  assetPrefix: "/siloah-hotel-booking",
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
    // BASEURL: "http://192.168.12.3:3000",
    BASEURL: "https://do1fendi.github.io/siloah-hotel-booking",
    SERVER: "http://localhost:5000",
  },
};

module.exports = nextConfig;
