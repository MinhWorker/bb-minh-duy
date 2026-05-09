import { Create, SimpleForm, TextInput, NumberInput, required } from "react-admin";

export const MetricsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <NumberInput source="value" validate={required()} />
      <TextInput source="unit" fullWidth />
    </SimpleForm>
  </Create>
);
