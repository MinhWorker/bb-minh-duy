import { eq } from "drizzle-orm";
import db from "./drizzle";
import {
  categories,
  mediaManifest,
  news,
  products,
  recipes,
  sitePages,
  siteSettings,
} from "./schema";

const productDrafts = [
  {
    slug: "che-bon-bon",
    name: "Chè bồn bồn",
    image: "/media/product-che-bon-bon.webp",
    imageAlt: "Các chén chè bồn bồn màu xanh và tím trên bàn gỗ",
    gallery: [
      {
        url: "/media/product-che-bon-bon-hai-loai.webp",
        alt: "Chè bồn bồn hai màu xanh và tím",
      },
    ],
    description: "Món chè thanh ngọt với hai sắc xanh, tím; chờ chủ HTX xác nhận quy cách và URL gian hàng trước khi xuất bản.",
    unit: "Theo phần; liên hệ để biết quy cách đang có",
    sortOrder: 5,
  },
  {
    slug: "bon-bon-tuoi",
    name: "Bồn bồn tươi",
    image: "/media/hero-bon-bon.webp",
    imageAlt: "Bồn bồn tươi trong rổ tre",
    description: "Sản phẩm lõi; chờ chủ HTX xác nhận quy cách và URL gian hàng trước khi xuất bản.",
    unit: "Chờ xác nhận quy cách",
    sortOrder: 10,
  },
  {
    slug: "dua-bon-bon-truyen-thong",
    name: "Dưa bồn bồn truyền thống",
    image: "/media/product-dua-truyen-thong.webp",
    imageAlt: "Bao bì dưa bồn bồn đã được HTX duyệt",
    description: "Sản phẩm lõi; chờ chuẩn hóa khối lượng phần dưa, phần nước và URL gian hàng.",
    unit: "Chờ xác nhận quy cách",
    sortOrder: 20,
  },
  {
    slug: "dua-bon-bon-chua-ngot",
    name: "Dưa bồn bồn chua ngọt",
    image: "/media/product-dua-chua-ngot.webp",
    imageAlt: "Dòng dưa bồn bồn chua ngọt đã được HTX duyệt hình ảnh",
    description: "Sản phẩm lõi; chờ chốt tên theo nhãn, quy cách đang bán và URL gian hàng.",
    unit: "Chờ xác nhận quy cách",
    sortOrder: 30,
  },
  {
    slug: "bon-bon-kim-chi",
    name: "Bồn bồn kim chi",
    image: "/media/product-kim-chi.webp",
    imageAlt: "Dòng bồn bồn kim chi đã được HTX duyệt hình ảnh",
    description: "Sản phẩm chế biến; chờ chốt tên theo nhãn, quy cách đang bán và URL gian hàng.",
    unit: "Chờ xác nhận quy cách",
    sortOrder: 40,
  },
] as const;

const media = [
  ["D:\\Hợp tác xã\\Thư viện\\AI\\bb-tuoi-tren-ro-tre.jpeg", "/media/hero-bon-bon.webp", "approved-ai", "Bồn bồn tươi trong rổ tre", "hero, product"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\ba-chi-ong-cach-bo-duoi-meo.jpeg", "/media/harvest-team.webp", "approved-ai", "Hoạt động thu hoạch bồn bồn", "origin story"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\nguoi-dan-ong-bo-duoi-meo.jpeg", "/media/harvest-worker.webp", "approved-ai", "Người lao động thu hoạch bồn bồn", "origin story"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\dua-mem-dua-zip-ben-nhau.jpeg", "/media/product-dua-truyen-thong.webp", "approved-ai", "Bao bì dưa bồn bồn truyền thống đã duyệt", "product"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\bon-bon-chua-ngot-trung-bay-keo-tui.jpeg", "/media/product-dua-chua-ngot.webp", "approved-ai", "Dòng dưa bồn bồn chua ngọt đã duyệt", "product"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\kim-chi-bon-bon-banner.png", "/media/product-kim-chi.webp", "approved-ai", "Dòng bồn bồn kim chi đã duyệt", "product"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\che-bon-bon-7-chen-luc-giac.jpeg", "/media/product-che-bon-bon.webp", "approved-ai", "Các chén chè bồn bồn màu xanh và tím trên bàn gỗ", "product"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\che-bon-bon-hai-loai.jpeg", "/media/product-che-bon-bon-hai-loai.webp", "approved-ai", "Chè bồn bồn hai màu xanh và tím", "product gallery"],
  ["D:\\Hợp tác xã\\Thư viện\\pictures\\z7608183407084_1b867b0beaec5678eea0cbff4383d2c7.jpg", "/media/recipe-goi-bon-bon.webp", "real", "Chuẩn bị món ăn từ bồn bồn", "recipe"],
  ["D:\\Hợp tác xã\\Thư viện\\AI\\ca-kho-bon-bon-dua-rau-mam.jpeg", "/media/recipe-bua-com.webp", "approved-ai", "Bữa cơm có món từ bồn bồn", "recipe"],
  ["D:\\Hợp tác xã\\Thư viện\\pictures\\z7793240860619_5800bd40bf52107f1fdf8e7d323c1e31.jpg", "/media/activity-fair.webp", "real", "Hoạt động giới thiệu sản phẩm", "news"],
  ["D:\\Hợp tác xã\\Thư viện\\pictures\\z7793241712535_90a4a590fb8c083fabc54d45d4479b6b.jpg", "/media/process-preparation.webp", "real", "Công đoạn chuẩn bị sản phẩm", "quality"],
  ["D:\\Hợp tác xã\\Thư viện\\pictures\\z7793241718226_e138be3d312cfbac6511d12ef7752fc0.jpg", "/media/process-packing.webp", "real", "Công đoạn đóng gói sản phẩm", "quality"],
  ["D:\\Hợp tác xã\\Thư viện\\pictures\\Round Logo.png", "/media/logo-minh-duy.png", "real", "Logo HTX Bồn Bồn Minh Duy", "brand"],
] as const;

async function seed() {
  const [existingSettings] = await db.select({ id: siteSettings.id }).from(siteSettings).limit(1);
  const settings = {
    cooperativeName: "HTX Bồn Bồn Minh Duy",
    logo: "/media/logo-minh-duy.png",
    phone: "0948055359",
    zalo: "https://zalo.me/0948055359",
    email: "htxbonbonminhduy@gmail.com",
    address: "Ấp Đông Hưng, xã Hưng Mỹ, tỉnh Cà Mau",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=H%C6%B0ng+M%E1%BB%B9%2C+C%C3%A0+Mau",
    defaultSeoTitle: "HTX Bồn Bồn Minh Duy · Cà Mau",
    defaultSeoDescription: "Sản phẩm và câu chuyện từ cây bồn bồn Cà Mau.",
    updatedAt: new Date(),
  };
  if (existingSettings) await db.update(siteSettings).set(settings).where(eq(siteSettings.id, existingSettings.id));
  else await db.insert(siteSettings).values(settings);

  await db.insert(categories).values({ name: "Sản phẩm từ bồn bồn", slug: "san-pham-bon-bon", status: "draft" })
    .onConflictDoUpdate({ target: categories.name, set: { slug: "san-pham-bon-bon", updatedAt: new Date() } });
  const [category] = await db.select({ id: categories.id }).from(categories).where(eq(categories.name, "Sản phẩm từ bồn bồn")).limit(1);

  for (const draft of productDrafts) {
    const gallery = "gallery" in draft ? [...draft.gallery] : [];
    await db.insert(products).values({
      ...draft,
      categoryId: category?.id,
      commercialStatus: "core",
      status: "draft",
      price: null,
      marketplaceUrl: null,
      specifications: [],
      gallery,
      storageInstructions: "Chờ xác nhận theo nhãn hiện hành.",
      usageInstructions: "Chờ xác nhận theo nhãn hiện hành.",
    }).onConflictDoUpdate({
      target: products.slug,
      set: { ...draft, gallery, categoryId: category?.id, status: "draft", price: null, marketplaceUrl: null, updatedAt: new Date() },
    });
  }

  for (const page of [
    { pageKey: "home", title: "Trang chủ" },
    { pageKey: "about", title: "Giới thiệu & Chất lượng" },
    { pageKey: "contact", title: "Liên hệ" },
  ]) {
    await db.insert(sitePages).values({ ...page, status: "draft", hero: {}, sections: [] })
      .onConflictDoUpdate({ target: sitePages.pageKey, set: { title: page.title, updatedAt: new Date() } });
  }

  await db.insert(recipes).values({
    titleVi: "Gợi ý gỏi bồn bồn tôm thịt",
    slug: "goi-bon-bon-tom-thit",
    descriptionVi: "Bản nháp công thức, chờ duyệt định lượng và các bước.",
    image: "/media/recipe-goi-bon-bon.webp",
    imageAlt: "Chuẩn bị món ăn từ bồn bồn",
    ingredients: [],
    steps: [],
    contentVi: "Nội dung đang chờ HTX duyệt trước khi xuất bản.",
    status: "draft",
  }).onConflictDoNothing({ target: recipes.slug });

  await db.insert(news).values({
    slug: "tu-phien-cho-den-kenh-ban-hang-truc-tuyen",
    title: "Từ phiên chợ đến kênh bán hàng trực tuyến",
    summary: "Bản nháp hoạt động HTX, chờ duyệt nội dung.",
    content: "Nội dung đang chờ HTX duyệt trước khi xuất bản.",
    image: "/media/activity-fair.webp",
    imageAlt: "Hoạt động giới thiệu sản phẩm",
    status: "draft",
  }).onConflictDoNothing({ target: news.slug });

  for (const [sourcePath, assetUrl, provenance, altText, displayRole] of media) {
    await db.insert(mediaManifest).values({
      sourcePath,
      assetUrl,
      mediaKind: "photo",
      provenance,
      altText,
      displayRole,
      isApproved: true,
      usageRights: "Ảnh do người dùng cung cấp và duyệt cho website HTX.",
    }).onConflictDoUpdate({
      target: mediaManifest.sourcePath,
      set: { assetUrl, provenance, altText, displayRole, isApproved: true, updatedAt: new Date() },
    });
  }
}

seed().then(() => console.log("Đã tạo dữ liệu CMS ở trạng thái draft.")).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
