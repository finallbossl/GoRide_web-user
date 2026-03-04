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
        "mb-20",
        align === 'center' && "text-center",
        align === 'left' && "text-left",
        align === 'right' && "text-right",
        className
      )}
    >
      <div className={cn(
        "inline-block mb-4 px-4 py-1.5 rounded-full bg-[#1C1917]/5 border border-[#1C1917]/10 text-[10px] uppercase tracking-[0.2em] font-black text-[#CA8A04] shadow-sm",
        align === 'center' && "mx-auto"
      )}>
        Bộ sưu tập Elite
      </div>
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-[#1C1917] mb-6 tracking-tight">
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          "max-w-5xl text-lg font-medium text-[#44403C]/60 leading-relaxed",
          align === 'center' && "mx-auto text-center"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
