// import Link from "next/link";
import { Datagrid, DateField, ImageField, List, NumberField, ReferenceField, TextField, useRecordContext } from "react-admin";

export const ProductsList = () => {
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
        <TextField source="id" />
        <TextField source="name" />
        <NumberField source="price" options={{ style: "currency", currency: "VND" }} />
        <ImageField source="image" title="name" />
        <ReferenceField source="categoryId" reference="categories" link="show"> {/* Link to category detail if you make a category show page */}
          <TextField source="name" label="Category" /> {/* Display category name */}
        </ReferenceField>
        <CertificationsField label="Certifications" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  )
}
