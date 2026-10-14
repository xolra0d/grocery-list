"use client";

import { useActionState, useState } from "react";
import { addGrocery } from "@/lib/db/actions";
import { GroceryKind } from "@/types/grocery";

import "./new-grocery.css";
import "./shared.css";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function NewGroceryInput() {
  const [kind, setKind] = useState<GroceryKind>(GroceryKind.Basic);
  const [state, action, pending] = useActionState(addGrocery, { message: "" });

  return (
    <section>
      <form action={action} className="flex flex-col gap-4 border-1 p-1">
        <div className="radio-wrapper">
          <div className="radio-inputs">
            {Object.values(GroceryKind).map((value) => (
              <label key={value}>
                <input
                  name="kind"
                  type="radio"
                  value={value}
                  checked={kind === value}
                  onChange={() => setKind(value)}
                  required
                />
                <span className="name">{capitalize(value)}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="grocery-field">
          <span>Name: </span>
          <input name="name" placeholder="Enter name here" required />
        </label>

        <label className="grocery-field">
          <span>Price: </span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00€"
            required
            className="w-[100px]"
          />
          <span> €</span>
        </label>

        {kind === GroceryKind.Perishable && (
          <>
            <label className="grocery-field">
              <span>Best before: </span>
              <input name="expirationDate" type="date" required />
            </label>
            <label className="grocery-field">
              <span>Should keep at: </span>
              <input
                name="keepInTemp"
                type="number"
                className="w-[100px]"
                placeholder="0°C"
              />
              <span> °C</span>
            </label>
          </>
        )}

        {kind === GroceryKind.Consumer && (
          <label className="grocery-field">
            <span>Image for product: </span>
            <input name="picture" type="url" placeholder="URL" />
          </label>
        )}

        <button type="submit" className="button self-start" disabled={pending}>
          {pending ? "Adding..." : "Add"}
        </button>
        {state.message && <p role="status">{state.message}</p>}
      </form>
    </section>
  );
}
