-- Verify fitsync:usermessage on pg

BEGIN;


SELECT * FROM  "message" WHERE false;

ROLLBACK;
