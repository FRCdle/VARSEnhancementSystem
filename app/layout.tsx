import '@/app/ui/global.css'
import { lexend } from '@/app/ui/fonts';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lexend.className} bg-slate-100 text-xl text-gray-800 md:text-3x1 md:leading-normal`}>{children}</body>
    </html>
  );
}