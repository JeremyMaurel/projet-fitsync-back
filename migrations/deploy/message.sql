-- Deploy fitsync:usermessage to pg

BEGIN;

CREATE TABLE "message" (
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"mail" email_format NOT NULL,
"content" VARCHAR(2056) NOT NULL,
"is_done" BOOLEAN NOT NULL DEFAULT false,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT(now()),
"updated_at" TIMESTAMPTZ
);

COMMIT;
