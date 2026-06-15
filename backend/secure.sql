
CREATE TABLE IF NOT EXISTS public.commissariats
(
    id_commissariat SERIAL PRIMARY KEY,
    nom character varying(100) NOT NULL,
    adresse text,
    telephone character varying(20)
);


CREATE TABLE IF NOT EXISTS public.grades
(
    id_grade SERIAL PRIMARY KEY,
    libelle character varying(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS public.workspaces
(
    id_workspace SERIAL PRIMARY KEY,
    nom character varying(100) NOT NULL,
    description text,
    date_creation timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_commissariat integer REFERENCES public.commissariats(id_commissariat),
    type_brigade character varying
);


CREATE TABLE IF NOT EXISTS public.users
(
    id_user SERIAL PRIMARY KEY,
    nom character varying(100) COLLATE pg_catalog."default" NOT NULL,
    prenom character varying(100) COLLATE pg_catalog."default",
    email character varying(150) COLLATE pg_catalog."default",
    mot_de_passe character varying(255) COLLATE pg_catalog."default",
    role character varying(30) COLLATE pg_catalog."default",
    matricule character varying COLLATE pg_catalog."default",
    telephone character varying COLLATE pg_catalog."default",
    id_grade integer,
    id_workspace integer,
    id_commissariat integer,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_id_commissariat_fkey FOREIGN KEY (id_commissariat) REFERENCES public.commissariats (id_commissariat),
    CONSTRAINT users_id_grade_fkey FOREIGN KEY (id_grade) REFERENCES public.grades (id_grade),
    CONSTRAINT users_id_workspace_fkey FOREIGN KEY (id_workspace) REFERENCES public.workspaces (id_workspace)
);

CREATE TABLE IF NOT EXISTS public.actes (
    id_acte SERIAL PRIMARY KEY,
    numero_acte VARCHAR(50) UNIQUE,
    type_acte VARCHAR(30) NOT NULL,
    description TEXT,
    date_faits DATE,
    heure_faits TIME,
    quartier VARCHAR(100),
    urgence VARCHAR(20),
    statut VARCHAR(50),
    id_user INTEGER REFERENCES users(id_user),
    id_workspace INTEGER REFERENCES workspaces(id_workspace)
);

CREATE TABLE plaintes (
    id_plainte SERIAL PRIMARY KEY,
    qualification_penale VARCHAR(200),
   date_depot DATE,
  description TEXT,
  nom_victime VARCHAR,
  nom_suspect VARCHAR (50),
  gravite_plainte VARCHAR,
    id_acte INTEGER UNIQUE REFERENCES actes(id_acte)
);





-- DROP TABLE IF EXISTS public.garde_a_vue;

CREATE TABLE IF NOT EXISTS public.garde_a_vue
(
    id_garde_vue integer NOT NULL DEFAULT nextval('garde_a_vue_id_garde_vue_seq'::regclass),
    date_debut date,
    date_fin date,
    cellule character varying COLLATE pg_catalog."default",
    id_plainte integer NOT NULL DEFAULT nextval('garde_a_vue_id_plainte_seq'::regclass),
    CONSTRAINT garde_a_vue_pkey PRIMARY KEY (id_garde_vue),
    CONSTRAINT garde_a_vue_id_plainte_fkey FOREIGN KEY (id_plainte)
        REFERENCES public.plaintes (id_plainte) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.garde_a_vue
    OWNER to postgres;
	


	



CREATE TABLE actes (
    id_acte SERIAL PRIMARY KEY,
    numero_acte VARCHAR(50) UNIQUE,
    type_acte VARCHAR(30) NOT NULL,
    description TEXT,
    date_faits DATE,
    heure_faits TIME,
    quartier VARCHAR(100),
    urgence VARCHAR(20),
    statut VARCHAR(50),
    id_user INTEGER REFERENCES users(id_user),
    id_workspace INTEGER REFERENCES workspaces(id_workspace)
);



CREATE TABLE main_courantes (
    id_maincourante SERIAL PRIMARY KEY,
    date_debut DATE,
    quatier VARCHAR,
    id_acte INTEGER UNIQUE REFERENCES actes(id_acte)
);
    




CREATE TABLE proces_verbaux (
    id_pro SERIAL PRIMARY KEY,
	date_audition DATE,
	nom_entendu VARCHAR,
    type_audition VARCHAR(100),
	id_user INTEGER UNIQUE REFERENCES users(id_user),

    id_acte INTEGER UNIQUE REFERENCES actes(id_acte)
);



CREATE TABLE audit_logs (
    id_log SERIAL PRIMARY KEY,
    type_action VARCHAR(100),
    ancienne_valeur TEXT,
    nouvelle_valeur TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_user INTEGER REFERENCES users(id_user)

	
);



 

-- DROP TABLE IF EXISTS public."enquête ";

CREATE TABLE IF NOT EXISTS public."enquête "
(
    id_enquete integer NOT NULL DEFAULT nextval('"enquête _id_enquete_seq"'::regclass),
    date_cloture date,
    date_ouverture date,
    "verdict " text COLLATE pg_catalog."default",
    CONSTRAINT "enquête _pkey" PRIMARY KEY (id_enquete)
)
