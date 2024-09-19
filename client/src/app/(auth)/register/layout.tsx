export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>Layout Register</div>
      {children}
    </main>
  );
}
