import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wiz Personalize TFT Guide | Modern League Client Hub',
  description:
    'Your personalized TFT command center combining TFTFlow, MetaTFT, Tactics.tools, and BunnyMuffins with smart popups and Stage 2/3 winstreak matrices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-[#C8AA6E] selection:text-[#010A13]">
        {children}
      </body>
    </html>
  );
}
