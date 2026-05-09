import { Create, SimpleForm, TextInput, required } from "react-admin";

export const RecipesCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="titleVi" label="Title (VI)" validate={required()} fullWidth />
      <TextInput source="titleEn" label="Title (EN)" fullWidth />
      <TextInput source="descriptionVi" label="Description (VI)" multiline fullWidth />
      <TextInput source="descriptionEn" label="Description (EN)" multiline fullWidth />
      <TextInput source="image" label="Image ID (Cloudinary)" validate={required()} fullWidth />
      <TextInput source="videoUrl" label="Video URL" fullWidth />
      <TextInput source="difficulty" label="Difficulty" fullWidth />
      <TextInput source="prepTime" label="Prep Time" fullWidth />
      <TextInput source="contentVi" label="Content (VI)" multiline validate={required()} fullWidth />
      <TextInput source="contentEn" label="Content (EN)" multiline fullWidth />
    </SimpleForm>
  </Create>
);
