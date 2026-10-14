import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const groceryKind = pgEnum("grocery_kind", [
  "basic",
  "perishable",
  "consumer",
]);

export const groceries = pgTable("groceries", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  kind: groceryKind("kind").notNull(),
  price: real("price").notNull().default(0),
  done: boolean("done").notNull().default(false),
  expirationDate: date("expiration_date", { mode: "date" }),
  keepInTemp: integer("keep_in_temp"),
  picture: text("picture"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
