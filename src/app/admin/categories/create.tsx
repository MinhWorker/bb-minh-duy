import { Create, required, SimpleForm, TextInput, useTranslate } from "react-admin";

export const CategoriesCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label={translate("resources.categories.name")} />
      </SimpleForm>
    </Create>
  )
}
