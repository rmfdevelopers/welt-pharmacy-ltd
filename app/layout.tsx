import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  variable: '--font-body' 
});

export const metadata = {
  title: 'Welt Pharmacy Ltd | Vanguard of Healthy Living',
  description: 'Your trusted 24-hour partner in pharmaceutical care, specializing in rare drugs, vaccines, and laboratory services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}