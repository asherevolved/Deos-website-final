import './globals.css';

export const metadata = {
  title: "Asher - Design Studio",
  description: "Asher is a bold, professional portfolio and agency website.",
  openGraph: {
    title: "Asher - Design Studio",
    description: "Asher is a bold, professional portfolio and agency website.",
    images: ["https://framerusercontent.com/images/QZ6xojOagMCasqxHNc04ZSLq2rA.jpg"],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Asher - Design Studio",
    description: "Asher is a bold, professional portfolio and agency website.",
    images: ["https://framerusercontent.com/images/QZ6xojOagMCasqxHNc04ZSLq2rA.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="lenis lenis-autoToggle">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
      </head>
      <body>{children}</body>
    </html>
  );
}
