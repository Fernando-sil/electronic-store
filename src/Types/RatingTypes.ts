export type TAddRating = {
  rate: number;
  comment: string;
  itemId: string;
};

export type TRatingResponse = {
  id: string;
  rate: number;
  comment: string;
  userName: string;
  itemName: string;
};

export type TRating = {
  rate: number;
  comment: string;
};
