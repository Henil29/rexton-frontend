import "./globals.css";
import ClientInit from "@/app/components/ClientInit";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientInit />
        {children}
      </body>
    </html>
  );
}