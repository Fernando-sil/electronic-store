import { TCategories } from "./CategoryTypes";

export type TBrands = {
  id: number;
  name: string;
}[];

export type TAddBrand = {
  brandName: string;
};

export type TBrand = {
  id: number;
  brandName: string;
  categories: TCategories;
};

export type TBrandForm = {
  id: number;
  brandName: TAddBrand;
};
