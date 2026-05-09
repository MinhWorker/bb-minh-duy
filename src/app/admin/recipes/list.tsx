import { List, Datagrid, TextField, DateField, ImageField } from "react-admin";

export const RecipesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="titleVi" label="Title (VI)" />
      <TextField source="titleEn" label="Title (EN)" />
      <ImageField source="image" title="titleVi" />
      <TextField source="difficulty" />
      <TextField source="prepTime" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
