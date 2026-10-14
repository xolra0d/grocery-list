import { deleteGrocery, toggleGroceryDone } from "@/lib/db/actions";
import { Grocery, GroceryKind } from "@/types/grocery";

import "./shared.css";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function GroceryItem({ item }: { item: Grocery }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-black/10 py-3">
      <div>
        <p className={item.done ? "line-through opacity-60" : undefined}>
          {item.name}
        </p>
        <p className="text-sm opacity-60">
          {item.kind} - Added {formatDate(item.createdAt)}
        </p>
        <p className="text-sm">{item.price.toFixed(2)}€</p>
        {item.kind === GroceryKind.Perishable && (
          <p className="text-sm opacity-60">
            Best before: {formatDate(item.expirationDate)}
            {item.keepInTemp !== null && ` - Keep at: ${item.keepInTemp} °C`}
          </p>
        )}
        {item.kind === GroceryKind.Consumer && item.picture && (
          <p className="text-sm opacity-60">
            <a
              href={item.picture}
              target="_blank"
              rel="noreferrer"
              className="underline italic"
            >
              Product image
            </a>
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <form action={toggleGroceryDone}>
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="done" value={String(item.done)} />
          <button type="submit" className="button">
            {item.done ? "Undo" : "Done"}
          </button>
        </form>
        <form action={deleteGrocery}>
          <input type="hidden" name="id" value={item.id} />
          <button type="submit" className="button">
            Remove
          </button>
        </form>
      </div>
    </li>
  );
}
