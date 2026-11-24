import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { pagesHref } from '@/lib/pages-href';

type Props = ComponentPropsWithoutRef<'a'> & {
  href: string;
  scroll?: boolean;
  prefetch?: boolean | null;
  replace?: boolean;
};

// Pages serves complete exported documents. Native links avoid relying on
// Vinext's server navigation transport on a static host.
export default function SiteLink({ href, scroll, prefetch, replace, ...props }: Props) {
  if (process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true')
    return <a href={pagesHref(href)} {...props} />;
  return <NextLink href={href} scroll={scroll} prefetch={prefetch} replace={replace} {...props} />;
}
