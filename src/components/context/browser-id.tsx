'use client';

import * as React from 'react';

export const BrowserIdContext = React.createContext<string | undefined>(
  undefined
);

export function BrowserIdProvider({ children }: { children: React.ReactNode }) {
  const [browserId, setBrowserId] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchBrowserId = async () => {
      const response = await fetch('/api/browser', { credentials: 'include' });
      const data = (await response.json()) as { browserId: string };
      setBrowserId(data.browserId);
    };
    fetchBrowserId();
  }, []);

  return <BrowserIdContext value={browserId}>{children}</BrowserIdContext>;
}