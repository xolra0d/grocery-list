"use client";

import { useState } from "react";
import { Grocery } from "@/types/grocery";
import { GroceryItem } from "./grocery-item";

import "./grocery-list.css";

export function GroceryList({ groceries }: { groceries: Grocery[] }) {
  const [hideDone, setHideDone] = useState(false);
  const visibleGroceries = hideDone
    ? groceries.filter((grocery) => !grocery.done)
    : groceries;

  return (
    <>
      <label className="hide-done-control">
        <input
          className="hide-done-switch"
          type="checkbox"
          checked={hideDone}
          onChange={(event) => setHideDone(event.target.checked)}
        />
        <span className="hide-done-track" aria-hidden="true" />
        Hide done items
      </label>
      <ul>
        {visibleGroceries.map((grocery) => (
          <GroceryItem key={grocery.id} item={grocery} />
        ))}
      </ul>
      <p className="text-right font-semibold">
        Total:
        {visibleGroceries
          .reduce((total, grocery) => total + grocery.price, 0)
          .toFixed(2)}
        €
      </p>
    </>
  );
}
