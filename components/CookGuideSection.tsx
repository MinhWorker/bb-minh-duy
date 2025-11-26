import React from 'react';

const CookGuideSection = () => {
    return (
        <section className="w-full py-16 px-4 bg-gradient-to-b from-green-100 to-white">
            <div className="max-w-4xl mx-auto rounded-3xl p-10 shadow-xl bg-white/70 backdrop-blur-md border border-green-100">

                <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center tracking-wide">
                    Hướng Dẫn Chế Biến & Sử Dụng Dưa Bồn Bồn
                </h2>

                <div className="space-y-8 text-gray-700 leading-relaxed">

                    {/* Block 1 */}
                    <div className="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300 shadow-sm">
                        <h3 className="font-bold text-xl text-green-700 mb-2 flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                            1. Chuẩn Bị Nguyên Liệu
                        </h3>
                        <p>
                            - Dưa bồn bồn rửa sạch, để ráo.<br />
                            - Tỏi, ớt băm nếu muốn làm món trộn.<br />
                            - Gia vị: muối, đường, nước mắm tùy khẩu vị.
                        </p>
                    </div>

                    {/* Block 2 */}
                    <div className="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300 shadow-sm">
                        <h3 className="font-bold text-xl text-green-700 mb-2 flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                            2. Cách Chế Biến Nhanh
                        </h3>
                        <p>
                            - <b>Ăn liền:</b> Lấy dưa ra khỏi túi, để ráo rồi dùng ngay.<br />
                            - <b>Trộn gỏi:</b> Trộn dưa bồn bồn với tôm thịt, rau thơm, nước mắm chua ngọt.<br />
                            - <b>Xào:</b> Xào dưa bồn bồn với thịt heo hoặc bò, giữ lửa lớn cho giòn.<br />
                            - <b>Nấu canh:</b> Nấu với tôm hoặc cá, vị thanh mát.
                        </p>
                    </div>

                    {/* Block 3 */}
                    <div className="p-6 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300 shadow-sm">
                        <h3 className="font-bold text-xl text-green-700 mb-2 flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                            3. Cách Sử Dụng Ngon Nhất
                        </h3>
                        <p>
                            - Dùng kèm bữa cơm gia đình, đặc biệt phù hợp món kho hoặc rỏi.<br />
                            - Làm món lẩu trong tiệc gia đình<br />
                            - Bảo quản trong ngăn mát và dùng trong 2-3 ngày sau khi mở túi.
                        </p>
                    </div>

                    {/* Footer note */}
                    <div className="pt-6 text-center">
                        <p className="italic text-green-700 font-semibold text-lg">
                            Dưa bồn bồn – giòn tự nhiên, vị thanh lành, món quê Cà Mau dễ chế biến cho mọi nhà.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CookGuideSection;