import "server-only";

import { desc } from "drizzle-orm";
import { getDb } from "./db/drizzle";
import { groceries } from "./db/schema";
import { Grocery, GroceryKind } from "@/types/grocery";

export async function GetGroceries(): Promise<Grocery[]> {
  const rows = await getDb()
    .select()
    .from(groceries)
    .orderBy(desc(groceries.createdAt));

  return rows.map((grocery) => {
    switch (grocery.kind) {
      case GroceryKind.Basic:
        return {
          id: grocery.id,
          name: grocery.name,
          kind: GroceryKind.Basic,
          price: grocery.price,
          done: grocery.done,
          createdAt: grocery.createdAt,
        };
      case GroceryKind.Perishable:
        return {
          id: grocery.id,
          name: grocery.name,
          kind: GroceryKind.Perishable,
          price: grocery.price,
          done: grocery.done,
          createdAt: grocery.createdAt,
          expirationDate: grocery.expirationDate as Date,
          keepInTemp: grocery.keepInTemp,
        };
      case GroceryKind.Consumer:
        return {
          id: grocery.id,
          name: grocery.name,
          kind: GroceryKind.Consumer,
          price: grocery.price,
          done: grocery.done,
          createdAt: grocery.createdAt,
          picture: grocery.picture,
        };
      default:
        throw new Error(`Unknown grocery type: ${grocery.kind}`);
    }
  });
}
