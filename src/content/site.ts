export type Product = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery?: Array<{ url: string; alt: string }>;
  formats: string[];
  storage: string;
  usage: string;
  marketplaceUrl?: string;
};

export type JournalKind = "cong-thuc" | "cau-chuyen" | "tin-tuc";

export type JournalEntry = {
  slug: string;
  kind: JournalKind;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedLabel: string;
  readingTime: string;
  body: string[];
};

export const site = {
  name: "HTX Bồn Bồn Minh Duy",
  shortName: "Minh Duy",
  description:
    "Hợp tác xã tại Hưng Mỹ, Cà Mau, gắn với vùng nguyên liệu và các sản phẩm chế biến từ cây bồn bồn.",
  phoneDisplay: "0948 055 359",
  phoneHref: "tel:+84948055359",
  zaloHref: "https://zalo.me/0948055359",
  email: "htxbonbonminhduy@gmail.com",
  address: "Ấp Đông Hưng, xã Hưng Mỹ, tỉnh Cà Mau",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=H%C6%B0ng+M%E1%BB%B9%2C+C%C3%A1i+N%C6%B0%E1%BB%9Bc%2C+C%C3%A0+Mau",
} as const;

export const products: Product[] = [
  {
    slug: "che-bon-bon",
    name: "Chè bồn bồn",
    summary: "Món chè thanh ngọt với hai sắc xanh, tím bắt mắt.",
    description:
      "Bồn bồn được biến tấu thành món chè dân dã, mang đến một cách thưởng thức mới từ nguyên liệu quen thuộc của Cà Mau.",
    image: "/media/product-che-bon-bon.webp",
    imageAlt: "Các chén chè bồn bồn màu xanh và tím trên bàn gỗ",
    gallery: [
      {
        url: "/media/product-che-bon-bon-hai-loai.webp",
        alt: "Chè bồn bồn hai màu xanh và tím",
      },
    ],
    formats: ["Theo phần", "Liên hệ để biết quy cách đang có"],
    storage: "Bảo quản theo hướng dẫn của Minh Duy tại thời điểm nhận sản phẩm.",
    usage: "Dùng như món tráng miệng; có thể thưởng thức mát tùy khẩu vị.",
  },
  {
    slug: "dua-bon-bon-chua-ngot",
    name: "Dưa bồn bồn chua ngọt",
    summary: "Biến tấu cân bằng giữa vị chua nhẹ và ngọt dịu.",
    description:
      "Món ăn kèm hài hòa giữa vị chua nhẹ, ngọt dịu và độ giòn đặc trưng của bồn bồn.",
    image: "/media/product-dua-chua-ngot.webp",
    imageAlt: "Túi dưa bồn bồn chua ngọt trưng bày",
    formats: ["Đóng hũ", "Liên hệ để biết dung lượng đang có"],
    storage: "Bảo quản theo hướng dẫn trên bao bì của sản phẩm.",
    usage: "Dùng như món ăn kèm hoặc phối hợp trong các món gỏi.",
  },
  {
    slug: "dua-bon-bon-truyen-thong",
    name: "Dưa bồn bồn truyền thống",
    summary: "Vị chua dịu, giòn thanh, gợi nhớ bữa cơm miền Tây.",
    description:
      "Dòng sản phẩm gắn với cách dùng bồn bồn quen thuộc của người Cà Mau. Sản phẩm phù hợp dùng kèm món kho, trộn gỏi hoặc làm món ăn kèm.",
    image: "/media/product-dua-truyen-thong.webp",
    imageAlt: "Túi dưa bồn bồn truyền thống",
    formats: ["Đóng hũ", "Liên hệ để biết dung lượng đang có"],
    storage: "Bảo quản theo hướng dẫn in trên nhãn; dùng dụng cụ sạch khi lấy sản phẩm.",
    usage: "Dùng trực tiếp sau khi để ráo hoặc kết hợp với món kho và món gỏi.",
  },
  {
    slug: "bon-bon-kim-chi",
    name: "Bồn bồn kim chi",
    summary: "Vị chua cay đậm đà, hòa cùng độ giòn tự nhiên của bồn bồn Cà Mau.",
    description:
      "Một món ăn kèm lạ miệng, phù hợp với cơm, món nướng hoặc lẩu.",
    image: "/media/product-kim-chi.webp",
    imageAlt: "Bồn bồn kim chi HTX Bồn Bồn Minh Duy",
    formats: ["Đóng hũ hoặc túi zip"],
    storage: "Bảo quản lạnh và làm theo hướng dẫn trên bao bì sản phẩm.",
    usage: "Dùng trực tiếp, làm món ăn kèm món nướng, lẩu hoặc bữa cơm hằng ngày.",
  },
  {
    slug: "bon-bon-tuoi",
    name: "Bồn bồn tươi",
    summary: "Nguyên liệu dân dã, linh hoạt cho bữa cơm gia đình.",
    description:
      "Phần non của cây bồn bồn được làm sạch, thích hợp để nấu canh, xào, nhúng lẩu hoặc trộn gỏi.",
    image: "/media/hero-bon-bon.webp",
    imageAlt: "Bồn bồn tươi được thu hoạch trên vùng nguyên liệu tại Cà Mau",
    formats: ["Đóng gói hút chân không"],
    storage: "Giữ mát và sử dụng theo hướng dẫn trên nhãn của từng lô sản phẩm.",
    usage: "Dùng cho món xào, canh, lẩu hoặc chế biến theo khẩu vị gia đình.",
  },
];

export const journalEntries: JournalEntry[] = [
  {
    slug: "goi-bon-bon-tom-thit",
    kind: "cong-thuc",
    title: "Gợi ý gỏi bồn bồn tôm thịt",
    excerpt: "Một cách kết hợp giòn, thanh và dễ chuẩn bị cho bữa cơm gia đình.",
    image: "/media/recipe-goi-bon-bon.webp",
    imageAlt: "Bồn bồn được chuẩn bị cho món gỏi",
    publishedLabel: "Gợi ý từ bếp",
    readingTime: "4 phút đọc",
    body: [
      "Bồn bồn có thể kết hợp cùng tôm, thịt, rau thơm và nước trộn theo khẩu vị gia đình. Khi dùng sản phẩm đóng hũ, nên để ráo trước khi phối trộn.",
      "Chuẩn bị các nguyên liệu đã làm chín, trộn nhẹ tay để bồn bồn giữ độ giòn, sau đó nêm lại ngay trước khi dùng.",
      "Gia giảm nước trộn theo khẩu vị và dùng ngay sau khi trộn để món gỏi giữ được độ giòn.",
    ],
  },
  {
    slug: "lon-len-cung-cay-bon-bon-ca-mau",
    kind: "cau-chuyen",
    title: "Lớn lên cùng cây bồn bồn Cà Mau",
    excerpt: "Câu chuyện về một loài cây bản địa đi từ ruộng nước đến gian bếp.",
    image: "/media/harvest-team.webp",
    imageAlt: "Khung cảnh vùng bồn bồn ngập nước tại Cà Mau",
    publishedLabel: "Câu chuyện vùng đất",
    readingTime: "5 phút đọc",
    body: [
      "Ở Cà Mau, bồn bồn gắn với vùng đất ngập nước và nhịp sống của nhiều gia đình. Phần non của cây trở thành nguyên liệu cho những món ăn giản dị, dễ nhận ra trong bữa cơm miền Tây.",
      "HTX Bồn Bồn Minh Duy được đăng ký hoạt động từ năm 2022 tại Hưng Mỹ, Cà Mau, với hoạt động gắn với trồng, thu mua, sơ chế, chế biến và thương mại sản phẩm từ cây bồn bồn.",
      "Từ vùng nguyên liệu đến những người trực tiếp thu hoạch, sơ chế và chế biến, mỗi sản phẩm đều mang theo câu chuyện của đất và người Cà Mau.",
    ],
  },
  {
    slug: "tu-phien-cho-den-kenh-ban-hang-truc-tuyen",
    kind: "tin-tuc",
    title: "Đưa sản phẩm bồn bồn đến gần hơn với khách hàng",
    excerpt: "Từ những cuộc gặp trực tiếp đến điện thoại, Zalo và website, Minh Duy giúp khách hàng dễ dàng tìm hiểu sản phẩm bồn bồn Cà Mau.",
    image: "/media/activity-fair.webp",
    imageAlt: "Hoạt động thu hoạch bồn bồn tại vùng nguyên liệu",
    publishedLabel: "Hoạt động HTX",
    readingTime: "3 phút đọc",
    body: [
      "Bên cạnh những điểm giới thiệu trực tiếp, điện thoại, Zalo và website giúp khách hàng tìm hiểu sản phẩm thuận tiện hơn.",
      "Qua các kênh này, khách hàng có thể dễ dàng xem thông tin sản phẩm và trao đổi trực tiếp với HTX.",
      "Để biết sản phẩm đang có và cách đặt hàng, vui lòng gọi hoặc nhắn Zalo cho Minh Duy.",
    ],
  },
  {
    slug: "chat-luong-bat-dau-tu-tung-lo-nguyen-lieu",
    kind: "cau-chuyen",
    title: "Chất lượng bắt đầu từ từng lô nguyên liệu",
    excerpt: "Những điểm kiểm soát nối tiếp từ tiếp nhận đến đóng gói.",
    image: "/media/process-preparation.webp",
    imageAlt: "Người lao động sơ chế bồn bồn sau thu hoạch",
    publishedLabel: "Câu chuyện quy trình",
    readingTime: "4 phút đọc",
    body: [
      "Mỗi đợt bồn bồn đều trải qua các bước chọn lọc, làm sạch, sơ chế, chế biến và đóng gói cẩn thận.",
      "Qua từng công đoạn, Minh Duy hướng đến sản phẩm chỉn chu và thông tin rõ ràng cho khách hàng.",
      "Các thông tin về tiêu chuẩn và chứng nhận được Minh Duy cập nhật rõ ràng khi có xác nhận chính thức.",
    ],
  },
];

export const journalLabels: Record<JournalKind, string> = {
  "cong-thuc": "Công thức",
  "cau-chuyen": "Câu chuyện",
  "tin-tuc": "Tin tức",
};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getJournalEntry(kind: JournalKind, slug: string) {
  return journalEntries.find((entry) => entry.kind === kind && entry.slug === slug);
}

export function getJournalHref(entry: JournalEntry) {
  return `/goc-bon-bon/${entry.kind}/${entry.slug}`;
}
