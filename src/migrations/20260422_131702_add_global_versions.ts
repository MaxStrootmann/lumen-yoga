import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_offers_items_color" AS ENUM('yellow', 'magenta', 'purple', 'blue', 'green');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_header_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar,
  	"highlight_as_button" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_instagram_url" varchar,
  	"version_facebook_url" varchar,
  	"version_primary_c_t_a_label" varchar,
  	"version_primary_c_t_a_url" varchar,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_footer_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar,
  	"highlight_as_button" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_instagram_url" varchar,
  	"version_facebook_url" varchar,
  	"version_terms_url" varchar,
  	"version_credit_label" varchar,
  	"version_credit_url" varchar,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_title" varchar,
  	"version_meta_description" varchar,
  	"version_favicon_id" integer,
  	"version_social_image_id" integer,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_v_version_announcement_modal_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_offers_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"color" "enum__home_v_version_offers_items_color",
  	"title" varchar,
  	"time" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_kinderyoga_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_kinderyoga_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_announcement_modal_enabled" boolean DEFAULT true,
  	"version_announcement_modal_title" varchar,
  	"version_announcement_modal_intro" varchar,
  	"version_announcement_modal_schedule_title" varchar,
  	"version_announcement_modal_signup_title" varchar,
  	"version_announcement_modal_signup_text" varchar,
  	"version_announcement_modal_closing_text" varchar,
  	"version_announcement_modal_signature" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_title" varchar,
  	"version_hero_location_label" varchar,
  	"version_hero_location_url" varchar,
  	"version_hero_description" varchar,
  	"version_hero_primary_c_t_a_label" varchar,
  	"version_hero_primary_c_t_a_url" varchar,
  	"version_hero_secondary_c_t_a_label" varchar,
  	"version_hero_secondary_c_t_a_url" varchar,
  	"version_hero_quote" varchar,
  	"version_hero_accent_image_id" integer,
  	"version_intro_image_id" integer,
  	"version_intro_quote" varchar,
  	"version_offers_section_title" varchar,
  	"version_about_image_id" integer,
  	"version_about_heading" varchar,
  	"version_about_instagram_label" varchar,
  	"version_about_instagram_url" varchar,
  	"version_kinderyoga_logo_id" integer,
  	"version_kinderyoga_side_image_id" integer,
  	"version_kinderyoga_mobile_image_id" integer,
  	"version_kinderyoga_mobile_quote" varchar,
  	"version_reviews_heading" varchar,
  	"version_contact_heading" varchar,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_location_label" varchar,
  	"version_contact_location_url" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "header_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link" DROP NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "site_title" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "meta_description" DROP NOT NULL;
  ALTER TABLE "home_announcement_modal_schedule_items" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "color" DROP NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "time" DROP NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "button_label" DROP NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "button_url" DROP NOT NULL;
  ALTER TABLE "home_about_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "home_kinderyoga_sections_paragraphs" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "home_kinderyoga_sections" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_primary_c_t_a_label" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_primary_c_t_a_url" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_secondary_c_t_a_label" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_secondary_c_t_a_url" DROP NOT NULL;
  ALTER TABLE "header" ADD COLUMN "_status" "enum_header_status" DEFAULT 'draft';
  ALTER TABLE "footer" ADD COLUMN "_status" "enum_footer_status" DEFAULT 'draft';
  ALTER TABLE "site_settings" ADD COLUMN "_status" "enum_site_settings_status" DEFAULT 'draft';
  ALTER TABLE "home" ADD COLUMN "_status" "enum_home_status" DEFAULT 'draft';
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_items" ADD CONSTRAINT "_footer_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_favicon_id_media_id_fk" FOREIGN KEY ("version_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_social_image_id_media_id_fk" FOREIGN KEY ("version_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_announcement_modal_schedule_items" ADD CONSTRAINT "_home_v_version_announcement_modal_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_offers_items" ADD CONSTRAINT "_home_v_version_offers_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_about_paragraphs" ADD CONSTRAINT "_home_v_version_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_kinderyoga_sections_paragraphs" ADD CONSTRAINT "_home_v_version_kinderyoga_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_kinderyoga_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_kinderyoga_sections" ADD CONSTRAINT "_home_v_version_kinderyoga_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_accent_image_id_media_id_fk" FOREIGN KEY ("version_hero_accent_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_intro_image_id_media_id_fk" FOREIGN KEY ("version_intro_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_about_image_id_media_id_fk" FOREIGN KEY ("version_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_kinderyoga_logo_id_media_id_fk" FOREIGN KEY ("version_kinderyoga_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_kinderyoga_side_image_id_media_id_fk" FOREIGN KEY ("version_kinderyoga_side_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_kinderyoga_mobile_image_id_media_id_fk" FOREIGN KEY ("version_kinderyoga_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_version_logo_idx" ON "_header_v" USING btree ("version_logo_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "_header_v_autosave_idx" ON "_header_v" USING btree ("autosave");
  CREATE INDEX "_footer_v_version_nav_items_order_idx" ON "_footer_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_items_parent_id_idx" ON "_footer_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version_logo_idx" ON "_footer_v" USING btree ("version_logo_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");
  CREATE INDEX "_site_settings_v_version_version_favicon_idx" ON "_site_settings_v" USING btree ("version_favicon_id");
  CREATE INDEX "_site_settings_v_version_version_social_image_idx" ON "_site_settings_v" USING btree ("version_social_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_autosave_idx" ON "_site_settings_v" USING btree ("autosave");
  CREATE INDEX "_home_v_version_announcement_modal_schedule_items_order_idx" ON "_home_v_version_announcement_modal_schedule_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_announcement_modal_schedule_items_parent_id_idx" ON "_home_v_version_announcement_modal_schedule_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_offers_items_order_idx" ON "_home_v_version_offers_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_offers_items_parent_id_idx" ON "_home_v_version_offers_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_about_paragraphs_order_idx" ON "_home_v_version_about_paragraphs" USING btree ("_order");
  CREATE INDEX "_home_v_version_about_paragraphs_parent_id_idx" ON "_home_v_version_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_kinderyoga_sections_paragraphs_order_idx" ON "_home_v_version_kinderyoga_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "_home_v_version_kinderyoga_sections_paragraphs_parent_id_idx" ON "_home_v_version_kinderyoga_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_kinderyoga_sections_order_idx" ON "_home_v_version_kinderyoga_sections" USING btree ("_order");
  CREATE INDEX "_home_v_version_kinderyoga_sections_parent_id_idx" ON "_home_v_version_kinderyoga_sections" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_version_hero_version_hero_accent_image_idx" ON "_home_v" USING btree ("version_hero_accent_image_id");
  CREATE INDEX "_home_v_version_intro_version_intro_image_idx" ON "_home_v" USING btree ("version_intro_image_id");
  CREATE INDEX "_home_v_version_about_version_about_image_idx" ON "_home_v" USING btree ("version_about_image_id");
  CREATE INDEX "_home_v_version_kinderyoga_version_kinderyoga_logo_idx" ON "_home_v" USING btree ("version_kinderyoga_logo_id");
  CREATE INDEX "_home_v_version_kinderyoga_version_kinderyoga_side_image_idx" ON "_home_v" USING btree ("version_kinderyoga_side_image_id");
  CREATE INDEX "_home_v_version_kinderyoga_version_kinderyoga_mobile_ima_idx" ON "_home_v" USING btree ("version_kinderyoga_mobile_image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_header_v_version_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_announcement_modal_schedule_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_offers_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_about_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_kinderyoga_sections_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_version_kinderyoga_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_footer_v_version_nav_items" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_home_v_version_announcement_modal_schedule_items" CASCADE;
  DROP TABLE "_home_v_version_offers_items" CASCADE;
  DROP TABLE "_home_v_version_about_paragraphs" CASCADE;
  DROP TABLE "_home_v_version_kinderyoga_sections_paragraphs" CASCADE;
  DROP TABLE "_home_v_version_kinderyoga_sections" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP INDEX "header__status_idx";
  DROP INDEX "footer__status_idx";
  DROP INDEX "site_settings__status_idx";
  DROP INDEX "home__status_idx";
  ALTER TABLE "header_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "site_title" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "meta_description" SET NOT NULL;
  ALTER TABLE "home_announcement_modal_schedule_items" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "color" SET NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "time" SET NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "button_label" SET NOT NULL;
  ALTER TABLE "home_offers_items" ALTER COLUMN "button_url" SET NOT NULL;
  ALTER TABLE "home_about_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "home_kinderyoga_sections_paragraphs" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "home_kinderyoga_sections" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_primary_c_t_a_label" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_primary_c_t_a_url" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_secondary_c_t_a_label" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "hero_secondary_c_t_a_url" SET NOT NULL;
  ALTER TABLE "header" DROP COLUMN "_status";
  ALTER TABLE "footer" DROP COLUMN "_status";
  ALTER TABLE "site_settings" DROP COLUMN "_status";
  ALTER TABLE "home" DROP COLUMN "_status";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_offers_items_color";
  DROP TYPE "public"."enum__home_v_version_status";`)
}
