--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: failures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failures (
    id integer NOT NULL,
    id_turbine integer,
    initial_time_of_failure timestamp without time zone,
    end_time_of_failure timestamp without time zone,
    failure_desc character varying
);


--
-- Name: failures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failures_id_seq OWNED BY public.failures.id;


--
-- Name: temperatures; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.temperatures (
    id integer NOT NULL,
    id_turbine integer,
    temp_value integer,
    temp_scale character varying,
    date_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: temperatures_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.temperatures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: temperatures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.temperatures_id_seq OWNED BY public.temperatures.id;


--
-- Name: turbines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.turbines (
    id integer NOT NULL,
    id_wind_farm integer,
    id_customer character varying(255),
    turbine_name character varying(255),
    turbine_status character varying(255),
    turbine_location character varying(255)
);


--
-- Name: turbines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.turbines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: turbines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.turbines_id_seq OWNED BY public.turbines.id;


--
-- Name: wind_farms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wind_farms (
    id integer NOT NULL,
    name character varying
);


--
-- Name: wind_farms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wind_farms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wind_farms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wind_farms_id_seq OWNED BY public.wind_farms.id;


--
-- Name: failures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failures ALTER COLUMN id SET DEFAULT nextval('public.failures_id_seq'::regclass);


--
-- Name: temperatures id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.temperatures ALTER COLUMN id SET DEFAULT nextval('public.temperatures_id_seq'::regclass);


--
-- Name: turbines id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.turbines ALTER COLUMN id SET DEFAULT nextval('public.turbines_id_seq'::regclass);


--
-- Name: wind_farms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wind_farms ALTER COLUMN id SET DEFAULT nextval('public.wind_farms_id_seq'::regclass);



--
-- Name: failures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failures_id_seq', 21, true);


--
-- Name: temperatures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.temperatures_id_seq', 22997, true);


--
-- Name: turbines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.turbines_id_seq', 4, true);


--
-- Name: wind_farms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wind_farms_id_seq', 2, true);


--
-- Name: failures failures_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failures
    ADD CONSTRAINT failures_pkey PRIMARY KEY (id);


--
-- Name: turbines turbines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.turbines
    ADD CONSTRAINT turbines_pkey PRIMARY KEY (id);


--
-- Name: wind_farms wind_farms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wind_farms
    ADD CONSTRAINT wind_farms_pkey PRIMARY KEY (id);


--
-- Name: failures failures_id_turbine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failures
    ADD CONSTRAINT failures_id_turbine_fkey FOREIGN KEY (id_turbine) REFERENCES public.turbines(id);


--
-- Name: temperatures fk_temperatures_turbines; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.temperatures
    ADD CONSTRAINT fk_temperatures_turbines FOREIGN KEY (id_turbine) REFERENCES public.turbines(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM cloudsqladmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: TABLE temperatures; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.temperatures TO PUBLIC;


--
-- PostgreSQL database dump complete
--

