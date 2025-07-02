import { Edit, required, SimpleForm, TextInput, useTranslate } from "react-admin";
import BackButton from "../../../../components/BackButton";

export const CategoriesEdit = () => {
  const translate = useTranslate();

  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label={translate("resources.categories.name")} />
        <BackButton url="categories" />
      </SimpleForm>
    </Edit>
  )
}
