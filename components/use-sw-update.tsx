// components/use-sw-update.tsx
'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export function useServiceWorkerUpdate() {
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    const swUrl = '/sw.js';
    const wb = new Workbox(swUrl);

    wb.addEventListener('waiting', () => setNeedsRefresh(true));
    wb.addEventListener('externalwaiting', () => setNeedsRefresh(true));
    wb.register();
  }, []);

  return { needsRefresh };
}