"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/drizzle";
import { groceries } from "@/lib/db/schema";
import { GroceryKind } from "@/types/grocery";

export type GroceryActionState = {
  message: string;
};

function getKind(value: FormDataEntryValue | null): GroceryKind | null {
  return Object.values(GroceryKind).includes(value as GroceryKind)
    ? (value as GroceryKind)
    : null;
}

export async function addGrocery(
  _previousState: GroceryActionState,
  formData: FormData,
): Promise<GroceryActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const kind = getKind(formData.get("kind"));
  const priceValue = String(formData.get("price") ?? "").trim();
  const price = Number(priceValue);

  if (!name) {
    return { message: "Name is required" };
  }
  if (!kind) {
    return { message: "Grocery type is invalid" };
  }
  if (!priceValue || !Number.isFinite(price) || price < 0) {
    return { message: "Price must be a non-negative number" };
  }

  const expirationValue = String(formData.get("expirationDate") ?? "");
  const keepInTempValue = String(formData.get("keepInTemp") ?? "");
  const pictureValue = String(formData.get("picture") ?? "").trim();

  if (kind === GroceryKind.Perishable && !expirationValue) {
    return { message: "Best before date is required" };
  }

  await getDb()
    .insert(groceries)
    .values({
      name,
      kind,
      price,
      expirationDate:
        kind === GroceryKind.Perishable
          ? new Date(`${expirationValue}T00:00:00`)
          : null,
      keepInTemp:
        kind === GroceryKind.Perishable && keepInTempValue
          ? Number(keepInTempValue)
          : null,
      picture:
        kind === GroceryKind.Consumer && pictureValue ? pictureValue : null,
    });

  revalidatePath("/");
  return { message: "Grocery added" };
}

export async function toggleGroceryDone(formData: FormData) {
  const id = Number(formData.get("id"));
  const done = formData.get("done") === "true";

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid grocery id");
  }

  await getDb()
    .update(groceries)
    .set({ done: !done, updatedAt: new Date() })
    .where(eq(groceries.id, id));
  revalidatePath("/");
}

export async function deleteGrocery(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid grocery id");
  }

  await getDb().delete(groceries).where(eq(groceries.id, id));
  revalidatePath("/");
}
