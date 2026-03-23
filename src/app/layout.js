export const metadata = {
  title: "Auction Project",
  description: "Hệ thống đấu giá trực tuyến",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
