import { Datagrid, List, TextField, useTranslate } from "react-admin";

export const CategoriesList = () => {
  const translate = useTranslate();
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label={translate("resources.categories.id")} />
        <TextField source="name" label={translate("resources.categories.name")} />
      </Datagrid>
    </List >
  )
};
