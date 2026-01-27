"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "[ OK ] Initializing NickOS v1.0.3",
  "[ OK ] Mounting virtual file systems",
  "[ OK ] Loading environment variables",
  "[ OK ] Establishing API connections",
  "[ OK ] Starting Express backend",
  "[ OK ] Connecting to MongoDB cluster",
  "[ OK ] Compiling React & Angular clients",
  "[ OK ] Verifying JWT authentication",
  "[ OK ] System ready",
  "",
  "nick@server:~$ launch nicks-flix",
];

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 800);
      }, 600);
      return;
    }

    const delay = 200 + Math.random() * 300;

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [...prev, BOOT_LINES[lineIndex]]);
      setLineIndex((i) => i + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [lineIndex, onComplete]);

  return (
    <div className={`boot-screen ${done ? "boot-exit" : ""}`}>
      <div className="boot-text">
        {visibleLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {!done && <span className="cursor">█</span>}
      </div>
    </div>
  );
}
