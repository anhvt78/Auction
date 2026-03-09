import { Inter } from "next/font/google";
import "../globals.css";
import { Web3Provider } from "@/components/Web3Provider";

const inter = Inter({ subsets: ["latin"] });

// 1. Đây là Server Component, export này sẽ hoạt động
export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "en" }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-50 text-slate-900`}
        // Một số ví Web3 hoặc extension chèn thêm attribute vào body nên cũng cần suppress ở đây
        suppressHydrationWarning
      >
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
