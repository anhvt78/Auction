/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Chế độ trang tĩnh
   basePath: "/Auction",
  // assetPrefix: "/Auction/",
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    unoptimized: true, // Bắt buộc cho GitHub Pages
  },
  // Nếu repo có tên là /my-project/, hãy thêm:
  // basePath: '/my-project',
};

export default nextConfig;
