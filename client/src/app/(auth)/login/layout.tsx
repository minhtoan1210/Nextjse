export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>Layout Login</div>
      {children}
    </main>
  );
}
