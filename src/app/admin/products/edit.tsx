import { AutocompleteArrayInput, Edit, ImageField, ImageInput, NumberInput, ReferenceArrayInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, useNotify, useRecordContext, useRedirect } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const ProductsEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

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
          image: imageUrl,
          categoryId: values.categoryId,
          certificationIds: values.certifications,
        })
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      notify("Product updated");
      redirect("/products");
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  }

  return (
    <Edit>
      <ImageField source="image" title="Product image" />
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label="Product name" fullWidth required />
        <TextInput source="description" label="Product description" fullWidth required />
        <NumberInput source="price" label="Product price" required />
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText="name" required />
        </ReferenceInput>
        <ReferenceArrayInput
          source="certifications"
          reference="certifications"
        >
          <AutocompleteArrayInput optionText="name" validate={[required()]} />
        </ReferenceArrayInput>
        <ImageInput
          source="newImage"
          label="Upload new Image"
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
          maxSize={10 * 1024 * 1024}
          fullWidth
        >
          <ImageField source="src" title="Uploaded image" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  )
}
