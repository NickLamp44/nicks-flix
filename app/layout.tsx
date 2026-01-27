"use client";

import { useState } from "react";
import "./globals.css";
import BootSequence from "./components/bootSequence";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [booted, setBooted] = useState(false);

  return (
    <html lang="en">
      <body>
        {!booted ? (
          <BootSequence onComplete={() => setBooted(true)} />
        ) : (
          <main className="app-shell">
            <div className="app-container">{children}</div>
          </main>
        )}
      </body>
    </html>
  );
}
