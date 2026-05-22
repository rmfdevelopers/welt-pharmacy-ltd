import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Welt Pharmacy Ltd | The Vanguard of Healthy Living',
  description: 'Port Harcourt\'s premier 24-hour healthcare hub specializing in rare drug sourcing, vaccines, and advanced laboratory services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}