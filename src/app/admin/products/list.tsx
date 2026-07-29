import { Datagrid, DateField, ImageField, List, ReferenceField, SearchInput, TextField, useRecordContext, useTranslate } from "react-admin";

const productSearch = [
  <SearchInput
    key="product-search"
    source="q"
    alwaysOn
    placeholder="Tìm kiếm sản phẩm"
  />
]

export const ProductsList = () => {
  const translate = useTranslate();
  const CertificationsField = () => {
    const record = useRecordContext<{ certifications?: Array<{ certificationId: number; certification: { name: string } }> }>();
    if (!record || !record.certifications || record.certifications.length === 0) {
      return null;
    }
    return (
      <div>
        {record.certifications.map((cert) => (
          <div key={cert.certificationId}>
            <a key={cert.certificationId}
              href={`admin#/certifications/${cert.certificationId}`}
              className="underline text-blue-400">
              {cert.certification.name}
            </a>
          </div>
        ))}
      </div>
    );
  };

  CertificationsField.defaultProps = {
    label: 'Certificates',
  };

  return (
    <List filters={productSearch}>
      <Datagrid rowClick="edit">
        <TextField source="id" label={translate("resources.products.id")} sortable={false} />
        <TextField source="name" label={translate("resources.products.name")} sortable={false} />
        <TextField source="status" label="Xuất bản" sortable={false} />
        <TextField source="commercialStatus" label="Thương mại" sortable={false} />
        <TextField source="unit" label={translate("resources.products.unit")} sortable={false} />
        <ImageField source="image" title="name" label={translate("resources.products.image")} sortable={false} />
        <ReferenceField source="categoryId" reference="categories" link="show" label={translate("resources.products.category")} sortable={false} >
          <TextField source="name" label="Category" sortable={false} /> {/* Display category name */}
        </ReferenceField>
        <CertificationsField label={translate("resources.products.certifications")} />
        <DateField source="createdAt" label={translate("resources.products.createdAt")} sortable={false} />
      </Datagrid>
    </List>
  )
}
