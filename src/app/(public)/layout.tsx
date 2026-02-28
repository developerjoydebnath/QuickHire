import Header from '@/components/layout/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JobHuntly - Discover more than 5000+ Jobs',
  description: 'Great platform for the job seeker that searching for new career heights and passionate about startups.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1">
      <Header />
      {children}
    </main>
  );
}
