'use client';

import { User, Phone, Camera, X } from 'lucide-react';
import { useRef } from 'react';

interface IdentityStepProps {
  data: {
    fullName: string;
    phone: string;
    documentImage: string | null;
  };
  onChange: (newData: any) => void;
}

export default function IdentityStep({ data, onChange }: IdentityStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, documentImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-6">
         <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
               <label className="absolute left-7 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em]">Họ và Tên</label>
               <div className="flex items-center gap-4 h-20 pl-7 pr-6 rounded-[1.5rem] bg-white border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-soft-sm">
                  <User size={20} className="text-primary/20 group-focus-within:text-cta transition-colors" />
                  <input 
                    value={data.fullName} 
                    onChange={(e) => onChange({...data, fullName: e.target.value})} 
                    className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 placeholder:text-primary/10" 
                    placeholder="Nguyễn Văn A"
                  />
               </div>
            </div>
            <div className="relative group">
               <label className="absolute left-7 top-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em]">Số điện thoại</label>
               <div className="flex items-center gap-4 h-20 pl-7 pr-6 rounded-[1.5rem] bg-white border border-primary/5 focus-within:border-cta/20 focus-within:ring-4 focus-within:ring-cta/5 transition-all shadow-soft-sm">
                  <Phone size={20} className="text-primary/20 group-focus-within:text-cta transition-colors" />
                  <input 
                    value={data.phone}
                    placeholder="0xxx xxx xxx" 
                    onChange={(e) => onChange({...data, phone: e.target.value})} 
                    className="bg-transparent w-full outline-none font-bold text-primary text-base h-full pt-4 placeholder:text-primary/10" 
                  />
               </div>
            </div>
         </div>
         
         {/* Document Upload */}
         <div className="space-y-4">
            <div className="flex items-baseline justify-between px-2">
               <h4 className="text-[11px] font-black text-primary/40 uppercase tracking-widest italic">Xác thực hồ sơ gốc (GPLX / CCCD)</h4>
               <span className="text-[8px] font-black text-cta uppercase tracking-widest px-3 py-1 bg-cta/5 rounded-full">Bắt buộc</span>
            </div>
            
            {!data.documentImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="h-64 rounded-[2.5rem] border-2 border-dashed border-primary/10 bg-white flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#FAF9F6] hover:border-cta/40 transition-all group overflow-hidden relative shadow-soft-sm"
              >
                 <div className="h-16 w-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary/20 group-hover:text-cta group-hover:bg-cta/5 transition-all group-hover:scale-110 duration-500">
                    <Camera size={32} />
                 </div>
                 <div className="text-center">
                    <span className="text-sm font-bold text-primary mb-1 block">Tải ảnh hoặc chụp trực tiếp</span>
                    <p className="text-[10px] font-medium text-primary/30 uppercase tracking-widest italic">Định dạng JPG, PNG tối đa 5MB</p>
                 </div>
                 <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
              </div>
            ) : (
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden border-2 border-cta shadow-luxury-xl animate-in zoom-in-95 duration-500">
                 <img src={data.documentImage} className="w-full h-full object-cover" alt="Document" />
                 <div className="absolute inset-0 bg-black/20" />
                 <button 
                  onClick={() => onChange({...data, documentImage: null})}
                  className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-white text-red-500 shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform hover:bg-red-50"
                 >
                    <X size={20} />
                 </button>
                 <div className="absolute bottom-6 left-6 right-6 bg-cta/95 backdrop-blur-md py-3 rounded-2xl text-center shadow-luxury-sm">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Hình ảnh đã được ghi nhận hệ thống</span>
                 </div>
              </div>
            )}
         </div>
         
         <div className="p-6 rounded-[1.5rem] bg-emerald-50 text-emerald-600 flex items-start gap-4">
            <div className="h-5 w-5 rounded-full bg-emerald-600/10 flex items-center justify-center shrink-0 mt-0.5">
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </div>
            <p className="text-[11px] font-bold leading-relaxed italic">
               Hồ sơ của bạn sẽ được bảo mật theo tiêu chuẩn Elite Privacy 2026. Chúng tôi chỉ sử dụng cho mục đích xác thực chuyến đi.
            </p>
         </div>
      </div>
    </div>
  );
}
