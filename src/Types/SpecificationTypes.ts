export type TSpecification = {
  specificationId: number;
  value: string;
};
export type TSpecs = {
  id: number;
  spec: string;
}[];

export type TItemSpecs = {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  price: number;
  itemSpecification: {
    id: number;
    spec: string;
    value: string;
  };
};
export type TUseAddSpecToItem = {
  specs: TSpecification[];
  itemId: string;
};

export type TAddSpecs = {
  spec: string;
};
