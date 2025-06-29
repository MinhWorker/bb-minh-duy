import { Edit, required, SimpleForm, TextInput, useTranslate } from "react-admin";

export const CategoriesEdit = () => {
  const translate = useTranslate();

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label={translate("resources.categories.name")} />
      </SimpleForm>
    </Edit>
  )
}
