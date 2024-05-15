-- Deploy fitsync:init to pg

BEGIN;

CREATE DOMAIN "email_format" AS VARCHAR(320) -- 64@255 RFC3696
    CHECK (VALUE ~* '^(?=.{1,64}@.{1,255}$)(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$');

-------------------------------------------------------------

CREATE DOMAIN user_type AS TEXT
    CHECK (VALUE IN ('user', 'admin'));

-------------------------------------------------------------

CREATE DOMAIN genders AS TEXT
    CHECK (VALUE IN ('male', 'female'));

-------------------------------------------------------------

    CREATE DOMAIN intensities AS TEXT
    CHECK (VALUE IN ('low', 'moderate', 'hight','very hight'));

-------------------------------------------------------------

CREATE TABLE "weight" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "value" DECIMAL(4,1) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ    
);

-------------------------------------------------------------

-- Boucle qui permet un seeding de la table weight à sa création
DO $$
DECLARE
    i DECIMAL := 0.0;
BEGIN
    WHILE i <= 999.9 LOOP
        INSERT INTO weight (value) VALUES (i);
        i := i + 0.1; 
    END LOOP;
END $$;

-------------------------------------------------------------

CREATE TABLE "user" (
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"mail" email_format NOT NULL UNIQUE, 
"pseudo" VARCHAR(24) NOT NULL UNIQUE, 
"role" user_type NOT NULL DEFAULT 'user',
"password" TEXT NOT NULL,
"birthdate" TIMESTAMPTZ,
"gender" genders,
"height" INTEGER,
"objective" INTEGER,
"created_at" TIMESTAMPTZ NOT NULL default(now()),
"updated_at" TIMESTAMPTZ
);

-------------------------------------------------------------

-- Fonction et trigger pour définir automatiquement un poids de 70 à la création de l'user
CREATE OR REPLACE FUNCTION create_weight_tracking_entry()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO weight_tracking (weight_id, user_id, date) VALUES (
        (SELECT id FROM weight WHERE value = 70.0),
        NEW.id,
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_weight_tracking_entry
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION create_weight_tracking_entry();

-------------------------------------------------------------

CREATE TABLE "request" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(256) NOT NULL,
    "intensity" intensities NOT NULL, 
    "met" DECIMAL(3,1) NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

-------------------------------------------------------------

CREATE TABLE "category"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

-------------------------------------------------------------

CREATE TABLE "activity"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(256) NOT NULL,
    "met" DECIMAL(3,1) NOT NULL,
    "category_id" INT NOT NULL REFERENCES "category"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ
);

-------------------------------------------------------------

CREATE TABLE "weight_tracking"(
    "weight_id" INT NOT NULL REFERENCES "weight"("id"),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "date" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ,
    CONSTRAINT "unique_weight_tracking" UNIQUE ("user_id", "date")
);

-------------------------------------------------------------

CREATE TABLE "favorite"(
    "activity_id" INT NOT NULL REFERENCES "activity"("id"),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ,
    CONSTRAINT "unique_favorite" UNIQUE("activity_id", "user_id")
);

-------------------------------------------------------------

CREATE TABLE "session"(
    "duration" INTEGER,
    "date" TIMESTAMPTZ,
    "comment" VARCHAR(1024),
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "activity_id" INT NOT NULL REFERENCES "activity"("id"),
    "created_at" TIMESTAMPTZ NOT NULL default(now()),
    "updated_at" TIMESTAMPTZ,
    CONSTRAINT "unique_session" UNIQUE("user_id", "date")
);

COMMIT;
