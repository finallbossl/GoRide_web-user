'use client';

import Link from 'next/link';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotorbikeStatus } from '@goride/shared';

interface CarCardProps {
  id: string | number;
  name: string;
  type: string;
  price: string;
  rating: number;
  reviews: string;
  image: string;
  badge?: string;
  slug: string;
  status: MotorbikeStatus;
}

export default function CarCard({ name, type, price, rating, reviews, image, badge, slug, status }: CarCardProps) {
  const isRented = status === MotorbikeStatus.RENTED;
  const isUnavailable = status === MotorbikeStatus.MAINTENANCE || status === MotorbikeStatus.UNAVAILABLE;
  const isBookable = !isRented && !isUnavailable;

  return (
    <Link
      href={isBookable ? `/motorbike/${slug}` : '#'}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-luxury-lg bg-white border border-[#E7E5E4] transition-all duration-500",
        isBookable ? "hover:shadow-luxury-xl hover:-translate-y-2 hover:border-[#CA8A04]/30" : "cursor-not-allowed opacity-80"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#FAFAF9]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 rounded-luxury bg-[#1C1917] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#CA8A04] shadow-soft-md whitespace-nowrap">
            {badge}
          </div>
        )}

        {/* Protection */}
        <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-luxury bg-white/90 text-[#1C1917] backdrop-blur-sm border border-[#1C1917]/5 shadow-soft-md">
          <ShieldCheck size={20} />
        </div>

        {/* Status Overlay */}
        {!isBookable && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
            <div className="bg-white/95 px-6 py-3 rounded-luxury-lg shadow-luxury-xl border border-white/20">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1917] mb-1">
                {isRented ? 'Hiện đang được thuê' : 'Đang bảo trì'}
              </p>
              <p className="text-sm font-bold text-[#CA8A04] italic">
                {isRented ? 'Elite Choice Booked' : 'Coming Back Soon'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="font-heading text-2xl font-black text-[#1C1917] group-hover:text-[#CA8A04] transition-colors tracking-tight leading-tight">{name}</h3>
            <p className="mt-1 text-[11px] font-bold text-[#44403C]/40 uppercase tracking-widest">{type}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-luxury bg-[#FAFAF9] text-[11px] font-black text-[#1C1917] border border-[#1C1917]/5">
            <Star size={12} className="fill-[#CA8A04] text-[#CA8A04]" />
            {rating}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-[#1C1917]/5 pt-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[#44403C]/40 uppercase tracking-widest mb-1">Elite Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#1C1917] tracking-tighter">{price}</span>
              <span className="text-[10px] font-bold text-[#44403C]/40 uppercase tracking-widest">/day</span>
            </div>
          </div>

          <div className={cn(
            "flex h-11 w-11 items-center justify-center rounded-luxury transition-all duration-500 shadow-soft-md",
            isBookable
              ? "bg-[#1C1917] text-[#CA8A04] group-hover:bg-[#CA8A04] group-hover:text-white group-hover:scale-110"
              : "bg-gray-200 text-gray-400"
          )}>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
