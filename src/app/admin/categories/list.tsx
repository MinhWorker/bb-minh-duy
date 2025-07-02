import { Datagrid, List, TextField, useTranslate } from "react-admin";

export const CategoriesList = () => {
  const translate = useTranslate();
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label={translate("resources.categories.id")} sortable={false} />
        <TextField source="name" label={translate("resources.categories.name")} sortable={false} />
      </Datagrid>
    </List >
  )
};
