import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import AuthProvider from '@/providers/AuthProvider';
import type { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const epilogue = Epilogue({ subsets: ['latin'], variable: '--font-epilogue-custom' });
const clashDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/ClashDisplay-Extralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ClashDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash-display-custom',
});

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
    <html lang="en" className="h-full antialiased">
      <body className={`${epilogue.variable} ${clashDisplay.variable} flex min-h-full flex-col antialiased`}>
        <AuthProvider>
          <TooltipProvider>
            <main className="flex-1">{children}</main>
          </TooltipProvider>
        </AuthProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
