import { Datagrid, List, SearchInput, TextField, useTranslate } from "react-admin";

const categoriesSearch = [
  <SearchInput
    key="categories-search"
    source="q"
    alwaysOn
    placeholder="Tìm kiếm phân loại sản phẩm"
  />
]

export const CategoriesList = () => {
  const translate = useTranslate();
  return (
    <List filters={categoriesSearch}>
      <Datagrid rowClick="edit">
        <TextField source="id" label={translate("resources.categories.id")} sortable={false} />
        <TextField source="name" label={translate("resources.categories.name")} sortable={false} />
      </Datagrid>
    </List >
  )
};
