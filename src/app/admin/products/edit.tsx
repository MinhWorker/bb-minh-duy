import { AutocompleteArrayInput, Edit, ImageField, ImageInput, NumberInput, ReferenceArrayInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, useNotify, useRedirect, useTranslate } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";
import BackButton from "../../../../components/BackButton";

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const ProductsEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const translate = useTranslate();

  const handleSubmit = async (values: any) => {
    try {
      const file = values.newImage?.rawFile;
      let imageUrl = values.image;

      if (file) {
        const { secure_url } = await uploadToCloudinary(file);
        imageUrl = secure_url;
      }

      const res = await fetch(`/api/products/${values.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          price: values.price,
          unit: values.unit,
          image: imageUrl,
          categoryId: values.categoryId,
          certificationIds: values.certifications,
        })
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Cập nhật thất bại");
      }

      notify("Cập nhật thành công");
      redirect("/products");
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  }

  return (
    <Edit>
      <ImageField source="image" title="Product image" />
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label={translate("resources.products.name")} fullWidth required />
        <TextInput source="description" label={translate("resources.products.description")} fullWidth required />
        <NumberInput source="price" label={translate("resources.products.price")} required />
        <TextInput source="unit" label={translate("resources.products.unit")} required />
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText="name" required label={translate("resources.products.category")} />
        </ReferenceInput>
        <ReferenceArrayInput
          source="certifications"
          reference="certifications"
        >
          <AutocompleteArrayInput optionText="name" validate={[required()]} label={translate("resources.products.certifications")} />
        </ReferenceArrayInput>
        <ImageInput
          source="newImage"
          label={translate("resources.products.newImage")}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
          maxSize={10 * 1024 * 1024}
          fullWidth
        >
          <ImageField source="src" title="Uploaded image" />
        </ImageInput>
        <BackButton url="products" />
      </SimpleForm>
    </Edit>
  )
}
