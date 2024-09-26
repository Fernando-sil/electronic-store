export type TFetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export type TResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
export type TResponseWithCount<T> = {
  count: number;
  data: T;
  success: boolean;
  message: string;
};

export type TIcons = {
  icon: JSX.Element;
  label: string;
  to: string;
}[];

export type TCategoryOrBrand = {
  id: number;
  name: string;
  isPopular?: boolean;
  imageUrl?: string;
};

export type TIndexing = {
  [key: string]: string;
};

export type TGenericUpdate = {
  name: string;
  isPopular?: boolean;
};
export type TGenericIdUpdate = {
  id: number;
};

export type TGenericGetMultiple = {
  id: number;
  name: string;
  imageUrl?: string;
};

export type TGenericForm = {
  id: number;
  name: TGenericUpdate;
  field: string;
};

export type TGenericFormAddMultiple<T> = {
  name: T[];
  field: string;
};

export type TSubmissionMethod = "create" | "update" | "delete";
export type TSubmissionStatus = "success" | "fail";
