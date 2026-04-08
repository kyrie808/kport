import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Kyrie | Ecossistema de Vendas',
  description: 'Construímos o motor de vendas e a infraestrutura tecnológica para o seu negócio escalar sem caos.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#030303] text-white no-scrollbar" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
