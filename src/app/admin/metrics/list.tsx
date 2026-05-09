import { List, Datagrid, TextField, DateField, NumberField } from "react-admin";

export const MetricsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="value" />
      <TextField source="unit" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);
