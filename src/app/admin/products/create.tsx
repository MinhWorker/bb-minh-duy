import { AutocompleteArrayInput, Create, ImageField, ImageInput, NumberInput, ReferenceArrayInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, useNotify, useRedirect, useTranslate } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const ProductsCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const translate = useTranslate();

  const handleSubmit = async (values: any) => {
    try {
      const file = values.image?.rawFile;

      if (!file) {
        notify("Hãy chọn hình ảnh", { type: "error" });
        return;
      }

      const { secure_url } = await uploadToCloudinary(file);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          price: values.price,
          image: secure_url,
          description: values.description,
          categoryId: values.categoryId,
          certificationIds: values.certifications,
        })
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Tạo thất bại");
      }

      notify("Tạo thành công");
      redirect("/products");
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  }

  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label={translate("resources.products.name")} fullWidth required />
        <TextInput source="description" label={translate("resources.products.description")} fullWidth />
        <NumberInput source="price" label={translate("resources.products.price")} required />
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText="name" required label={translate("resources.products.category")} />
        </ReferenceInput>
        <ReferenceArrayInput
          source="certifications"
          reference="certifications"
          format={(value) => value?.map((item: any) => item.certificationId)} // from backend
          parse={(value) => value?.map((id: any) => ({ certificationId: id }))} // to backend
        >
          <AutocompleteArrayInput optionText="name" validate={[required()]} label={translate("resources.products.certifications")} />
        </ReferenceArrayInput>
        <ImageInput
          source="image"
          label={translate("resources.products.image")}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
          maxSize={10 * 1024 * 1024}
          fullWidth
          validate={[required()]}
        >
          <ImageField source="src" title="Uploaded image" />
        </ImageInput>
      </SimpleForm>
    </Create>
  )
}
