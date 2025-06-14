import { Edit, required, SimpleForm, TextInput } from "react-admin";

export const CategoriesEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} label="Name" />
    </SimpleForm>
  </Edit>
)
