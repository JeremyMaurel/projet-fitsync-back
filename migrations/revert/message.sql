-- Revert fitsync:usermessage from pg

BEGIN;

DROP TABLE "message";

COMMIT;
