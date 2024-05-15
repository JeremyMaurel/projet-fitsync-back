-- Revert fitsync:init from pg

BEGIN;

DROP TABLE "session";
DROP TABLE "favorite";
DROP TABLE "weight_tracking";
DROP TABLE "activity";
DROP TABLE "category";
DROP TABLE "weight";
DROP TABLE "request";
DROP TABLE "user";

COMMIT;
