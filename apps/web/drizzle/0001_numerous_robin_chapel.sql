CREATE INDEX IF NOT EXISTS "notes_created_by_idx" ON "drizz_note" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "drizz_note" USING btree ("title");