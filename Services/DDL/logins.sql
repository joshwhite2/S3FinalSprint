CREATE TABLE IF NOT EXISTS public."Logins"
(
    id serial NOT NULL,
    username character varying(32) COLLATE pg_catalog."default" NOT NULL,
    password character varying(256) COLLATE pg_catalog."default" NOT NULL,
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    uuid uuid NOT NULL,
    CONSTRAINT "Logins_pkey" PRIMARY KEY (id),
    CONSTRAINT unique_username UNIQUE (username)
)