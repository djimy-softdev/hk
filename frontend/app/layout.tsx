import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} m-auto   max-w-7xl  overflow-auto antialiased md:overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
