import { TAddBrand } from "./Types/BrandTypes";
import { TCartItem, TCartItemUpdate, TCartUpdate } from "./Types/CartTypes";
import {
  TItem,
  TItemForm,
  TItems,
  TMutateItem,
  TProductOnsale,
  TUpdateProducts,
} from "./Types/ProductTypes";
import {
  TAddSpecs,
  TSpecification,
  TUseAddSpecToItem,
} from "./Types/SpecificationTypes";
import { TGenericUpdate, TIndexing } from "./Types/Types";

export function FromItemToCartItem(item: TItem): TCartItem {
  return {
    itemId: item.id,
    itemName: item.itemName,
    quantity: item.quantity,
    subTotal: item.price,
    imageUrl: item.imageUrl,
    price: item.price,
  };
}

export function FromCartItemToCartItemUpdate(item: TCartItem): TCartItemUpdate {
  return {
    quantity: item.quantity,
    itemId: item.itemId,
  };
}

export function FromCartItemsToCartUpdate(items: TCartItem[]): TCartUpdate {
  return {
    cartItems: items.map((item) => FromCartItemToCartItemUpdate(item)),
  };
}

export function FromItemsToItemForm(item: TItem): TItemForm {
  return {
    itemName: item.itemName,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
    categoryId: item.itemCategory.id,
    brandId: item.itemBrand.id,
    specifications: item.itemSpecifications.map((specs) => {
      return { specificationId: specs.id, value: specs.value };
    }),
    imageUrl: item.imageUrl,
  };
}

export function FromItemFormToUseAddSpecToItem(
  itemForm: TItemForm,
  itemId: string
): TUseAddSpecToItem {
  return {
    specs: itemForm.specifications!,
    itemId: itemId,
  };
}

export function FromItemFormToUpdateItem(itemForm: TItemForm): TUpdateProducts {
  return {
    itemName: itemForm.itemName,
    description: itemForm.description,
    quantity: itemForm.quantity,
    price: itemForm.price,
    categoryId: itemForm.categoryId,
    brandId: itemForm.brandId,
    imageUrl: itemForm.imageUrl,
  };
}

export function FromUpdateItemToMutateUpdateItem(
  itemForm: TItemForm,
  itemId: string
): TMutateItem<TUpdateProducts> {
  return {
    item: FromItemFormToUpdateItem(itemForm),
    id: itemId,
  };
}

export function FromTIndexToBrand(formData: TIndexing): TAddBrand {
  return {
    brandName: formData["brandName"],
  };
}
export function FromTIndexToSpec(formData: TIndexing): TAddSpecs {
  return {
    spec: formData["spec"],
  };
}
export function FromTIndexToGenericUpdate(formData: TIndexing): TGenericUpdate {
  return {
    name: formData["name"],
  };
}

export function FromTItemFormToTSpecification(
  formData: TItemForm
): TSpecification[] {
  const specs: TSpecification[] = formData.specifications!.map((spec) => {
    return {
      specificationId: spec.specificationId,
      value: spec.value,
    };
  });
  return specs;
}

export function FromTItemsToTProductOnSale(item: TItems): TProductOnsale {
  return {
    id: item.id,
    itemName: item.itemName,
    imageUrl: item.imageUrl,
    price: item.price,
    score: item.score,
    categoryName: item.itemCategory.categoryName,
  };
}
