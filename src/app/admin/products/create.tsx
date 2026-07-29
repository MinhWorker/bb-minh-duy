import { AutocompleteArrayInput, Create, ImageField, ImageInput, NumberInput, ReferenceArrayInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required, useNotify, useRedirect } from "react-admin";
import { uploadToCloudinary } from "../../../../lib/upload";
import { formatJsonField } from "../json-field";

type ProductForm = Record<string, unknown> & { image?: { rawFile?: File }; certifications?: number[] };
export const ProductsCreate = () => {
  const notify = useNotify(); const redirect = useRedirect();
  const submit = async (values: ProductForm) => {
    try {
      const file = values.image?.rawFile; if (!file) throw new Error("Hãy chọn hình ảnh.");
      const { secure_url: image } = await uploadToCloudinary(file);
      const response = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, image, certificationIds: values.certifications, status: values.status ?? "draft" }) });
      if (!response.ok) { const body = await response.json() as { message?: string }; throw new Error(body.message ?? "Tạo thất bại."); }
      notify("Tạo thành công"); redirect("/products");
    } catch (error: unknown) { notify(error instanceof Error ? error.message : "Tạo thất bại.", { type: "error" }); }
  };
  return <Create><SimpleForm onSubmit={submit}><ProductFields create /><ImageInput source="image" label="Ảnh chính" accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }} maxSize={10 * 1024 * 1024} validate={required()}><ImageField source="src" /></ImageInput></SimpleForm></Create>;
};

export const ProductFields = ({ create = false }: { create?: boolean }) => <>
  <TextInput source="name" label="Tên sản phẩm" validate={required()} fullWidth /><TextInput source="slug" label="Slug (để trống sẽ tự tạo)" fullWidth />
  <TextInput source="description" label="Mô tả" multiline fullWidth /><TextInput source="imageAlt" label="Alt text ảnh" fullWidth />
  <TextInput source="gallery" label="Gallery (JSON array: url, alt)" multiline fullWidth format={formatJsonField} /><NumberInput source="price" label="Giá nội bộ (không public)" min={0} />
  <TextInput source="unit" label="Đơn vị/quy cách chính" validate={required()} /><TextInput source="specifications" label="Danh sách quy cách (JSON array)" multiline fullWidth format={formatJsonField} />
  <TextInput source="storageInstructions" label="Bảo quản" multiline fullWidth /><TextInput source="usageInstructions" label="Cách dùng" multiline fullWidth />
  <TextInput source="marketplaceUrl" label="URL sản phẩm trên gian hàng" fullWidth /><ReferenceInput source="categoryId" reference="categories"><SelectInput optionText="name" label="Danh mục" /></ReferenceInput>
  <ReferenceArrayInput source="certifications" reference="certifications"><AutocompleteArrayInput optionText="name" label="Chứng nhận" /></ReferenceArrayInput>
  <SelectInput source="commercialStatus" label="Trạng thái thương mại" defaultValue="core" choices={[{ id: "core", name: "Sản phẩm lõi" }, { id: "experimental", name: "Thử nghiệm" }, { id: "research", name: "Nghiên cứu" }]} />
  <SelectInput source="status" label="Xuất bản" defaultValue="draft" disabled={create} choices={[{ id: "draft", name: "Bản nháp" }, { id: "published", name: "Đã xuất bản" }]} />
  <NumberInput source="sortOrder" label="Thứ tự" defaultValue={0} /><SelectInput source="isFeatured" label="Nổi bật" defaultValue={0} choices={[{ id: 0, name: "Không" }, { id: 1, name: "Có" }]} />
  <TextInput source="seoTitle" label="SEO title" fullWidth /><TextInput source="seoDescription" label="SEO description" multiline fullWidth />
</>;
