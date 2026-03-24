"use client";

import React from "react";

const RentalTips: React.FC = () => {
    return (
        <section className="container my-12">
            <div className="mx-auto readable">
                <h2 className="mb-4 font-heading text-3xl font-bold text-primary">Trước khi thuê xe — Những điều cần biết</h2>
                <p className="lead mb-6">
                    Trước khi thuê xe máy, bạn nên chuẩn bị đầy đủ giấy tờ và trang bị để hành trình an toàn, thoải mái.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <article className="surface-card p-5 flex gap-4 items-start">
                        <div className="badge-number flex-none">1</div>
                        <div>
                            <h3 className="mb-2 font-semibold text-lg">Giấy phép lái xe hợp lệ</h3>
                            <p className="text-sm text-primary-muted">
                                Luôn mang theo giấy phép lái xe hợp lệ. Nếu không có, bạn có thể gặp rắc rối khi bị kiểm tra giấy tờ bởi cảnh sát giao
                                thông.
                            </p>
                        </div>
                    </article>

                    <article className="surface-card p-5 flex gap-4 items-start">
                        <div className="badge-number flex-none">2</div>
                        <div>
                            <h3 className="mb-2 font-semibold text-lg">Giao thông tại thành phố</h3>
                            <p className="text-sm text-primary-muted">
                                Giao thông ở các thành phố thường hỗn loạn hơn và có nhiều tiếng còi. Hãy quan sát người dân địa phương và di chuyển
                                chậm rãi, giữ bình tĩnh ở các ngã tư.
                            </p>
                        </div>
                    </article>

                    <article className="surface-card p-5 flex gap-4 items-start">
                        <div className="badge-number flex-none">3</div>
                        <div>
                            <h3 className="mb-2 font-semibold text-lg">Bắt buộc đội mũ bảo hiểm</h3>
                            <p className="text-sm text-primary-muted">
                                Luôn đội mũ bảo hiểm đạt chuẩn. Các cửa hàng cho thuê thường cung cấp, nhưng hãy kiểm tra độ vừa vặn và tình trạng trước
                                khi sử dụng.
                            </p>
                        </div>
                    </article>

                    <article className="surface-card p-5 flex gap-4 items-start">
                        <div className="badge-number flex-none">4</div>
                        <div>
                            <h3 className="mb-2 font-semibold text-lg">Lái xe vào ban đêm</h3>
                            <p className="text-sm text-primary-muted">
                                Lái ban đêm có rủi ro: tầm nhìn hạn chế, thiếu đèn và chướng ngại vật. Nếu cần, lái chậm, kiểm tra đèn và hạn chế việc đi
                                lại khi không cần thiết.
                            </p>
                        </div>
                    </article>

                    <article className="surface-card p-5 md:col-span-2 flex gap-4 items-start">
                        <div className="badge-number flex-none">5</div>
                        <div>
                            <h3 className="mb-2 font-semibold text-lg">Chọn xe phù hợp với địa hình</h3>
                            <p className="text-sm text-primary-muted">
                                Địa hình du lịch đa dạng: đường phố bằng phẳng, đường đèo hay đường đất. Chọn xe tay ga cho thành phố và xe khỏe hơn cho
                                cung đường đèo/núi. Motorvina cung cấp nhiều dòng xe phù hợp.
                            </p>
                        </div>
                    </article>
                </div>

                <p className="mt-6 text-sm text-primary-muted">
                    Tổng kết: chuẩn bị giấy tờ, đội mũ, chọn xe phù hợp và lái chậm, đặc biệt ở những khu vực lạ hoặc khi trời tối. Chúc bạn có
                    hành trình an toàn và thú vị!
                </p>
            </div>
        </section>
    );
};

export default RentalTips;
