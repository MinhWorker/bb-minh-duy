export const PUBLISH_STATUSES = ["draft", "published"] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];

export const COMMERCIAL_STATUSES = ["core", "experimental", "research"] as const;
export type CommercialStatus = (typeof COMMERCIAL_STATUSES)[number];

export const SITE_PAGE_KEYS = ["home", "about", "contact"] as const;
export type SitePageKey = (typeof SITE_PAGE_KEYS)[number];

export const CONTENT_KINDS = ["product", "recipe", "story", "news", "certification", "site-page"] as const;
export type ContentKind = (typeof CONTENT_KINDS)[number];

export const EVIDENCE_KINDS = ["official-document", "internal-report", "owner-confirmation"] as const;
export type EvidenceKind = (typeof EVIDENCE_KINDS)[number];

export const VERIFICATION_STATUSES = ["verified", "internal-only", "pending", "rejected"] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export type SeoFields = {
  seoTitle: string | null;
  seoDescription: string | null;
};

export type SiteSettings = {
  id: number;
  cooperativeName: string;
  logo: string | null;
  phone: string | null;
  zalo: string | null;
  email: string | null;
  address: string | null;
  mapUrl: string | null;
  marketplaceUrl: string | null;
  socialLinks: Record<string, string>;
  defaultSeoTitle: string | null;
  defaultSeoDescription: string | null;
};

export type PublicProduct = SeoFields & {
  id: number;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  gallery: Array<{ url: string; alt: string }>;
  description: string;
  unit: string;
  specifications: string[];
  storageInstructions: string;
  usageInstructions: string;
  marketplaceUrl: string;
  categoryId: number | null;
  isFeatured: boolean;
};

export type RecipeDetail = SeoFields & {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  content: string;
};

export type StoryDetail = SeoFields & {
  id: number;
  slug: string;
  title: string;
  role: string;
  quote: string;
  content: string;
  image: string;
  imageAlt: string;
};

export type NewsDetail = SeoFields & {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  imageAlt: string;
  publishedAt: Date | null;
};
