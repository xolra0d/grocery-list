CREATE TYPE "public"."grocery_kind" AS ENUM('basic', 'perishable', 'consumer');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groceries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "groceries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"kind" "grocery_kind" NOT NULL,
	"price" real DEFAULT 0 NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"expiration_date" date,
	"keep_in_temp" integer,
	"picture" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
