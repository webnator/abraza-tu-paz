'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { pagesHref } from '@/lib/pages-href';

export function useSiteRouter() {
  const router = useRouter();
  return useMemo(() => process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true'
    ? {
        ...router,
        push(href: string) {
          const returningToRefuge = href === '/' &&
            document.querySelector('.scene[data-scene="refugio"]');
          window.location.assign(pagesHref(returningToRefuge ? '/#refugio' : href));
        },
        replace(href: string) { window.location.replace(pagesHref(href)); },
      }
    : router, [router]);
}
