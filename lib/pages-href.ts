export function pagesHref(href: string) {
  const base = '/abraza-tu-paz';
  if (!href.startsWith('/') || href.startsWith('//') || href === base || href.startsWith(`${base}/`))
    return href;
  const url = new URL(href, 'https://webnator.github.io');
  let pathname = url.pathname;
  if (!pathname.endsWith('/') && !pathname.split('/').at(-1)?.includes('.'))
    pathname += '/';
  return `${base}${pathname}${url.search}${url.hash}`;
}
