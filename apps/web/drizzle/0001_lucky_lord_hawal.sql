CREATE TABLE IF NOT EXISTS "drizz_photo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"link" varchar(256) NOT NULL,
	"type" varchar(256) NOT NULL,
	"size" integer NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizz_photo" ADD CONSTRAINT "drizz_photo_created_by_drizz_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."drizz_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "photos_created_by_idx" ON "drizz_photo" USING btree ("created_by");