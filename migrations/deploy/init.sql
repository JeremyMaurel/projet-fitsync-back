-- Deploy fitsync:init to pg

BEGIN;

CREATE TABLE "user" (
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"mail" VARCHAR(320), -- DOMAINE
"pseudo" VARCHAR(24), 
"role" TEXT, -- DOMAINE
"password" TEXT,
"birthdate" TIMESTAMPTZ,
"gender" TEXT, --DOMAINE
"height" INTEGER,
"objective" INTEGER,
"created_at" TIMESTAMPTZ NOT NULL default(now()),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE "request" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(256),
    "intensity" TEXT, -- DOMAINE
    "met" DECIMAL(3,1),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "weight" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" DECIMAL(4,1),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ    
);

CREATE TABLE "category"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "activity"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(256),
    "met" DECIMAL(3,1),
    "category_id" INT NOT NULL REFERENCES "category"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "weight_tracking"(
    "weight_id" INT NOT NULL REFERENCES "weight"("id"),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "date" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "favorite"(
    "activity_id" INT NOT NULL REFERENCES "activity"("id"),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "session"(
    "duration" INTEGER,
    "date" TIMESTAMPTZ,
    "comment" VARCHAR(1024),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "activity_id" INT NOT NULL REFERENCES "activity"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
