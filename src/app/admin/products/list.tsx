import { Datagrid, DateField, ImageField, List, NumberField, ReferenceField, TextField, useRecordContext, useTranslate } from "react-admin";

export const ProductsList = () => {
  const translate = useTranslate();
  const CertificationsField = () => {
    const record = useRecordContext();
    if (!record || !record.certifications || record.certifications.length === 0) {
      return null;
    }
    return (
      <div>
        {/* eslint-disable  @typescript-eslint/no-explicit-any */}
        {record.certifications.map((cert: any) => (
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
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label={translate("resources.products.id")} />
        <TextField source="name" label={translate("resources.products.name")} />
        <NumberField source="price" options={{ style: "currency", currency: "VND" }} label={translate("resources.products.price")} />
        <ImageField source="image" title="name" label={translate("resources.products.image")} />
        <ReferenceField source="categoryId" reference="categories" link="show" label={translate("resources.products.category")} >
          <TextField source="name" label="Category" /> {/* Display category name */}
        </ReferenceField>
        <CertificationsField label={translate("resources.products.certifications")} />
        <DateField source="createdAt" label={translate("resources.products.createdAt")} />
      </Datagrid>
    </List>
  )
}
