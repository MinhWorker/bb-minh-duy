import { Datagrid, ImageField, List, TextField } from "react-admin";

export const CertificationsList = () => {
  return (
    // The <List> component automatically handles pagination if the data provider returns X-Total-Count
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <ImageField source="image" title="name" />
      </Datagrid>
    </List>
  )
};
