-- Revert fitsync:init from pg

BEGIN;

DROP INDEX idx_session_date;
DROP INDEX idx_activity_name;
DROP TRIGGER trigger_create_weight_tracking_entry ON "user";
DROP FUNCTION create_weight_tracking_entry();
DROP TABLE "session";
DROP TABLE "favorite";
DROP TABLE "weight_tracking";
DROP TABLE "activity";
DROP TABLE "category";
DROP TABLE "weight";
DROP TABLE "request";
DROP TABLE "user";
DROP DOMAIN "email_format";
DROP DOMAIN "user_type";
DROP DOMAIN "genders";
DROP DOMAIN "intensities";

COMMIT;
