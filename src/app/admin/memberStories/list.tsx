import { List, Datagrid, TextField, DateField, ImageField, NumberField } from "react-admin";

export const MemberStoriesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="nameVi" label="Name (VI)" />
      <TextField source="roleVi" label="Role (VI)" />
      <ImageField source="image" title="nameVi" />
      <NumberField source="order" />
      <TextField source="status" label="Trạng thái" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);
