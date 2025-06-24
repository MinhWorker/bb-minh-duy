import { Datagrid, List, TextField } from "react-admin";

export const CategoriesList = () => (
  // The <List> component automatically handles pagination if the data provider returns X-Total-Count
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
