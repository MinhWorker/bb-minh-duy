"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CategoriesList } from "./categories/list";
import { CategoriesCreate } from "./categories/create";
import { CategoriesEdit } from "./categories/edit";
import { CertificationsList } from "./certifications/list";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
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
        recordRepresentation="title"
      />
    </Admin>
  )
}

export default App;
