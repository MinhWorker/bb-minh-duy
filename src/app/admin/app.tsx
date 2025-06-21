"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CategoriesList } from "./categories/list";
import { CategoriesCreate } from "./categories/create";
import { CategoriesEdit } from "./categories/edit";
import { CertificationsList } from "./certifications/list";
import { ProductsList } from "./products/list";
import { CertificationsEdit } from "./certifications/edit";
import { CertificationsCreate } from "./certifications/create";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="products"
        list={ProductsList}
        recordRepresentation="title"
      />

      <Resource
        name="categories"
        list={CategoriesList}
        create={CategoriesCreate}
        edit={CategoriesEdit}
        recordRepresentation="title"
      />

      <Resource
        name="certifications"
        list={CertificationsList}
        create={CertificationsCreate}
        edit={CertificationsEdit}
        recordRepresentation="title"
      />
    </Admin>
  )
}

export default App;
