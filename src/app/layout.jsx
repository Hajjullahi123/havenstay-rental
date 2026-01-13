import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Providers } from './providers';

export const metadata = {
  title: 'HavenStay | Premium Rentals',
  description: 'Find your dream home with ease.',
  manifest: '/manifest.json',
  themeColor: '#020617',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HavenStay',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
