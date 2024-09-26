import { TSpecification } from "./SpecificationTypes";
import { TCategoryOrBrand } from "./Types";

export type TProductOnsale = {
  id: string;
  itemName: string;
  imageUrl: string;
  price: number;
  score: number;
  categoryName: string;
};

export type TItem = {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  averageRating: number;
  itemCategory: {
    id: number;
    categoryName: string;
  };
  itemBrand: {
    id: number;
    name: string;
  };
  itemSpecifications: [
    {
      id: number;
      spec: string;
      value: string;
    },
  ];
  ratings: [
    {
      id: number;
      rate: number;
      comment: string;
      userName: string;
    },
  ];
  imageUrl: string;
};

export type TItems = {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  score: number;
  itemCategory: {
    id: number;
    categoryName: string;
  };
  itemBrand: {
    id: number;
    name: string;
  };
  imageUrl: string;
};

export type TItemForm = {
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  score?: number;
  categoryId: number;
  brandId: number;
  imageUrl: string;
  specifications?: TSpecification[];
};

export type TEditItem = {
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: number;
  brandId: number;
  itemSpecifications: {
    value: string;
    specificationId: string;
    itemId: string;
  };
};

export type TAddProduct = {
  itemName: string;
  description: string;
  quantity: 0;
  price: 0;
  score: 0;
  categoryId: 0;
  brandId: 0;
  imageUrl: string;
};
export type TUpdateProducts = {
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: number;
  brandId: number;
  imageUrl: string;
};
export type TMutateItem<T> = {
  item: T;
  id: string;
};

export type TProductsByCategory = {
  category: string;
  items: TProductOnsale[];
  brands: TCategoryOrBrand[];
};
export type TProductsByBrand = {
  brand: string;
  items: TProductOnsale[];
  categories: TCategoryOrBrand[];
};
