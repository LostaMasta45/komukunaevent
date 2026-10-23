import Image from 'next/image';
import { brandAssets } from './brand-assets';
import styles from './brand-logo.module.css';

type BrandLogoProps = {
  surface?: 'light' | 'dark' | 'auto';
  monochrome?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function BrandLogo({ surface = 'auto', monochrome = false, className = '', priority = false, sizes = '112px' }: BrandLogoProps) {
  const source = monochrome ? brandAssets.white : surface === 'dark' ? brandAssets.dark : brandAssets.light;
  return <span className={`${styles.logo} ${className}`} data-logo-surface={surface} role="img" aria-label="Komu Kuna Booth — Komukuna Studio">
    <Image src={source} alt="" aria-hidden="true" fill sizes={sizes} priority={priority} className={surface === 'auto' && !monochrome ? styles.light : styles.image} />
    {surface === 'auto' && !monochrome && <Image src={brandAssets.dark} alt="" aria-hidden="true" fill sizes={sizes} priority={priority} className={styles.dark} />}
  </span>;
}
