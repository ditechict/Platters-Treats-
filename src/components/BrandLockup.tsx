import { Link } from 'react-router-dom';
import logo from '@/assets/zeren-logo.svg';

interface BrandLockupProps {
  variant?: 'header' | 'footer';
}

const BrandLockup = ({ variant = 'header' }: BrandLockupProps) => {
  const isFooter = variant === 'footer';

  return (
    <Link
      to="/"
      aria-label="Zeren Café and Catering home"
      className={isFooter ? 'inline-flex items-center gap-3' : 'inline-flex min-w-0 items-center gap-2'}
    >
      <span className={`flex shrink-0 items-center justify-center text-primary ${isFooter ? 'h-11 w-11' : 'h-10 w-10'}`}>
        <img src={logo} alt="" aria-hidden="true" width={64} height={64} className="h-full w-full object-contain" />
      </span>
      <span className="min-w-0">
        <span className={`block font-display font-medium leading-none heading-elegant ${isFooter ? 'text-2xl text-primary-foreground' : 'text-2xl text-current'}`}>
          Zeren
        </span>
        <span className={`mt-1 block text-[0.62rem] font-medium uppercase text-accent ${isFooter ? 'tracking-[0.2em]' : 'tracking-[0.22em]'}`}>
          Café &amp; Catering
        </span>
      </span>
    </Link>
  );
};

export default BrandLockup;