import { Edit, ImageField, ImageInput, SimpleForm, TextInput, useNotify, useRedirect, useTranslate } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const CertificationsEdit = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (values: any) => {
    try {
      const file = values.newImage?.rawFile;
      let imageUrl = values.image; // `image` from original record

      if (file) {
        const { secure_url } = await uploadToCloudinary(file);
        imageUrl = secure_url;
      }

      const res = await fetch(`/api/certifications/${values.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Cập nhật thất bại");
      }

      notify("Cập nhật thành công");
      redirect("/certifications")
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  }

  return (
    <Edit>
      <ImageField source="image" />
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label={translate("resources.certifications.name")} fullWidth />

        <ImageInput
          source="newImage"
          label={translate("resources.certifications.newImage")}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} // Accept any image type
          maxSize={10 * 1024 * 1024}
        >
          <ImageField source="src" title="New image" />
        </ImageInput>

      </SimpleForm>
    </Edit>)
}
