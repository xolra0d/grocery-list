import { Suspense } from "react";
import { GroceryList } from "@/app/_components/grocery-list";
import { NewGroceryInput } from "@/app/_components/new-grocery";
import { GetGroceries } from "@/lib/db";
import { connection } from "next/server";

import "./styles.css";

async function GroceryItems() {
  await connection();
  const groceries = await GetGroceries();
  return <GroceryList groceries={groceries} />;
}

export default function Home() {
  return (
    <>
      <NewGroceryInput />
      <Suspense fallback={<p>Loading groceries...</p>}>
        <GroceryItems />
      </Suspense>
    </>
  );
}
