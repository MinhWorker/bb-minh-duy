import React from 'react';

const CookGuideSection = () => {
    return (
        <section className="py-24 px-4 bg-white" id="cookguide">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="font-gwendolyn text-3xl text-primary mb-2 block">Cảm hứng ẩm thực</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">Hướng Dẫn Chế Biến</h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Block 1 */}
                    <div className="group p-8 rounded-[2rem] bg-secondary/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-primary/5">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">1</div>
                        <h3 className="font-bold text-xl text-foreground mb-4">Chuẩn Bị</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Dưa bồn bồn rửa sạch, để ráo</li>
                            <li>• Tỏi, ớt băm (tùy món)</li>
                            <li>• Gia vị: muối, đường, nước mắm</li>
                        </ul>
                    </div>

                    {/* Block 2 */}
                    <div className="group p-8 rounded-[2rem] bg-secondary/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-primary/5">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">2</div>
                        <h3 className="font-bold text-xl text-foreground mb-4">Chế Biến Nhanh</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• <b>Ăn liền:</b> Dùng ngay sau khi để ráo</li>
                            <li>• <b>Trộn gỏi:</b> Trộn với tôm thịt, rau thơm</li>
                            <li>• <b>Xào:</b> Xào nhanh với lửa lớn</li>
                            <li>• <b>Nấu canh:</b> Nấu với tôm hoặc cá</li>
                        </ul>
                    </div>

                    {/* Block 3 */}
                    <div className="group p-8 rounded-[2rem] bg-secondary/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-primary/5">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">3</div>
                        <h3 className="font-bold text-xl text-foreground mb-4">Mẹo Ngon Nhất</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Dùng kèm món kho hoặc gỏi</li>
                            <li>• Làm món lẩu tiệc gia đình</li>
                            <li>• Bảo quản ngăn mát 2-3 ngày</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 p-10 bg-primary text-primary-foreground rounded-[2.5rem] text-center shadow-xl shadow-primary/20 relative overflow-hidden group">
                    <p className="relative z-10 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        &quot;Dưa bồn bồn – giòn tự nhiên, vị thanh lành, món quê Cà Mau dễ chế biến cho mọi nhà.&quot;
                    </p>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>
            </div>
        </section>
    );
};

export default CookGuideSection;