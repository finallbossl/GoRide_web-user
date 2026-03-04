'use client';

import { useAuth } from '@/hooks/useAuth';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  Settings, ShieldCheck, ChevronRight, LogOut, 
  Camera, Package, Activity, CreditCard, Save, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { userApi } from '@/services/api';

export default function ProfilePage() {
  const { user, isLoggedIn, loading, logout, updateUser } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [isLoggedIn, loading, router, user]);

  if (loading || !isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-12 w-12 border-4 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Revert changes if canceling
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await userApi.updateProfile(user.id, formData);
      if (response.success) {
        updateUser(formData);
        setIsEditing(false);
      } else {
        alert(response.message || 'Cập nhật thất bại');
      }
    } catch (error: any) {
      alert(error.message || 'Có lỗi xảy ra khi cập nhật');
    } finally {
      setIsSaving(false);
    }
  };

  const userStats = [
    { label: 'Chuyến đi', value: (user.totalTrips ?? 0).toString(), icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Điểm thưởng', value: (user.points ?? 0).toLocaleString(), icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Hạng thẻ', value: `Elite ${user.membershipTier ?? 'Bronze'}`, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">Hồ sơ cá nhân</h1>
          <p className="text-primary/40 text-sm font-medium italic">Quản lý nâng cao và đặc quyền thành viên Elite</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-soft-xl border border-primary/5 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-cta to-primary" />
              
              <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-cta/20 group-hover:border-cta/40 transition-all duration-500 scale-110" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-luxury-lg">
                  <img 
                    src={user.avatarUrl || 'https://i.pravatar.cc/300?img=12'} 
                    alt={user.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <button className="absolute bottom-1 right-1 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center shadow-luxury-md border-2 border-white hover:bg-cta transition-colors">
                  <Camera size={18} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-primary mb-1">{user.name}</h2>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cta/10 text-cta text-[10px] font-black uppercase tracking-widest mb-6">
                <Award size={12} />
                Elite Member
              </div>

              <div className="pt-6 border-t border-primary/5 space-y-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center text-primary/40">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-primary/30 uppercase tracking-wider leading-none mb-1">Email</p>
                    <p className="text-[13px] font-semibold text-primary truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-left">
                  <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center text-primary/40">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/30 uppercase tracking-wider leading-none mb-1">Số điện thoại</p>
                    <p className="text-[13px] font-semibold text-primary">{user.phone || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={logout}
              className="w-full bg-white hover:bg-red-50 text-red-500 p-6 rounded-[2rem] shadow-soft-md border border-red-100 flex items-center justify-center gap-3 transition-all font-bold uppercase tracking-widest text-[11px]"
            >
              <LogOut size={18} />
              Đăng xuất hệ thống
            </button>
          </div>

          {/* Right Column: Stats & Operations */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-soft-lg border border-primary/5 flex flex-col items-center text-center transition-all hover:scale-[1.02]">
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-2xl font-black text-primary mb-1">{stat.value}</span>
                  <p className="text-xs font-bold text-primary/30 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Detailed Info Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-soft-xl border border-primary/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-primary flex items-center gap-3">
                  <Settings className="text-cta" size={24} />
                  Thông tin chi tiết
                </h3>
                {!isEditing ? (
                  <button 
                    onClick={handleEditToggle}
                    className="text-cta text-xs font-bold hover:underline"
                  >
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 bg-cta text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-cta/90 transition-all disabled:opacity-50"
                    >
                      <Save size={14} />
                      {isSaving ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button 
                      onClick={handleEditToggle}
                      disabled={isSaving}
                      className="flex items-center gap-2 bg-surface text-primary/60 px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/5 transition-all disabled:opacity-50"
                    >
                      <X size={14} />
                      Hủy
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                       Họ và tên
                    </p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary focus:border-cta focus:bg-white outline-none transition-all"
                        placeholder="Nhập họ và tên"
                      />
                    ) : (
                      <div className="p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary transition-colors">
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div className="group">
                    <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                       Số điện thoại
                    </p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary focus:border-cta focus:bg-white outline-none transition-all"
                        placeholder="Nhập số điện thoại"
                      />
                    ) : (
                      <div className="p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary transition-colors">
                        {user.phone || 'Chưa cập nhật'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest mb-2">Địa chỉ hiện tại</p>
                    {isEditing ? (
                      <textarea 
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary focus:border-cta focus:bg-white outline-none transition-all min-h-[56px] resize-none"
                        placeholder="Nhập địa chỉ của bạn"
                        rows={1}
                      />
                    ) : (
                      <div className="p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary flex items-start gap-3">
                        <MapPin size={18} className="text-primary/20 shrink-0 mt-0.5" />
                        <span>{user.address || 'Chưa cung cấp địa chỉ'}</span>
                      </div>
                    )}
                  </div>

                  <div className="group">
                    <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest mb-2">Ngày gia nhập</p>
                    <div className="p-4 rounded-2xl bg-surface border border-primary/5 font-semibold text-primary flex items-center gap-3">
                      <Calendar size={18} className="text-primary/20" />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Chưa rõ'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-primary/5">
                <div className="group">
                  <p className="text-[11px] font-bold text-primary/30 uppercase tracking-widest mb-2">Cài đặt bảo mật</p>
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-primary/5 hover:bg-white hover:border-cta transition-all group/btn">
                      <span className="text-sm font-bold text-primary/60 group-hover/btn:text-primary">Đổi mật khẩu</span>
                      <ChevronRight size={16} className="text-primary/20 group-hover/btn:text-cta" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 rounded-[2.5rem] bg-primary text-white shadow-luxury-lg relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />
                <Package className="text-cta mb-4" size={32} />
                <h4 className="text-lg font-bold mb-1">Lịch sử đặt xe</h4>
                <p className="text-white/40 text-xs font-medium mb-6 leading-relaxed italic">Xem lại toàn bộ hành trình đẳng cấp bạn đã trải qua cùng GoRide.</p>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-cta group-hover:translate-x-2 transition-transform">
                  Chi tiết hành trình <ChevronRight size={14} />
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white text-primary shadow-soft-lg border border-primary/5 relative overflow-hidden group cursor-pointer">
                <CreditCard className="text-cta mb-4" size={32} />
                <h4 className="text-lg font-bold mb-1">Phương thức thanh toán</h4>
                <p className="text-primary/40 text-xs font-medium mb-6 leading-relaxed italic">Quản lý các nguồn thanh toán và thẻ thành viên Elite của bạn.</p>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-primary/40 group-hover:text-cta group-hover:translate-x-2 transition-transform">
                  Quản lý thẻ <ChevronRight size={14} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
