export enum GroceryKind {
  Basic = "basic",
  Perishable = "perishable",
  Consumer = "consumer",
}

type baseGrocery = {
  id: number;
  name: string;
  kind: GroceryKind;
  price: number;
  done: boolean;
  createdAt: Date;
};

export type BasicGrocery = baseGrocery & { kind: GroceryKind.Basic };
export type PerishableGrocery = baseGrocery & {
  kind: GroceryKind.Perishable;
  expirationDate: Date;
  keepInTemp: number | null;
};
export type ConsumerGrocery = baseGrocery & {
  kind: GroceryKind.Consumer;
  picture: string | null;
};
export type Grocery = BasicGrocery | PerishableGrocery | ConsumerGrocery;

export type BasicNewGrocery = Omit<BasicGrocery, "id">;
export type PerishableNewGrocery = Omit<PerishableGrocery, "id">;
export type ConsumerNewGrocery = Omit<ConsumerGrocery, "id">;
export type NewGrocery =
  | BasicNewGrocery
  | PerishableNewGrocery
  | ConsumerNewGrocery;
