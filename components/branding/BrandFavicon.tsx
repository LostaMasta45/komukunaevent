'use client';

import { useEffect } from 'react';
import { brandIcons } from './brand-assets';

export default function BrandFavicon({ mode }: { mode: 'light' | 'dark' }) {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]'));
    const previous = links.map((link) => ({ link, href: link.getAttribute('href'), media: link.getAttribute('media') }));
    for (const link of links) {
      link.href = brandIcons[mode];
      link.removeAttribute('media');
    }
    return () => {
      for (const { link, href, media } of previous) {
        if (href !== null) link.setAttribute('href', href);
        if (media !== null) link.setAttribute('media', media);
        else link.removeAttribute('media');
      }
    };
  }, [mode]);
  return null;
}
