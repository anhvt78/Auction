/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Chế độ trang tĩnh
  images: {
    unoptimized: true, // Bắt buộc cho GitHub Pages
  },
  // Nếu repo có tên là /my-project/, hãy thêm:
  // basePath: '/my-project',
};

export default nextConfig;
