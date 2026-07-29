import { List, Datagrid, TextField, DateField, ImageField } from "react-admin";

export const RecipesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="titleVi" label="Title (VI)" />
      <TextField source="status" label="Trạng thái" />
      <ImageField source="image" title="titleVi" />
      <TextField source="difficulty" />
      <TextField source="slug" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
