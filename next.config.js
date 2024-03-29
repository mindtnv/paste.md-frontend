const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
