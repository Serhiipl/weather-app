"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import MetaDataComponent from "@/components/MetaDataComponent";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Кількість повторних запитів у разі помилки
      refetchOnWindowFocus: false, // Відключення повторного запиту при фокусуванні вікна
    },
  },
});

const metadata = {
  title: "Sergio Weather App",
  description: "Created by Sergio inspirated by Freecodecamp.org",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${inter.className} `}>
          {/* {children} */}
          <MetaDataComponent metadata={metadata}>{children}</MetaDataComponent>
        </body>
      </QueryClientProvider>
    </html>
  );
}
