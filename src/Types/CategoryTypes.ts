import { TCategoryOrBrand } from "./Types";

export type TCategories = {
  id: 0;
  name: string;
}[];
export type TAddCategory = {
  categoryName: string;
};

export type TGetCategory = {
  id: 0;
  categoryName: string;
  brands: TCategoryOrBrand[];
};

export type TCategoryForm = {
  id: number;
}[];
