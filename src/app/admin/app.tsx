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
import { RecipesList } from "./recipes/list";
import { RecipesCreate } from "./recipes/create";
import { RecipesEdit } from "./recipes/edit";
import { MemberStoriesList } from "./memberStories/list";
import { MemberStoriesCreate } from "./memberStories/create";
import { MemberStoriesEdit } from "./memberStories/edit";
import { MetricsList } from "./metrics/list";
import { MetricsCreate } from "./metrics/create";
import { MetricsEdit } from "./metrics/edit";
import { AdminLayout } from "../../../components/AdminLayout";
import { Shapes, ShieldCheck, Store, ChefHat, Users, LineChart } from "lucide-react";
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
        recordRepresentation="name"
        icon={Store}
      />

      <Resource
        name="categories"
        list={CategoriesList}
        create={CategoriesCreate}
        edit={CategoriesEdit}
        recordRepresentation="name"
        icon={Shapes}
      />

      <Resource
        name="certifications"
        list={CertificationsList}
        create={CertificationsCreate}
        edit={CertificationsEdit}
        recordRepresentation="name"
        icon={ShieldCheck}
      />

      <Resource
        name="recipes"
        list={RecipesList}
        create={RecipesCreate}
        edit={RecipesEdit}
        recordRepresentation="titleVi"
        icon={ChefHat}
      />

      <Resource
        name="memberStories"
        list={MemberStoriesList}
        create={MemberStoriesCreate}
        edit={MemberStoriesEdit}
        recordRepresentation="nameVi"
        icon={Users}
      />

      <Resource
        name="metrics"
        list={MetricsList}
        create={MetricsCreate}
        edit={MetricsEdit}
        recordRepresentation="name"
        icon={LineChart}
      />
    </Admin>
  )
}

export default App;
