import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/app/components/navigation/navigation'


export const metadata: Metadata = {
  title: "Portfolio",
  description: "" +
    "Welcome to my portfolio website, " +
    "here you will find information about me, " +
    "my skills, " +
    "professional experiences and " +
    "my past and present education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>Portfolio David Waligora</title>
      <link rel="icon" href="/favicons/favicon.ico" sizes="any"/>
    </head>
      <body>
      <Navigation title={"David Waligora"}/>
        {children}
      </body>
    </html>
  );
}
