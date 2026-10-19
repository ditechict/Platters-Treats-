import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/kit/SectionKit';
import { GUEST_MOMENTS } from '@/lib/images';

export default function GuestSpotlightCarousel() {
  const [viewport, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', duration: 35 });
  const [position, setPosition] = useState({ prev: false, next: true });
  const update = useCallback(() => {
    if (api) setPosition({ prev: api.canScrollPrev(), next: api.canScrollNext() });
  }, [api]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on('select', update).on('reInit', update);
    return () => { api.off('select', update).off('reInit', update); };
  }, [api, update]);

  return (
    <section aria-label="Guest spotlight" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading eyebrow="At our table" title="Guest Moments" align="left" className="mb-0" />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="mr-2"><Link to="/gallery">The collection <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button size="icon" variant="outline" aria-label="Previous guest moment" disabled={!position.prev} onClick={() => api?.scrollPrev(window.matchMedia('(prefers-reduced-motion: reduce)').matches)}><ArrowLeft className="h-4 w-4" /></Button>
            <Button size="icon" variant="outline" aria-label="Next guest moment" disabled={!position.next} onClick={() => api?.scrollNext(window.matchMedia('(prefers-reduced-motion: reduce)').matches)}><ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
        <div ref={viewport} className="overflow-hidden" aria-roledescription="carousel">
          <div className="flex touch-pan-y -ml-6">
            {GUEST_MOMENTS.map((moment, index) => (
              <article key={moment.key} className="group min-w-0 flex-[0_0_86%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] pl-6" aria-label={`${index + 1} of ${GUEST_MOMENTS.length}`} aria-roledescription="slide">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={moment.src} alt={moment.alt} loading="lazy" width={499} height={830} draggable={false} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.025]" />
                </div>
                <div className="pt-5 border-b border-border pb-6">
                  <p className="text-xs uppercase text-accent mb-2">0{index + 1} / Guest spotlight</p>
                  <h3 className="font-display text-3xl text-primary mb-3">{moment.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground min-h-[5rem]">{moment.caption}</p>
                  <Button asChild variant="link" className="px-0 text-accent"><Link to="/quote">Book an Event <ArrowUpRight className="h-4 w-4 ml-2" /></Link></Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}