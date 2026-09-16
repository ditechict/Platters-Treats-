import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

/* ————— Reusable section kit — every page composes these ————— */

export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("eyebrow", className)}>{children}</span>
);

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, lede, align = "center", className }: SectionHeadingProps) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "mb-14",
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && <Eyebrow className={cn("mb-4", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl md:text-5xl font-light text-primary heading-elegant mb-4">
        {title}
      </h2>
      {lede && <p className="text-lg text-muted-foreground font-light leading-relaxed">{lede}</p>}
    </div>
  );
};

interface EditorialProps {
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  image: string;
  imageAlt: string;
  imageFirst?: boolean;
  cta?: { label: string; href: string };
}

export const Editorial = ({ eyebrow, title, children, image, imageAlt, imageFirst = false, cta }: EditorialProps) => {
  const ref = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center", imageFirst && "lg:[&>*:first-child]:order-2")}>
      <div ref={ref}>
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className="font-display text-4xl md:text-5xl font-light text-primary heading-elegant mb-6">{title}</h2>
        <div className="text-muted-foreground font-light leading-relaxed space-y-4 text-lg">{children}</div>
        {cta && (
          <Link
            to={cta.href}
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium uppercase tracking-[0.2em] text-accent hover:text-primary transition-smooth"
          >
            {cta.label}
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      <div ref={imgRef} className="overflow-hidden shadow-elegant">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover transition-ease hover:scale-[1.03]"
        />
      </div>
    </div>
  );
};

export const QuoteBlock = ({ quote, attribution }: { quote: string; attribution?: string }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <figure ref={ref} className="max-w-3xl mx-auto text-center py-16">
      <blockquote className="font-display text-2xl md:text-3xl font-light italic text-primary leading-relaxed">
        “{quote}”
      </blockquote>
      {attribution && <figcaption className="mt-6 eyebrow justify-center">{attribution}</figcaption>}
    </figure>
  );
};

interface ImageMarqueeProps {
  images: { src: string; alt: string }[];
}

export const ImageMarquee = ({ images }: ImageMarqueeProps) => (
  <div className="overflow-hidden marquee-paused" aria-hidden="false">
    <div className="flex w-max animate-marquee gap-6">
      {[...images, ...images].map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={i < images.length ? img.alt : ""}
          loading="lazy"
          className="h-64 md:h-80 w-auto object-cover shadow-soft"
        />
      ))}
    </div>
  </div>
);
