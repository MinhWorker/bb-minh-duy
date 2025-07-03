import { Datagrid, ImageField, List, SearchInput, TextField, useTranslate } from "react-admin";

const certificationsSearch = [
  <SearchInput
    key="certifications-search"
    source="q"
    alwaysOn
    placeholder="Tìm kiếm chứng chỉ"
  />
]

export const CertificationsList = () => {
  const translate = useTranslate();
  return (
    // The <List> component automatically handles pagination if the data provider returns X-Total-Count
    <List filters={certificationsSearch}>
      <Datagrid rowClick="edit">
        <TextField source="id" label={translate("resources.certifications.id")} sortable={false} />
        <TextField source="name" label={translate("resources.certifications.name")} sortable={false} />
        <ImageField source="image" label={translate("resources.certifications.image")} sortable={false} />
      </Datagrid>
    </List>
  )
};
