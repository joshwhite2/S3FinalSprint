CREATE TABLE public."Cars"
(
    id serial,
    make character varying,
    model character varying,
    year integer,
    colour character varying,
    mileage bigint,
    country character varying,
	vin character varying,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Cars"
    OWNER to postgres;