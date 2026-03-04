// Dữ liệu cho trang chủ

export const promoData = [
  {
    id: 1,
    badge: '20% OFF',
    title: 'Chào bạn mới',
    description: 'Giảm ngay 20% cho chuyến đi đầu tiên',
    image: 'https://images.unsplash.com/photo-1616634375264-2d2e17736a36?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    badge: '15% OFF',
    title: 'Cuối tuần rực rỡ',
    description: 'Thuê xe cuối tuần, nhận ưu đãi hấp dẫn',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8df0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    badge: '100k OFF',
    title: 'Thanh toán qua thẻ',
    description: 'Ưu đãi từ đối tác ngân hàng',
    image: 'https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    badge: '50k OFF',
    title: 'Thuê dài ngày',
    description: 'Giảm ngay 50k cho đơn thuê từ 3 ngày trở lên',
    image: 'https://images.unsplash.com/photo-1455644114178-1d25b1be60ee?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    badge: 'VIP',
    title: 'Thành viên thân thiết',
    description: 'Tích điểm đổi quà và hưởng ưu đãi dành riêng cho VIP',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800',
  },
];

export const featuredBikes = [
  {
    id: 1,
    name: 'Honda Vision 2024',
    type: 'Xe tay ga • 110cc',
    price: '120k',
    rating: 4.9,
    reviews: '1.2k+',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
    badge: 'Ưa chuộng',
    slug: 'honda-vision',
  },
  {
    id: 2,
    name: 'Air Blade 125cc',
    type: 'Xe tay ga • Thể thao',
    price: '150k',
    rating: 4.8,
    reviews: '850',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
    slug: 'honda-air-blade',
  },
  {
    id: 3,
    name: 'Honda SH 150i',
    type: 'Xe ga hạng sang',
    price: '350k',
    rating: 5.0,
    reviews: '320',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    badge: 'Cao cấp',
    slug: 'honda-sh-150i',
  },
  {
    id: 4,
    name: 'Yamaha Exciter',
    type: 'Xe côn tay • 155 VVA',
    price: '180k',
    rating: 4.7,
    reviews: '540',
    image: 'https://images.unsplash.com/photo-1449495169669-7b118f960237?auto=format&fit=crop&q=80&w=800',
    slug: 'yamaha-exciter',
  },
];

export const locations = [
  {
    id: 1,
    name: 'Trung tâm Quy Nhơn',
    count: '100+ Xe sẵn sàng',
    image: 'https://static.vinwonders.com/production/quy-nhon-co-gi-choi-12.jpg',
  },
  {
    id: 2,
    name: 'Kỳ Co',
    count: '30+ Xe sẵn sàng',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    name: 'Eo Gió',
    count: '30+ Xe sẵn sàng',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    name: 'Ghềnh Ráng',
    count: '50+ Xe sẵn sàng',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&q=80&w=600',
  },
];

export const advantages = [
  {
    iconName: 'fast' as const,
    title: 'Thủ tục nhanh gọn',
    description: 'Chỉ cần CCCD và GPLX, nhận xe máy sau 5 phút',
  },
  {
    iconName: 'bike' as const,
    title: 'Xe máy đa dạng',
    description: 'Đủ các dòng xe ga, xe số, xe côn tay mới nhất',
  },
  {
    iconName: 'price' as const,
    title: 'Giá minh bạch',
    description: 'Cam kết không phát sinh chi phí ẩn khi thuê',
  },
  {
    iconName: 'shield' as const,
    title: 'Bảo hiểm an tâm',
    description: 'Đã bao gồm gói bảo hiểm chuyến đi cơ bản',
  },
];

export const steps = [
  {
    number: 1,
    title: 'Tìm xe',
    description: 'Chọn địa điểm và thời gian mong muốn',
  },
  {
    number: 2,
    title: 'Đặt xe',
    description: 'Chọn mẫu xe ưng ý và thanh toán đặt cọc',
  },
  {
    number: 3,
    title: 'Nhận xe',
    description: 'Kiểm tra giấy tờ và nhận xe tận nơi',
  },
  {
    number: 4,
    title: 'Trải nghiệm',
    description: 'Khởi hành chuyến đi đầy thú vị của bạn',
  },
];

export const blogPosts = [
  {
    id: 1,
    tag: 'Kinh nghiệm',
    title: 'Top 10 cung đường ven biển đẹp nhất Việt Nam bằng xe máy',
    description: 'Khám phá những hành trình đầy mê hoặc từ Bắc chí Nam cùng bạn bè...',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    tag: 'Cẩm nang',
    title: 'Bí quyết bỏ túi khi thuê xe máy tại Quy Nhơn an toàn nhất',
    description: 'Những lưu ý quan trọng về giấy tờ và kiểm tra xe trước khi nhận...',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8df0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    tag: 'Điểm đến',
    title: 'Lịch trình khám phá Eo Gió - Kỳ Co bằng xe máy trong 1 ngày',
    description: 'Hướng dẫn chi tiết từ đường đi đến các quán ăn ngon rẻ trên hành trình...',
    image: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    tag: 'Phong cách',
    title: 'Phong cách du lịch tối giản - Đi xa với hành lý nhẹ',
    description: 'Bí quyết sắp xếp hành lý thông minh cho chuyến đi xe máy dài ngày...',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    tag: 'Kinh nghiệm',
    title: 'Chinh phục đèo Hải Vân - Hành trình đáng nhớ nhất đời',
    description: 'Chia sẻ trải nghiệm thực tế khi vượt qua thiên hạ đệ nhất hùng quan...',
    image: 'https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    tag: 'Cẩm nang',
    title: 'An toàn giao thông khi đi xe máy đường dài',
    description: 'Những quy tắc vàng để đảm bảo an toàn cho hành trình của bạn...',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 7,
    tag: 'Điểm đến',
    title: 'Khám phá Đà Lạt - Thành phố ngàn hoa trên yên xe',
    description: 'Lộ trình 3 ngày 2 đêm khám phá mọi ngóc ngách của thành phố sương mù...',
    image: 'https://images.unsplash.com/photo-1597250831267-42926c7a26f0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 8,
    tag: 'Phong cách',
    title: 'Chụp ảnh du lịch đẹp với xe máy - Tips từ chuyên gia',
    description: 'Góc chụp, ánh sáng và cách tạo dáng để có những bức ảnh ấn tượng...',
    image: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 9,
    tag: 'Ẩm thực',
    title: 'Top 5 món ăn phải thử khi đi phượt các tỉnh miền núi phía Bắc',
    description: 'Từ thắng cố đến lợn bản, những hương vị đặc trưng không thể quên...',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 10,
    tag: 'Bảo dưỡng',
    title: '5 bước tự kiểm tra xe máy trước mỗi chuyến đi xa',
    description: 'Đảm bảo an toàn tuyệt đối với những bước kiểm tra đơn giản tại nhà...',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f728d63c?auto=format&fit=crop&q=80&w=800',
  },
];
