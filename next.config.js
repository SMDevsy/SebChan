module.exports = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        // protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
      },
      {
        // protocol: "http",
        hostname: "sebchan.mmilek.pl",
        port: "3000",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};
