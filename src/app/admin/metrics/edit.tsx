import { Edit, SimpleForm, TextInput, NumberInput, required } from "react-admin";

export const MetricsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" validate={required()} fullWidth />
      <NumberInput source="value" validate={required()} />
      <TextInput source="unit" fullWidth />
    </SimpleForm>
  </Edit>
);
