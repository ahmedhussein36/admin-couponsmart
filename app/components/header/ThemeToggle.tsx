'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className=""
    >
      {
        theme !== 'light' ? <MdOutlineWbSunny size={20} /> : <MdOutlineNightlight size={20} />
      }
    </button>
  );
}
