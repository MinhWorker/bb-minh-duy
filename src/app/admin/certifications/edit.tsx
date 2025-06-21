import { Edit, ImageField, ImageInput, SimpleForm, TextInput, useNotify, useRedirect } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";

export const CertificationsEdit = () => {

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
        throw new Error(errorData.message || "Update failed");
      }

      notify("Certification updated");
      redirect("/certifications")
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  }

  return (
    <Edit>
      <ImageField source="image" title="Certification image" />
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label="Certification Name" fullWidth />

        <ImageInput
          source="newImage"
          label="Upload New Image"
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} // Accept any image type
          maxSize={10 * 1024 * 1024}
        >
          <ImageField source="src" title="New image" />
        </ImageInput>

      </SimpleForm>
    </Edit>)
}
