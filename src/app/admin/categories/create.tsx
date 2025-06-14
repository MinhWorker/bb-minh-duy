import { Create, required, SimpleForm, TextInput } from "react-admin";

export const CategoriesCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} label="name" />
    </SimpleForm>
  </Create>
)
