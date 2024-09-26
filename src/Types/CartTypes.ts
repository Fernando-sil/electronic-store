export type TCartItem = {
  itemId: string;
  itemName: string;
  quantity: number;
  subTotal: number;
  imageUrl: string;
  price: number;
};

export type TCart = {
  dateCreated: Date;
  isPurchasePaid: boolean;
  datePurchasePaid: Date;
  userName: string;
  cartItems: TCartItem[];
  total: number;
};
export type TCartItemUpdate = {
  quantity: number;
  itemId: string;
};

export type TCartUpdate = {
  cartItems: TCartItemUpdate[];
};
