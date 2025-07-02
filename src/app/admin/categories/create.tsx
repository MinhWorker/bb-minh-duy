import { Create, required, SimpleForm, TextInput, useTranslate } from "react-admin";
import BackButton from "../../../../components/BackButton";

export const CategoriesCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label={translate("resources.categories.name")} />
        <BackButton url="categories" />
      </SimpleForm>
    </Create>
  )
}
