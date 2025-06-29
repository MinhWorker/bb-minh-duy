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
import { ProductsCreate } from "./products/create";
import { ProductsEdit } from "./products/edit";
import { AdminLayout } from "../../../components/AdminLayout";
import { Shapes, ShieldCheck, Store } from "lucide-react";
import { i18nProvider } from "@/i18nProvider";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      layout={AdminLayout}>
      <Resource
        name="products"
        list={ProductsList}
        create={ProductsCreate}
        edit={ProductsEdit}
        recordRepresentation="title"
        icon={Store}
      />

      <Resource
        name="categories"
        list={CategoriesList}
        create={CategoriesCreate}
        edit={CategoriesEdit}
        recordRepresentation="title"
        icon={Shapes}
      />

      <Resource
        name="certifications"
        list={CertificationsList}
        create={CertificationsCreate}
        edit={CertificationsEdit}
        recordRepresentation="title"
        icon={ShieldCheck}
      />
    </Admin>
  )
}

export default App;
