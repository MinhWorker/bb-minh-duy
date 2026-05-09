import { Edit, SimpleForm, TextInput, NumberInput, required } from "react-admin";

export const MemberStoriesEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="nameVi" label="Name (VI)" validate={required()} fullWidth />
      <TextInput source="nameEn" label="Name (EN)" fullWidth />
      <TextInput source="roleVi" label="Role (VI)" fullWidth />
      <TextInput source="roleEn" label="Role (EN)" fullWidth />
      <TextInput source="quoteVi" label="Quote (VI)" multiline validate={required()} fullWidth />
      <TextInput source="quoteEn" label="Quote (EN)" multiline fullWidth />
      <TextInput source="contentVi" label="Content (VI)" multiline fullWidth />
      <TextInput source="contentEn" label="Content (EN)" multiline fullWidth />
      <TextInput source="image" label="Image ID (Cloudinary)" validate={required()} fullWidth />
      <NumberInput source="order" label="Order" />
    </SimpleForm>
  </Edit>
);
