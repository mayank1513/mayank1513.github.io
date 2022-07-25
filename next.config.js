/** @type {import('next').NextConfig} */
const withLinaria = require("next-linaria");

module.exports = withLinaria({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    format: ["image/webp", "image/png", "image/jpeg"],
    loader: "akamai",
    path: "",
  },
});
