# Komukuna Inter

Derived from the Inter Latin WOFF2 already supplied by `next/font/google` in this project. Original license: `OFL.txt` (https://github.com/rsms/inter/blob/master/LICENSE.txt).

The local file retains the weight range 400–800 used by the marketing pages, Latin characters, and common punctuation. FontTools was used to subset the font and rename its internal family to Komukuna Inter. Characters outside this subset use the CSS fallback font. The resulting WOFF2 is 27,776 bytes.

This explicit local URL allows reliable preloading independently of Next.js font-manifest generation. It affects the Komukuna Event layout; the root layout's existing font configuration remains intact.
