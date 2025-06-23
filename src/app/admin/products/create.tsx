import { AutocompleteArrayInput, Create, ImageField, ImageInput, NumberInput, ReferenceArrayInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, useNotify, useRedirect } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const ProductsCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (values: any) => {
    try {
      const file = values.image?.rawFile;

      if (!file) {
        notify("Please upload an image", { type: "error" });
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
        throw new Error(errorData.message || "Create failed");
      }

      notify("Product created successfully!");
      redirect("/products");
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  }

  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label="Product name" fullWidth required />
        <TextInput source="description" label="Product description" fullWidth />
        <NumberInput source="price" label="Product price" required />
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText="name" required />
        </ReferenceInput>
        <ReferenceArrayInput
          source="certifications"
          reference="certifications"
          format={(value) => value?.map((item: any) => item.certificationId)} // from backend
          parse={(value) => value?.map((id: any) => ({ certificationId: id }))} // to backend
        >
          <AutocompleteArrayInput optionText="name" validate={[required()]} />
        </ReferenceArrayInput>
        <ImageInput
          source="image"
          label="Product image"
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
