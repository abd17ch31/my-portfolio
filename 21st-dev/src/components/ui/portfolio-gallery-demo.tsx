'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';

const projects = [
  {
    id: 1,
    title: 'Nebula',
    cat: 'Art',
    href: '#project-nebula',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Decay',
    cat: 'Photo',
    href: '#project-decay',
    img: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Oceanic',
    cat: 'Nature',
    href: '#project-oceanic',
    img: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Neon',
    cat: 'Tech',
    href: '#project-neon',
    img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    title: 'Desert',
    cat: 'Travel',
    href: '#project-desert',
    img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=400&q=80',
  },
];

function ProjectCard({
  project,
  isActive,
  className = '',
}: {
  project: (typeof projects)[number];
  isActive: boolean;
  className?: string;
}) {
  return (
    <a
      href={project.href}
      className={`block h-[280px] w-[200px] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg sm:h-[320px] sm:w-[240px] ${className}`}
    >
      <div className="group relative h-full w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
              isActive
                ? 'scale-110 blur-0'
                : 'scale-100 blur-[1px] grayscale-[30%]'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/10 to-transparent opacity-60" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex items-start justify-between">
            <Badge
              variant="secondary"
              className="border-transparent bg-black/50 px-2 py-0 text-[10px] text-white backdrop-blur"
            >
              {project.cat}
            </Badge>
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-slate-900 transition-all duration-500 ${
                isActive ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
              }`}
            >
              <ArrowUpRight size={12} />
            </div>
          </div>

          <div
            className={`transition-transform duration-500 ${
              isActive ? 'translate-y-0' : 'translate-y-2'
            }`}
          >
            <h3 className="text-xl font-bold leading-tight text-white">
              {project.title}
            </h3>
            <div
              className={`mt-2 h-0.5 bg-lime-300 transition-all duration-500 ${
                isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </a>
  );
}

export default function DemoRadialScrollGalleryBento() {
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    const updateActiveCard = () => {
      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>('[data-project-card="true"]')
      );
      if (cards.length === 0) return;

      const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - scrollerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveMobileIndex(closestIndex);
    };

    updateActiveCard();
    scroller.addEventListener('scroll', updateActiveCard, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    return () => {
      scroller.removeEventListener('scroll', updateActiveCard);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, []);

  return (
    <section
      id="projects"
      className="w-full overflow-hidden border-t border-white/10 bg-[#050816] text-white"
    >
      <div className="min-h-[600px] w-full rounded-lg border border-white/10 bg-transparent">
        <div className="flex h-[300px] flex-col items-center justify-center space-y-4 pt-8">
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              Portfolio
            </span>
            <h1 className="text-4xl font-bold tracking-tighter">Work</h1>
          </div>
          <div className="animate-bounce text-xs text-white/60">Scroll</div>
        </div>

        <div className="hidden md:block">
          <RadialScrollGallery
            className="!min-h-[600px]"
            baseRadius={400}
            mobileRadius={250}
            visiblePercentage={50}
            scrollDuration={2000}
          >
            {(hoveredIndex) =>
              projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isActive={hoveredIndex === index}
                />
              ))
            }
          </RadialScrollGallery>
        </div>

        <div className="md:hidden">
          <div
            ref={mobileScrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => {
              const isActive = activeMobileIndex === index;

              return (
                <div
                  key={project.id}
                  data-project-card="true"
                  className={`shrink-0 snap-center pt-10 transition-all duration-500 ${
                    isActive
                      ? 'translate-y-0 rotate-0 opacity-100'
                      : 'translate-y-4 rotate-[6deg] opacity-70'
                  }`}
                >
                  <ProjectCard
                    project={project}
                    isActive={isActive}
                    className="h-[320px] w-[240px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
