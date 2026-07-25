import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dra. Cleo Pai | Neuropsicóloga & Psicologia Clínica - CRP 06/189234",
  description: "Plataforma profissional de Neuropsicologia. Avaliação neuropsicológica, investigação de TDAH/Autismo, reabilitação cognitiva e agendamento online.",
  keywords: ["Neuropsicologia", "Avaliação Neuropsicológica", "TDAH", "Autismo", "Psicologia Clínica", "Reabilitação Cognitiva"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body className="bg-[#09090B] text-white antialiased selection:bg-[#8B5CF6] selection:text-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#13131A",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#FFFFFF",
            },
          }}
        />
      </body>
    </html>
  );
}
