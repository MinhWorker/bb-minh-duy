import { Edit, ImageField, ImageInput, SimpleForm, useNotify, useRedirect } from "react-admin";
import { uploadToCloudinary } from "../../../../lib/upload";
import { ProductFields } from "./create";
export const ProductsEdit = () => {
  const notify = useNotify(); const redirect = useRedirect();
  const submit = async (values: Record<string, unknown>) => {
    try {
      if (typeof values.id !== "number" || typeof values.image !== "string") throw new Error("Dữ liệu sản phẩm không hợp lệ.");
      let image = values.image;
      const newImage = values.newImage && typeof values.newImage === "object" ? values.newImage as { rawFile?: File } : undefined;
      const file = newImage?.rawFile;
      if (file) image = (await uploadToCloudinary(file)).secure_url;
      const response = await fetch(`/api/products/${values.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, image, certificationIds: values.certifications }) });
      if (!response.ok) { const body = await response.json() as { message?: string }; throw new Error(body.message ?? "Cập nhật thất bại."); }
      notify("Cập nhật thành công"); redirect("/products");
    } catch (error: unknown) { notify(error instanceof Error ? error.message : "Cập nhật thất bại.", { type: "error" }); }
  };
  return <Edit><SimpleForm onSubmit={submit}><ImageField source="image" /><ProductFields /><ImageInput source="newImage" label="Thay ảnh chính" accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }} maxSize={10 * 1024 * 1024}><ImageField source="src" /></ImageInput></SimpleForm></Edit>;
};
