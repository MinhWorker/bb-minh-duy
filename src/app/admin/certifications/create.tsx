import { Create, ImageField, ImageInput, required, SimpleForm, TextInput, useNotify, useRedirect, useTranslate } from "react-admin"
import { uploadToCloudinary } from "../../../../lib/upload";
import BackButton from "../../../../components/BackButton";

{/* eslint-disable  @typescript-eslint/no-explicit-any */ }
export const CertificationsCreate = () => {
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

      const res = await fetch("/api/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          image: secure_url, // store only the Cloudinary public_id
        }),
      });

      if (!res.ok) {
        // Attempt to parse the response body as JSON to get the error message
        const errorData = await res.json();
        throw new Error(errorData.message || "Tạo thất bại"); // Re-throw with the server's message
      }

      notify("Tạo thành công")
      redirect("/certifications");
    } catch (error: any) {
      notify(error.message, { type: "error" });
    }
  };

  return (
    <Create>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="name" label={translate("resources.certifications.name")} fullWidth required />
        <ImageInput
          source="image" // This field will store the Cloudinary public_id
          label={translate("resources.certifications.image")}
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} // Accept any image type
          maxSize={10 * 1024 * 1024} // 10MB max file size
          fullWidth
          validate={[required()]}
        >

          <ImageField source="src" title="Uploaded Image" />
        </ImageInput>
        <p className="text-red-500 text-sm">*{translate("resources.certifications.fileSize")}</p>
        <BackButton url="certifications" />
      </SimpleForm>
    </Create >
  )
}

