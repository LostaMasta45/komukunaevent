import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { deviceSizes, responsiveWidths } from '@/lib/image-config';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    quality?: number;
    priority?: boolean;
}

// Use the existing Next.js 15 optimizer and its configured widths, while keeping
// static images independent of the next/image client hydration runtime.
export function getImageProps({ src, alt, width, height, fill, quality = 75, priority, style, sizes, ...rest }: ImageProps) {
    const unoptimized = /^(data:|blob:)/.test(src) || /\.svg(?:\?|$)/i.test(src);
    const url = (value: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${value}&q=${quality}`;
    const resolvedSizes = sizes || (width ? `${width}px` : '100vw');
    // Match Next's viewport-based source selection instead of serializing tiny
    // icon candidates for every full-width marketing photo.
    const viewportSizes = [...resolvedSizes.matchAll(/\b(\d{1,3})vw\b/g)].map(match => Number(match[1]));
    const widths = viewportSizes.length
        ? responsiveWidths.filter(value => value >= deviceSizes[0] * Math.min(...viewportSizes) / 100)
        : responsiveWidths;
    const imageStyle: CSSProperties | undefined = fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style;
    return { props: {
        ...rest, alt, width, height, sizes: resolvedSizes,
        src: unoptimized ? src : url(width ? responsiveWidths.find(value => value >= width * 2) || 1200 : 1200),
        srcSet: unoptimized ? undefined : widths.map(value => `${url(value)} ${value}w`).join(', '),
        loading: rest.loading || (priority ? 'eager' as const : 'lazy' as const),
        fetchPriority: rest.fetchPriority || (priority ? 'high' as const : undefined),
        decoding: 'async' as const, style: imageStyle,
    } };
}

export default function OptimizedImage(props: ImageProps) {
    const { props: image } = getImageProps(props);
    return <>
        {props.priority && <link rel="preload" as="image" imageSrcSet={image.srcSet} imageSizes={image.sizes} fetchPriority="high" />}
        {/* This native element already uses the Next optimizer and responsive sources. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...image} alt={props.alt} />
    </>;
}
