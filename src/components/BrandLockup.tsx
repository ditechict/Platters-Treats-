import { Link } from 'react-router-dom';
import clocheLogo from '@/assets/pretty-platters-logo-cloche.png';

interface BrandLockupProps {
  variant?: 'header' | 'footer';
}

const BrandLockup = ({ variant = 'header' }: BrandLockupProps) => {
  const isFooter = variant === 'footer';

  return (
    <Link
      to="/"
      aria-label="Canapés and Treats Pretty Platters home"
      className={isFooter ? 'inline-flex items-center gap-3' : 'inline-flex min-w-0 items-center gap-2'}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background p-1.5">
        <img
          src={clocheLogo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="min-w-0">
        <span
          className={isFooter
            ? 'block font-display text-2xl font-light leading-none heading-elegant text-primary-foreground'
            : 'block whitespace-nowrap font-display text-[1.05rem] font-light leading-none heading-elegant text-current sm:text-2xl'}
        >
          Canapés &amp; Treats
        </span>
        <span
          className={isFooter
            ? 'mt-1 block text-xs uppercase text-accent'
            : 'mt-1 block text-[0.57rem] font-light uppercase tracking-[0.22em] text-accent sm:text-[0.65rem] sm:tracking-[0.35em]'}
        >
          Pretty Platters
        </span>
      </span>
    </Link>
  );
};

export default BrandLockup;