# Project Specification: HTX Bồn Bồn Minh Duy

## 1. Vision & Style (Modern-Rustic)
The project aims to elevate the "Minh Duy Cattail" brand to a premium OCOP 4-star level. The UI/UX should reflect a **Modern-Rustic** aesthetic:
- **Visuals:** High-resolution imagery of the Cà Mau wetlands, macro shots of the product's natural texture, and warm, earthy tones (Deep Green, Clay Brown, Soft Cream).
- **Interactions:** Subtle animations, smooth scroll effects, and a "journal-like" layout that feels both artisanal and professional.
- **Goals:** Build trust with B2B partners while creating an emotional connection with B2C consumers through storytelling.

---

## 2. Core Features (New Implementation)

### A. OCOP 4-Star Journey & Traceability
A dedicated page or interactive section that documents the product's evolution.
- **Interactive Timeline:** From "Wild Weed" to "OCOP Specialty".
- **Farm-to-Table Workflow:** A visual step-by-step guide (Harvesting → Peeling → Natural Fermentation → Packaging).
- **QR Traceability Demo:** A simulated QR code interface that shows consumers exactly where their specific batch of cattail was harvested and processed.
- **Commitments:** A "3-NO" badge system (No Preservatives, No Bleach, No Harmful Chemicals).

### B. Social Impact Dashboard (Enhanced)
A real-time (or periodically updated) dashboard to showcase the cooperative's community value.
- **Key Metrics:**
  - **Women Empowerment:** Percentage of female members in the production line.
  - **Training Hours:** Total hours spent on food safety and professional skills training.
  - **Clean Production Area:** Total acreage (hectares) of raw material area managed under clean/safe standards.
  - **Livelihood Support:** Number of local households benefited.
- **Visuals:** Clean charts or stylized counters that match the rustic theme.

### C. "Cattail 4.0" Recipe Repository
A searchable and filterable database of culinary solutions.
- **9-Dish Menu:** Focus on the "Menu Bồn Bồn 9 món" (Salad, Soup, Stir-fry, Hotpot, etc.).
- **Recipe Details:** Ingredients list, step-by-step instructions, and estimated time.
- **Rich Media:** Integration for high-quality video tutorials (YouTube/TikTok embeds) and "User-Submitted" gallery.

### D. "Member Stories" (Humanizing the Brand)
Profiles of the people behind the product.
- **Story Cards:** Photo of the member, their role (e.g., "Master Fermenter"), and a short quote about their life in the wetlands.
- **Co-op Spirit:** Content emphasizing the collective power and shared benefits of the cooperative model.

---

## 3. UI/UX Requirements

### Dashboard Integration
- The Admin Dashboard (React Admin) must allow easy management of:
  - **Recipes:** Title, Category, Ingredients (JSON), Instructions (Rich Text), Cloudinary Image/Video ID.
  - **Metrics:** Dynamic updating of social impact numbers.
  - **Stories:** Managing member profiles and quotes.

### Responsive Design
- **Mobile First:** Since many users will access via Zalo links, the mobile experience must be fluid.
- **B2B Focus:** A dedicated "Download Profile" button for potential partners to get the cooperative's capacity profile (PDF).

### Localization
- Full support for English (B2B/Export) and Vietnamese (Local). All new content (Recipes, Stories) must have dual-language fields.
