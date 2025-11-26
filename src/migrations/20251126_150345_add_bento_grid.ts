import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_features_icon" AS ENUM('Zap', 'Shield', 'Rocket', 'Smartphone', 'Laptop', 'Palette', 'Globe', 'Lock', 'Settings', 'Users', 'FileText', 'Heart');
  CREATE TYPE "public"."enum_pages_blocks_bento_grid_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_bento_grid_cards_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_bento_grid_cards_icon" AS ENUM('Zap', 'Laptop', 'Smartphone', 'Rocket', 'Palette', 'Shield', 'Globe', 'Settings', 'Search', 'BarChart', 'Cloud', 'Bot');
  CREATE TYPE "public"."enum_pages_blocks_bento_grid_cards_span" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum__pages_v_version_hero_features_icon" AS ENUM('Zap', 'Shield', 'Rocket', 'Smartphone', 'Laptop', 'Palette', 'Globe', 'Lock', 'Settings', 'Users', 'FileText', 'Heart');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_cards_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_cards_icon" AS ENUM('Zap', 'Laptop', 'Smartphone', 'Rocket', 'Palette', 'Shield', 'Globe', 'Settings', 'Search', 'BarChart', 'Cloud', 'Bot');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_cards_span" AS ENUM('1', '2', '3');
  CREATE TABLE "pages_hero_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_hero_features_icon" DEFAULT 'Zap',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_bento_grid_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_bento_grid_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_bento_grid_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_bento_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_bento_grid_cards_icon" DEFAULT 'Zap',
  	"span" "enum_pages_blocks_bento_grid_cards_span" DEFAULT '1',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_bento_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nos Expertises',
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_version_hero_features_icon" DEFAULT 'Zap',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_grid_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_bento_grid_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_bento_grid_cards_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_bento_grid_cards_icon" DEFAULT 'Zap',
  	"span" "enum__pages_v_blocks_bento_grid_cards_span" DEFAULT '1',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nos Expertises',
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "pages" ADD COLUMN "hero_tagline" varchar DEFAULT '< DU CONCEPT AU PIXEL />';
  ALTER TABLE "pages" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_tagline" varchar DEFAULT '< DU CONCEPT AU PIXEL />';
  ALTER TABLE "_pages_v" ADD COLUMN "version_deleted_at" timestamp(3) with time zone;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "pages_hero_features" ADD CONSTRAINT "pages_hero_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_grid_cards_links" ADD CONSTRAINT "pages_blocks_bento_grid_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_grid_cards" ADD CONSTRAINT "pages_blocks_bento_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_grid" ADD CONSTRAINT "pages_blocks_bento_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_features" ADD CONSTRAINT "_pages_v_version_hero_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_grid_cards_links" ADD CONSTRAINT "_pages_v_blocks_bento_grid_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_grid_cards" ADD CONSTRAINT "_pages_v_blocks_bento_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_grid" ADD CONSTRAINT "_pages_v_blocks_bento_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_features_order_idx" ON "pages_hero_features" USING btree ("_order");
  CREATE INDEX "pages_hero_features_parent_id_idx" ON "pages_hero_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_grid_cards_links_order_idx" ON "pages_blocks_bento_grid_cards_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_grid_cards_links_parent_id_idx" ON "pages_blocks_bento_grid_cards_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_grid_cards_order_idx" ON "pages_blocks_bento_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_grid_cards_parent_id_idx" ON "pages_blocks_bento_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_grid_order_idx" ON "pages_blocks_bento_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_grid_parent_id_idx" ON "pages_blocks_bento_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_grid_path_idx" ON "pages_blocks_bento_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_version_hero_features_order_idx" ON "_pages_v_version_hero_features" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_features_parent_id_idx" ON "_pages_v_version_hero_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_cards_links_order_idx" ON "_pages_v_blocks_bento_grid_cards_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_grid_cards_links_parent_id_idx" ON "_pages_v_blocks_bento_grid_cards_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_cards_order_idx" ON "_pages_v_blocks_bento_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_grid_cards_parent_id_idx" ON "_pages_v_blocks_bento_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_order_idx" ON "_pages_v_blocks_bento_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_grid_parent_id_idx" ON "_pages_v_blocks_bento_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_path_idx" ON "_pages_v_blocks_bento_grid" USING btree ("_path");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "pages_deleted_at_idx" ON "pages" USING btree ("deleted_at");
  CREATE INDEX "_pages_v_version_version_deleted_at_idx" ON "_pages_v" USING btree ("version_deleted_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_bento_grid_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_bento_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_bento_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_bento_grid_cards_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_bento_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_bento_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_features" CASCADE;
  DROP TABLE "pages_blocks_bento_grid_cards_links" CASCADE;
  DROP TABLE "pages_blocks_bento_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_bento_grid" CASCADE;
  DROP TABLE "_pages_v_version_hero_features" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_grid_cards_links" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_grid" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP INDEX "pages_deleted_at_idx";
  DROP INDEX "_pages_v_version_version_deleted_at_idx";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "pages" DROP COLUMN "hero_tagline";
  ALTER TABLE "pages" DROP COLUMN "deleted_at";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_tagline";
  ALTER TABLE "_pages_v" DROP COLUMN "version_deleted_at";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "placeholder";
  DROP TYPE "public"."enum_pages_hero_features_icon";
  DROP TYPE "public"."enum_pages_blocks_bento_grid_cards_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_bento_grid_cards_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_bento_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_bento_grid_cards_span";
  DROP TYPE "public"."enum__pages_v_version_hero_features_icon";
  DROP TYPE "public"."enum__pages_v_blocks_bento_grid_cards_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_bento_grid_cards_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_bento_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_bento_grid_cards_span";`)
}
