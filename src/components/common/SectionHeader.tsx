import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({ title, subtitle, align = 'center', className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-16",
        align === 'center' && "text-center",
        align === 'left' && "text-left",
        align === 'right' && "text-right",
        className
      )}
    >
      <div className={cn(
        "mb-4 inline-flex items-center rounded-full border border-primary/10 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cta shadow-sm",
        align === 'center' && "mx-auto"
      )}>
        GoRide Collection
      </div>
      <h2 className="mb-5 font-heading text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className={cn(
          "max-w-3xl text-base leading-relaxed text-primary-muted md:text-lg",
          align === 'center' && "mx-auto text-center"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
