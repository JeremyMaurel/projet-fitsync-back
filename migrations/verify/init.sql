-- Verify fitsync:init on pg

BEGIN;

SELECT * FROM  "user" WHERE false;
SELECT * FROM  "weight" WHERE false;
SELECT * FROM "category" WHERE false;
SELECT * FROM "activity" WHERE false;
SELECT * FROM "favorite" WHERE false;
SELECT * FROM "weight_tracking" WHERE false;
SELECT * FROM "session" WHERE false;
SELECT * FROM "request" WHERE false;

ROLLBACK;
