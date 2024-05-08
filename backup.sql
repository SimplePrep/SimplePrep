--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9
-- Dumped by pg_dump version 14.9

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

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO devuser;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO devuser;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO devuser;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO devuser;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO devuser;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO devuser;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO devuser;

--
-- Name: core2_section; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core2_section (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    content text NOT NULL,
    module_id bigint NOT NULL,
    slug character varying(50) NOT NULL
);


ALTER TABLE public.core2_section OWNER TO devuser;

--
-- Name: core2_section_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core2_section_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core2_section_id_seq OWNER TO devuser;

--
-- Name: core2_section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core2_section_id_seq OWNED BY public.core2_section.id;


--
-- Name: core2_tutorial; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core2_tutorial (
    id bigint NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.core2_tutorial OWNER TO devuser;

--
-- Name: core2_tutorialmodule_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core2_tutorialmodule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core2_tutorialmodule_id_seq OWNER TO devuser;

--
-- Name: core2_tutorialmodule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core2_tutorialmodule_id_seq OWNED BY public.core2_tutorial.id;


--
-- Name: core_comment; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_comment (
    id bigint NOT NULL,
    text text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    test_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.core_comment OWNER TO devuser;

--
-- Name: core_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_comment_id_seq OWNER TO devuser;

--
-- Name: core_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_comment_id_seq OWNED BY public.core_comment.id;


--
-- Name: core_question; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_question (
    id bigint NOT NULL,
    context text NOT NULL,
    query text NOT NULL,
    graph_img character varying(100),
    "option_A" text NOT NULL,
    "option_B" text NOT NULL,
    "option_C" text NOT NULL,
    "option_D" text NOT NULL,
    correct_answer character varying(1) NOT NULL,
    likes integer NOT NULL,
    dislikes integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    test_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    model character varying(255) NOT NULL,
    section character varying(255) NOT NULL
);


ALTER TABLE public.core_question OWNER TO devuser;

--
-- Name: core_question_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_question_id_seq OWNER TO devuser;

--
-- Name: core_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_question_id_seq OWNED BY public.core_question.id;


--
-- Name: core_test; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_test (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.core_test OWNER TO devuser;

--
-- Name: core_test_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_test_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_test_id_seq OWNER TO devuser;

--
-- Name: core_test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_test_id_seq OWNED BY public.core_test.id;


--
-- Name: core_testmodel; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_testmodel (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    num_questions integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    test_id bigint
);


ALTER TABLE public.core_testmodel OWNER TO devuser;

--
-- Name: core_testmodel_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_testmodel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_testmodel_id_seq OWNER TO devuser;

--
-- Name: core_testmodel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_testmodel_id_seq OWNED BY public.core_testmodel.id;


--
-- Name: core_testresult; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_testresult (
    id bigint NOT NULL,
    score integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    test_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.core_testresult OWNER TO devuser;

--
-- Name: core_testresult_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_testresult_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_testresult_id_seq OWNER TO devuser;

--
-- Name: core_testresult_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_testresult_id_seq OWNED BY public.core_testresult.id;


--
-- Name: core_useranswer; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.core_useranswer (
    id bigint NOT NULL,
    selected_option character varying(1) NOT NULL,
    question_id bigint NOT NULL,
    test_result_id bigint NOT NULL
);


ALTER TABLE public.core_useranswer OWNER TO devuser;

--
-- Name: core_useranswer_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.core_useranswer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_useranswer_id_seq OWNER TO devuser;

--
-- Name: core_useranswer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.core_useranswer_id_seq OWNED BY public.core_useranswer.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO devuser;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO devuser;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO devuser;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO devuser;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO devuser;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO devuser;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO devuser;

--
-- Name: token_blacklist_blacklistedtoken; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.token_blacklist_blacklistedtoken (
    id bigint NOT NULL,
    blacklisted_at timestamp with time zone NOT NULL,
    token_id bigint NOT NULL
);


ALTER TABLE public.token_blacklist_blacklistedtoken OWNER TO devuser;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.token_blacklist_blacklistedtoken_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_blacklistedtoken_id_seq OWNER TO devuser;

--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.token_blacklist_blacklistedtoken_id_seq OWNED BY public.token_blacklist_blacklistedtoken.id;


--
-- Name: token_blacklist_outstandingtoken; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.token_blacklist_outstandingtoken (
    id bigint NOT NULL,
    token text NOT NULL,
    created_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    user_id bigint,
    jti character varying(255) NOT NULL
);


ALTER TABLE public.token_blacklist_outstandingtoken OWNER TO devuser;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.token_blacklist_outstandingtoken_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_blacklist_outstandingtoken_id_seq OWNER TO devuser;

--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.token_blacklist_outstandingtoken_id_seq OWNED BY public.token_blacklist_outstandingtoken.id;


--
-- Name: user_user; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.user_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    subscription_type character varying(10) NOT NULL
);


ALTER TABLE public.user_user OWNER TO devuser;

--
-- Name: user_user_groups; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.user_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.user_user_groups OWNER TO devuser;

--
-- Name: user_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.user_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_groups_id_seq OWNER TO devuser;

--
-- Name: user_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.user_user_groups_id_seq OWNED BY public.user_user_groups.id;


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO devuser;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.user_user.id;


--
-- Name: user_user_user_permissions; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.user_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.user_user_user_permissions OWNER TO devuser;

--
-- Name: user_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.user_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_user_permissions_id_seq OWNER TO devuser;

--
-- Name: user_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.user_user_user_permissions_id_seq OWNED BY public.user_user_user_permissions.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: core2_section id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core2_section ALTER COLUMN id SET DEFAULT nextval('public.core2_section_id_seq'::regclass);


--
-- Name: core2_tutorial id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core2_tutorial ALTER COLUMN id SET DEFAULT nextval('public.core2_tutorialmodule_id_seq'::regclass);


--
-- Name: core_comment id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_comment ALTER COLUMN id SET DEFAULT nextval('public.core_comment_id_seq'::regclass);


--
-- Name: core_question id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_question ALTER COLUMN id SET DEFAULT nextval('public.core_question_id_seq'::regclass);


--
-- Name: core_test id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_test ALTER COLUMN id SET DEFAULT nextval('public.core_test_id_seq'::regclass);


--
-- Name: core_testmodel id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testmodel ALTER COLUMN id SET DEFAULT nextval('public.core_testmodel_id_seq'::regclass);


--
-- Name: core_testresult id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testresult ALTER COLUMN id SET DEFAULT nextval('public.core_testresult_id_seq'::regclass);


--
-- Name: core_useranswer id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_useranswer ALTER COLUMN id SET DEFAULT nextval('public.core_useranswer_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: token_blacklist_blacklistedtoken id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_blacklistedtoken_id_seq'::regclass);


--
-- Name: token_blacklist_outstandingtoken id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken ALTER COLUMN id SET DEFAULT nextval('public.token_blacklist_outstandingtoken_id_seq'::regclass);


--
-- Name: user_user id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user ALTER COLUMN id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Name: user_user_groups id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_groups ALTER COLUMN id SET DEFAULT nextval('public.user_user_groups_id_seq'::regclass);


--
-- Name: user_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.user_user_user_permissions_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.auth_group (id, name) FROM stdin;
1	Admin
2	User
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	1	11
12	1	12
13	1	13
14	1	14
15	1	15
16	1	16
17	1	17
18	1	18
19	1	19
20	1	20
21	1	21
22	1	22
23	1	23
24	1	24
25	1	25
26	1	26
27	1	27
28	1	28
29	1	29
30	1	30
31	1	31
32	1	32
33	1	33
34	1	34
35	1	35
36	1	36
37	1	37
38	1	38
39	1	39
40	1	40
41	1	41
42	1	42
43	1	43
44	1	44
45	1	45
46	1	46
47	1	47
48	1	48
49	1	49
50	1	50
51	1	51
52	1	52
53	2	32
54	2	36
55	2	40
56	2	44
57	2	45
58	2	46
59	2	47
60	2	48
61	2	49
62	2	50
63	2	51
64	2	52
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add Token	6	add_token
22	Can change Token	6	change_token
23	Can delete Token	6	delete_token
24	Can view Token	6	view_token
25	Can add Token	7	add_tokenproxy
26	Can change Token	7	change_tokenproxy
27	Can delete Token	7	delete_tokenproxy
28	Can view Token	7	view_tokenproxy
29	Can add user	8	add_user
30	Can change user	8	change_user
31	Can delete user	8	delete_user
32	Can view user	8	view_user
33	Can add test model	9	add_testmodel
34	Can change test model	9	change_testmodel
35	Can delete test model	9	delete_testmodel
36	Can view test model	9	view_testmodel
37	Can add test result	10	add_testresult
38	Can change test result	10	change_testresult
39	Can delete test result	10	delete_testresult
40	Can view test result	10	view_testresult
41	Can add question	11	add_question
42	Can change question	11	change_question
43	Can delete question	11	delete_question
44	Can view question	11	view_question
45	Can add comment	12	add_comment
46	Can change comment	12	change_comment
47	Can delete comment	12	delete_comment
48	Can view comment	12	view_comment
49	Can add user answer	13	add_useranswer
50	Can change user answer	13	change_useranswer
51	Can delete user answer	13	delete_useranswer
52	Can view user answer	13	view_useranswer
53	Can add section	14	add_section
54	Can change section	14	change_section
55	Can delete section	14	delete_section
56	Can view section	14	view_section
57	Can add tutorial module	15	add_tutorialmodule
58	Can change tutorial module	15	change_tutorialmodule
59	Can delete tutorial module	15	delete_tutorialmodule
60	Can view tutorial module	15	view_tutorialmodule
61	Can add tutorial	15	add_tutorial
62	Can change tutorial	15	change_tutorial
63	Can delete tutorial	15	delete_tutorial
64	Can view tutorial	15	view_tutorial
65	Can add blacklisted token	16	add_blacklistedtoken
66	Can change blacklisted token	16	change_blacklistedtoken
67	Can delete blacklisted token	16	delete_blacklistedtoken
68	Can view blacklisted token	16	view_blacklistedtoken
69	Can add outstanding token	17	add_outstandingtoken
70	Can change outstanding token	17	change_outstandingtoken
71	Can delete outstanding token	17	delete_outstandingtoken
72	Can view outstanding token	17	view_outstandingtoken
73	Can add test	18	add_test
74	Can change test	18	change_test
75	Can delete test	18	delete_test
76	Can view test	18	view_test
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
\.


--
-- Data for Name: core2_section; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core2_section (id, title, description, content, module_id, slug) FROM stdin;
3	Text Details		Text Details Tutorial:\r\n\r\nSolving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.\r\n\r\n### General Tips and Tricks:\r\n\r\n1. **Read the Question First:** This helps you know what to look for when you read the passage. \r\n\r\n2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.\r\n\r\n3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.\r\n\r\n4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.\r\n\r\n5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.\r\n\r\n6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?\r\n\r\n7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.\r\n\r\n8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.\r\n\r\n### Sample Question with Detailed Explanation:\r\n\r\n**Passage:**\r\n"In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."\r\n\r\n**Question:**\r\nWhat is Eliana's perspective on the eclipse?\r\n\r\nA) It is a natural phenomenon that interests her scientifically.\r\nB) It is a harbinger of chaos and destruction for the kingdom.\r\nC) It is a pivotal event that holds the power to alter destinies.\r\nD) It is a curse that has been brought upon the land by enemies.\r\n\r\n**Explanation:**\r\n\r\n1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.\r\n\r\n2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.\r\n\r\n3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.\r\n\r\n4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.\r\n\r\nBy following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.\r\n\r\nLet's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.\r\n\r\n### Sample Question 1\r\n#### Passage:\r\nIn a small coastal town, an ancient lighthouse stands at the edge of a cliff, guiding ships away from treacherous rocks. The lighthouse keeper, Mr. Alcott, has devoted his life to ensuring the light never dims. One stormy night, with lightning fracturing the sky, a ship dangerously close to the rocks sends out a distress signal. Mr. Alcott, despite the raging storm, manages to keep the light burning, guiding the ship to safety.\r\n\r\n#### Question:\r\nWhat does the passage mainly illustrate about Mr. Alcott?\r\n\r\nA) His loneliness as a lighthouse keeper.\r\nB) His dedication to his responsibility.\r\nC) His fear of storms.\r\nD) His desire to leave the coastal town.\r\n\r\n#### Detailed Explanation:\r\n\r\n- **A)** The passage mentions Mr. Alcott's role and his actions during a storm but does not discuss his feelings of loneliness.\r\n- **B)** The correct answer is supported by the passage describing how Mr. Alcott ensures the lighthouse light never dims and his actions during the storm to guide a ship to safety, demonstrating his dedication to his duty.\r\n- **C)** Although a storm is mentioned, there's no indication that Mr. Alcott is afraid; instead, he actively works to keep the light burning.\r\n- **D)** There's no mention or implication of a desire to leave; the focus is on his actions during the storm.\r\n\r\n### Sample Question 2\r\n#### Passage:\r\nDr. Lena Nguyen, a renowned marine biologist, has spent years studying coral reef ecosystems. Her latest research, conducted in the vibrant but vulnerable Great Barrier Reef, aims to understand the impacts of climate change on coral bleaching. Through her innovative use of drone technology, Dr. Nguyen maps out affected areas and collects data crucial for developing conservation strategies.\r\n\r\n#### Question:\r\nWhat is the primary focus of Dr. Nguyen's research?\r\n\r\nA) The economic impact of coral reefs.\r\nB) The role of drone technology in oceanography.\r\nC) The effects of climate change on coral reefs.\r\nD) The discovery of new coral species.\r\n\r\n#### Detailed Explanation:\r\n\r\n- **A)** While important, the economic impact of coral reefs is not mentioned in the passage, which focuses on the ecological effects of climate change.\r\n- **B)** Drone technology is mentioned as a tool in her research, not the primary focus.\r\n- **C)** This is the correct answer because the passage specifically states Dr. Nguyen aims to understand the impacts of climate change on coral bleaching, indicating this is her research's main focus.\r\n- **D)** Discovery of new species is not discussed; the passage centers on the health and preservation of existing coral ecosystems.\r\n\r\nThese questions and explanations demonstrate a methodical approach to interpreting passages and selecting the most accurate answer by closely examining the details provided and understanding the main idea.	1	text-detail-tutorial
34	abc	abc	abc	1	new-link
\.


--
-- Data for Name: core2_tutorial; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core2_tutorial (id, title) FROM stdin;
1	English
2	Writing
3	Math
\.


--
-- Data for Name: core_comment; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_comment (id, text, created_at, updated_at, test_id, user_id) FROM stdin;
\.


--
-- Data for Name: core_question; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_question (id, context, query, graph_img, "option_A", "option_B", "option_C", "option_D", correct_answer, likes, dislikes, created_at, test_id, title, model, section) FROM stdin;
48	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-16 23:18:37.454271+00	2	Question 13 Graph	Reading	Command of Quantitative Evidence
47	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-16 23:18:17.402492+00	2	Question 12 Graph	Reading	Command of Quantitative Evidence
35	A biographer tracing the life of the renowned inventor Thomas Edison notes that his relentless pursuit of innovation was rooted in a(n) _______ curiosity about the natural world, which led him from one experiment to another in rapid succession throughout his career.	Which choice completes the text with the most logical and precise word or phrase?		A) intermittent	B) insatiable	C) indifferent	D) sporadic	B	0	0	2024-04-16 21:24:31.539524+00	2	Question 2	Reading	Words in Context
36	With the technology market evolving at an unprecedented pace, the new CEO of the electronics firm is tasked with navigating a _______ pathway through a landscape defined by rapid innovation, where staying ahead means not just predicting but often dictating consumer trends and preferences.	Which choice completes the text with the most logical and precise word or phrase?		A) straightforward	B) settled	C) unchanging	D) volatile	D	0	0	2024-04-16 21:26:11.214667+00	2	Question 3	Reading	Words in Context
40	In the literary work "The Alchemy of Cuisine," chef and celebrated author Marco García offers a passionate narrative about the transformative power of cooking. He shares personal anecdotes from his childhood kitchen to his current gourmet restaurant, illustrating how simple ingredients from varied cultures come together in a symphony of flavors that delight the palate and warm the heart. García philosophizes about cooking as a form of alchemy, a creative endeavor that not only transforms raw components into delectable creations but also turns individual eating experiences into communal bonds, transcending cultural and linguistic barriers. The chef's reflections include meditations on the nature of taste, the shared joy of a meal, and the enduring memories that food can create, making a case for culinary experiences as a cornerstone of human connection.	Which choice best states the main purpose of the text?		A) To provide a biography of García's rise to culinary fame.	B) To persuade readers to try specific recipes from diverse cultures.	C) To narrate García's culinary experiences and his philosophy of cooking as an art form.	D) To discuss the nutritional aspects of combining ingredients from different cultures.	C	0	0	2024-04-16 22:08:57.855979+00	2	Question 5	Reading	Text Structure and Purpose
60	While researching a topic, a student has compiled notes on the unique cultural contributions of Zora Neale Hurston, a key figure of the Harlem Renaissance:\r\n   - Hurston was a renowned African American writer and anthropologist.\r\n   - Her most famous novel, "Their Eyes Were Watching God," was published in 1937.\r\n   - Hurston's work celebrated African American culture and dialect.\r\n   - She was a central figure in the Harlem Renaissance, a cultural movement in the 1920s and 1930s.\r\n   - Hurston also conducted anthropological research, documenting African American folklore.	The student aims to highlight Hurston's impact on American literature and culture. Which choice effectively uses the notes to accomplish this goal?		A) Hurston, an anthropologist, contributed to the Harlem Renaissance with her folklore research.	B) "Their Eyes Were Watching God" is among Hurston's notable works, reflecting her literary significance.	C) As a key figure in the Harlem Renaissance, Hurston's work celebrated African American culture and dialect through novels like "Their Eyes Were Watching God."	D) Hurston's anthropological research documented African American folklore, contributing to her status as a renowned writer.	C	0	0	2024-04-17 01:55:23.187804+00	2	Question 25		
59	The Industrial Revolution marked a turning point in human history, transforming agrarian societies into industrialized ones. Initiated in Britain in the mid-18th century, the revolution brought about the widespread adoption of new technologies. ______, the invention of the steam engine revolutionized manufacturing, allowing factories to operate independently of water power and greatly increasing their productivity.	Which choice completes the text with the most logical transition?		A) Specifically,	B) Consequently,	C) In contrast,	D) Instead,	A	0	0	2024-04-17 01:53:35.540865+00	2	Question 24		
86	Mutualism is a type of ecological relationship where two different species benefit from their interaction.  A classic example is the relationship between flowering plants and their pollinators. ______, bees visit flowers to gather nectar for food, and in the process, they transfer pollen between flowers, facilitating plant reproduction, ensuring their continued survival. Which choice completes the text with the most logical transition?	Which choice completes the text with the most logical transition?		A) Thus,	B) Similarly,	C) For instance	D) On the other hand,	C	0	0	2024-04-17 03:00:04.189257+00	3	Question 24		
34	The annual Fourth of July parade showcases a _______ of floats, marching bands, and performers that represent the community's diverse interests and heritage, from local history clubs to high school sports teams, creating a vibrant tableau that has become a cherished tradition.	Which choice completes the text with the most logical and precise word or phrase?		A) monotony	B) scarcity	C) spectacle	D) shortage	C	0	0	2024-04-16 21:22:59.074288+00	2	Question 1	Reading	Words in Context
42	The novel "Whispers of the Rainforest" explores the life of Dr. Mira Alvarez, a botanist working to preserve the biodiversity of the Amazon. Throughout the narrative, she encounters the stark beauty of the natural world and the harsh realities of deforestation. \r\n     Mira walked along the humid paths of the rainforest, her senses alive to every rustle and chirp. She noted the vibrant dance of the toucan in flight, the whisper of the leaves in a language only she seemed to understand, reflecting on the interconnectedness of every living thing. The forest was not merely a collection of trees and wildlife to her; it was an intricate web of life that pulsed with a rhythm as ancient as the earth itself. Her mission becomes a race against time as she battles to save an ecosystem on the brink of collapse.	According to the text, what is Dr. Alvarez's perspective on the rainforest?		A) She views it as an opportunity for scientific research and career advancement.	B) She sees it as a living entity with an intrinsic and ancient rhythm.	C) She is interested only in the most exotic and vibrant species within the ecosystem.	D) She feels overwhelmed by the scale of the rainforest and its conservation needs.	B	0	0	2024-04-16 22:17:52.244512+00	2	Question 7	Reading	Central Ideas and Details
43	In "The Threads of Time," historical fiction meets fantasy as protagonist Thomas Weaver finds himself with the power to alter historical events. \r\n   Thomas stood in the shadow of the ancient clock tower, the weight of centuries in his hands. The fabric of time spread before him, a tapestry of moments and memories woven together. With a careful touch, he could unravel the threads of past injustices or tighten the weave to strengthen the course of history. His ability to see the connections of time's grand design was both a gift and a curse, for with every change he made, a new set of consequences unfolded. The moral complexities of his power are at the heart of the narrative.	Based on the text, how does Thomas interact with history?		A) He is a passive observer, watching historical events unfold without intervention.	B) He has the power to change history, though each alteration has its consequences.	C) He can only witness historical injustices but lacks the power to correct them.	D) He is primarily focused on understanding his personal history through time travel.	B	0	0	2024-04-16 22:19:17.525794+00	2	Question 8	Reading	Central Ideas and Details
44	In his journal, Henry David Thoreau wrote extensively about his experience living in a cabin near Walden Pond. \r\n     In some entries, he meticulously described the wildlife and nature that surrounded him, noting the changing of the seasons and the habits of the local flora and fauna. In other entries, he wrote philosophical reflections on life, exploring themes of simplicity, self-reliance, and the human connection to the natural world. At times, he wrote of visitors who would break up his solitude, but he admitted these interactions were sometimes welcome and prompted further contemplation. One particular passage in his journal describes a trip he made by canoe, where he reflected on the nature of rivers and their enduring presence within the wider landscape, musing on how they both shape and reflect the passage of time.	Which choice best states the main idea of this text?		A) Thoreau’s journal is primarily a collection of personal thoughts, observations, and experiences during his time at Walden Pond.	B) Thoreau preferred the isolation of living at Walden Pond to the social world outside.	C) Thoreau's journal describes how he spent his time at Walden Pond and provides insight into his worldview.	D) Rivers represent a recurring theme in Thoreau’s descriptions of nature and its connection to humans.	C	0	0	2024-04-16 22:25:57.60156+00	2	Question 9	Reading	Central Ideas and Details
46	The Love Song of J. Alfred Prufrock" is a 1915 modernist poem by T.S. Eliot. In the poem, an insecure speaker reflects on the passage of time, his own indecision, and societal expectations. The speaker in the poem is overwhelmed by feelings of inadequacy.	Which quotation from "The Love Song of J. Alfred Prufrock" most effectively illustrates the claim?		A) "I have heard the mermaids singing, each to each. / I do not think that they will sing to me."	B) "With a bald spot in the middle of my hair— / (They will say: “How his hair is growing thin!”)"	C) "And indeed there will be time / To wonder, 'Do I dare?' and, 'Do I dare?'"	D) "No! I am not Prince Hamlet, nor was meant to be; / Am an attendant lord..."	A	0	0	2024-04-16 23:01:29.735868+00	2	Question 11	Reading	Command of Textual Evidence
51	Toni Morrison's literary career spanned six decades, encompassing novels, essays, and even children's books. After she won the Nobel Prize in Literature in 1993, she was praised by the Nobel committee for the “visionary force and poetic import” of her works. Many readers identify with the rich language and complex characters that Morrison _______ as she explores themes related to the African American experience; her novels have become staples of high school and college literature courses.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) created	B) creates	C) was creating	D) is creating	A	0	0	2024-04-16 23:31:01.997547+00	2	Question 16		
52	In the early 20th century, concern arose about the destruction and looting of archaeological sites across the American West. President Theodore Roosevelt, a passionate conservationist, saw an urgent need to ensure the protection of these lands. The 1906 Antiquities Act empowers the US president to establish national monuments, or protected natural areas and Roosevelt used this power to preserve a plethora of diverse landscapes across the country, including the Grand Canyon, ______ Devils Tower, Wyoming.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) and in addition to	B) in addition to	C) in addition to,	D) in addition to:	B	0	0	2024-04-17 01:38:49.699806+00	2	Question 17		
53	Unlike other Greek writers who focused on composing stories about heroes and gods, the ancient Greek historian Herodotus, sometimes called the “Father of History,” wrote the comprehensive and engaging narrative Histories. It provides a detailed—and sometimes embellished—account of the Greco-Persian Wars of the 5th century BCE. Despite his embellishments, Herodotus’ work remains an important source for historians _______ it sheds light on events of major significance in world history and provides valuable cultural insights.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) therefore,	B) therefore	C), therefore,	D); therefore,	A	0	0	2024-04-17 01:39:49.098122+00	2	Question 18		
54	Many immigrants to the US have experienced the challenges of adjusting to a new culture and learning a new language. In her memoir When I Was Puerto Rican, author Esmeralda Santiago recalls her childhood experiences in Puerto Rico and _______ transition to life in New York City during the 1950s. She vividly describes the challenges she faced while embracing the opportunities her new life offered.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) with her subsequent	B) she subsequently	C) with subsequently	D) her subsequent	D	0	0	2024-04-17 01:40:45.155777+00	2	Question 19		
55	Our bodies are equipped with a complex system of defenses to protect us from illness. When the human body is exposed to a virus or other pathogen, the immune system’s white blood cells, or leukocytes, spring into action to destroy the invader. Some leukocytes release antibodies _______ target antigens, or the unique markers on the surface of pathogens; others directly attack these harmful invaders.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) that they	B) by which they	C) and thereby	D) that	D	0	0	2024-04-17 01:41:45.32798+00	2	Question 20		
56	In 1913, modernist author Marcel Proust published the first volume of his seven-volume novel In Search of Lost Time (sometimes translated as Remembrance of Things Past). The novel, noted for its nonlinear structure and stream-of-consciousness style, explores themes such as memory and the passage of time. Widely considered a masterpiece of 20th-century literature, In Search of Lost Time ______ a profound impact on subsequent writers.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) has had	B) have had	C) was having	D) will have had	A	0	0	2024-04-17 01:42:47.182379+00	2	Question 21		
57	The Impressionist painter Claude Monet was captivated by the effects of light on water. His iconic Water Lilies series, ______ depicts the lily pond and Japanese-style bridge in his garden at Giverny, France, consists of approximately 250 paintings.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) this	B) and this	C) which	D) , which	C	0	0	2024-04-17 01:43:38.947455+00	2	Question 22		
50	In the mid-nineteenth century, British paleontologist Richard Owen coined the term “dinosaur,” which is Greek for “terrible lizard.” While his classification of several distinct but related large, extinct reptile species into a single group was revolutionary, Owen, like most scientists of his time, believed that dinosaurs were cold-blooded creatures akin to modern lizards, rather than warm-blooded like birds or mammals. More recent analyses of dinosaur bones have called Owen’s assumption into question, however, suggesting instead that dinosaurs were endothermic, meaning that they could internally regulate their body temperature. This evidence includes the presence of haversian canals in dinosaur bones, structures associated with the rapid bone growth characteristic of warm-blooded animals. Therefore, it seems that _______	Which choice most logically completes the text?		(A) the rapid growth of many dinosaurs to very large sizes is better explained by their being warm-blooded than by their being cold-blooded.	(B) some modern reptile species have bone structures very similar to haversian canals, which casts doubt on the validity of their use as evidence for dinosaur endothermy.	(C) there is likely less variation in the body temperature of warm-blooded animals than there is in the body temperature of cold-blooded animals.	(D) there may have been substantial variation among different dinosaur species as to whether they were warm-blooded or cold-blooded.	A	0	0	2024-04-16 23:27:07.7411+00	2	Question 15	Reading	Inferences
61	While researching a topic, a student has gathered information on SpaceX's innovations in space exploration:\r\n   - SpaceX, founded by Elon Musk, aims to reduce space travel costs.\r\n   - It was the first private company to send a spacecraft to the International Space Station (ISS).\r\n   - SpaceX developed the Falcon Heavy, the most powerful operational rocket in the world.\r\n   - The company's ultimate goal is to enable human life on Mars.\r\n   - SpaceX introduced reusable rockets, significantly cutting launch costs.	The student wants to discuss SpaceX's role in transforming space exploration. Which choice effectively leverages the notes for this purpose?		A) SpaceX developed the Falcon Heavy, emphasizing its technical achievements.	B) By introducing reusable rockets, SpaceX has made significant strides in reducing space travel costs.	C) Founded by Elon Musk, SpaceX's innovations, like reusable rockets, have dramatically lowered the cost of space travel and opened new possibilities for human life on Mars.	D) The goal of enabling human life on Mars drives SpaceX's mission, highlighted by its achievements like sending a spacecraft to the ISS.	C	0	0	2024-04-17 01:59:01.021994+00	2	Question 26		
62	While researching a topic, a student compiles notes on the impact of climate change on coral reefs:\r\n   - Coral reefs are vital ecosystems that support marine life diversity.\r\n   - Climate change causes coral bleaching, threatening reef survival.\r\n   - Reefs protect coastal communities from storms and erosion.\r\n   - The Great Barrier Reef has lost over half its coral since 1985 due to warming oceans.\r\n   - Efforts to mitigate climate change could help preserve these ecosystems.	The student aims to emphasize the urgent need for action to protect coral reefs from climate change. Which choice effectively uses the notes to achieve this goal?		A) Coral reefs, like the Great Barrier Reef, face threats from warming oceans, highlighting the impact of climate change.	B) The loss of over half its coral makes the Great Barrier Reef a prime example of climate change's devastating effects on coral reefs.	C) Vital for marine diversity and coastal protection, coral reefs' survival is jeopardized by climate change, underscoring the necessity of mitigating efforts to preserve these ecosystems.	D) Coral bleaching, a direct consequence of climate change, endangers the biodiversity supported by coral reefs.	C	0	0	2024-04-17 02:00:22.337637+00	2	Question 27		
63	In her latest research on the effects of urban noise pollution on wildlife, the ecologist presents a _______ set of data demonstrating how the constant hum of city life can disrupt animal communication and behavior, suggesting the need for more green spaces to mitigate these effects.	Which choice completes the text with the most logical and precise word or phrase?		A) negligible	B) compelling	C) irrelevant	D) scant	B	0	0	2024-04-17 02:04:30.951034+00	3	Question 1		
64	The political thriller film, set against the backdrop of the Cold War, weaves a complex narrative of espionage and intrigue, presenting viewers with a _______ plot that requires careful attention to understand the shifting alliances and motivations of the characters involved.	Which choice completes the text with the most logical and precise word or phrase?		A) predictable	B) linear	C) straightforward	D) convoluted	D	0	0	2024-04-17 02:05:30.502971+00	3	Question 2		
65	The theoretical physicist's latest paper delves into the _______ realm of quantum mechanics, proposing a novel interpretation of particle-wave duality that challenges the prevailing orthodoxy and has the potential to redefine fundamental concepts within the field.	Which choice completes the text with the most logical and precise word or phrase?		A) accessible	B) tangible	C) esoteric	D) simplistic	C	0	0	2024-04-17 02:07:03.786761+00	3	Question 3		
66	The avant-garde artist's exhibition is an intricate exploration of the _______ of human perception, featuring interactive installations that require the viewer to engage in a multisensory experience, blurring the lines between reality and illusion.	Which choice completes the text with the most logical and precise word or phrase?		A) straightforwardness	B) transparencies	C) vicissitudes	D) simplicities	C	0	0	2024-04-17 02:08:41.3816+00	3	Question 4		
67	In his critique of the modern education system, the author argues for a radical restructuring, contending that the current approach to learning is a(n) _______ web of standardized tests and rigid curricula that stifles creativity and fails to prepare students for the complexities of the real world.	Which choice completes the text with the most logical and precise word or phrase?		A) straightforward	B) flexible	C) unassuming	D) labyrinth	D	0	0	2024-04-17 02:10:03.855209+00	3	Question 5		
68	The historical treatise on the Byzantine Empire's political system presents a(n) _______ tapestry of intrigue, diplomacy, and power struggles, illustrating how emperors and court officials navigated the treacherous waters of governance in a society that was as renowned for its sophistication as it was for its complexity.	Which choice completes the text with the most logical and precise word or phrase?		A) uniform	B) plain	C) simplistic	D) byzantine	D	0	0	2024-04-17 02:11:29.237212+00	3	Question 6		
69	In "Galaxies in Her Eyes," astronaut Dr. Lena Stern charts a course for interstellar exploration and personal discovery. "Aboard the spacecraft Odyssey, Lena gazed out at the stars that had captivated her since childhood. Her mission was not only to traverse the vast expanse of space but also to understand the human place within the cosmos. The silence of the universe was a canvas upon which she projected her thoughts, fears, and aspirations. As she approached the event horizon of a distant black hole, Lena contemplated the paradox of feeling infinitesimally small yet infinitely connected to the mysteries of the universe." The novel is a profound meditation on the quest for knowledge and the human spirit's unyielding resilience.	According to the text, what is central to Dr. Stern's space mission?		A) The technological advancements required for deep space travel.	B) The search for alien life forms and establishing communication with them.	C) The exploration of personal identity in the context of the vast universe.	D) The impact of long-term space travel on her physical and mental health.	C	0	0	2024-04-17 02:21:40.075115+00	3	Question 7		
84	An epic is a long narrative poem that recounts the heroic deeds of a legendary figure, often within a historical or mythical context. The Epic of Gilgamesh, considered one of the earliest surviving works of literature, ______ the adventures of a Sumerian king and is believed to date back to around 2100 BCE.	Which choice completes the text so that it conforms to the conventions of Standard English		A) it details	B) detailing	C) details	D) has detailed	C	0	0	2024-04-17 02:46:32.529374+00	3	Question 22		
108	For centuries, scientists believed that the appendix, a small pouch attached to the large intestine, had no useful function in the human body. However, recent research _______ that it may play a role in the immune system by serving as a safe harbor for beneficial bacteria.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) suggests	B) has suggested	C) is suggesting	D) will have suggested	B	0	0	2024-04-17 04:58:15.579965+00	4	Question 18		
70	In "Labyrinth of Dreams," a suspenseful tale of mystery and psychological intrigue, protagonist Elise navigates a world where dreams and reality converge. "Elise walked the twisted corridors of the old mansion, where each door opened into a realm of the mind's own making. Her quest to uncover the truth about her enigmatic past was tangled in the surreal encounters of the dreaming world. Echoes of forgotten memories whispered through the halls, promising answers that seemed just out of reach. As dreams bled into waking life, Elise began to question where one ended and the other began, and if the labyrinth she wandered was within the mansion's walls or within herself." The narrative blurs the lines between the tangible and the ethereal.	What does the text imply about Elise's quest?		A) It is a straightforward investigation into the mansion's history.	B) It is an internal and external journey through a world of dreams.	C) It focuses on escaping the mansion's physical confines as quickly as possible.	D) It is a scientific study into the nature of dreams and their impact on reality.	B	0	0	2024-04-17 02:23:17.071566+00	3	Question 8		
71	The Roman poet Horace is best known for his Odes, collections of short poems focusing on various themes that are still celebrated today. Some of the odes are playful, focusing on the enjoyment of wine, food, and friendship, offering a light-hearted perspective on daily life. Other odes are more serious and contemplative, addressing weighty topics such as war, morality, and the fleeting nature of existence. The themes shift again within his Satires, where Horace uses witty humor to comment on societal issues of the day, poking fun at common human foibles and vices. His work provides a fascinating window into everyday life in ancient Rome and explores timeless human experiences.	Which choice best states the main idea of this text?		A) Horace was a versatile writer who explored diverse topics in his poetry.	B) Horace was mainly a satirical poet who used his work to critique Roman society.	C) Horace’s Odes are his most famous and best-loved works of poetry.	D) Horace offers valuable insight into the daily experiences of citizens in ancient Rome.	A	0	0	2024-04-17 02:25:18.979375+00	3	Question 9		
72	"Through the Lens: A Life in Photography," a memoir by James L. Stewart, takes readers on a journey through the lens of a camera, capturing pivotal moments of human experience. Stewart recounts how he fell in love with photography as a means of storytelling and connection. His narrative explores various cultures and landscapes, the joy of discovering the world through his viewfinder, and the evolution of his craft over decades. Through his work, he has frozen time, encapsulated emotions, and documented truths, providing a unique window into the souls of his subjects. He shares the belief that photography has the power to transcend barriers, uniting people across different walks of life with images that speak to the shared human experience. Stewart's philosophical musings on the art form are interspersed with technical advice, making his memoir a rich tapestry of practical wisdom and introspective thought.	Which choice best states the main purpose of the text?		A) To instruct readers in the technical aspects of professional photography.	B) To reflect on how photography serves as a medium for human connection and storytelling.	C) To showcase a portfolio of Stewart's most renowned photographic works.	D) To debate the impact of digital photography on traditional photographic techniques.	B	0	0	2024-04-17 02:27:09.781919+00	3	Question 10		
73	Text 1: Urban areas are increasingly facing the challenge of the "urban heat island" effect, where built environments, such as buildings and roads, absorb and re-emit the sun's heat more than natural landscapes like forests and water bodies. This phenomenon leads to higher temperatures in cities compared to their rural surroundings, exacerbating the discomfort during heatwaves and contributing to higher energy consumption for cooling. Understanding and mitigating the urban heat island effect is crucial for making cities more livable and sustainable.\r\n\r\nText 2: Environmental scientist Laura Perez and her team have been exploring innovative solutions to combat the urban heat island effect. Their research focuses on integrating green roofs and reflective materials in urban planning to reduce heat absorption. Perez points out that while these solutions show promise in reducing city temperatures, their effectiveness varies based on the specific urban context and climate. Implementing these strategies requires careful consideration of local environmental conditions and urban infrastructure.	Based on the texts, what would Perez (Text 2) most likely say about Text 1’s description of the urban heat island effect?		A) It accurately highlights the challenges and underscores the need for targeted solutions to make cities more sustainable.	B) It oversimplifies the issue by not acknowledging the variability in effectiveness of solutions like green roofs in different urban contexts.	C) It is overly pessimistic, given the promising advancements in technologies and strategies to mitigate heat in urban environments.	D) It underestimates the role of urban planning in exacerbating city temperatures, focusing too narrowly on natural versus built environments.	B	0	0	2024-04-17 02:29:21.143197+00	3	Question 11		
109	Biomimicry involves drawing inspiration from nature to solve human problems. For example, the design of Velcro was inspired by the burrs that attach themselves to animal fur, _______ the invention of high-speed bullet trains was based on the aerodynamic shape of the kingfisher's beak.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) and	B) also	C) while	D) or	C	0	0	2024-04-17 05:00:12.384334+00	4	Question 19		
113	The theory of natural selection, proposed by Charles Darwin, is a cornerstone of modern biology.  This theory posits that organisms better adapted to their environment are more likely to survive and reproduce. ______, over time,  favorable traits become increasingly prevalent within a population, as those without the adaptations are less likely to successfully pass on their genes.	Which choice completes the text with the most logical transition?		A) Notably,	B) As a result,	C) Instead,	D) Conversely,	B	0	0	2024-04-17 05:06:48.634545+00	4	Question 23		
115	Volcanoes and mountains are both geological formations, but they have distinct origins. Volcanoes are formed by the eruption of molten rock, ash, and gas from Earth's interior. ______, mountains can be created by a variety of geological processes, such as the uplifting of tectonic plates or the erosion and deposition of sediments.	Which choice completes the text with the most logical transition?		A) As a result,	B) Therefore,	C) Specifically,	D) In contrast,	D	0	0	2024-04-17 05:09:30.917641+00	4	Question 25		
74	Researchers in the field of cognitive psychology have embarked on an intriguing study to explore the potential influence of auditory stimuli on memory retention. They hypothesize that exposure to certain types of music, particularly classical music, might enhance individuals' ability to recall information. To test this theory, an experiment was conducted in which participants were asked to memorize a list of words under three different auditory conditions: with classical music playing in the background, amidst white noise, or in complete silence. The choice of classical music was based on its structured harmony and complexity, which researchers speculated might stimulate cognitive processes involved in memory.	Which experimental outcome, if verified, would most convincingly support the researchers' hypothesis?		A) Participants who memorized the word list with classical music playing in the background demonstrated a significantly higher average recall rate compared to those in the white noise or silence conditions, suggesting a direct beneficial effect of classical music on memory retention.	B) Despite variations in auditory conditions, the type of background music (classical versus other genres) did not significantly affect participants' mood during the memorization task, indicating that mood was not a confounding factor in memory performance.	C) Participants exposed to white noise reported higher levels of concentration during the memorization task than those listening to classical music, yet this did not translate into better recall performance.	D) There was no significant difference in recall ability between participants who memorized in silence and those exposed to white noise, highlighting the unique potential effect of classical music on enhancing memory.	A	0	0	2024-04-17 02:30:45.228504+00	3	Question 12		
75	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 02:31:42.513476+00	3	Question 13 Graph		
76	In an essay analyzing environmental policies enacted during the 20th century, a student claims: Environmental regulations, though they initially faced considerable public opposition, have had a significant positive impact	Which quotation from the essay most effectively illustrates the claim?		A) "The passage of the Clean Air Act in 1970 was a watershed moment, marking a shift away from unregulated pollution towards a framework of government involvement."	B) "In the 1960s, the Cuyahoga River in Ohio became a symbol of environmental degradation when it repeatedly caught fire due to industrial waste."	C) "Despite initial resistance from some industries, data shows that air and water quality have dramatically improved in many areas of the U.S. since the advent of stricter environmental regulations."	D) "The debate over environmental regulations often centers around balancing short-term economic costs with the long-term benefits of a cleaner, healthier environment."	C	0	0	2024-04-17 02:33:44.275932+00	3	Question 14		
77	Among the various works in American author Edith Wharton’s oeuvre, The House of Mirth and The Age of Innocence are two of her most celebrated novels. Both works explore the social mores and class hierarchies of wealthy New York City society at the turn of the twentieth century. Some critics have praised The Age of Innocence, which won the Pulitzer Prize for fiction in 1921, as Wharton’s masterpiece, noting its thematic complexity and sophisticated characterizations. However, a number of other critics consider The House of Mirth, published in 1905, to be the superior of the two novels, maintaining that its protagonist is more psychologically complex than are the characters in The Age of Innocence and that its tragic ending is more deeply affecting. Thus, it appears that _______	Which choice most logically completes the text?		(A) critics are unable to agree about whether the characters in The House of Mirth are more or less psychologically complex than the characters in The Age of Innocence.	(B) literary critics generally prefer works of fiction with tragic endings over those with more ambiguous or open-ended conclusions.	(C) the relative merits of The House of Mirth and The Age of Innocence are likely to continue to be the subject of debate among literary critics.	(D) Edith Wharton is regarded by literary critics as one of the greatest American novelists of the early twentieth century.	C	0	0	2024-04-17 02:35:55.955247+00	3	Question 15		
78	In Greek mythology, Zeus was the king of the gods of Mount Olympus. Myths about Zeus ______ his use of thunderbolts to punish those who defied him, the many disguises he used to seduce mortals, and his status as the father of both gods and heroes.	Which choice completes the text so that it conforms to the conventions of Standard English		A) emphasizing	B) will emphasize	C) have emphasized	D) emphasize	C	0	0	2024-04-17 02:37:20.701544+00	3	Question 16		
79	A solar eclipse occurs when the Moon passes between Earth and the Sun, blocking the Sun's light from reaching Earth. Total solar eclipses, during which the Sun is completely blocked, are visible from a narrow path on Earth's surface, while partial eclipses _______ from a broader geographic area.	Which choice completes the text so that it conforms to the conventions of Standard English		A) can be seen	B) can been seen	C) will be seen	D) would be seen	A	0	0	2024-04-17 02:38:26.203631+00	3	Question 17		
80	Chemist Marie Curie and her husband, Pierre Curie, collaborated on pioneering research into radioactivity. Together they discovered the elements polonium and radium, _______ work for which they shared the 1903 Nobel Prize in Physics.	Which choice completes the text so that it conforms to the conventions of Standard English		A) and these	B) and this	C) while this	D) , and this	B	0	0	2024-04-17 02:40:14.415647+00	3	Question 18		
81	The aurora borealis, or northern lights, is a dazzling natural light display seen in high-latitude regions. This spectacle occurs when charged particles from the Sun are drawn by Earth's magnetic field into the atmosphere, ______ they collide with gas molecules.	Which choice completes the text so that it conforms to the conventions of Standard English		A) where	B) what	C) thus,	D) , where	A	0	0	2024-04-17 02:41:42.322473+00	3	Question 19		
82	As one of the most prolific poets of the Romantic movement, William Wordsworth is known for his poems celebrating the beauty and power of nature. Wordsworth, who served as Britain's poet laureate from 1843 to 1850, often collaborated with his friend and fellow poet Samuel Taylor Coleridge, and together they published the highly influential collection ______ in 1798.	Which choice completes the text so that it conforms to the conventions of Standard English		A) Lyrical Ballads	B) Lyrical Ballads,	C) Lyrical Ballads;	D) Lyrical Ballads.	A	0	0	2024-04-17 02:43:28.771816+00	3	Question 20		
83	In addition to her many acclaimed novels, science fiction writer Ursula K. Le Guin wrote poetry, essays, and children's books. Her works often explore themes related to gender, social justice, and the power of imagination, _______ blurring the lines between science fiction and fantasy.	Which choice completes the text so that it conforms to the conventions of Standard English		A) thus they	B) thereby	C) thus,	D) , thereby,	B	0	0	2024-04-17 02:45:11.698633+00	3	Question 21		
110	The Earth's magnetic field shields the planet from harmful solar radiation _______ creates the spectacular displays of the aurora borealis and aurora australis in the polar regions.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) , and it	B) and	C) ; and it	D) but it also	D	0	0	2024-04-17 05:02:47.433564+00	4	Question 20		
87	A student has been researching the advancements in renewable energy sources and has noted the following points:\r\n   - Solar panels have become significantly more efficient and cheaper over the last decade, allowing for wider adoption.\r\n   - Wind turbines have also seen improvements in design, leading to increased energy production per unit.\r\n   - Innovations in hydroelectric technology have made it possible to generate electricity in smaller water bodies, not just large rivers.\r\n   - Battery storage technology has advanced, enabling the storage of renewable energy for use during periods without sunshine or wind.\r\n   - Governments worldwide are increasingly supporting renewable energy through subsidies and regulations encouraging its use.	The student wants to highlight the collective impact of these advancements on the global energy landscape. Which choice most effectively uses the gathered information for this purpose?		A) The decrease in solar panel costs has contributed to their wider adoption.	B) Innovations in renewable energy, from more efficient solar panels and wind turbines to advancements in hydroelectric technology and battery storage, supported by governmental policies, are significantly transforming the global energy landscape.	C) Battery storage advancements have solved the issue of intermittent renewable energy supply.	D) Hydroelectric technology now allows for electricity generation in smaller water bodies.	B	0	0	2024-04-17 03:02:40.911962+00	3	Question 25		
89	Scientific Discovery: While researching a topic, a student has taken the following notes:\r\n  -In 1928, Alexander Fleming discovered penicillin.\r\n  -Penicillin was the first antibiotic.\r\n  -Antibiotics are medicines that fight bacterial infections.\r\n  -Fleming’s discovery revolutionized the treatment of previously fatal bacterial diseases.\r\n  -Today, antibiotics are used to treat a vast range of bacterial infections.	The student wants to explain the significance of Fleming's discovery. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Discovered in 1928, antibiotics like penicillin remain widely used to treat various bacterial infections.	B) Penicillin is a type of medicine known as an antibiotic, which combats infections caused by bacteria.	C) Fleming's work with penicillin revolutionized modern medicine by leading to the development of antibiotics.	D) Alexander Fleming discovered penicillin, which was the first antibiotic and dramatically impacted how bacterial diseases are treated.	D	0	0	2024-04-17 03:06:40.063208+00	3	Question 26		
90	Comparing Perspectives: While researching a topic, a student has taken the following notes:\r\n     -\tThe Industrial Revolution, which occurred roughly between the 18th and 19th centuries, involved advances in manufacturing and technology.\r\n    -\tDuring the Industrial Revolution, societies rapidly transitioned from agrarian economies to industrialized economies.\r\n    -  Some historians argue that while the Industrial Revolution led to economic benefits, it also brought about serious social problems.\r\n    -  Other historians focus on the ways in which the Industrial Revolution allowed more people to access an improved standard of living.\r\n    -  The Industrial Revolution remains a topic of debate among contemporary historians.	The student wants to highlight that there are different views on the effects of the Industrial Revolution. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) While some historians highlight the negative social impacts of the Industrial Revolution, others emphasize the economic and technological progress it enabled.	B) The Industrial Revolution caused rapid changes in the ways that societies were organized and goods were produced.	C) Historians debate the lasting impact of the Industrial Revolution, which led to both economic progress and new forms of social inequality.	D) The transition from agrarian to industrialized economies took place during the Industrial Revolution that began in the 18th century.	A	0	0	2024-04-17 03:08:36.727198+00	3	Question 27		
91	To bolster the town's resilience in the face of economic downturns, the mayor's new policy aims to invigorate the local food movement by _______ community agricultural efforts, thus providing incentives for residents to cultivate their own gardens, and in turn, making fresh produce more accessible and affordable across diverse neighborhoods.	Which choice completes the text with the most logical and precise word or phrase?		A) fortifying	B) undermining	C) overcomplicating	D) disregarding	A	0	0	2024-04-17 04:34:02.390955+00	4	Question 1		
92	The local government’s plan to tackle water waste is both _______ and ambitious, featuring a range of strategies from installing low-flow fixtures in public amenities to promoting the use of drought-resistant plants, alongside a campaign to educate citizens about water conservation in their daily lives.	Which choice completes the text with the most logical and precise word or phrase?		A) unplanned	B) improvised	C) reckless	D) comprehensive	D	0	0	2024-04-17 04:35:04.386948+00	4	Question 2		
93	Every year, the town's cultural fair serves as a _______ of local traditions, with booths displaying the art of lace-making, blacksmithing demonstrations, and folk dances, all coming together in a lively representation of the town's history and the skills passed down through generations.	Which choice completes the text with the most logical and precise word or phrase?		A) confusion	B) neglect	C) celebration	D) disregard	C	0	0	2024-04-17 04:36:06.649976+00	4	Question 3		
94	The rise of smartphones has transformed many aspects of daily life, from communication and shopping to navigation and entertainment. These devices have become so ingrained in our routines that it's hard to imagine a day without them. Yet, this reliance on smartphones has sparked a debate about the effects of screen time on health and well-being. Some studies suggest that excessive use can lead to issues like disrupted sleep patterns, decreased attention spans, and heightened stress levels. --In response to these concerns, developers have introduced features aimed at mitigating the negative impacts of smartphone use, such as screen time trackers and "do not disturb" modes.-- These tools empower users to monitor and manage their device usage more effectively, promoting a healthier balance between digital and real-life interactions.	Which choice best describes the function of the underlined sentence in the passage?		A) It introduces solutions to the problems associated with smartphone usage.	B) It outlines the features that have been added to smartphones in recent years.	C) It provides examples of how technology is adapting to health research findings.	D) It shifts the focus from the drawbacks of smartphones to their potential benefits.	A	0	0	2024-04-17 04:37:41.739023+00	4	Question 4		
111	The field of paleontology involves the study of fossils, the preserved remains of ancient organisms. Paleontologists use fossils _______ reconstruct prehistoric ecosystems, understand evolutionary processes, and determine the ages of different rock layers.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) that they can	B) they can	C) in order to	D) so they can	C	0	0	2024-04-17 05:03:54.499928+00	4	Question 21		
95	As urban populations continue to grow, cities face the challenge of accommodating more residents in ways that maintain or enhance quality of life. One innovative solution that has gained popularity worldwide is the concept of vertical gardens. These gardens, integrated into the sides of buildings or standalone structures, not only add aesthetic value but also contribute to the environmental health of urban areas. They play a crucial role in air purification, temperature regulation, and biodiversity support within concrete jungles. --The incorporation of vertical gardens into urban planning represents a paradigm shift towards greener, more sustainable cityscapes.-- By reimagining how and where green spaces can be created, urban planners are actively contributing to the fight against climate change and the pursuit of more livable cities.	Which choice best describes the function of the underlined sentence in the passage?		A) It outlines the benefits that vertical gardens bring to urban environments.	B) It introduces the concept of vertical gardens as a solution to urban challenges.	C) It marks a transition in urban planning towards sustainability.	D) It emphasizes the role of urban planners in environmental conservation.	C	0	0	2024-04-17 04:38:48.063937+00	4	Question 5		
96	Dr. Amy Chen's "Digital Echoes: Social Media and the Self" is a thought-provoking critique on the role of social media in contemporary life. Through a series of essays, Dr. Chen analyzes how these digital platforms affect self-perception, examining the paradox of increased connection alongside feelings of isolation and the pressures of online personas. She explores the dualities of social media—its capacity to both forge and fracture relationships, its power to offer support yet incite anxiety. With a compassionate yet critical eye, Dr. Chen engages with the psychological complexities of navigating virtual spaces, discussing the broader implications for identity formation and social interaction in a world where much of life is experienced through screens. She calls for a mindful approach to social media engagement, encouraging readers to foster authentic connections and preserve their mental well-being in the digital age.	Which choice best states the main purpose of the text?		A) To argue for the elimination of social media from modern communication.	B) To analyze the psychological influence of social media on self-identity and interpersonal relationships.	C) To provide a historical overview of the development of social media platforms.	D) To predict the future trends in social media and their societal implications.	B	0	0	2024-04-17 04:40:18.22392+00	4	Question 6		
97	Biologist Rachel Carson is widely credited with launching the modern environmental movement. Her most famous book, Silent Spring, published in 1962, details the harmful effects of pesticides on wildlife and the environment. Carson argued that humans have a responsibility to protect nature and that the overuse of chemicals was having unintended and devastating consequences. Although some initially criticized her work, her meticulous research and compelling arguments helped raise public awareness about environmental issues and led to significant policy changes aimed at protecting our planet.	Which choice best states the main idea of this text?		A) The modern environmental movement lacked strong leadership before the publication of Silent Spring.	B) Rachel Carson's scientific arguments were challenged and widely considered flawed.	C) Rachel Carson was a biologist who wrote primarily about the impact of pesticides.	D) Rachel Carson's work played a major role in raising awareness about environmental issues and influencing policy change.	D	0	0	2024-04-17 04:42:07.960655+00	4	Question 7		
98	The Hubble Space Telescope has revolutionized our understanding of the universe. Launched in 1990, Hubble orbits above the Earth's atmosphere, which makes it possible to take images with far greater clarity than ground-based telescopes. Hubble's images have shown us distant galaxies, the birth of stars, and evidence of black holes. It has even helped scientists determine the age and expansion rate of the universe itself. The Hubble Space Telescope's discoveries continue to inspire wonder and push the boundaries of our understanding of the cosmos.	Which choice best states the main idea of this text?		A) Ground-based telescopes are not effective for collecting high-quality images.	B) The Hubble Space Telescope was launched after decades of planning and development.	C) The Hubble Space Telescope has significantly expanded our knowledge of the universe.	D) Understanding the age and expansion rate of the universe remains one of the major goals of astronomers.	C	0	0	2024-04-17 04:43:44.970452+00	4	Question 8		
99	In the novel Invisible Man (1952), Ralph Ellison portrays a nameless Black man struggling for individual identity amidst the complexities of race relations in pre-Civil Rights America.  The narrator's sense of self is obscured by others' perceptions of him.	Which quotation from Invisible Man most effectively illustrates the claim?		A) "I am invisible, understand, simply because people refuse to see me."	B) "I remember that I’m invisible and walk softly so as not to awaken the sleeping ones. Sometimes it is best not to awaken them..."	C) "That night I sat and poured over the photographs. Who were they, I thought, where were they now?"	D) "To some I am invisible, while to others I am a responsible member of a great organization."	A	0	0	2024-04-17 04:45:45.707293+00	4	Question 9		
100	"Guernica" is a large 1937 oil painting by Pablo Picasso. Its chaotic imagery depicts the aftermath of a bombing during the Spanish Civil War.  Picasso uses distortion and fragmentation to convey the horror of war.	Which of the following art historical analyses best illustrates the claim?		A) "The stark black, white, and grey palette contributes to the painting's desolate mood and emphasizes its bleak subject matter."	B) "Picasso completed "Guernica" in just over a month, reflecting a sense of urgency and passion in response to the bombing."	C) "The disjointed figures of humans and animals, their limbs twisted and faces contorted in agony, underscore the suffering inflicted by violence."	D) "The work's large scale forces the viewer to confront the immense scale and brutality of war."	C	0	0	2024-04-17 04:47:21.416381+00	4	Question 10		
112	The Wright brothers, Orville and Wilbur, were bicycle mechanics who became fascinated with the possibility of human flight. After years of careful research and experimentation, _______ made history in 1903 with the first successful controlled airplane flights.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) they	B) which they	C) that they	D) who	A	0	0	2024-04-17 05:05:01.466256+00	4	Question 22		
101	A team of nutritional scientists is investigating the relationship between dietary fatty acid consumption and the risk of developing chronic diseases. The research is motivated by emerging evidence suggesting that diets rich in certain types of fatty acids, specifically omega-3 and omega-6, could play a protective role against chronic health conditions. The study spans several regions with diverse dietary habits, focusing on the consumption levels of omega-3 and omega-6 fatty acids and their potential health impacts. The hypothesis under investigation is that high intake of these fatty acids, particularly omega-3, is associated with a reduced risk of chronic diseases, reflecting the importance of dietary composition in health outcomes.	Which study outcome, if confirmed, would most compellingly support the team's hypothesis?		A) Populations with a dietary regimen high in omega-3 fatty acids exhibited significantly lower instances of the targeted chronic diseases compared to populations with lower omega-3 intake, directly correlating high omega-3 consumption with better health outcomes.	B) No significant difference was observed in the prevalence of chronic diseases between populations with high omega-3 intake and those with high omega-6 intake, suggesting that the type of fatty acid might not be the sole determinant of health outcomes.	C) The dietary ratio of omega-6 to omega-3 fatty acids did not show a clear correlation with the health outcomes of the studied populations, indicating that the balance between different types of fatty acids might not be as critical as previously thought.	D) Populations consuming diets rich in saturated fats displayed similar rates of the studied chronic diseases as those with high intakes of omega-3 and omega-6 fatty acids, challenging the notion that omega-3 and omega-6 have unique protective effects against chronic diseases.	A	0	0	2024-04-17 04:48:54.282787+00	4	Question 11		
102	Environmental Science and Marine Biology:** In recent years, Dr. Lucia Moreno and her team have been investigating the resilience of coral reefs in the face of increasing ocean temperatures, a phenomenon largely attributed to climate change. Their research focuses on a specific reef system known as the Blue Haven Reef, which has shown an unusual capacity to withstand thermal stress compared to neighboring reef systems. Dr. Moreno hypothesizes that a unique species of algae, found only in the Blue Haven Reef, provides enhanced thermal protection to the coral by fostering a more robust symbiotic relationship than is typical. This algae is believed to improve the coral's resilience by enhancing its energy efficiency and stress response mechanisms.	Which finding would most directly support Dr. Moreno's hypothesis?		A) Genetic analysis reveals that the coral within the Blue Haven Reef hosts a species of algae that is not found in any other reef system, indicating a unique symbiotic relationship.	B) Temperature records indicate that the Blue Haven Reef has experienced the same levels of thermal stress as surrounding reefs, suggesting other factors at play in its resilience.	C) Surveys of reef health across various global locations show that reefs with higher biodiversity tend to be more resilient to environmental stressors, including thermal stress.	D) Experiments show that when corals from other reefs are transplanted to the Blue Haven Reef, they do not exhibit the same level of thermal resilience as the native corals, pointing to the unique environmental conditions of the Blue Haven as a contributing factor.	A	0	0	2024-04-17 04:49:55.17375+00	4	Question 12		
103	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 04:50:12.004983+00	4	Question 13 Graph		
104	Graph	Graph		Graph	Graph	Graph	Graph	B	0	0	2024-04-17 04:50:26.801122+00	4	Question 14 Graph		
105	When European explorers first arrived in southern Africa in the 1600s, they encountered the Khoikhoi people, nomadic herders of cattle and sheep. Early colonial accounts portrayed the Khoikhoi as living in simple, relatively egalitarian communities, but anthropologists studying the Khoikhoi in more recent decades have found that their social and political structures were likely significantly more complex, potentially involving a social hierarchy similar to that found in chiefdoms. This new understanding of Khoikhoi social dynamics is based in part on an analysis of archaeological evidence that suggests that some Khoikhoi individuals were buried with more elaborate grave goods than others, a common feature of societies with pronounced social divisions. However, some anthropologists have questioned the conclusions of these recent studies, arguing that a simpler explanation for this variation in funerary practices is that _______	Which choice most logically completes the text?		A) the remains of some Khoikhoi communities likely had been buried for significantly longer than the remains of other communities that were studied.	B) the remains of those who died at an older age may have been placed in more substantial graves, irrespective of the status those individuals occupied in their communities.	C) the bodies of some individuals may have been disinterred and reburied after their original interment if members of their families relocated to other encampments.	D) some individuals may simply have been more highly regarded by the members of their communities than others, and this esteem would have been reflected in their funeral rites.	D	0	0	2024-04-17 04:52:34.494652+00	4	Question 15		
106	Some strains of bacteria can form biofilms, which are complex collectives of bacteria cells that adhere to a surface and are encased in a matrix of sugars and protein secreted by the cells. The bacteria in biofilms often exhibit increased resistance to antibiotics compared to bacteria of the same strain that are not part of a biofilm. To combat biofilm formation, researchers have developed some drugs that act by dispersing the biofilm after it has formed, while other drugs work to prevent the initial aggregation of the bacteria. However, biofilms have proven remarkably resilient to these dispersal and anti-aggregation drugs, and some researchers have suggested that this resilience is partly due to the fact that _______	Which choice most logically completes the text?		A) bacteria in biofilms generally reproduce at a slower rate than bacteria that are not part of a biofilm, which may diminish their susceptibility to some antibiotics.	B) the bacteria within biofilms are often genetically distinct from populations of the same bacteria strain that are not part of a biofilm.	C) biofilm matrices can change in composition in response to the introduction of antibiotics or anti-biofilm drugs, which may render those treatments ineffective.	D) some of the bacteria within biofilms remain metabolically inactive even as the biofilm itself continues to grow and develop, which may limit the effectiveness of some treatments.	D	0	0	2024-04-17 04:55:13.833233+00	4	Question 16		
107	Jane Austen, one of the most beloved authors in the English language, is known for her witty novels of manners that offer keen social commentary on early 19th-century England. Her works, _______ Pride and Prejudice and Sense and Sensibility, continue to captivate readers today with their sharp humor and complex characters.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) including	B) which include	C) such as	D) like those of	C	0	0	2024-04-17 04:56:50.208904+00	4	Question 17		
213	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 20:46:52.6979+00	8	Question 15  Graph		
116	While researching a topic, a student has taken the following notes:\r\n     -Tutankhamun, often referred to as "King Tut," was an Egyptian pharaoh who ruled from approximately 1332 to 1323 BCE.\r\n     -He ascended to the throne when he was around nine years old, and he died while still a teenager.\r\n     -Tutankhamun's tomb, discovered in 1922 by Howard Carter, was incredibly well-preserved and contained thousands of artifacts.\r\n    -The discovery of Tutankhamun's tomb provided archaeologists with valuable information about ancient Egyptian burial practices and beliefs.	The student wants to make a generalization about Tutankhamun. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Tutankhamun ascended to the throne at a young age, and his reign was short.	B) Howard Carter discovered Tutankhamun's tomb in 1922.	C) Tutankhamun was a pharaoh who ruled ancient Egypt in the 14th century BCE.	D) The contents of Tutankhamun's tomb helped archaeologists learn about ancient Egyptian beliefs about death and the afterlife.	A	0	0	2024-04-17 05:11:16.320863+00	4	Question 26		
117	While researching a topic, a student has taken the following notes:\r\n•\tScientists have discovered microplastics, tiny pieces of plastic less than 5 millimeters in size, in every ocean on Earth.\r\n•\tMicroplastics are a form of pollution that pose a threat to marine life.\r\n•\tFish, shellfish, and other sea creatures can consume microplastics, which can harm them.\r\n•\tMicroplastics can also bioaccumulate in the food chain, eventually reaching humans who consume seafood.\r\n•\tScientists are investigating how to remove microplastics and prevent further microplastic pollution.	The student wants to emphasize the risks microplastics pose to marine environments. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Plastics degrade over time into tiny pieces known as microplastics, which can then threaten various forms of ocean life.	B) Scientific study of microplastics is focused on cleanup strategies and ways to prevent their creation.	C) Microplastics pollute all of Earth's oceans, and their presence in the food chain can be harmful to marine creatures and even humans.	D) Ocean pollution is a serious environmental problem, with plastic being one of the major pollutants of concern.	C	0	0	2024-04-17 05:12:38.379106+00	4	Question 27		
120	Recent discoveries in paleoanthropology have prompted scientists to consider a more _______ chronology of human evolution, one in which hominid species did not progress in a linear fashion but rather coexisted, interacted, and even interbred, painting a complex picture of our ancestors' history.	Which choice completes the text with the most logical and precise word or phrase?		A) simplistic	B) orderly	C) fragmented	D) interconnected	D	0	0	2024-04-17 05:24:53.867521+00	5	Question 3		
119	The political candidate’s platform is centered on fostering an inclusive community where diversity is not just accepted but _______; his proposals include cultural festivals and initiatives to support businesses owned by people from all walks of life, illustrating a commitment to the richness of a diverse society.	Which choice completes the text with the most logical and precise word or phrase?		A) penalized	B) ostracized	C) celebrated	D) trivialized	C	0	0	2024-04-17 05:17:56.879694+00	5	Question 2		
118	In an attempt to make literature more engaging for elementary students, the latest series of educational books pairs each story with vibrant illustrations that _______ the narrative, providing a visual narrative that enhances understanding and adds to the enjoyment of the reading experience.	Which choice completes the text with the most logical and precise word or phrase?		A) contradict	B) ignore	C) complicate	D) complement	D	0	0	2024-04-17 05:16:50.216789+00	5	Question 1		
121	The plan for the city's waterfront revitalization is a _______ collection of ideas, incorporating environmentally sustainable building practices, areas for community gatherings, and public art projects, all aimed at creating a vibrant district that reflects the city's commitment to innovation and inclusivity.	Which choice completes the text with the most logical and precise word or phrase?		A) mismatched	B) homogeneous	C) disorganized	D) cohesive	D	0	0	2024-04-17 05:27:02.407707+00	5	Question 4		
122	Analyzing the complexities of 19th-century romantic poetry, the scholar draws attention to the _______ struggle between the societal constraints of the era and the personal aspirations of the poets, who used their verse as a means of exploring and pushing against the rigid boundaries of their time.	Which choice completes the text with the most logical and precise word or phrase?		A) overt	B) superficial	C) negligible	D) underlying	D	0	0	2024-04-17 05:28:01.639243+00	5	Question 5		
123	Analyzing the complexities of 19th-century romantic poetry, the scholar draws attention to the _______ struggle between the societal constraints of the era and the personal aspirations of the poets, who used their verse as a means of exploring and pushing against the rigid boundaries of their time.	Which choice completes the text with the most logical and precise word or phrase?		A) overt	B) superficial	C) negligible	D) underlying	D	0	0	2024-04-17 05:28:01.689512+00	5	Question 6		
124	The complexity of the market dynamics in the economist's new model is underscored by a _______ constellation of factors, ranging from consumer behavior patterns and international trade policies to environmental impacts and political unrest, each interwoven to influence the pulse of the global economy.	Which choice completes the text with the most logical and precise word or phrase?		A) meager	B) bare	C) scant	D) multifaceted	D	0	0	2024-04-17 05:29:02.751781+00	5	Question 7		
258	Jane Austen's Pride and Prejudice (1813) is a novel of manners and social commentary.  Austen uses satire to expose the absurdity of social conventions in her time.	Which quotation from Pride and Prejudice most effectively illustrates the claim?		A) "Happiness in marriage is entirely a matter of chance."	B) "A lady's imagination is very rapid; it jumps from admiration to love, from love to matrimony in a moment."	C) "His sense of her inferiority – of its being a degradation – of the family obstacles which had always opposed to inclination, were dwelt on with a warmth."	D) "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."	D	0	0	2024-04-17 23:46:08.696288+00	10	Question 6		
287	Edgar Degas' paintings and sculptures of the late 19th century often depict ballet dancers. Degas challenges idealized representations of ballet by focusing on the physical strain and behind-the-scenes realities of dancers' lives.	Which of the following art historical analyses best illustrates the claim?		A) "Degas' use of loose brushwork and unusual perspectives creates a sense of spontaneity and immediacy."	B) "Degas was fascinated with the movement of the human body, and his dancer work demonstrates a keen understanding of anatomy."	C) "Degas’ representations of dancers often include unglamorous details like strained expressions, awkward poses, and scenes of dancers adjusting their costumes."	D) "Ballet in the 19th century was heavily associated with idealized beauty and elegance."	C	0	0	2024-04-18 00:21:26.652887+00	11	Question 8		
125	"The Age of Wonder" is a sweeping historical novel set during the peak of the Age of Enlightenment, following the lives of pioneering scientists and philosophers. "In the bustling cafes of Paris and the quiet study rooms of London, a fervor for knowledge swept through the brightest minds. Characters like Émilie, a brilliant mathematician, debated fervently with the likes of Voltaire and Newton, challenging ideas and sparking revolutions in thought. The air was electric with discovery, every conversation a spark that could light the fires of insight or ignite controversy. The pursuit of understanding was relentless, an insatiable hunger to unravel the mysteries of nature and the human condition." The novel captures the spirit of an era where intellectual curiosity was the catalyst for profound change.	What theme does the text suggest about the Age of Enlightenment?		A) It was a period marked by social and political upheaval due to scientific debates.	B) It was an era of passionate intellectual exploration and groundbreaking discovery.	C) It primarily centered around the technological advancements in communication.	D) It was a time of isolation for intellectuals who were misunderstood by society.	B	0	0	2024-04-17 05:31:13.130746+00	5	Question 8		
126	The autobiography "Beyond the Summit" recounts the life of mountaineer Tara Singh, who overcame numerous challenges to summit the world's highest peaks. "Tara's breaths were labored as she inched along the knife-edge ridge; the summit of Kanchenjunga loomed ahead, veiled in mist and defiance. Each step was a battle of wills against nature's brute force, yet there was harmony in the push and pull of this dance with the mountain. Tara's journey was more than a conquest of rock and ice; it was an odyssey of the soul, seeking the purest of truths at the apex of the world. As she planted her flag, it was not a territory claimed but a testament to the spirit's indomitable reach."	What is the narrative focus in Tara Singh's story?		A) The competitive nature of mountaineering and its rivalries.	B) The physical and spiritual journey in conquering a mountain.	C) The detailed technical aspects of mountaineering equipment.	D) The geopolitical implications of planting a flag on a summit.	B	0	0	2024-04-17 05:32:13.774205+00	5	Question 9		
127	William Shakespeare's Hamlet (written around 1600) is a classic revenge tragedy filled with themes of madness, inaction, and mortality. Hamlet's inner conflict over avenging his father's death drives the plot of the play.	Which quotation from Hamlet most effectively illustrates the claim?		A) "O, that this too too solid flesh would melt / Thaw, and resolve itself into a dew!"	B) "The time is out of joint. O cursèd spite, / That ever I was born to set it right!"	C) "There are more things in heaven and earth, Horatio,/ Than are dreamt of in your philosophy."	D) "To be, or not to be, that is the question—/ Whether 'tis nobler in the mind to suffer..."	B	0	0	2024-04-17 05:34:04.495167+00	5	Question 10		
128	Voices of the Past: Reviving Ancient Languages" is a compelling exploration of language revival movements around the globe. This in-depth study presents the multifaceted endeavors of linguists, educators, and indigenous communities to breathe new life into languages that have fallen silent. The author delves into the stories of people rediscovering their linguistic roots, the methodologies employed to teach these tongues to new generations, and the technologies facilitating this cultural renaissance. Each chapter is a testament to the enduring strength of language as the fabric of culture, offering insights into how language revival can heal historical wounds and restore a sense of identity. The text not only documents these revivals as linguistic phenomena but also as movements of cultural empowerment and affirmation, painting a hopeful picture of cultural continuity and revival.	Which choice best states the main purpose of the text?		A) To discuss the linguistic complexities and grammar of ancient languages.	B) To celebrate successful instances of ancient languages being fully restored in daily use.	C) To narrate the emotional and cultural significance of reviving ancient languages.	D) To evaluate different educational programs focused on ancient language instruction.	C	0	0	2024-04-17 05:35:27.528384+00	5	Question 11		
129	The art of origami, or paper folding, has evolved over centuries into a diverse and intricate artform. Traditional origami often depicts animals and flowers, using colorful paper and a limited number of folds to create recognizable figures. Modern origami artists have developed even more complex techniques, employing hundreds or even thousands of folds to create remarkably detailed sculptures. Some origami artists use mathematics and computer software to assist in designing models, pushing the creative boundaries of what can be achieved with a single sheet of paper.	Which choice best states the main idea of this text?		A) Computer software is now an essential tool in the creation of complex origami art.	B) Modern origami is more difficult to master than traditional origami.	C) Traditional origami is less respected than modern origami in the art world.	D) Origami has developed significantly over time, becoming more complex and detailed.	D	0	0	2024-04-17 05:36:42.011823+00	5	Question 12		
130	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 05:37:01.137273+00	5	Question 13 Graph		
131	Graph	Graph		Graph	Graph	Graph	Graph	B	0	0	2024-04-17 05:37:19.593295+00	5	Question 14 Graph		
132	In ancient Mesopotamia, the Akkadian king Sargon the Great expanded the territory under his rule to encompass most of Mesopotamia and parts of modern-day Syria while also establishing new trade routes with distant lands. Some scholars studying ancient Mesopotamia have argued that the Akkadians’ conquest of new territories was crucial in facilitating the exchange of ideas and innovations throughout the region, as the new trading routes created connections between peoples who had previously little interaction. However, some historians have expressed doubts about this argument, suggesting that many of the most important technological advances of the Mesopotamian Bronze Age, such as the development of bronze metallurgy and wheeled vehicles, occurred much earlier than the Akkadians’ rise to power. Moreover, some historians maintain that long-distance trade networks linking Mesopotamia with parts of the eastern Mediterranean existed long before Sargon’s time. Therefore, it seems that _______	Which choice most logically completes the text?		A) Sargon the Great sought to maintain his rule primarily through the use of military force and paid relatively little attention to developing his kingdom economically.	B) many historians have overestimated the contributions of the Akkadians to civilization in Mesopotamia, while underestimating or neglecting the importance of peoples who lived in Mesopotamia before them.	C) the Akkadians were better military strategists and conquerors than they were political and economic administrators.	D) the Akkadians may have played an important role in disseminating innovations throughout Mesopotamia, but it is unlikely that they were responsible for creating many of those innovations.	D	0	0	2024-04-17 05:39:47.975315+00	5	Question 15		
133	In the nineteenth century, most paleontologists believed that the dinosaurs were uniformly large, but this belief came to be widely questioned in the latter half of the twentieth century with the discovery of dinosaur fossils representing a broader range of species, including some that were smaller than an average human. For example, fossils of the Compsognathus, an agile carnivorous theropod that lived during the Jurassic period, indicate that individuals of the species were likely no larger than chickens. Moreover, the Velociraptor, a dromaeosaurid from the Late Cretaceous period, was likely similar in size to a turkey. Thus, it now appears that _______	Which choice most logically completes the text?		A) the evolution of larger body sizes did not emerge among dinosaurs until well after the end of the Triassic period.	B) many species of herbivorous dinosaurs probably evolved large sizes to deter attacks by smaller theropods such as Compsognathus and Velociraptor.	C) fossils representing dinosaur species of relatively modest size are less likely to be fossilized and preserved as well as those representing larger species.	D) some previously discovered dinosaur fossils have been incorrectly identified as representing individuals of species that were larger than those individuals actually were.	D	0	0	2024-04-17 05:41:03.311855+00	5	Question 16		
134	The ancient Maya, who inhabited parts of present-day Mexico and Central America, built complex cities with towering pyramids, sophisticated astronomical observatories, and a system of hieroglyphic writing _______ is still being deciphered today.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) which this	B) , which	C) who	D) , the latter which	B	0	0	2024-04-17 05:42:39.565113+00	5	Question 17		
135	During the Renaissance, a period of cultural and intellectual rebirth in Europe, artists and scholars rediscovered the art, literature, and philosophy of ancient Greece and Rome. This renewed interest in classical ideas ______ inspired a flowering of creativity in all fields of human endeavor.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) having	B) has	C) , it	D) and	B	0	0	2024-04-17 05:44:07.629533+00	5	Question 18		
136	The Harlem Renaissance was an artistic movement in 1920s New York City that celebrated African American culture. Writers like Langston Hughes, Zora Neale Hurston, and Countee Cullen ______ prominent figures in this vibrant outpouring of creativity.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) became	B) have become	C) was becoming	D) will become	A	0	0	2024-04-17 05:45:11.627647+00	5	Question 19		
137	Although octopuses are known for their intelligence and ability to change color, scientists continue to uncover new and surprising facts about these remarkable creatures. Recent research ______ that octopuses can "see" with their skin by using light-sensitive proteins.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) shows it	B) does show	C) shows	D) is showing	C	0	0	2024-04-17 05:46:16.764948+00	5	Question 20		
138	During the construction of the Panama Canal, engineers faced significant challenges due to the terrain and diseases like malaria. One of the most effective strategies for combating these issues was _______ extensive measures to control the mosquito population, which carried the disease.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) implementing	B) implement	C) implements	D) implemented	A	0	0	2024-04-17 05:47:32.600896+00	5	Question 21		
139	The theory of plate tectonics, which explains the movement of the Earth's lithosphere, has been instrumental in understanding natural phenomena such as earthquakes and volcanic eruptions. According to this theory, the lithosphere is divided into several _______ that float on the semi-fluid asthenosphere beneath them.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) plate	B) plates	C) plate’s	D) plates’	B	0	0	2024-04-17 05:48:23.838366+00	5	Question 22		
143	While researching a topic, a student has taken the following notes:\r\n•\tJane Austen is known for her novels of manners, which focus on the social conventions and customs of early 19th-century England.\r\n•\tMany of Jane Austen’s novels center on strong female characters who must navigate the complex rules of courtship and marriage.\r\n•\tOne such character is Elizabeth Bennet, the protagonist of Pride and Prejudice.\r\n•\tWhile many of Austen's contemporaries focused on sentimental themes, her works are lauded for their wit and social commentary.	The student wants to write a short essay about Austen's unique approach to writing. Which choice includes information relevant to this topic?		A) Elizabeth Bennet and her sisters are among Austen's most memorable characters.	B) Austen's novels like Pride and Prejudice were written in the early 1800s and reflect social practices of the time.	C) Austen's novels often focus on the challenges women faced in terms of marriage and social mobility.	D) Jane Austen's novels employ satire and social observation, distinguishing them from more sentimental works of her time.	D	0	0	2024-04-17 05:54:05.088245+00	5	Question 26		
140	Wolves and coyotes are both members of the Canidae family, but they exhibit distinct behavioral differences. Wolves are highly social animals that live and hunt in packs. ______, coyotes are generally solitary hunters and tend to be more adaptable to a wider range of habitats.	Which choice completes the text with the most logical transition?		A) As a result,	B) Thus,	C) Instead,	D) In contrast,	D	0	0	2024-04-17 05:50:00.898815+00	5	Question 23		
141	Many species across the animal kingdom use camouflage as a defense mechanism. ______, the stick insect, with its slender body and brown coloration, blends seamlessly with the twigs it inhabits, making it difficult for predators to detect.	Which choice completes the text with the most logical transition?		A) Thus,	B) For instance,	C) Moreover,	D) Nevertheless,	B	0	0	2024-04-17 05:51:33.471376+00	5	Question 24		
142	Bats and birds both evolved the ability to fly, but they achieved this feat through vastly different evolutionary paths. Bats are mammals, and their wings are formed by a thin membrane of skin stretched between elongated fingers. ______, birds are feathered creatures whose wings evolved from modified forelimbs, and their flight is powered by strong pectoral muscles.	Which choice completes the text with the most logical transition?		A) In contrast,	B) Therefore,	C) Similarly,	D) As a result,	A	0	0	2024-04-17 05:52:48.81995+00	5	Question 25		
144	While researching a topic, a student has taken the following notes:\r\n•\tLeonardo da Vinci was a Renaissance artist, scientist, and inventor.\r\n•\tHe is famous for paintings such as the Mona Lisa.\r\n•\tDa Vinci was also fascinated by anatomy and mechanics.\r\n•\tHe filled notebooks with detailed sketches of the human body and innovative machine designs.\r\n•\tMany of the inventions da Vinci sketched were never built during his lifetime.	The student wants to highlight the connection between da Vinci's interests. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Da Vinci was a multitalented Renaissance figure, excelling in areas as diverse as art, science, and engineering.	B) Leonardo da Vinci's most famous work, the Mona Lisa, showcases his mastery of painting techniques.	C) Da Vinci studied the human form, as evidenced by the anatomical accuracy of his renowned artworks.	D) While some of Da Vinci's inventions were simply theoretical, they demonstrate his futuristic thinking.	A	0	0	2024-04-17 05:56:08.418352+00	5	Question 27		
145	The novel’s narrative is a _______ construct, with the author employing a self-referential style that merges layers of fiction, prompting readers to discern reality within the characters' stories and examine the philosophical questions around the nature of storytelling itself.	Which choice completes the text with the most logical and precise word or phrase?		A) sequential	B) one-dimensional	C) transparent	D) nested	D	0	0	2024-04-17 07:59:46.385077+00	6	Question 1		
146	In arguing against the constitutional amendment, the legal scholar brings forth a _______ analysis of historical precedents, combining a deep reading of archival documents with contemporary legal theories, to mount a comprehensive case for the protection of individual freedoms.	Which choice completes the text with the most logical and precise word or phrase?		A) cursory	B) superficial	C) perfunctory	D) nuanced	D	0	0	2024-04-17 08:01:31.666737+00	6	Question 2		
147	The new symphony by the contemporary composer is an expansive meditation on the _______ experiences of human emotion, using a broad palette of musical motifs and textures to explore the ebb and flow of feelings in a way that challenges the audience to embrace the full spectrum of joy, sorrow, and everything in between.	Which choice completes the text with the most logical and precise word or phrase?		A) manifold	B) monolithic	C) unvaried	D) one-dimensional	A	0	0	2024-04-17 08:02:54.239852+00	6	Question 3		
148	Venturing into the speculative realm of astrophysics, the new cosmological theory posited by the researcher outlines a scenario in which our observable universe might be one of countless others, a mere bubble in an ever-expanding _______ of realities, each with its own unique laws and constants.	Which choice completes the text with the most logical and precise word or phrase?		A) established	B) familiar	C) froth	D) traditional	C	0	0	2024-04-17 08:04:14.829955+00	6	Question 4		
149	The genre of science fiction has long served as a canvas for exploring complex ideas about society, technology, and the future. Through narratives that stretch the bounds of the possible, science fiction encourages readers to question the ethical implications of technological advancement and to consider how changes in technology might shape human societies. One recurring theme is the relationship between humans and artificial intelligence (AI). This theme not only examines the potential of AI to transform daily life but also delves into deeper questions about consciousness, identity, and what it means to be human. --By projecting current technological trends into future scenarios, science fiction offers a valuable perspective on the potential consequences and ethical dilemmas of our technological choices.-- This reflective aspect of science fiction underscores its importance not just as entertainment but as a form of societal commentary.	Which choice best describes the function of the underlined sentence in the passage?		A) It explains how science fiction uses the theme of AI to explore future possibilities.	B) It argues for the significance of science fiction in understanding technological impact.	C) It describes the method by which science fiction engages with technological issues.	D) It highlights the role of science fiction in predicting technological advances.	B	0	0	2024-04-17 08:06:07.432951+00	6	Question 5		
150	The practice of meditation has seen a resurgence in popularity as individuals seek ways to reduce stress and improve mental health in the fast-paced modern world. Traditionally rooted in spiritual and religious practices, meditation today is often approached as a secular activity focused on mindfulness and self-awareness. Studies have shown that regular meditation can have a profound impact on mental well-being, including reduced anxiety, improved concentration, and enhanced emotional stability. --This shift towards a secular understanding of meditation reflects broader societal trends towards personal wellness and mental health awareness.-- As meditation becomes more mainstream, its practices and techniques are being adapted to fit a variety of lifestyles, making it more accessible to a wider audience.	Which choice best describes the function of the underlined sentence in the passage?		A) It identifies the reasons behind the growing popularity of meditation.	B) It provides a transition from the history of meditation to its current applications.	C) It illustrates how societal changes have influenced perceptions of meditation.	D) It highlights the benefits of meditation in the context of modern lifestyle demands.	C	0	0	2024-04-17 08:07:07.778024+00	6	Question 6		
151	In the detective novel "Shadows Over Baker Street," Sherlock Holmes confronts a series of supernatural events in Victorian London. "The fog lay thick upon Baker Street as Holmes and Watson navigated the labyrinthine alleyways. A chilling howl pierced the night, hinting at mysteries that defied rational explanation. Holmes, a man of logic, found himself grappling with shadows that seemed to slip through the grasp of deduction. Watson observed his friend's furrowed brow and knew that this case might shake the very foundations of Holmes's empirical beliefs."	What does the text suggest about the challenges faced by Holmes?		A) He is confident in his ability to solve crimes of a supernatural nature.	B) He is troubled by a case that challenges his reliance on logic.	C) He is indifferent to Watson's concerns about the nature of the case.	D) He is primarily concerned with the dangers posed by the foggy environment.	B	0	0	2024-04-17 08:08:31.47138+00	6	Question 7		
152	"Ripples in the Stream" is a poetic exploration of the passage of time and life's transient moments. "Sitting by the babbling brook, the poet's thoughts meandered like the gentle water before her. Leaves drifted on the surface, each a small vessel on a grand voyage through the currents of existence. 'Each ripple tells a story,' she mused, 'of love found and lost, of dreams born and surrendered to the embrace of the stream.' The water was her muse, reflecting the ebb and flow of life itself, inspiring verses that sought to capture the fleeting whispers of time."	What is the poet's inspiration in "Ripples in the Stream"?		A) The stability and permanence of nature.	B) The dramatic upheavals caused by natural disasters.	C) The ongoing and ever-changing movement of water.	D) The technical aspects of constructing a waterway.	C	0	0	2024-04-17 08:09:19.326801+00	6	Question 8		
153	The Great Depression was a severe economic crisis that had global repercussions, lasting from approximately 1929 to the late 1930s. Unemployment rates soared, with millions of people struggling to find work and provide for their families. Banks failed, causing people to lose their life savings, and businesses were forced to shut down. Governments around the world implemented various policies aimed at stimulating the economy, but recovery was slow. The legacy of the Great Depression shaped economic thought and policymaking for decades to come.	Which choice best states the main idea of this text?		A) The Great Depression led to the collapse of numerous businesses and widespread financial hardship.	B) It took years for the global economy to fully recover from the Great Depression.	C) Governments took different approaches to addressing the challenges caused by the Great Depression.	D) The Great Depression was a major economic downturn that had a wide-ranging global impact.	D	0	0	2024-04-17 08:10:37.10095+00	6	Question 9		
154	Marie Curie was a pioneering scientist whose research transformed our understanding of radioactivity. She discovered two new elements, polonium and radium, and together with her husband, Pierre Curie, she shared the 1903 Nobel Prize in Physics for their work in the field. Her groundbreaking research had numerous applications, including the development of X-rays and radiation therapy for cancer. Curie also championed the use of mobile radiography units during World War I to aid battlefield surgeons.	Which choice best states the main idea of this text?		A) Marie Curie was the first person to receive two Nobel Prizes.	B) Marie Curie was a brilliant scientist whose work in the field of radioactivity had a profound impact.	C) Marie Curie faced challenges as a woman working in science during her time.	D) Marie Curie's discoveries had significant medical applications.	B	0	0	2024-04-17 08:12:05.118472+00	6	Question 10		
155	In a research paper, a student critiques portrayals of Napoleon Bonaparte in 19th-century European history textbooks.  The textbooks reflect a nationalistic bias in their representations of Napoleon.	Which quotation from a textbook excerpt would best illustrate the student's claim?		A) "Despite his tactical brilliance, Napoleon's imperial ambitions were ultimately thwarted, leaving France diminished and exhausted from years of war."	B) "Napoleon was a military genius whose innovative strategies transformed warfare on the European continent, but his downfall was inevitable."	C) "The legendary emperor was either a heroic liberator, spreading the ideals of the French Revolution or a dangerous autocrat consumed by a thirst for power."	D) "The Napoleonic Code brought significant legal reforms but also centralized his authority and limited individual freedoms."	A	0	0	2024-04-17 08:15:03.823743+00	6	Question 11		
156	Psychology and Technology:** Dr. Felix Adler's recent work explores the impact of social media usage on adolescent self-esteem and identity formation. His study involves monitoring the social media behavior of teenagers and correlating it with measures of self-esteem and identity coherence over time. Dr. Adler hypothesizes that frequent exposure to highly curated content on social media platforms can distort adolescents' perceptions of self-worth and hinder the development of a stable sense of identity, due to constant comparisons with unrealistic representations.	Which outcome from Dr. Adler's study, if true, would most directly support his hypothesis?		A) Adolescents who spend more time on social media platforms exhibit lower self-esteem and less coherent identity measures compared to their peers who use social media less frequently.	B) The content type (e.g., curated vs. authentic posts) viewed by adolescents on social media does not significantly affect their self-esteem scores.	C) Teenagers report using social media primarily for connecting with friends and family rather than browsing curated content, suggesting different primary uses of these platforms.	D) A control group of adolescents with no social media usage shows no significant difference in self-esteem and identity formation metrics compared to their counterparts who use social media.	A	0	0	2024-04-17 08:16:15.64197+00	6	Question 12		
157	Economic Sociology:** Professor Helen Zhu's research examines the relationship between neighborhood diversity and economic mobility in urban environments. Drawing on extensive demographic and economic data, Zhu hypothesizes that neighborhoods with higher levels of racial, ethnic, and socioeconomic diversity tend to offer greater opportunities for economic mobility. This is posited to result from a richer array of community resources, broader social networks, and a more dynamic local economy that collectively facilitate upward mobility.	Which finding would most directly support Professor Zhu's hypothesis?		A) A comparative study finds that homogenous neighborhoods have lower levels of social conflict, suggesting that diversity might bring challenges alongside its benefits.	B) Surveys reveal that residents of diverse neighborhoods report higher levels of satisfaction with local amenities and services, indicating a perceived higher quality of life.	C) Economic data indicate that neighborhoods with higher levels of diversity also have higher average incomes, but do not directly link this to individual economic mobility.	D) Statistical analysis shows that individuals from diverse urban neighborhoods have higher upward mobility rates compared to those from more homogenous neighborhoods.	D	0	0	2024-04-17 08:17:14.688612+00	6	Question 13		
158	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 08:17:32.789633+00	6	Question 14 Graph		
159	Graph	Graph		Graph	Graph	Graph	Graph	B	0	0	2024-04-17 08:17:45.659893+00	6	Question 15  Graph		
161	The American poet Ezra Pound was associated with the modernist movement in literature, and many of his poems are marked by their inclusion of fragmented images and references to diverse literary and historical sources without providing direct explanations of the significance or meaning of these references. While some critics and readers dismiss these practices as pretentious or simply confusing, some Pound scholars defend them, arguing that his seemingly disjointed poems offer glimpses of deeper, underlying meanings that the reader must actively piece together. Because Pound was known to be a scholar of several East Asian languages and cultures, some of his defenders argue that _______	Which choice most logically completes the text?		A) many of the seemingly disjointed references in Pound’s poems reflect his interest in Japanese haiku, which are known for their oblique and allusive imagery.	B) some readers fail to appreciate the deeper meanings in Pound’s poems because they are unfamiliar with the many historical sources and literary traditions he drew upon.	C) much of Pound’s work was experimental, and he intentionally avoided traditional poetic forms in favor of new forms that were better suited to expressing his ideas.	D) despite their sometimes challenging nature, Pound’s poems can provide profound insights into the nature of beauty, loss, and the human condition.	A	0	0	2024-04-17 08:25:41.197155+00	6	Question 17		
162	The art of bonsai, which originated in Asia, involves cultivating miniature trees that mimic the shape and scale of full-size trees. Enthusiasts believe that caring for these plants requires not just skill but also a profound _______ for the aesthetics of nature.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) appreciates	B) appreciated	C) appreciation	D) appreciating	C	0	0	2024-04-17 08:27:07.895849+00	6	Question 18		
163	In the realm of digital security, encryption plays a crucial role in protecting information from unauthorized access. One of the most common methods is the Secure Sockets Layer (SSL), which _______ data transmitted over the internet.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) encrypt	B) encrypts	C) encrypted	D) encrypting	B	0	0	2024-04-17 08:28:10.352984+00	6	Question 19		
160	In the human body, the digestive enzyme trypsin breaks down proteins, peptides, and certain amino acids. Like most enzymes, trypsin functions within a relatively narrow range of temperatures and is denatured—meaning that it loses its structure and function—at temperatures much higher than that of the human body. However, it has recently been discovered that trypsin retains its enzymatic properties at temperatures that are several degrees below the freezing point of water. Consequently, some biomedical researchers believe that trypsin may have applications in _______	Which choice most logically completes the text?		A) preventing or ameliorating certain autoimmune disorders by disrupting molecular signaling pathways involved in triggering autoimmune responses.	B) the cryopreservation of organs and tissues, as trypsin could be used to break down cell membranes that can be damaged during freezing.	C) improving the effectiveness of certain cancer chemotherapies by breaking down proteins essential for the growth and proliferation of tumors.	D) the treatment of diseases of the digestive system associated with an underproduction of trypsin by the pancreas.	B	0	0	2024-04-17 08:23:06.450905+00	6	Question 16		
164	The study of linguistics involves understanding how languages are structured, evolved, and used in social contexts. One area of interest is sociolinguistics, which examines how language varies and changes in _______ social interactions and cultural norms.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) relation to	B) relation with	C) related to	D) relates to	A	0	0	2024-04-17 08:29:27.045865+00	6	Question 20		
165	The human brain is a complex organ composed of billions of interconnected neurons _______ responsible for everything from our thoughts and emotions to our movements and senses.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) and it is	B) that are	C), and they are	D) , which is	B	0	0	2024-04-17 08:30:41.544651+00	6	Question 21		
166	Many traditional medicines around the world are derived from plants. For example, the bark of the willow tree contains salicin, ______ a natural compound with pain-relieving and fever-reducing properties.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) that is	B) is	C) being	D) what is	A	0	0	2024-04-17 08:31:48.948088+00	6	Question 22		
167	Photosynthesis is the process by which plants and other organisms convert light energy into chemical energy. During this process, plants absorb carbon dioxide from the atmosphere ______ produce oxygen as a byproduct.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) , and they also	B) and they also	C) ; and also they	D) : and they also	B	0	0	2024-04-17 08:33:47.864369+00	6	Question 23		
170	While researching a topic, a student has taken the following notes:\r\n•\tWilfred Owen was a British poet and soldier who fought in World War I.\r\n•\tMany of his poems describe the horrors of trench warfare.\r\n•\tOne of his most famous poems is "Dulce et Decorum Est."\r\n•\tThe title of the poem, which translates to "It is sweet and right," is a quote from Roman poet Horace.\r\n•\tThe poem graphically describes a gas attack and its aftermath, harshly contradicting the title's sentiment.	The student wants to analyze the use of irony in Owen's poem. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Owen's poetry vividly reflects the realities of combat during World War I.	B) The Latin phrase in the title of Owen's poem was originally used to glorify war.	C) Owen's "Dulce et Decorum Est" juxtaposes an idealized notion of war with its grim reality, creating a powerful sense of irony.	D) World War I was the first major conflict to use chemical weapons, a fact reflected in Owen's work.	C	0	0	2024-04-17 08:40:38.600717+00	6	Question 26		
169	The ability to solve problems creatively is a highly valued skill across various disciplines. Creative problem-solving often involves divergent thinking, the ability to generate multiple solutions to a problem. ______, it requires the capacity to analyze potential solutions, identify the most promising ones, and then develop a plan for implementation.	Which choice completes the text with the most logical transition?		A) However,	B) Furthermore,	C) Therefore,	D) Nevertheless,	B	0	0	2024-04-17 08:39:14.018751+00	6	Question 25		
171	While researching a topic, a student has taken the following notes:\r\n•\tIn the 19th century, many Indigenous groups on the Great Plains lived a nomadic lifestyle, following the vast herds of buffalo.\r\n•\tAfter the Civil War, the US government encouraged white settlers to move into the Great Plains, leading to increased conflict.\r\n•\tThe US government implemented policies intended to force Indigenous people to abandon their traditional ways of life.\r\n•\tAs white settlers decimated the buffalo herds, many Indigenous groups faced starvation and were forced onto reservations.\r\n•\tIn 1890, US soldiers massacred unarmed Lakota people near Wounded Knee Creek in South Dakota, marking the end of major armed resistance on the Plains.	The student wants to explain a cause of the Wounded Knee Massacre. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) The US government had the intention of forcing Indigenous people to conform to white American ways of life and settle on reservations.	B) The Lakota were a nomadic Indigenous nation whose lifestyle centered on the hunting of buffalo.	C) Conflicts between Indigenous groups and white settlers became increasingly common as white settlers encroached on traditional Indigenous lands.	D) The Wounded Knee Massacre was one of many tragic events that arose from tensions between Indigenous groups and the US government.	A	0	0	2024-04-17 08:43:02.502711+00	6	Question 27		
172	In the heart of the bustling city, the newly inaugurated public park has become a sanctuary for urban dwellers, with families, joggers, and nature enthusiasts _______ to this green oasis to find a slice of tranquility amid the concrete jungle, making it the most visited recreational space in the downtown area.	Which choice completes the text with the most logical and precise word or phrase?		A) converging	B) dispersing	C) diverging	D) detracting	A	0	0	2024-04-17 08:45:10.480709+00	7	Question 1		
173	Growing up on the rugged coast of Maine, the future marine biologist was perpetually _______ by the mysteries of the deep, dedicating countless hours to exploring tide pools and coastal caves, a passion that laid the foundation for her pioneering research in ocean conservation.	Which choice completes the text with the most logical and precise word or phrase?		A) enthralled	B) dismayed	C) bored	D) preoccupied	A	0	0	2024-04-17 08:46:18.57345+00	7	Question 2		
174	The initiative to revitalize the old town square was warmly _______ by the local shop owners, who saw an opportunity to attract more foot traffic to their businesses through the introduction of open-air markets, street performances, and the restoration of historical monuments that tell the story of the town's rich cultural heritage.	Which choice completes the text with the most logical and precise word or phrase?		A) ignored	B) censured	C) embraced	D) dismissed	C	0	0	2024-04-17 08:47:32.903811+00	7	Question 3		
175	As the city prepared for the annual international food festival, local restaurants and food trucks were _______ with excitement, anticipating the chance to showcase their culinary creations to a wider audience and celebrate the diverse tastes and flavors that the city's varied cultural communities had to offer.	Which choice completes the text with the most logical and precise word or phrase?		A) brimming	B) flagging	C) lacking	D) floundering	A	0	0	2024-04-17 08:48:26.543527+00	7	Question 4		
176	Text 1: The loss of indigenous languages is a global crisis, with languages disappearing and taking with them centuries of cultural knowledge and identity. Efforts to revitalize extinct or endangered languages involve not just linguistic research but also community engagement and educational programs. Language revitalization is crucial for preserving cultural heritage and empowering communities to maintain their identity in the face of globalization.\r\n\r\nText 2: Linguist Maria Gonzalez and her team are at the forefront of revitalizing the once-extinct Yawuru language. Through immersive language camps and digital learning tools, they aim to reconnect the Yawuru people with their ancestral tongue. Gonzalez emphasizes that the success of language revitalization projects hinges on community involvement and the integration of language into daily life. She cautions that while technological aids are helpful, the heart of revitalization lies in personal connections and cultural practices.	Based on the texts, how would Gonzalez (Text 2) most likely respond to the general approach to language revitalization described in Text 1?		A) By agreeing with the importance of community engagement and adding that the integration of cultural practices is equally vital for successful revitalization.	B) By criticizing the emphasis on educational programs, suggesting instead a focus solely on digital tools for broader reach.	C) By acknowledging the challenges presented but arguing that the approach underestimates the potential impact of immersive language camps.	D) By supporting the methods mentioned and further recommending an expansion of digital learning tools to accelerate the revitalization process.	A	0	0	2024-04-17 08:49:37.536311+00	7	Question 5		
177	The Renaissance, a period of vibrant artistic and intellectual activity, marked a departure from the Middle Ages and led to the birth of modern Europe. This era, spanning from the 14th to the 17th century, saw unprecedented advancements in art, science, and thought, largely fueled by a revived interest in the learning and aesthetics of ancient Greece and Rome. Notable figures such as Leonardo da Vinci and Michelangelo pushed the boundaries of art, while thinkers like Galileo and Copernicus revolutionized the way we understand our universe. --This period’s emphasis on human potential and creativity laid the foundation for future generations to question, innovate, and explore beyond the accepted beliefs of their time.-- It was not just a rebirth of classical culture but also a celebration of human achievement and the limitless possibilities of the human mind.	Which choice best describes the function of the underlined sentence in the passage?		A) It summarizes the achievements of the Renaissance in various fields.	B) It explains the reasons behind the Renaissance’s focus on classical cultures.	C) It highlights the Renaissance’s impact on future intellectual and artistic endeavors.	D) It contrasts the Renaissance with the preceding historical period.	C	0	0	2024-04-17 08:50:43.510698+00	7	Question 6		
178	In recent years, the debate around privacy and technology has intensified. With the advent of social media and smartphones, personal information is more accessible than ever before. This accessibility raises questions about the balance between the benefits of technology and the right to privacy. Legislators and tech companies are grappling with these issues, attempting to create frameworks that protect users while still promoting innovation and the free flow of information.\r\n--The struggle to define privacy in the digital age underscores the complex relationship between technology's rapid advancement and society's values and norms.-- It reveals how technological progress can both empower and endanger, pushing us to reconsider what we value as individuals and communities.	Which choice best describes the function of the underlined sentence in the passage?		A) It introduces the main topic of the debate surrounding privacy and technology.	B) It outlines the specific challenges faced by legislators and tech companies.	C) It provides a conclusion about the impacts of technology on privacy.	D) It emphasizes the dilemmas posed by technological developments to societal values.	D	0	0	2024-04-17 08:51:34.444979+00	7	Question 7		
179	In the children's adventure book "The Secret of the Old Mill," three friends uncover a hidden mystery in their hometown. "The old mill had stood abandoned for years, its silhouette a gnarled finger against the sky. Legends swirled amongst the town's folk, of treasures and traps left by the eccentric miller. Lucas, Sarah, and Jamal, backpacks filled with curiosity and courage, tiptoed through the creaking doors. Cobwebs glistened like ancient lace, and the smell of history hung heavy in the air. Each floorboard whispered secrets, urging the trio deeper into the heart of the mill's forgotten tales."	According to the text, what motivates the children's exploration?		A) The pursuit of academic knowledge about the mill's history.	B) The desire to refurbish and reopen the old mill.	C) The thrill of unraveling the legends and mysteries of the mill.	D) The need to escape from their mundane daily routines.	C	0	0	2024-04-17 08:52:38.696918+00	7	Question 8		
180	"The Mosaic of Heartbeats" is a contemporary romance novel about connections made and lost in the digital age. "Anna scrolled through her phone, each swipe a leap of hope toward finding a kindred spirit. She paused at a profile that promised conversations of stars and sonnets, of midnight musings and sunrise confessions. 'Here's to finding a heart that speaks the language of mine,' she whispered, sending a message into the void. The city pulsed around her, a tapestry of lives intersecting and parting, each person a pixel in the grand picture of the urban heartbeat."	What theme is central to "The Mosaic of Heartbeats"?		A) The struggle to maintain privacy in an increasingly connected world.	B) The search for genuine connection amidst the noise of social media.	C) The negative effects of technology on face-to-face communication.	D) The importance of maintaining an active social media presence.	B	0	0	2024-04-17 08:53:29.739087+00	7	Question 9		
181	Jazz is a unique American art form that emerged in the early 20th century, blending influences from African and European musical traditions. Characterized by improvisation, syncopated rhythms, and a distinctive melodic phrasing known as "swing," jazz has become one of the most influential musical genres worldwide. Notable figures like Louis Armstrong, Duke Ellington, and Miles Davis have all shaped the evolution of jazz. Today, jazz continues to thrive and evolve, with musicians exploring its boundaries and infusing it with new influences.	Which choice best states the main idea of this text?		A) Jazz is an American musical style rooted in African and European sounds, and it has had worldwide impact.	B) Louis Armstrong, Duke Ellington, and Miles Davis are important figures in the history of jazz music.	C) Improvisation is a key element that makes jazz unique in comparison to other musical genres.	D) Jazz music remains innovative as artists continue to experiment and push its boundaries.	A	0	0	2024-04-17 08:55:20.679282+00	7	Question 10		
182	"When Waves Speak," a narrative essay by marine biologist Dr. Kara Simmons, delves into the communication systems of cetaceans. Dr. Simmons recounts her years at sea, studying the complex patterns of whale songs and dolphin clicks. She provides a detailed account of her breakthrough discovery that certain whale populations modify their vocalizations in response to human-generated ocean noise. The essay interweaves personal reflections on the trials and triumphs of field research with a broader discussion on the importance of understanding and preserving the acoustic environment of our oceans. Simmons advocates for the protection of marine life from the cacophony of underwater noise pollution, emphasizing the intrinsic value of these creatures and their right to a silent sea.	Which choice best states the main purpose of the text?		A) To present a chronological history of marine acoustic research.	B) To describe the personal journey of a scientist dedicated to marine conservation.	C) To explore the communicative abilities of cetaceans and the impact of noise pollution on their world.	D) To argue for stricter global regulations on oceanic travel and industry.	C	0	0	2024-04-17 08:56:26.606197+00	7	Question 11		
183	In the feature article "Skylines and Beyond: The Architecture of the Future," architectural critic Martin Cheng provides an analysis of the evolving trends in urban building designs. Cheng explores how architects are integrating sustainability and innovation to create structures that address the challenges of climate change and urban density. He reviews several recent high-profile projects around the world that embody this fusion of functionality and environmental stewardship. Additionally, Cheng contemplates the philosophical shifts driving these changes, discussing how contemporary architecture reflects our society's values and aspirations towards a more harmonious relationship with the planet.	Which choice best states the main purpose of the text?		A) To offer a guide on sustainable materials and practices in modern architecture.	B) To showcase Cheng's personal opinions on notable buildings he admires.	C) To chronicle the historical development of architectural styles over the centuries.	D) To examine the intersection of sustainability and aesthetic innovation in contemporary architecture.	D	0	0	2024-04-17 08:57:16.171253+00	7	Question 12		
184	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 08:57:31.56716+00	7	Question 13 Graph		
185	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 08:57:54.393841+00	7	Question 14 Graph		
186	In early modern Europe, the invention of the printing press and growing levels of literacy among the general population contributed to the spread of vernacular literature—works written in the everyday languages spoken by ordinary people, rather than in Latin. At the same time, the growth of humanism, a philosophical and scholarly movement that celebrated human reason and achievement, led to a renewed interest in works of classical literature and philosophy written in Latin and Greek. Some scholars of early modern Europe have posited that the growth of humanist scholarship may have led to a decline in the production of important vernacular literary works during this time period. However, a number of scholars have disputed this claim, arguing that _______	Which choice most logically completes the text?		A) the spread of print increased the demand for new writing in both classical and vernacular languages, even as it greatly increased the dissemination of existing Latin and Greek texts.	B) many of the leading literary figures associated with early modern humanism also made substantial contributions to the vernacular literature of their respective countries.	C) Latin and Greek continued to be the languages of science, philosophy, and law throughout the early modern period, meaning that vernacular languages were primarily used for literary and religious works.	D) some of the most important vernacular literary works of the early modern period were inspired by or were direct translations of texts in Latin or Greek.	A	0	0	2024-04-17 09:01:11.245862+00	7	Question 15		
187	In most mammals, the physiological processes involved in determining biological sex are fairly straightforward, with individuals carrying either a pair of X chromosomes (XX) or an X and a Y chromosome (XY) from early in embryonic development. Some mammals, however, have considerably more complex sex-determination systems. For instance, among platypuses, individuals can have as many as five pairs of X chromosomes. Moreover, an individual with XY chromosomes will develop as female if a particular gene on the Y chromosome is not functional. Therefore, it seems that _______	Which choice most logically completes the text?		A) the study of sex-determination systems among platypuses may eventually provide insights into how complex sex-determination systems evolved from simpler ones.	B) the presence or absence of Y chromosomes is not universally determinative of biological sex across the animal kingdom, as it is in most mammals.	C) the evolutionary history of sex-determination systems is surprisingly diverse and is probably still poorly understood even by the evolutionary biologists who study them.	D) the complex sex-determination system among platypuses probably arose as a defense mechanism to help the species evade predators.	B	0	0	2024-04-17 09:03:47.085131+00	7	Question 16		
188	In the scientific method, researchers begin by formulating a hypothesis, _______ a testable explanation for a phenomenon, and then design experiments to collect data that either support or refute the hypothesis.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) and this is	B) , this is	C) which is	D) and it is	C	0	0	2024-04-17 09:05:37.206201+00	7	Question 17		
189	The periodic table of elements is a fundamental tool in chemistry. Elements are arranged on the table according to their atomic number ______ the number of protons in their nuclei.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) :	B),	C) ;	D) –	D	0	0	2024-04-17 09:06:46.673256+00	7	Question 18		
190	The theory of relativity, developed by Albert Einstein in the early 20th century, revolutionized our understanding of space, time, and gravity. Einstein's theory _______ that gravity is a consequence of the curvature of spacetime.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) has postulated	B) posits	C) is positing	D) will have postulated	B	0	0	2024-04-17 09:09:49.159228+00	7	Question 19		
191	The concept of democracy, a system of government in which power is vested in the people, can be traced back to ancient Athens. In Athenian democracy, _______ citizens participated directly in government decision-making.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) male	B) males	C) the male	D) a male	A	0	0	2024-04-17 09:10:45.586902+00	7	Question 20		
192	Many bird species migrate long distances between their breeding grounds and wintering grounds. The Arctic tern, _______ a seabird, holds the record for the longest annual migration of any known animal.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) moreover,	B) such as,	C) in addition,	D) for example,	D	0	0	2024-04-17 09:12:04.229154+00	7	Question 21		
193	The ancient Egyptian pyramids, constructed over 4,500 years ago, were built primarily as tombs for the pharaohs. These massive structures, ______ the Great Pyramid of Giza, remain some of the most impressive architectural feats in human history.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) included	B) including	C) that include	D) which includes	B	0	0	2024-04-17 09:13:25.35733+00	7	Question 22		
197	While researching a topic, a student has taken the following notes:\r\n•\tCamouflage is an adaptive trait that helps animals hide from predators or prey.\r\n•\tStick insects resemble sticks and twigs, making them difficult for predators to spot.\r\n•\tThe leafy seadragon is a type of fish that blends in seamlessly with seaweed.\r\n•\tThe Arctic fox changes its coat color between winter (white) and summer (brown) to match its surroundings.\r\n•\tStudies show that camouflage increases an organism's chances of survival.	The student wants to describe the adaptive advantage of camouflage. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Camouflage comes in many forms, from a stick insect's body shape to the seasonal color change of the Arctic fox.	B) Animals use camouflage to avoid detection so they are more likely to survive and reproduce.	C) Stick insects, leafy seadragons, and Arctic foxes are all examples of animals that use camouflage.	D) The development of camouflage in various species highlights the process of natural selection.	B	0	0	2024-04-17 09:22:56.787388+00	7	Question 26		
194	The Renaissance was a period of cultural and intellectual flourishing that began in Italy during the 14th century and later spread throughout Europe. This era marked a renewed interest in classical art, literature, and philosophy. ______, Renaissance artists like Leonardo da Vinci and Michelangelo produced masterpieces that exemplified a focus on realism, perspective, and human anatomy.	Which choice completes the text with the most logical transition?		A) Specifically,	B) Consequently,	C) In contrast,	D) For instance,	D	0	0	2024-04-17 09:15:11.421942+00	7	Question 23		
195	Ecosystems are complex networks of living organisms and their physical environment, where all components are interconnected. Changes in one part of an ecosystem can have cascading effects on other organisms and processes. ______, the reintroduction of wolves to Yellowstone National Park dramatically reshaped the ecosystem, leading to a reduction in deer populations and a subsequent increase in vegetation along riverbanks.	Which choice completes the text with the most logical transition?		A) As a result,	B) In contrast,	C) To illustrate,	D) Likewise,	C	0	0	2024-04-17 09:18:06.199585+00	7	Question 24		
196	Classical physics, largely based on the laws of motion developed by Sir Isaac Newton, provides a highly accurate framework for understanding the behavior of macroscopic objects moving at relatively slow speeds. ______, quantum mechanics, a cornerstone of modern physics, describes the realm of atoms and subatomic particles, where counterintuitive phenomena like superposition and entanglement occur.	Which choice completes the text with the most logical transition?		A) Consequently,	B) Furthermore,	C) In contrast,	D) On the other hand,	C	0	0	2024-04-17 09:21:41.139522+00	7	Question 25		
259	In the culinary mystery "A Pinch of Intrigue," a famed chef uncovers a secret ingredient to a century-old recipe that could elevate his bistro to fame. "Chef Alain surveyed his domain, the clatter of pots and sharp commands a familiar melody. The recipe was his white whale, its secrets locked within a tattered journal. 'To concoct a dish that whispers of history, of a time when cuisine was alchemy,' he mused, 'is to serve a feast for the soul.' As he blended exotic spices with classic techniques, the kitchen became his canvas, each ingredient a color to complete the masterpiece."	What is Chef Alain's ambition in the novel?		A) To preserve the traditional cooking methods of his heritage.	B) To solve the mystery of the recipe and achieve culinary fame.	C) To discover a culinary breakthrough that redefines modern dining.	D) To compete in a prestigious cooking competition and win a coveted award.	B	0	0	2024-04-17 23:47:18.162123+00	10	Question 7		
198	While researching, a student has taken notes on music from the 1960s:\r\n•\tMusic of the 1960s reflected the social and political upheaval of the era.\r\n•\tMusicians like Bob Dylan and Joan Baez wrote protest songs critical of war and social injustice.\r\n•\tThe Beatles were incredibly popular throughout the decade, with their sound evolving over time.\r\n•\tCountercultural movements of the 1960s expressed themselves and their ideals through music and festivals like Woodstock.	The student wants to describe ways music reflected broader trends of the 1960s. Which choice most effectively uses relevant information from the notes?		A) Popular musicians of the era, such as Bob Dylan and The Beatles, had a major impact on youth culture.	B) Protest songs, a dominant form of 1960s music, reflected the political and social activism of the decade.	C) The 1960s marked a shift in music where traditional forms were challenged or adapted to express current themes.	D) Musical festivals played a key role in shaping the cultural identity of the counterculture movement in the 1960s.	B	0	0	2024-04-17 09:24:00.11194+00	7	Question 27		
199	The local theater's production of 'Romeo and Juliet' brought a fresh perspective to the classic play, with a cast that was _______ in both preparation and performance, leading to a series of sold-out shows and rave reviews that hailed it as a reinvigorated interpretation for a modern audience.	Which choice completes the text with the most logical and precise word or phrase?		A) deficient	B) zealous	C) nonchalant	D) haphazard	B	0	0	2024-04-17 20:31:08.468679+00	8	Question 1		
200	In her latest historical novel, the author skillfully _______ the fabric of the early 20th-century society through the eyes of two families from starkly different socioeconomic backgrounds, weaving a narrative that highlights the disparities, tensions, and aspirations that defined the era's class system.	Which choice completes the text with the most logical and precise word or phrase?		A) unravels	B) stitches	C) expounds	D) dismantles	B	0	0	2024-04-17 20:32:25.930158+00	8	Question 2		
201	The university's groundbreaking research on climate change has not only _______ significant advancements in the field but also fostered a new generation of scientists who are committed to developing innovative strategies for mitigating the impact of global warming on vulnerable ecosystems around the world.	Which choice completes the text with the most logical and precise word or phrase?		A) sidetracked	B) hindered	C) catalyzed	D) rescinded	C	0	0	2024-04-17 20:33:09.145942+00	8	Question 3		
202	As the lead detective on a high-profile case, she _______ the investigation with a combination of seasoned intuition and meticulous attention to detail, piecing together disparate clues that eventually led to the apprehension of a suspect who had long eluded capture by law enforcement.	Which choice completes the text with the most logical and precise word or phrase?		A) navigated	B) relinquished	C) obstructed	D) vacated	A	0	0	2024-04-17 20:34:32.435444+00	8	Question 4		
203	"Harmony in Motion: The Dance of the Dragonfly," by entomologist Dr. Rachel Nguyen, is an in-depth essay on the flight mechanics of dragonflies. Dr. Nguyen details her extensive observations and studies, illustrating how dragonflies achieve their aerial dexterity through a combination of rapid wing beats and precise neural control. Her essay also reflects on the dragonfly's significance in various cultures as a symbol of adaptability and poise. Nguyen argues that studying these insects can provide valuable insights into the development of technology inspired by biomimicry, such as advanced robotics and agile drones.	Which choice best states the main purpose of the text?		A) To narrate the lifecycle and metamorphosis of dragonflies.	B) To provide a scientific explanation of the flight mechanisms of dragonflies and their cultural symbolism.	C) To advocate for the conservation of dragonfly habitats worldwide.	D) To compare the flight of dragonflies with other insect species.	B	0	0	2024-04-17 20:37:16.185187+00	8	Question 5		
204	Charles Darwin, a 19th-century naturalist, proposed a groundbreaking theory that forever altered our understanding of the natural world: evolution by natural selection. Darwin sailed around the world on the voyage of the HMS Beagle, meticulously collecting and observing biological specimens. His observations, particularly in the Galapagos Islands, led him to conclude that species were not fixed but rather changed over time. Darwin argued that organisms best adapted to their environments are more likely to survive and reproduce, passing on their favorable traits to their offspring. Over many generations, these inherited traits become more common within a population, leading to the gradual evolution of species. While Darwin's ideas initially met resistance, the accumulation of scientific evidence, including the fossil record and advances in genetics, has provided overwhelming support for his theory of evolution by natural selection.	Which choice best states the main idea of this text?		A) Darwin's voyage on the HMS Beagle provided crucial evidence in the development of his evolutionary theory.	B) The concept of evolution suggests that all species have evolved from a common ancestor over a vast stretch of time.	C) Charles Darwin's theory of evolution by natural selection revolutionized scientific understanding of how species change over time.	D) Darwin's ideas about evolution were largely rejected by the scientific community at the time of their publication.	C	0	0	2024-04-17 20:38:53.222224+00	8	Question 6		
205	In "The Lingering Notes: The Role of Music in Memory Care," music therapist Elise Donovan discusses the therapeutic effects of music on individuals with memory impairment. Through a series of case studies and personal accounts from her practice, Donovan demonstrates how music can unlock memories and emotions, providing comfort and connection for those with dementia and Alzheimer's disease. The essay explores the neurological basis for music's impact on cognitive functions and discusses the practical applications of music therapy in care settings. Donovan makes a compelling argument for the integration of music into standard care practices, underscoring its non-invasive nature and profound benefits.	Which choice best states the main purpose of the text?		A) To investigate the neurological disorders that cause memory loss.	B) To outline the procedures and techniques used in music therapy sessions.	C) To describe the influence of music on memory retention and emotional well-being in patients with memory impairment.	D) To criticize the lack of funding for arts programs in medical facilities.	C	0	0	2024-04-17 20:39:54.120358+00	8	Question 7		
206	The concept of sustainability has evolved to encompass a broad range of practices aimed at preserving the planet for future generations. It is not only about environmental conservation but also involves economic and social dimensions, ensuring that development meets the needs of the present without compromising the ability of future generations to meet their own needs. Sustainable practices are applied in various sectors, from agriculture and manufacturing to energy production and urban planning. --Adopting a holistic approach to sustainability requires understanding its interconnectedness with all aspects of human activity and the natural world.-- This perspective encourages actions that are beneficial across environmental, economic, and social spheres, demonstrating how integrated efforts can lead to meaningful change.	Which choice best describes the function of the underlined sentence in the passage?		A) It defines the term "sustainability" and its importance.	B) It transitions from a general discussion of sustainability to specific practices.	C) It emphasizes the comprehensive nature of sustainability efforts.	D) It illustrates the outcomes of sustainable practices in various sectors.	C	0	0	2024-04-17 20:41:09.571415+00	8	Question 8		
207	The concept of time travel has fascinated humans for centuries, manifesting across various cultures through myths, legends, and eventually, scientific speculation. This fascination underscores a profound desire to explore the unknowns of our existence and rectify past mistakes, or to glimpse into the future. In literature and cinema, time travel serves as a vehicle for complex storytelling, allowing authors and filmmakers to explore themes of fate, free will, and the interconnectedness of time and human experience. --In essence, time travel narratives challenge our understanding of linear time and invite us to consider the myriad ways in which our lives are woven into the fabric of history and the future.-- Such stories often suggest that every action has consequences, reverberating through time and affecting the course of events in unforeseen ways.	Which choice best describes the function of the underlined sentence in the passage?		A) It provides examples of how time travel is portrayed in popular media.	B) It explains the philosophical implications of time travel in storytelling.	C) It summarizes the historical origins of the time travel concept.	D) It introduces the concept of time travel as a subject of scientific study.	B	0	0	2024-04-17 20:42:03.294773+00	8	Question 9		
208	In the historical fiction "Echoes of the Empire," the central character is a retired general, Marcus, reflecting on the rise and fall of his career against the backdrop of a changing realm. "Marcus stood upon the balcony of his villa, the panorama of the bustling marketplace a stark contrast to the silent battlefields of his memory. The clink of armor had been replaced by the hum of commerce, the war cries by the banter of merchants. 'Empires rise and fall,' he mused, 'on the tide of time, each wave a generation's legacy. And here I stand, a relic of a bygone era, pondering my place in the annals of history.' His hands, once steady with the weight of a sword, now shook as he held letters from old comrades."	Based on the text, how does Marcus view his current situation?		A) He feels out of touch with the peaceful progress of the marketplace.	B) He regrets the time spent away from home during his military service.	C) He considers himself a vital part of the empire's ongoing prosperity.	D) He is content with trading the chaos of war for a life of quiet reflection.	A	0	0	2024-04-17 20:43:21.321426+00	8	Question 10		
209	"Whispers in the Library" is a novel that intertwines the lives of characters frequenting an ancient library rumored to be haunted. "The library's gothic arches loomed overhead, casting long shadows that played with the mind. Emma reached for a leather-bound tome, its spine cracking like the echo of a secret being unfolded. They say the ghost of the librarian wanders these aisles, her specter a sentinel of the stories held within these walls. But for Emma, the whispers were not of apparitions, but of authors past, their words a bridge across the chasm of time, calling out to be remembered, to be lived once more."	What drives Emma's experience in the library?		A) A desire to solve the mystery of the librarian's disappearance.	B) The thrill of engaging with supernatural occurrences.	C) A connection with the historical significance of the books.	D) An assignment to catalog the library's oldest manuscripts.	C	0	0	2024-04-17 20:44:06.798718+00	8	Question 11		
210	Planetary Science and Astrochemistry:** The research of Dr. Emily Santos focuses on the chemical composition of exoplanets' atmospheres, aiming to understand the potential for habitability beyond our solar system. By analyzing the light spectra from distant planets, Dr. Santos and her team can infer the presence of molecules like water vapor, methane, and carbon dioxide, which are critical for life as we know it. Santos hypothesizes that the presence of a balanced mix of these molecules in an exoplanet's atmosphere significantly increases the likelihood of habitable conditions.	Which discovery would most directly support Dr. Santos's hypothesis?		A) An exoplanet is found with an atmosphere containing detectable levels of water vapor, methane, and carbon dioxide, along with a temperature range that could support liquid water on its surface.	B) Several exoplanets with atmospheres dominated by hydrogen and helium show no signs of water vapor or methane, aligning with current understandings of gas giant composition.	C) An exoplanet's atmosphere is observed to contain oxygen and ozone, suggesting the possibility of photosynthetic life but not directly indicating habitability.	D) A distant exoplanet is found to have an atmosphere with extremely high levels of carbon dioxide, leading to a greenhouse effect that makes the surface temperature too high for known life forms.	A	0	0	2024-04-17 20:45:22.476814+00	8	Question 12		
211	Historical Linguistics and Cultural Transmission:** Dr. Amara Singh's groundbreaking research delves into the evolution of language patterns within isolated communities in the Himalayan region. By comparing linguistic structures and vocabularies across communities that have had minimal contact with each other or the outside world for centuries, Dr. Singh aims to uncover how geographical isolation impacts language evolution and cultural transmission. Her hypothesis suggests that while isolated, these communities would develop unique linguistic features; however, shared environmental challenges and similar societal structures might lead to convergent evolution in some aspects of their languages.	Which finding would most compellingly support Dr. Singh's hypothesis?		A) Analysis of linguistic data shows that each isolated community has developed a distinct set of phonetic and grammatical rules that do not appear in the languages of neighboring communities.	B) Despite geographical isolation, certain linguistic structures related to agriculture and kinship are remarkably similar across communities, suggesting convergent evolution in response to shared environmental and social factors.	C) Historical records indicate that these communities had intermittent contact with each other and with traders from other regions, introducing new words into their vocabularies.	D) Linguistic analysis reveals that the languages of these communities are more closely related to ancient languages documented in the region than to each other, pointing to a preservation of ancient linguistic features rather than convergence or divergence.	B	0	0	2024-04-17 20:46:13.616471+00	8	Question 13		
212	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 20:46:32.685027+00	8	Question 14 Graph		
214	Although most people probably associate meteors with comets—since many of the most visible meteor showers are caused by Earth passing through trails of debris released from comets as they orbit the sun—many meteors are actually small fragments of asteroids. Asteroids are generally considered to be relatively stable, but collisions and close gravitational interactions between asteroids sometimes result in their being perturbed from their stable orbits and sent careening into space. Some such asteroids, or fragments from them, eventually intersect with Earth’s orbit, and, if they are drawn into Earth’s atmosphere, may burn up and appear as meteors. Although it is very unlikely that any large asteroid will collide with Earth anytime in the near future, some astronomers express concern that _______	Which choice most logically completes the text?		A) fragments from asteroids are more unpredictable in their movements than are comets and can be difficult to track from Earth using telescopes.	B) large asteroids entering Earth’s atmosphere have the potential to cause tsunamis and earthquakes, even if they do not directly collide with Earth’s surface.	C) the impact of a small asteroid only a few tens of meters in diameter could still devastate the area surrounding the impact site and cause widespread damage.	D) even small asteroid fragments can penetrate far into Earth’s atmosphere before burning up, which is why many meteor sightings occur far from the locations of known comets.	C	0	0	2024-04-17 20:48:25.239656+00	8	Question 16		
215	The study of genetics focuses on the inheritance of traits from one generation to the next and is essential for understanding diseases, developing new medical treatments, and improving crop yields. Gregor Mendel, a 19th-century Austrian monk, _______ considered the father of modern genetics for his experiments on pea plants.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) is	B) will be	C) had been	D) has been	D	0	0	2024-04-17 20:50:12.618343+00	8	Question 17		
216	The theory of plate tectonics explains the large-scale movements of Earth's lithosphere, or the planet's rigid outer layer. Tectonic plates _______ in constant, slow motion, resulting in phenomena such as earthquakes, volcanic eruptions, and the formation of mountains and ocean basins.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) they are	B) are	C) which are	D) will be	B	0	0	2024-04-17 20:50:52.934268+00	8	Question 18		
217	The Industrial Revolution, a major economic and social transformation, began in Great Britain in the 18th century. It was characterized by a transition from manual labor-based economies to machine-based manufacturing. New technologies and innovations emerged, ______ to fundamental changes in society.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) resulting	B) resulting in	C) and resulted	D) while resulting	B	0	0	2024-04-17 20:51:44.769678+00	8	Question 19		
218	Neurotransmitters are chemical messengers that play a crucial role in the communication between neurons, or nerve cells, in the brain. ______ neurotransmitters are released from one neuron, they travel across a small gap, or synapse, and bind to receptors on the next neuron.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) Whenever	B) In addition, when	C) If	D) While	A	0	0	2024-04-17 20:57:13.684656+00	8	Question 20		
219	During metamorphosis, some animals undergo radical physical transformations as they transition from one life stage to another. Caterpillars, for example, transform into butterflies through a process that involves dissolving their internal tissues and then rebuilding them ______ a winged adult form.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) as	B) into	C) with	D) by	B	0	0	2024-04-17 20:59:10.129732+00	8	Question 21		
220	The ancient philosophers Socrates, Plato, and Aristotle are considered giants of Western philosophy. Socrates, known for his "Socratic method" of questioning, challenged his students to examine their beliefs and sought truth through rational inquiry. His student Plato ______ founded the Academy in Athens, one of the earliest institutions of higher learning in the Western world.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) subsequently	B) subsequently,	C) ; subsequently,	D) , subsequently,	D	0	0	2024-04-17 21:01:18.964825+00	8	Question 22		
221	The study of linguistics involves the scientific investigation of human language. Linguists analyze the structure of language, how it is acquired, and ______ it changes over time.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) how	B) the ways	C) in addition to how	D) that	A	0	0	2024-04-17 21:03:01.961385+00	8	Question 23		
224	While researching a topic, a student has taken the following notes:\r\n•\tOptical illusions trick our brains into seeing something that isn't really there.\r\n•\tSome illusions use lines and shapes to create a false sense of depth or distortion.\r\n•\tOther illusions are based on how our brains process color and contrast.\r\n•\tThe McCollough effect is an illusion in which viewers who alternate staring at red and green grids will begin to perceive the opposite colors when looking at black and white grids.\r\n•\tScientists study optical illusions to better understand human visual perception.	The student wants to explain how visual illusions work. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Optical illusions, such as the McCollough effect, demonstrate how our perception can be manipulated.	B) Our visual system interprets visual cues to create our perception of reality, and illusions exploit this process.	C) The study of visual illusions is an important area of research for psychologists and neuroscientists.	D) Color, shape, depth, and contrast are elements that our brains process to form images, and illusions manipulate these elements.	D	0	0	2024-04-17 21:07:59.673545+00	8	Question 26		
223	Symbiotic relationships are interactions between organisms of different species that can be beneficial, harmful, or neutral. One classic example of mutualism, a type of symbiotic relationship where both species benefit, is the interaction between certain plants and their mycorrhizal fungi. ______, the fungi live in close association with the plant's roots, increasing the plant's ability to absorb water and nutrients, while the plant provides sugars produced through photosynthesis to the fungi.	Which choice completes the text with the most logical transition?		A) For instance,	B) In contrast,	C) Furthermore,	D) As a result,	A	0	0	2024-04-17 21:06:32.313558+00	8	Question 25		
225	While researching a topic, a student has taken the following notes:\r\n•\tThe Declaration of Independence, written in 1776, proclaimed the separation of the thirteen American colonies from Great Britain.\r\n•\tThe main author of the Declaration of Independence was Thomas Jefferson.\r\n•\tJefferson was influenced by Enlightenment philosophy, a movement that emphasized reason and individual rights.\r\n•\tThe Declaration of Independence begins by asserting the natural rights of all people, including "life, liberty, and the pursuit of happiness."\r\n•\tThe Declaration lists a series of grievances against King George III to justify the colonies' decision to break away.	The student wants to explain how Enlightenment ideas shaped the Declaration of Independence. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) The Declaration of Independence is an important historical document that marks the founding of the United States.	B) Thomas Jefferson, the primary author of the Declaration of Independence, incorporated Enlightenment ideals about individual rights and the purpose of government.	C) The Declaration of Independence lists the colonists' reasons for seeking independence from Great Britain.	D) Enlightenment philosophers of the 17th and 18th centuries advocated for the use of reason and logic.	B	0	0	2024-04-17 21:09:09.169022+00	8	Question 27		
226	The government's policy on renewable energy _______ an era of technological innovation, with incentives for research and development that have spurred advancements in wind, solar, and hydroelectric power, aiming to reduce the nation's dependence on fossil fuels and create a more sustainable future.	Which choice completes the text with the most logical and precise word or phrase?		A) terminates	B) retrogrades	C) heralds	D) repeals	C	0	0	2024-04-17 21:11:23.70219+00	9	Question 1		
227	The controversial economist's latest publication presents a _______ critique of the central bank's policies during the financial crisis, arguing that the measures taken were not only ineffective but also exacerbated economic inequality, igniting a fierce debate among scholars and policymakers alike.	Which choice completes the text with the most logical and precise word or phrase?		A) mild	B) tepid	C) laudatory	D) scathing	D	0	0	2024-04-17 21:12:49.161423+00	9	Question 2		
228	The bioengineer's work on synthetic organ development stands at the _______ edge of medical science, with her team pioneering techniques that could one day lead to fully functional, lab-grown replacements for damaged human organs, thereby revolutionizing transplant medicine.	Which choice completes the text with the most logical and precise word or phrase?		A) obsolete	B) trailing	C) unremarkable	D) cutting	D	0	0	2024-04-17 21:13:32.429081+00	9	Question 3		
229	The small coastal village, renowned for its annual seafood festival, saw residents and chefs _______ together to showcase their culinary delights, with stalls lining the harbor and the air filled with the tempting aromas of freshly cooked dishes, creating an event that celebrated both the bounty of the sea and the local traditions that have been passed down through generations.	Which choice completes the text with the most logical and precise word or phrase?		A) aimlessly gathering	B) sporadically converging	C) enthusiastically collaborating	D) reluctantly participating	C	0	0	2024-04-17 21:14:25.065742+00	9	Question 4		
230	The community center’s new initiative to bridge the digital divide was met with _______ support from local businesses, leading to the donation of computers and free internet services that provided the town's underprivileged youth with the tools necessary to pursue educational opportunities previously out of their reach, thereby fostering a spirit of inclusivity and hope for the future.	Which choice completes the text with the most logical and precise word or phrase?		A) tepid	B) unanimous	C) lukewarm	D) divisive	B	0	0	2024-04-17 21:15:08.540656+00	9	Question 5		
231	The local artisan's market has become a cornerstone of the neighborhood, with craftspeople from around the region _______ their unique creations, from hand-thrown pottery to custom-made jewelry, offering visitors a glimpse into the diverse array of skills and traditions that the community prides itself on.	Which choice completes the text with the most logical and precise word or phrase?		A) eschewing	B) disregarding	C) showcasing	D) concealing	C	0	0	2024-04-17 21:15:49.189268+00	9	Question 6		
232	Text 1: Artificial Intelligence (AI) is transforming environmental conservation, offering tools for monitoring biodiversity, predicting climate change impacts, and optimizing resource use. AI algorithms can process vast datasets from satellite images, sensor networks, and citizen science projects to identify patterns and trends that would be impossible for humans to discern. This technology is becoming an indispensable part of efforts to protect ecosystems and combat climate change.\r\n\r\nText 2: Environmental technologist Akira Tanaka and her research group are developing AI systems to track wildlife populations and assess habitat health. Tanaka highlights the potential of AI in conservation but also stresses the importance of combining AI insights with traditional ecological knowledge. She argues that AI should augment, not replace, the wisdom of communities that have coexisted with nature for generations. The integration of AI with on-the-ground conservation efforts ensures a holistic approach to environmental protection.	Based on the texts, how would Tanaka (Text 2) most likely critique Text 1’s enthusiasm for AI in conservation?		A) By emphasizing the need to balance AI technology with traditional ecological knowledge for a more comprehensive approach to conservation.	B) By disagreeing with the reliance on AI, arguing that traditional methods are more effective and sustainable in the long term.	C) By cautioning against the potential biases in AI algorithms that could lead to inaccurate predictions and ineffective conservation strategies.	D) By supporting the role of AI but cautioning that the focus on technology might divert attention and resources from urgent on-the-ground conservation needs.	A	0	0	2024-04-17 21:17:45.656594+00	9	Question 7		
233	In Chinua Achebe's novel Things Fall Apart (1958), the Igbo protagonist, Okonkwo, faces a changing world with the arrival of colonialism in Nigeria. Okonkwo's rigid adherence to tradition contributes to his downfall.	Which quotation from Things Fall Apart most effectively illustrates the claim?		A) "Okonkwo's gun had exploded, and a piece of iron had pierced the boy's heart."	B) "Among the Igbo the art of conversation is regarded very highly, and proverbs are the palm-oil with which words are eaten."	C) "Okonkwo did not have the start in life which many young men had... But he was a great man in his time."	D) "Okonkwo was ruled by one passion – to hate everything that his father Unoka had loved. One of those things was gentleness and another was idleness."	D	0	0	2024-04-17 21:19:39.572002+00	9	Question 8		
277	The development of vaccines stands as one of the greatest public health triumphs, revolutionizing the fight against infectious diseases. By exposing the body to a weakened or inactive form of a virus or bacteria, vaccines train the immune system to recognize and combat the real pathogen. ______, should a vaccinated person encounter the actual disease-causing agent, their immune system can rapidly mount a defense, preventing infection or significantly reducing its severity.	Which choice completes the text with the most logical transition?		A) Consequently,	B) In contrast,	C) Therefore,	D) For example,	A	0	0	2024-04-18 00:08:33.367975+00	10	Question 25		
234	In the science fiction tale "Galactic Pioneers," a group of astronauts embarks on a journey to establish the first human colony on an exoplanet. "The spacecraft cut through the cosmic sea, stars streaking past like luminescent fish in the vast ocean of space. Captain Vega monitored the navigation charts, her resolve as fixed as the North Star. 'To venture beyond the final frontier, to plant seeds of humanity in foreign soil,' she announced to her crew, 'this is our Odyssey, our chance to etch our names beside the great explorers of old.' The weight of potential hung in the air, each crew member aware that their actions would ripple through the annals of interstellar exploration."	What is the crew's main objective on their space mission?		A) To chart a new course through unexplored sectors of the galaxy.	B) To claim and mine resources from uncharted planets.	C) To expand human civilization by colonizing a new planet.	D) To compete in a race against other space agencies for intergalactic dominance.	C	0	0	2024-04-17 21:23:32.012421+00	9	Question 9		
235	"The Symphony of Seasons" is a collection of poems that personify the changing moods of the seasons. "Winter's final note hung in the chill air, a frosty pause before the overture of spring. The poet observed the bare branches now dotted with green buds, the earth's slow inhalation as it awakened from slumber. 'Each season performs its part in the grand concert of life,' she penned, 'from the sprightly melody of spring to the solemn dirge of winter. In this cyclical sonata, we find the rhythm of our own existence mirrored in the dance of nature.' Her verses sought to harmonize the human soul with the eternal cycle of renewal and decay."	What concept is explored through the seasonal changes in the poems?		A) The disruption of natural cycles due to climate change.	B) The parallels between human life and the rhythms of nature.	C) The anticipation of holidays and festivities each season brings.	D) The agricultural practices and harvests associated with the seasons.	B	0	0	2024-04-17 21:24:13.760348+00	9	Question 10		
236	Ancient Egypt was a complex and enduring civilization that emerged on the banks of the Nile River over 5,000 years ago. The Egyptians are known for their remarkable achievements in many fields, leaving a lasting legacy that continues to fascinate the world. They developed sophisticated systems of writing, initially in the form of hieroglyphics, sophisticated agricultural practices to take advantage of the fertile Nile Valley, and impressive architectural techniques. Their impressive monuments, including the Great Pyramids of Giza and the temples of Luxor and Karnak, stand as a testament to their engineering prowess and artistic skills. Egyptian religion, with its elaborate afterlife beliefs, a complex array of gods and goddesses, and the mummification of the dead, played a central role in their culture and social structure.	Which choice best states the main idea of this text?		A) The pyramids of Giza are some of the most impressive and awe-inspiring structures ever built by humans.	B) Egyptian cultural practices focused heavily on the concept of the afterlife and ensuring the well-being of the deceased.	C) Ancient Egyptian society revolved around powerful rulers, pharaohs, who were believed to be divine representatives on Earth.	D) Ancient Egypt was an advanced and influential civilization with significant cultural, technological, and religious achievements.	D	0	0	2024-04-17 21:25:17.992474+00	9	Question 11		
237	"Roots of Empathy: Understanding Emotions Across Species," by psychologist Dr. Hannah Lee, is an exploration of emotional intelligence in animals. Dr. Lee synthesizes research from various fields to argue that many animal species exhibit complex emotional responses similar to humans. The text describes experiments and observations that reveal mourning behaviors in elephants, altruism in rats, and joy in birds. Dr. Lee suggests that by recognizing the emotional lives of animals, humans can foster deeper empathy and more ethical treatment of all living creatures. The essay concludes with a call to reevaluate how we interact with animals in the wild, in captivity, and in our homes.	Which choice best states the main purpose of the text?		A) To critique the traditional scientific stance on animal consciousness.	B) To detail the methods used in animal behavior studies.	C) To advocate for animal rights based on evidence of their emotional complexity.	D) To compare human emotions with those observed in animal species.	C	0	0	2024-04-17 21:26:21.254862+00	9	Question 12		
238	Neuroscience is a vast and interdisciplinary field dedicated to the study of the nervous system. This includes the brain, the spinal cord, and the intricate networks of nerves that extend throughout the body. Neuroscientists utilize a wide range of tools and experimental techniques to investigate how the nervous system develops its complex structure, how it functions to process information and control actions, and how it influences our behavior and experiences. Their research explores everything from basic cellular mechanisms to perception, memory, emotion, decision-making, and even the elusive nature of consciousness itself. Neuroscience discoveries not only advance our understanding of the human mind but also have far-reaching applications in medicine. These include the development of treatments for neurological disorders like Alzheimer's and Parkinson's and innovations in technology, such as the creation of brain-computer interfaces that could revolutionize how we interact with machines.	Which choice best states the main idea of this text?		A) Neuroscientists primarily focus on developing new brain-computer interfaces.	B) Neuroscience is a field that investigates the nervous system and its impact on behavior.	C) Neuroscience research has implications for our understanding of consciousness.	D) The treatment of neurological disorders is the primary goal of neuroscientists.	B	0	0	2024-04-17 21:27:39.883831+00	9	Question 13		
239	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 21:27:55.347406+00	9	Question 14 Graph		
240	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 21:28:07.873659+00	9	Question 15  Graph		
241	Many economists subscribe to the notion that markets operate efficiently, meaning that the prices at which goods and services are traded tend to reflect the true value of those goods and services. However, a number of economists, even some who generally believe that markets are efficient, acknowledge that market failures can sometimes occur, such as when externalities exist. Externalities occur when the full production or consumption costs of a good or service are not entirely borne by the parties directly involved in a market transaction. For example, if a factory pollutes the water or the air, the health costs of that pollution are borne by people who do not work at or utilize the factory. The presence of such externalities in a market system generally results in _______	Which choice most logically completes the text?		A) a shortage of the good or service that generates the externality, since its production costs become higher than the price at which producers are willing to sell it.	B) the overproduction of goods and services that generate negative externalities, since the producers of such goods and services do not bear the external costs.	C) government intervention to tax the activities that produce negative externalities and incentivize investment in technologies that can help to mitigate those externalities.	D) reduced demand for goods and services whose production or consumption generates positive externalities, as such externalities add to the cost of those goods and services.	B	0	0	2024-04-17 21:30:16.14763+00	9	Question 16		
242	Until recently, many paleontologists believed that the long, thin spines on the tails of Stegosaurus—an armored dinosaur from the Late Jurassic period—were primarily used for defense. However, analyses of fossilized Stegosaurus tailbones have revealed that some were damaged in ways that are consistent with being struck with great force against a solid object. This finding has led a number of paleontologists to suggest that Stegosaurus may have engaged in intraspecific combat in which individual dinosaurs within the same species fought each other for dominance or for access to mates. Moreover, some paleontologists have theorized that because male Stegosaurus appear to have had slightly wider plates on their backs than did female Stegosaurus, and because females likely invested significant energy in producing large clutches of eggs, _______	Which choice most logically completes the text?		A) competition to dominate herds may have occurred primarily among male Stegosaurus, much as it does among males of some social mammal species today.	B) male Stegosaurus may have engaged in ritualized displays and mock combat using their plates and tails as a way of establishing status without resorting to actual fights that were likely to cause serious injury.	C) female Stegosaurus may have preferred to mate with males that emerged victorious in competitions with other males, which may have provided an evolutionary advantage to larger or more aggressive males.	D) Stegosaurus may have been primarily scavengers rather than herbivores, and the spines on their tails may have been used for fighting off predators or other scavengers trying to claim animal carcasses.	A	0	0	2024-04-17 21:31:45.729688+00	9	Question 17		
243	The scientific method is a systematic approach used to investigate phenomena and acquire new knowledge. It generally involves making observations, asking questions, formulating hypotheses, and ______ experiments to test those hypotheses.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) the conducting of	B) conducting	C) can conduct	D) would conduct	B	0	0	2024-04-17 21:32:57.841696+00	9	Question 18		
244	The Renaissance was a period of cultural and intellectual renewal in Europe following the Middle Ages. Artists and scholars of this period looked to the art and philosophy of ancient Greece and Rome ______ seeking inspiration and new perspectives.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) for they were	B) , for they were	C) , as they were	D) ; they were	C	0	0	2024-04-17 21:35:04.031515+00	9	Question 19		
245	The Roman Colosseum, an amphitheater in Rome, was completed in 80 CE. It was used for gladiatorial contests, public executions, and animal hunts, ______ could accommodate up to 80,000 spectators.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) the latter which	B) and it	C) while it	D) , and it was	B	0	0	2024-04-17 21:36:41.423447+00	9	Question 20		
246	Climate change is a long-term shift in Earth's average temperatures and weather patterns. It is primarily caused by human activities, such as burning fossil fuels, ______ release greenhouse gases into the atmosphere.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) which this	B) this	C) with these	D) which	D	0	0	2024-04-17 21:37:39.900523+00	9	Question 21		
247	The human body is a complex system of interconnected organs, tissues, and cells that work together to sustain life. Each organ system, ______ the circulatory system or the respiratory system, performs specialized functions that contribute to overall health.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) or rather	B) such as	C) as well as	D) including	B	0	0	2024-04-17 21:38:41.313995+00	9	Question 22		
248	The concept of human rights recognizes that all individuals, regardless of their nationality, race, gender, or any other status, are entitled to certain fundamental freedoms. The Universal Declaration of Human Rights, adopted by the United Nations in 1948, ______ a landmark document that outlines these basic rights.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) is considered as	B) considers	C) is considered	D) considering	C	0	0	2024-04-17 21:39:38.673768+00	9	Question 23		
250	In "The Nickel Boys," Colson Whitehead places the story of two Black teenagers during the Jim Crow era in the broader context of the American civil rights struggle. _______ the novel intertwines individual fates with the collective experience of racial injustice.	Which choice completes the text with the most logical transition?		A) As such,	B) Meanwhile,	C) Likewise,	D) Conversely,	A	0	0	2024-04-17 22:01:08.782455+00	9	Question 25		
251	While researching a topic, a student has taken the following notes:\r\n•\tSocial media platforms like Facebook, Twitter, and Instagram allow people all over the world to connect and share information.\r\n•\tSocial media can be used to organize events, raise awareness of important issues, and build communities.\r\n•\tSome researchers believe social media can lead to increased feelings of isolation and loneliness.\r\n•\tThe spread of misinformation through social media platforms can have a negative impact on society.\r\n•\tSocial media allows users to curate an idealized version of themselves, which can lead to unrealistic comparisons and decreased self-esteem.	The student wants to emphasize both the benefits and drawbacks of social media. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) While social media offers convenient ways to connect with others, it's important to be aware of its potential negative effects on mental health and its role in spreading false information.	B) Social media is a valuable tool for communication, but it comes with potential risks that users should be mindful of.	C) The way people use social media can shape their experiences and influence how they see the world and themselves.	D) The rise of social media has dramatically transformed communication, both for better and for worse.	A	0	0	2024-04-17 22:02:31.590043+00	9	Question 26		
249	Ecosystems are complex networks of interactions among organisms and between organisms and their environment. These interactions can be competitive, predatory, symbiotic, or mutually beneficial, and they all contribute to the ecosystem's overall balance and health. Understanding these dynamics is crucial for conservation efforts, especially in areas facing rapid environmental changes. _______ scientists use a variety of tools and methods to study these interactions, from field observations to advanced computer modeling.	Which choice completes the text with the most logical transition?		A) For example,	B) In contrast,	C) Still,	D) Moreover,	D	0	0	2024-04-17 21:40:52.880693+00	9	Question 24		
252	While researching a topic, a student has taken the following notes:\r\n•\tMesopotamia, often referred to as the cradle of civilization, was located between the Tigris and Euphrates Rivers.\r\n•\tThe Sumerian civilization, one of the earliest known civilizations, developed in southern Mesopotamia around 3500 BCE.\r\n•\tSumerians invented cuneiform, one of the oldest forms of writing.\r\n•\tThe region of Mesopotamia was ruled by various empires, including the Babylonian, Assyrian, and Persian empires.\r\n•\tThe fertile land between the rivers and innovations like irrigation allowed Mesopotamian civilizations to flourish.	The student wants to explain why Mesopotamia was a suitable place for early civilizations. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Ancient Mesopotamia was home to various influential civilizations, such as the Sumerians and the Babylonians.	B) The Sumerians invented cuneiform, which is a system of writing that uses wedge-shaped symbols.	C) Located between the Tigris and Euphrates Rivers, the fertile lands of Mesopotamia supported agriculture and the development of complex societies.	D) Mesopotamian empires were constantly shifting between different ruling powers throughout history.	C	0	0	2024-04-17 22:03:21.733145+00	9	Question 27		
58	The human heart works tirelessly to sustain life.  A complex network of arteries and veins carries blood throughout the body, delivering oxygen and nutrients to cells while carrying away waste products.  ______, the heart itself is a powerful muscle, about the size of a fist, that contracts and relaxes continuously,  pumping an average of 100,000 times per day.	Which choice completes the text with the most logical transition?		A) Nevertheless,	B) In addition,	C) Thus,	D) Similarly,	B	0	0	2024-04-17 01:47:25.070994+00	2	Question 23		
85	All living things are built from the fundamental unit of life: the cell. These microscopic structures come in a vast array of shapes and sizes, each with specialized functions. Bacteria and archaea are single-celled organisms, ______ humans are complex multicellular organisms composed of trillions of cells organized into tissues, organs, and organ systems.  Which choice completes the text with the most logical transition?	Which choice completes the text with the most logical transition?		A) in contrast,	B) however,	C) similarly,	D) for example,	A	0	0	2024-04-17 02:57:33.385646+00	3	Question 23		
114	The theory of plate tectonics provides a framework for understanding the dynamic forces shaping our planet. According to this theory, Earth's outermost layer, the lithosphere, is not a continuous shell but is broken into massive plates. ______, these plates continuously shift positions, driven by convection currents in the molten mantle below, resulting in earthquakes, volcanic eruptions, and the formation of mountain ranges. Which choice completes the text with the most logical transition?	Which choice completes the text with the most logical transition?		A) Nevertheless,	B) Significantly,	C) Conversely,	D) Furthermore,	D	0	0	2024-04-17 05:08:08.105929+00	4	Question 24		
168	The widespread adoption of intensive agricultural practices after World War II has had a significant impact on the environment. The heavy reliance on synthetic fertilizers, pesticides, and irrigation has led to a number of environmental concerns. ______, excess fertilizer runoff can contaminate waterways, contributing to the formation of algal blooms and "dead zones" where aquatic life cannot survive.	Which choice completes the text with the most logical transition?		A) In addition,	B) Consequently,	C) For example,	D) However,	C	0	0	2024-04-17 08:37:25.720432+00	6	Question 24		
222	The Industrial Revolution fundamentally altered the nature of work and led to the rise of a wage-earning labor class. The introduction of factories and mechanized production led to increased efficiency but also displaced many skilled artisans. ______, workers often faced long hours, dangerous working conditions, and low wages, fueling social unrest and leading to the formation of labor unions to advocate for workers' rights.	Which choice completes the text with the most logical transition?		A) As a result,	B) Therefore,	C) Conversely,	D) In fact,	A	0	0	2024-04-17 21:05:02.432973+00	8	Question 24		
253	As the town's centenary approached, the historical society launched a series of events that aimed to _______ the community's rich heritage, with a line-up that included guided heritage trails, a time capsule burial, and guest lectures on the area's significant historical milestones, all of which served to bring the past into conversation with the present.	Which choice completes the text with the most logical and precise word or phrase?		A) obscure	B) commemorate	C) dismantle	D) disavow	B	0	0	2024-04-17 23:41:12.870504+00	10	Question 1		
254	The mayor's pledge to create more green spaces in urban areas led to a concerted effort by the city council, resulting in the _______ of several rooftop gardens and the conversion of abandoned lots into community gardens, transforming underutilized spaces into verdant retreats that residents could enjoy and take pride in.	Which choice completes the text with the most logical and precise word or phrase?		A) neglect	B) demolition	C) establishment	D) removal	C	0	0	2024-04-17 23:42:08.984387+00	10	Question 2		
255	The architect's vision for the new public library was not just to create a building with shelves for books, but to construct a space that _______ the ideals of community and learning, with designs that included open-plan reading areas, private study pods, and interactive learning zones, all of which were intended to cater to the diverse needs of the city's growing population.	Which choice completes the text with the most logical and precise word or phrase?		A) repudiated	B) contradicted	C) embodied	D) refuted	C	0	0	2024-04-17 23:42:52.233213+00	10	Question 3		
256	The economic think tank's latest report on global trade trends presented a _______ analysis of shifting market dynamics, with a particular focus on the rise of digital commerce and its impact on traditional brick-and-mortar businesses, providing policymakers with a valuable resource for planning future economic strategies.	Which choice completes the text with the most logical and precise word or phrase?		A) superficial	B) rudimentary	C) perfunctory	D) comprehensive	D	0	0	2024-04-17 23:43:35.42653+00	10	Question 4		
257	"Nighthawks" is a 1942 painting by Edward Hopper depicting four late-night customers at a brightly lit diner.  The painting evokes a sense of loneliness and isolation in an urban setting.	Which of the following art historical analyses best illustrates the claim?		A) "The diner's clean geometric lines and stark lighting create a sense of clinical sterility, emphasizing a cold atmosphere."	B) "Hopper is celebrated for his realistic depiction of American city life in the early-to-mid-20th century."	C) "The patrons are physically close, yet each seems absorbed in their own thoughts, suggesting a lack of connection."	D) "The diner's large windows create a sense of exposure while also barring escape, highlighting a sense of being trapped."	C	0	0	2024-04-17 23:44:48.336995+00	10	Question 5		
260	In the dramatic novel "Waves of Fortune," the protagonist, Sophia, is a merchant's daughter who takes over the family business in a tumultuous era of trade. "Sophia gazed out from her father's study, the harbor below teeming with ships from distant lands. The scent of spices and sound of foreign tongues drifted up to her, igniting a fierce determination. 'Commerce is not just an exchange of goods,' she reflected, 'but of ideas, cultures, and the very essence of civilization. Through these endeavors, I shall steer our legacy through these uncertain waters.' Her hands, adept at both the quill and the ledger, were ready to chart a new course."	According to the text, what drives Sophia in her role within the family business?		A) A commitment to uphold her family's reputation in the international market.	B) A curiosity about the different cultures that converge at the harbor.	C) A desire to recover from a recent financial setback the business suffered.	D) An eagerness to move away from tradition and modernize the business practices.	A	0	0	2024-04-17 23:48:09.161747+00	10	Question 8		
261	"The Ink of Progress: Printmaking and Social Change" delves into the history of printmaking and its role as a catalyst for social reform from the 16th century to the modern digital age. Author and historian Eliza Montgomery weaves a compelling narrative, highlighting key figures whose works have led to significant societal shifts. Montgomery portrays printmaking as not just an art form, but as a powerful medium for disseminating revolutionary ideas and driving public discourse. Through detailed accounts of technological advancements and anecdotal evidence from revolutionary movements, she argues that print has been a persistent and persuasive force in shaping public opinion and prompting action.	Which choice best states the main purpose of the text?		A) To chronicle the technological advancements in the field of printmaking.	B) To emphasize printmaking's aesthetic evolution over several centuries.	C) To argue for the pivotal role of printmaking in effecting social change.	D) To profile various printmakers and their artistic contributions.	C	0	0	2024-04-17 23:49:07.071084+00	10	Question 9		
262	In "Beyond the Visible Spectrum: The Wonders of Infrared Astronomy," astrophysicist Dr. Liam Sun explores the universe through the lens of infrared technology. Dr. Sun's essay details how infrared astronomy has unveiled celestial phenomena once hidden by cosmic dust and darkness, offering new insights into the formation of stars and the composition of distant galaxies. With a sense of awe and scientific rigor, he discusses the advancements in telescope technology, the landmark discoveries these tools have facilitated, and the promising future of exploring the cosmos in wavelengths invisible to the naked eye.	Which choice best states the main purpose of the text?		A) To describe the technical aspects of infrared telescopes and their operation.	B) To reveal how infrared astronomy has expanded our understanding of the universe.	C) To advocate for increased funding in the field of infrared astronomy.	D) To compare different methods of astronomical observation.	B	0	0	2024-04-17 23:49:59.596855+00	10	Question 10		
263	Behavioral Economics and Decision Making:** Professor Layla Torres is investigating how the framing of financial information affects consumer saving and spending behaviors. Through a series of experiments, participants are presented with identical financial scenarios described in either positive (gain-focused) or negative (loss-focused) terms. Professor Torres hypothesizes that negative framing will lead to more conservative financial decisions, such as increased saving or decreased spending, due to the psychological impact of potential loss aversion.	Which experimental result would most directly support Professor Torres's hypothesis?		A) Participants exposed to negative framing of financial scenarios consistently choose to save a higher percentage of a hypothetical windfall compared to those receiving positive framing, reflecting a tendency towards conservative financial behavior in the context of potential losses.	B) There is no significant difference in the saving or spending behaviors of participants when financial scenarios are framed in positive versus neutral terms, suggesting that framing effect may be specific to negative versus positive presentations.	C) Participants report feeling more anxious when financial information is presented in a negative frame but this does not significantly alter their decision-making behavior in the experiments.	D) When asked about hypothetical investment decisions, participants exposed to positive framing are more likely to choose high-risk, high-reward options compared to those exposed to negative framing.	A	0	0	2024-04-17 23:51:01.126236+00	10	Question 11		
264	Conservation Biology and Ecosystem Management:** Dr. Nina Patel's research focuses on the role of keystone species in maintaining the stability and diversity of ecosystems. Specifically, her work examines how the reintroduction of native predators into an ecosystem affects the population dynamics of other species and the overall biodiversity of the area. Dr. Patel hypothesizes that the reintroduction of these predators will restore natural population controls, leading to an increase in ecosystem diversity and stability.	Which outcome from Dr. Patel's study, if observed, would most directly support her hypothesis?		A) Surveys show that the prey species have adapted to the absence of their natural predators, and the reintroduction of these predators leads to significant ecological imbalances.	B) The reintroduced predator species becomes the dominant species in the ecosystem, but there is no significant change in the overall biodiversity or stability of the ecosystem.	C) Following the reintroduction of the predator, there is a temporary disruption in the ecosystem, with some species experiencing significant population declines before gradually stabilizing.	D) After the reintroduction of a native predator species, there is a marked increase in the biodiversity of the ecosystem, with population sizes of dominant prey species becoming more controlled, allowing less dominant species to thrive.	D	0	0	2024-04-17 23:52:11.24275+00	10	Question 12		
265	With the rise of digital currencies and blockchain technology, the financial landscape is undergoing a seismic shift. These innovations promise to decentralize financial systems, reducing reliance on traditional banking institutions and potentially making transactions more transparent and secure. Critics, however, raise concerns about the volatility of digital currencies and the regulatory challenges they present. --The debate over the adoption of digital currencies highlights the tension between innovation and regulation in the financial sector.-- As governments and financial bodies attempt to understand and manage these new technologies, they must balance the need for innovation with the imperative to protect consumers and maintain financial stability.	Which choice best describes the function of the underlined sentence in the passage?		A) It argues in favor of the widespread adoption of digital currencies.	B) It contrasts the benefits and drawbacks of blockchain technology.	C) It outlines the regulatory challenges posed by digital currencies.	D) It emphasizes the conflict inherent in modernizing financial systems.	D	0	0	2024-04-17 23:54:26.925593+00	10	Question 13		
266	Public art plays a crucial role in shaping the identity of urban spaces, transforming mundane environments into vibrant expressions of culture and history. It makes art accessible to the public, creating opportunities for community engagement and reflection. Moreover, public art can spark conversations about social issues and celebrate the diversity of community voices. --By integrating art into public spaces, cities can foster a sense of belonging and communal ownership among their inhabitants.-- This not only beautifies the urban landscape but also strengthens the social fabric by encouraging residents to engage with their environment and with one another in meaningful ways.	Which choice best describes the function of the underlined sentence in the passage?		A) It introduces the concept of public art and its benefits.	B) It details the ways in which public art is implemented in cities.	C) It highlights the impact of public art on urban communities.	D) It argues for increased funding and support for public art projects.	C	0	0	2024-04-17 23:55:06.91578+00	10	Question 14		
267	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 23:55:21.018409+00	10	Question 15 Graph		
268	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-17 23:55:35.365626+00	10	Question 16  Graph		
269	While many Americans revere the US Constitution as a near-perfect document, it is important to remember that it was a product of its time, and some of its provisions are outdated or were the result of contentious negotiations, bargaining, and compromises among the men who drafted it. For example, the section of the Constitution that establishes the number of representatives from each state that may serve in the House of Representatives also includes the notorious three-fifths compromise, which states that for the purposes of determining the number of members of the House, as well as the number of electors in the Electoral College, each enslaved person would count as three-fifths of a free individual. This compromise _______	Which choice most logically completes the text?		(A) suggests that most of the founders had an uneasy and conflicted relationship with the institution of slavery and with the question of whether the country should be founded on the principle of racial equality.	(B) was an attempt to increase the political power of Southern states, which had large enslaved populations, while appearing to limit the influence of those enslaved populations.	(C) was essential in achieving ratification of the Constitution, as many delegates from Southern states vowed to reject the document if slavery was abolished.	(D) demonstrates that the framers of the Constitution intentionally sought to avoid making any explicit pronouncements about the morality of slavery so as not to alienate Southern voters.	B	0	0	2024-04-17 23:57:00.20583+00	10	Question 17		
270	One strategy employed by some plant species to increase production of seeds and ensure reproductive success is to produce “masting” years, in which those plants collectively produce substantially more seeds than they do in typical years. Masting can overwhelm seed predators in that many of the seeds survive rather than being consumed, thus ensuring that some offspring reach maturity. Ecologists studying a forest containing several oak species that exhibit masting behavior have noted that the different oak species tend to enter masting years in different seasons and do not all have masting years at the same time. This finding suggests that _______	Which choice most logically completes the text?		A) different oak species living in the same environment may compete with each other for pollinators if they flower in the same season.	B) masting years allow forests to recover and restore nutrients in the soil that are depleted in years when plants do not mast.	C) the masting years of different oak species in the same environment likely vary in order to mitigate the negative impact that large seed predator populations would have on any given oak species if all species masted simultaneously.	D) different oak species in the same environment may experience masting years in unpredictable patterns to confuse seed predators and make it more difficult for predators to develop strategies for obtaining large amounts of seeds.	C	0	0	2024-04-17 23:57:54.795072+00	10	Question 18		
271	Author and activist Maya Angelou rose from a difficult childhood in the segregated American South to become a celebrated poet, memoirist, and civil rights leader. Her 1969 memoir, I Know Why the Caged Bird Sings, ______ a powerful and moving account of her early life.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) remains	B) has remained	C) is remaining	D) will remain	A	0	0	2024-04-17 23:59:06.433619+00	10	Question 19		
272	The theory of evolution through natural selection explains how species change over time in response to their environment. Organisms with beneficial traits are more likely to survive and reproduce, ______ passing on those traits to their offspring.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) this	B) as this	C) thus	D) with this	C	0	0	2024-04-17 23:59:49.917923+00	10	Question 20		
273	The periodic table of elements is a key tool used by chemists to organize and classify all known chemical elements. The elements are arranged horizontally in rows called "periods" _______ vertically in columns called "groups."	Which choice completes the text so that it conforms to the conventions of Standard English?		A) as well as	B) and also	C) and	D) along with	C	0	0	2024-04-18 00:01:15.342242+00	10	Question 21		
274	Cellular respiration is the process by which living cells convert energy from food into a form that they can use. This process takes place in specialized structures called mitochondria, ______ are often referred to as the powerhouses of the cell.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) which	B) and these	C) the latter of which	D) , which	A	0	0	2024-04-18 00:02:11.493422+00	10	Question 22		
275	Scientists study fossils, the preserved remains of ancient organisms, to learn about the history of life on Earth ______ to reconstruct how extinct species looked and behaved.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) , and also	B) and	C) also,	D) ; and	B	0	0	2024-04-18 00:03:11.654706+00	10	Question 23		
276	The concept of democracy, where power is vested in the people, has roots in ancient Athens, where citizens gathered in assemblies to debate and vote on laws and policies. This system of direct democracy offered a voice to a significant portion of the male population. ______, the Roman Republic, while incorporating democratic principles, implemented a representative system where elected senators made decisions on behalf of the citizens, paving the way for modern representative democracies.	Which choice completes the text with the most logical transition?		A) In addition,	B) However,	C) In contrast,	D) As a result,	C	0	0	2024-04-18 00:07:43.627602+00	10	Question 24		
278	While researching a topic, a student has taken the following notes:\r\n•\tForeshadowing is a literary device used to hint at future events in a story.\r\n•\tAuthors use foreshadowing to create suspense and intrigue for the reader.\r\n•\tA well-known example of foreshadowing occurs in Shakespeare's Romeo and Juliet, where Romeo speaks of an "untimely death" before the tragic ending.\r\n•\tForeshadowing can take many forms, from subtle clues hidden in dialogue to ominous events within the plot.	The student wants to introduce the concept of foreshadowing. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Foreshadowing is a common tool in literature, with one famous example being Shakespeare's Romeo and Juliet.	B) An author might use foreshadowing through dialogue, events, or other subtle hints within the narrative to give the reader clues about what may happen later in the story.	C) Foreshadowing, as seen in Romeo and Juliet, is a way for authors to build tension and keep the reader engaged.	D) Foreshadowing refers to the specific prediction made by Romeo about his own death in Shakespeare's famous play.	B	0	0	2024-04-18 00:09:48.130787+00	10	Question 26		
279	While researching a topic, a student has taken the following notes:\r\n•\tHoneybees engage in complex communication through a series of movements known as the "waggle dance."\r\n•\tThe waggle dance indicates the location and distance of food sources to other bees in the hive.\r\n•\tThe angle of the waggle dance on the honeycomb corresponds to the angle of the food source relative to the sun.\r\n•\tThe duration of the waggle dance conveys the distance to the food source.\r\n•\tScientists have been able to decode honeybee communication, providing valuable insight into insect behavior.	The student wants to explain the significance of the honeybee's waggle dance. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Honeybees have evolved an intricate way of communicating the location of resources, demonstrating remarkable social behaviors within colonies.	B) The waggle dance is an example of animal communication that is studied by scientists interested in insect behavior.	C) Honeybees locate food sources outside the hive, such as pollen and nectar from flowers.	D) The waggle dance is a unique form of communication among honeybees that conveys specific information about direction and distance.	A	0	0	2024-04-18 00:11:15.221189+00	10	Question 27		
280	In the world of competitive chess, the grandmaster's ability to _______ several moves ahead is not merely a skill but an art form, requiring not only an innate understanding of the game but also the capacity to anticipate opponents' strategies and adapt to the ever-changing complexities of each match.	Which choice completes the text with the most logical and precise word or phrase?		A) reflect	B) calculate	C) reminisce	D) doubt	B	0	0	2024-04-18 00:12:44.800198+00	11	Question 1		
281	The biologist's fieldwork in the dense Amazonian rainforest led to the _______ of a new species of frog, a discovery that provided insight into the biodiversity of the region and underscored the importance of preserving these delicate ecosystems from the threats posed by deforestation and climate change.	Which choice completes the text with the most logical and precise word or phrase?		A) disavowal	B) suppression	C) unveiling	D) obfuscation	C	0	0	2024-04-18 00:13:23.547753+00	11	Question 2		
282	In her comprehensive study of medieval literature, the scholar _______ a reevaluation of the role of women in chivalric tales, arguing that their characters, often dismissed as mere damsels in distress, play pivotal roles that reflect the complex gender dynamics of the time and warrant a deeper examination within the context of the era's social and cultural constructs.	Which choice completes the text with the most logical and precise word or phrase?		A) dismisses	B) forgoes	C) advocates	D) renounces	C	0	0	2024-04-18 00:16:19.413266+00	11	Question 3		
283	The political theorist's new book offers a _______ dissection of the mechanisms of power within authoritarian regimes, drawing from historical examples and current events to build a framework for understanding how such systems arise and sustain themselves, as well as the potential avenues for reform or revolution.	Which choice completes the text with the most logical and precise word or phrase?		A) cursory	B) rudimentary	C) straightforward	D) meticulous	D	0	0	2024-04-18 00:17:03.250064+00	11	Question 4		
284	The artist's latest installation, an immersive experience set within a derelict warehouse, _______ the boundaries between observer and participant, inviting visitors to interact with a series of mechanical sculptures that respond to human presence, thereby blurring the lines between art and audience in a manner that challenges traditional notions of artistic experience.	Which choice completes the text with the most logical and precise word or phrase?		A) reinforces	B) acknowledges	C) obliterates	D) respects	C	0	0	2024-04-18 00:17:51.185465+00	11	Question 5		
285	The technology company's rise to industry leader was not solely due to its innovative products but also to a corporate strategy that _______ adaptability and forward-thinking, enabling it to navigate the tumultuous waters of the tech world by continually evolving and staying ahead of market trends.	Which choice completes the text with the most logical and precise word or phrase?		A) eschewed	B) vilified	C) championed	D) stigmatized	C	0	0	2024-04-18 00:18:52.027764+00	11	Question 6		
286	Text 1: The ocean's twilight zone, a dimly lit area extending from 200 to 1,000 meters below the surface, remains one of the least understood ecosystems on Earth. This region holds a vast diversity of life, including many species that are yet to be discovered. Scientists believe that understanding the twilight zone is crucial for assessing the health of the ocean and its capacity to absorb carbon dioxide, thus playing a role in regulating the planet's climate.\r\n\r\nText 2: Marine biologist Elena Rodriguez and her interdisciplinary team are pioneering research into the twilight zone's unique biodiversity and its role in carbon sequestration. Using cutting-edge submersible technology and remote-operated vehicles, Rodriguez's team is uncovering how organisms in the twilight zone contribute to the ocean's carbon cycle. She points out that while this zone holds great promise for climate change mitigation, it also faces threats from overfishing and deep-sea mining. Rodriguez emphasizes the need for comprehensive international regulations to protect these vulnerable ecosystems.	Based on the texts, what would Rodriguez (Text 2) most likely say about Text 1’s overview of the twilight zone's significance?		A) It provides a foundational understanding but lacks detail on the imminent threats and the necessity for international protective measures.	B) It accurately conveys the importance of the twilight zone in climate regulation and underscores the urgency of expanding research in this field.	C) It overlooks the technological advancements that have revolutionized our understanding of the twilight zone and its biodiversity.	D) It mistakenly portrays the twilight zone as a pristine and undisturbed habitat, ignoring the potential for human-induced impacts.	A	0	0	2024-04-18 00:20:15.654232+00	11	Question 7		
288	The Roman Republic was a period in ancient history lasting from roughly 509 BCE to 27 BCE, a significant era that left an enduring legacy on Western civilization. It was characterized by a complex system of government featuring elected officials, a powerful senate that advised on policy, and assemblies of citizens who had some influence on government decisions. While the Roman Republic was internally divided between a small number of aristocratic elite families (patricians) and the larger population of common citizens (plebeians), it achieved remarkable territorial expansion through military conquests. Over time, internal conflicts, power struggles between ambitious generals and politicians, and widening social inequalities weakened the Republic. This eventually led to a series of civil wars, the rise of powerful generals like Julius Caesar, and the ultimate transition to the Roman Empire, which retained some influence from the Republic but centered power around a single emperor.	Which choice best states the main idea of this text?		A) Julius Caesar is considered the most important figure of the Roman Republic.	B) The Roman Republic was a complex society known for its strong military and eventual expansion across the Mediterranean.	C) The legacy of the Roman Republic includes its influence on legal and governmental systems in Western societies.	D) The Roman Republic faced challenges from social inequality and was eventually replaced by the Roman Empire.	D	0	0	2024-04-18 00:22:33.263078+00	11	Question 9		
289	"Melodies of the Heart" is a poignant memoir recounting an artist's journey through love and loss. "Amid the tumult of city life, Lena found solace at her piano, the keys a spectrum of emotions under her fingertips. The melody she composed was bittersweet, each note a chapter of her story. 'Music is my heart's true voice,' she penned in her diary, 'a voice that sings of joy embraced and sorrow endured.' As her fingers danced across the piano, she knew that with every song shared, her heart's whispers reached out to kindred spirits."	What role does music play in Lena's life, as depicted in the memoir?		A) It is a means for her to achieve fame and recognition.	B) It is a form of therapy that helps her cope with urban life.	C) It serves as a bridge to connect with others on an emotional level.	D) It acts as a time capsule, preserving the memories of her personal history.	C	0	0	2024-04-18 00:23:39.480159+00	11	Question 10		
290	"The Whispers of the Old Woods" is a collection of fantasy short stories set in an enchanted forest. "As twilight descended, the ancient woods whispered secrets of old, the trees swaying to an unseen wind. Elara, a young mage, listened intently, her magic attuned to the language of nature. 'The woods are not merely trees and earth,' she confided in her grimoire, 'they are a living, breathing entity, guardians of forgotten lore.' With every incantation, she felt the pulse of the forest, its rhythms a guide to unlocking arcane mysteries."	What does Elara seek to discover in the enchanted forest?		A) Hidden treasures that are rumored to be buried in the forest's heart.	B) Knowledge and understanding of the ancient lore guarded by the forest.	C) A way to protect the forest from those who wish to exploit its magic.	D) An escape from her duties as a mage to live a life of solitude.	B	0	0	2024-04-18 00:25:39.49427+00	11	Question 11		
291	Dr. Elena Ramirez's research focuses on the intersection of urban design, public green spaces, and community health outcomes in densely populated cities. Her team conducts a longitudinal study comparing neighborhoods with varying amounts of accessible green space to assess impacts on physical and mental health statistics among residents. Dr. Ramirez hypothesizes that neighborhoods with more comprehensive and accessible green spaces will show significant improvements in both physical and mental health metrics over time, attributing this to the increased opportunities for physical activity and social interaction, as well as the psychological benefits of nature exposure.	Which finding would most convincingly support Dr. Ramirez's hypothesis?		A) Health surveys reveal that residents of neighborhoods with ample green spaces report lower levels of stress and higher physical activity rates compared to those in areas with limited green space.	B) Economic analysis shows that neighborhoods with more green spaces have higher property values, suggesting a correlation between green space and economic indicators, but not directly linking to health outcomes.	C) Crime statistics indicate a decrease in neighborhood crime rates following the introduction of green spaces, pointing to improved community cohesion but not directly addressing health metrics.	D) A study finds no significant difference in air quality measures between neighborhoods with and without substantial green spaces, challenging one of the potential mechanisms through which green spaces might benefit community health.	A	0	0	2024-04-18 00:28:27.669062+00	11	Question 12		
292	Dr. Fiona Chen explores the implications of quantum computing advancements for digital security, particularly focusing on the vulnerabilities of current encryption methods to quantum decryption techniques. Through theoretical models and simulations, her research seeks to identify encryption protocols that could resist quantum computing attacks, thus ensuring data security in the future. Dr. Chen hypothesizes that encryption methods utilizing principles of quantum entanglement will offer robust protection against quantum decryption attempts.	Which result from Dr. Chen's simulations would most directly support her hypothesis?		A) A survey among cybersecurity experts indicates a high level of concern about quantum computing threats to encryption but does not provide empirical evidence supporting the effectiveness of quantum entanglement-based encryption.	B) Comparative analysis shows that traditional encryption methods, while currently effective, are quickly decrypted by quantum computing simulations, highlighting the need for quantum-resistant protocols but not directly validating the hypothesis about quantum entanglement.	C) Tests reveal that encryption methods leveraging quantum entanglement require significantly more computing power to implement than traditional methods, suggesting practical limitations but not directly addressing their resistance to quantum decryption.	D) Simulations demonstrate that encryption protocols based on quantum entanglement remain secure even when subjected to decryption attempts using the most advanced quantum computing models available, indicating a high resistance to quantum decryption.	D	0	0	2024-04-18 00:29:42.687899+00	11	Question 13		
293	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-18 00:30:05.844794+00	11	Question 14 Graph		
294	Graph	Graph		Graph	Graph	Graph	Graph	A	0	0	2024-04-18 00:30:18.941844+00	11	Question 15  Graph		
295	Although the modern concept of the atom did not emerge until the nineteenth century, some philosophers in ancient Greece believed that all matter was composed of indivisible units and that the universe contained void space in which those indivisible units could move. Such views were highly controversial, however, as many of their contemporaries argued that the existence of a void would violate the laws of physics. Critics of the atomists pointed out, for example, that an object could not move from one location to another in a void, as there would be nothing in the void to push it along. The atomists responded to such objections by positing that _______	Which choice most logically completes the text?		A) even if a void did not exist between the moving object and its destination, the presence of a void behind the moving object would be sufficient to set it in motion.	B) atoms were themselves in constant motion, and the random motions of atoms could propel other atoms through a void even if doing so appeared to violate the known laws of motion.	C) some atoms are attracted to other atoms and can therefore be pulled through a void without needing to be propelled by contact with other matter.	D) objects moving through a void would not need to be propelled by any force because the very existence of the void would tend to draw objects into itself.	B	0	0	2024-04-18 00:32:05.286176+00	11	Question 16		
296	Anthropologists and cultural historians often study myths—stories about gods, heroes, or events with a supernatural component that were once thought to be true—to gain insights into the cultural, political, or religious beliefs of the people who created those myths. These myths are often viewed as purely fictitious by modern audiences, but anthropologists emphasize that myths often contain elements that resonate on multiple levels and can be interpreted literally, symbolically, or metaphorically. Consequently, some anthropologists and historians believe that myths _______	Which choice most logically completes the text?		A) have no basis in historical fact or reality and are wholly the products of human imagination and creativity.	B) should be studied alongside the archaeological record, as it is sometimes possible to find material evidence supporting stories recounted in myths.	C) arose out of human attempts to understand natural phenomena such as volcanic eruptions, eclipses, or the movements of the planets and stars.	D) frequently incorporate events or experiences that affected the societies that created them, but that the details of those stories may be altered over time as they are passed down orally over many generations.	D	0	0	2024-04-18 00:33:17.938504+00	11	Question 17		
297	The concept of a government ruled by the people, or democracy, is often traced back to the ancient Greek city-state of Athens. While Athenian democracy was limited by excluding groups like women and enslaved people, it was revolutionary for the era because it allowed male citizens ______ in decision-making processes within a system of direct democracy.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) participated directly	B) were directly participating	C) to directly participate	D) have directly participated	C	0	0	2024-04-18 00:35:50.201632+00	11	Question 18		
298	In the late 19th century, a group of artists broke away from traditional, academic painting styles, leading to the birth of the Impressionist movement. Artists like Claude Monet, Edgar Degas, and Pierre-Auguste Renoir ______ a new way of seeing the world by focusing on fleeting moments and the effects of light and color, often painting outdoors to better capture these transient effects.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) have embraced	B) embraced	C) was embracing	D) are embracing	B	0	0	2024-04-18 00:40:21.165266+00	11	Question 19		
299	Acclaimed novelist Toni Morrison was awarded the 1988 Pulitzer Prize for her powerful and haunting novel Beloved. This work tells the story of a formerly enslaved woman, Sethe, who makes a desperate act to escape a life of bondage. Morrison's work, ______ themes of memory, trauma, and the African American experience resonated deeply and ultimately won her the 1993 Nobel Prize in Literature.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) which explores	B) explore	C) and it explores	D) to explore	A	0	0	2024-04-18 00:41:33.637451+00	11	Question 20		
300	For centuries, scientists followed the principles of Newtonian physics, which offered an understanding of space, time, and gravity. However, at the start of the 20th century, Albert Einstein published his theory of relativity, revolutionizing our perspective on these concepts. Contrary to Newtonian physics, Einstein asserts that ______ is absolute but rather depends on an observer's frame of reference, fundamentally changing our comprehension of the universe.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) that time	B) time	C) for time	D) the time	B	0	0	2024-04-18 00:42:26.459684+00	11	Question 21		
301	Plato, a foundational figure of Western philosophy, was deeply influenced by his teacher, Socrates, and went on to establish the influential Academy in Athens. Plato's writings on diverse subjects ______ metaphysics and ethics had a profound and enduring influence on Western philosophy, shaping debates for centuries to come.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) ranging from	B) ranged from	C) was ranging from	D) range from	A	0	0	2024-04-18 00:43:30.982074+00	11	Question 22		
302	The invention of the printing press by Johannes Gutenberg in the 15th century dramatically changed the way information was shared. The ability to mass-produce books ______ ideas could be circulated more widely and quickly, leading to significant social and cultural changes, promoting the spread of knowledge and literacy.	Which choice completes the text so that it conforms to the conventions of Standard English?		A) meaning	B) with meaning	C) meant	D) , it meant	C	0	0	2024-04-18 00:44:38.749986+00	11	Question 23		
303	Medieval European art was often highly symbolic, primarily focused on religious themes designed to convey Christian teachings to a largely illiterate population. ______, Renaissance art, inspired by a renewed interest in classical antiquity, emphasized realism, human anatomy, and the use of perspective, marking a shift toward greater naturalism.	Which choice completes the text with the most logical transition?		A) In contrast,	B) However,	C) As a result,	D) For example,	A	0	0	2024-04-18 00:46:35.04277+00	11	Question 24		
304	The Green Revolution of the mid-20th century aimed to increase agricultural productivity through technological innovations.  The introduction of high-yielding crop varieties, synthetic fertilizers, pesticides, and expanded irrigation dramatically boosted crop yields. ______, these intensive agricultural practices have also led to environmental concerns like soil degradation, water pollution, and the loss of biodiversity.	Which choice completes the text with the most logical transition?		A) Consequently,	B) Moreover,	C) Nevertheless,	D) On the other hand,	C	0	0	2024-04-18 00:48:01.483377+00	11	Question 25		
305	While researching a topic, a student has taken the following notes:\r\n•\tFrank Lloyd Wright was an influential American architect known for his organic and Prairie Style designs.\r\n•\tWright believed homes should blend with their natural surroundings and emphasized the use of natural materials.\r\n•\tOne of his most famous works is Fallingwater, a house built over a waterfall in rural Pennsylvania.\r\n•\tWright's designs incorporated open floor plans, abundant natural light, and a focus on horizontal lines.\r\n•\tFrank Lloyd Wright's work shaped modern architecture by promoting harmony between buildings and their environment.	The student wants to highlight the main principles that guided Wright's architecture. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) Frank Lloyd Wright was a renowned architect who designed iconic buildings like Fallingwater.	B) Modern architecture often incorporates elements inspired by the principles of Frank Lloyd Wright's work.	C) Wright's design philosophy emphasized connections to nature, open layouts, and the use of natural light and materials.	D) Wright's unique homes were often built in rural settings and designed to complement their natural surroundings.	C	0	0	2024-04-18 00:48:58.742149+00	11	Question 26		
306	While researching a topic, a student has taken the following notes:\r\n•\tThe scientific method is a systematic process for investigating the natural world.\r\n•\tScientists form hypotheses, which are testable explanations for observed phenomena.\r\n•\tExperiments are designed to test hypotheses by manipulating variables and collecting data.\r\n•\tThe goal of experimentation is to gather evidence that either supports or refutes a hypothesis.\r\n•\tScientific theories are well-substantiated explanations that have been repeatedly tested and supported by evidence.	The student wants to present an overview of the scientific method. Which choice most effectively uses relevant information from the notes to accomplish this goal?		A) The scientific method is an ongoing process, as theories can be revised or replaced with new evidence.	B) Scientists use the scientific method to ask questions, conduct experiments, analyze data, and develop theories to explain the world around us.	C) A hypothesis must be a falsifiable statement that can be supported or disproven through the collection of data.	D) Scientists rely on rigorous experimentation to ensure objectivity and avoid bias in their observations.	B	0	0	2024-04-18 00:49:56.217246+00	11	Question 27		
39	In the realm of digital media, the phenomenon of "viral" content has reshaped how information and entertainment are consumed and shared. Initially, the term "viral" was used metaphorically to describe content that spreads rapidly online, akin to a biological virus. However, as social media platforms have become ubiquitous, the mechanisms behind what makes a piece of content go viral have become a topic of extensive study. Researchers have identified several factors, such as emotional engagement, relatability, and the timing of the release, which significantly influence a video or article's ability to captivate the global audience. --This shift towards understanding the science of virality represents a significant departure from the early days of the internet, where content spread was more serendipitous and less understood.-- Now, content creators and marketers meticulously analyze trends and audience preferences to craft posts that are more likely to achieve widespread popularity.	Which choice best describes the function of the underlined sentence in the passage?		A) It contrasts the current understanding of viral content with past perceptions.	B) It provides a definition of what it means for content to be "viral."	C) It summarizes the factors that contribute to a piece of content's success.	D) It introduces the concept of studying virality as a scientific discipline.	A	0	0	2024-04-16 22:04:43.92554+00	2	Question 4	Reading	Text Structure and Purpose
41	The concept of "eco-friendly" travel has gained momentum as environmental awareness has increased globally. This form of tourism advocates for making conscientious choices that minimize environmental impact and promote sustainability. From choosing accommodations that adhere to green practices to participating in activities that support local conservation efforts, eco-friendly travel encourages a deep connection with the natural world while fostering responsible tourism.--As travelers become more conscious of their ecological footprint, destinations known for their natural beauty have seen a surge in popularity, prompting a reevaluation of how tourism can be both economically beneficial and environmentally sustainable.-- This shift has led to the development of new policies and practices aimed at preserving destinations for future generations without sacrificing the quality of the visitor experience.	Which choice best describes the function of the underlined sentence in the passage?		A) It highlights the growing popularity of eco-friendly travel destinations.	B) It argues for the economic advantages of adopting sustainable tourism practices.	C) It explains the impact of increased environmental awareness on travel preferences.	D) It suggests a causal relationship between eco-friendly travel and conservation policies.	C	0	0	2024-04-16 22:14:23.001261+00	2	Question 6	Reading	Text Structure and Purpose
45	Architect Kiyoshi Takamoto has been celebrated for his unique approach to urban design, particularly for his ability to integrate aspects of traditional Japanese aesthetics into modern urban landscapes. His work is characterized by a profound respect for natural elements, harmoniously blending them into the built environment to create spaces that are both functional and spiritually enriching. In a detailed analysis for an architecture seminar, a student posits that Takamoto's pioneering designs have not only reshaped cityscapes in Japan but have also exerted a significant influence on global urban architectural practices by advocating for the integration of nature into urban planning. The student argues that Takamoto’s influence is evident in the growing trend towards green urban spaces around the world.	Which piece of evidence, if confirmed, would most directly support the student's claim?		A) Takamoto has been the recipient of numerous prestigious international awards, recognizing his groundbreaking use of sustainable materials and his innovative design practices that prioritize environmental harmony.	B) Many of Takamoto’s architectural projects are distinguished by their integration of gardens, water features, and extensive green spaces, reflecting his philosophy of blending the built environment with the natural world.	C) Takamoto’s influence has transcended national borders, with his firm being commissioned to design significant urban development projects in major cities across Europe and North America, highlighting his impact on global urban design.	D) A survey among contemporary urban architects reveals that Takamoto's writings and architectural designs are frequently cited as sources of inspiration for incorporating natural elements and green spaces into urban development projects.	C	0	0	2024-04-16 22:50:45.810844+00	2	Question 10	Reading	Command of Textual Evidence
49	Studies have shown that people’s perception of pain can be diminished and their healing processes accelerated if those individuals believe that a medical treatment will be helpful. In an experiment testing the efficacy of an experimental analgesic lotion for treating minor scrapes and burns, researchers found that the lotion did not appear to significantly affect participants’ pain levels or healing times. However, a similar experiment found that the same lotion led to significant reductions in the pain level of study participants and resulted in faster healing. The difference in the outcomes of the two experiments was likely due to the fact that _______	Which choice most logically completes the text?		(A) the participants in the experiment that demonstrated the lotion’s efficacy were recruited from a pool of people with more painful injuries than were the participants in the other experiment.	(B) in the experiment that demonstrated the lotion’s efficacy, participants were told that the lotion contained strong painkillers, whereas the participants in the other experiment were given no information about the lotion’s ingredients.	(C) the researchers conducting the experiment that demonstrated the lotion’s efficacy gave study participants a smaller amount of lotion than the researchers in the other experiment did.	(D) participants in the experiment that demonstrated the lotion’s efficacy received more medical assistance in treating their injuries in addition to using the lotion.	B	0	0	2024-04-16 23:23:18.505351+00	2	Question 14	Reading	Inferences
\.


--
-- Data for Name: core_test; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_test (id, title, created_at, updated_at) FROM stdin;
1	Practice Test 1	2024-05-06 03:05:47.833047+00	2024-05-06 03:05:47.833061+00
2	Practice Test 2	2024-05-06 03:05:54.475036+00	2024-05-06 03:05:54.475053+00
3	Practice Test 3	2024-05-06 03:06:01.787255+00	2024-05-06 03:06:01.787276+00
4	Practice Test 4	2024-05-06 03:06:09.041501+00	2024-05-06 03:06:09.041527+00
5	Practice Test 5	2024-05-06 03:06:14.163618+00	2024-05-06 03:06:14.163638+00
\.


--
-- Data for Name: core_testmodel; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_testmodel (id, title, description, num_questions, created_at, updated_at, test_id) FROM stdin;
2	Test 1 Module 1		27	2024-04-08 17:31:10.061977+00	2024-05-06 03:06:58.339094+00	1
3	Test 1 Module 2		27	2024-04-09 03:58:45.464249+00	2024-05-06 03:07:04.388335+00	1
4	Test 2 Module 1		27	2024-04-17 04:31:04.761768+00	2024-05-06 03:07:08.965146+00	2
5	Test 2 Module 2		27	2024-04-17 04:31:12.90199+00	2024-05-06 03:07:12.701595+00	2
6	Test 3 Module 1		27	2024-04-17 06:35:42.236609+00	2024-05-06 03:07:16.599086+00	3
7	Test 3 Module 2		27	2024-04-17 06:35:50.331521+00	2024-05-06 03:07:20.026651+00	3
8	Test 4 Module 1		27	2024-04-17 20:18:19.399168+00	2024-05-06 03:07:23.766734+00	4
9	Test 4 Module 2		27	2024-04-17 20:18:34.90095+00	2024-05-06 03:07:27.948491+00	4
10	Test 5 Module 1		27	2024-04-17 23:34:13.765396+00	2024-05-06 03:07:31.22559+00	5
11	Test 5 Module 2		27	2024-04-17 23:34:19.397842+00	2024-05-06 03:07:34.401286+00	5
\.


--
-- Data for Name: core_testresult; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_testresult (id, score, created_at, updated_at, test_id, user_id) FROM stdin;
\.


--
-- Data for Name: core_useranswer; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.core_useranswer (id, selected_option, question_id, test_result_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2024-04-08 17:31:10.065026+00	2	Test 1 Module 1	1	[{"added": {}}]	9	1
2	2024-04-08 19:18:55.059276+00	2	Bob Smith	2	[{"changed": {"fields": ["User permissions", "Is staff"]}}]	8	1
3	2024-04-08 19:19:36.08252+00	2	Bob Smith	2	[{"changed": {"fields": ["Is staff"]}}]	8	1
4	2024-04-08 19:49:44.301901+00	1	Admin	1	[{"added": {}}]	3	1
5	2024-04-08 19:50:50.266612+00	2	User	1	[{"added": {}}]	3	1
6	2024-04-08 19:55:51.569472+00	2	User	2	[]	3	1
7	2024-04-08 20:23:38.823109+00	6	Tylor Jacob	2	[]	8	1
8	2024-04-09 03:20:44.303738+00	2	Test 1 Module 1	2	[]	9	1
9	2024-04-09 03:25:39.891405+00	1	Question object (1)	1	[{"added": {}}]	11	1
10	2024-04-09 03:32:49.645865+00	1	Question object (1)	2	[{"changed": {"fields": ["Title"]}}]	11	1
11	2024-04-09 03:35:35.545345+00	2	Question object (2)	1	[{"added": {}}]	11	1
12	2024-04-09 03:38:45.239691+00	3	Question object (3)	1	[{"added": {}}]	11	1
13	2024-04-09 03:39:57.476427+00	4	Question object (4)	1	[{"added": {}}]	11	1
14	2024-04-09 03:53:50.814821+00	5	Question object (5)	1	[{"added": {}}]	11	1
15	2024-04-09 03:55:09.52007+00	6	Question object (6)	1	[{"added": {}}]	11	1
16	2024-04-09 03:56:18.242048+00	7	Question object (7)	1	[{"added": {}}]	11	1
17	2024-04-09 03:58:45.467659+00	3	Test 1 Module 2	1	[{"added": {}}]	9	1
18	2024-04-09 04:01:16.24979+00	8	Question object (8)	1	[{"added": {}}]	11	1
19	2024-04-09 04:03:20.135171+00	9	Question object (9)	1	[{"added": {}}]	11	1
20	2024-04-09 04:05:00.202591+00	10	Question object (10)	1	[{"added": {}}]	11	1
21	2024-04-09 04:06:35.426781+00	11	Question object (11)	1	[{"added": {}}]	11	1
22	2024-04-09 04:08:59.678462+00	12	Question object (12)	1	[{"added": {}}]	11	1
23	2024-04-09 04:11:24.81218+00	13	Question object (13)	1	[{"added": {}}]	11	1
24	2024-04-09 04:12:57.038397+00	14	Question object (14)	1	[{"added": {}}]	11	1
25	2024-04-09 04:32:21.114537+00	15	Question object (15)	1	[{"added": {}}]	11	1
26	2024-04-09 04:34:43.894047+00	16	Question object (16)	1	[{"added": {}}]	11	1
27	2024-04-09 04:38:38.892279+00	17	Question object (17)	1	[{"added": {}}]	11	1
28	2024-04-09 04:40:54.626111+00	18	Question object (18)	1	[{"added": {}}]	11	1
29	2024-04-09 04:42:36.172995+00	19	Question object (19)	1	[{"added": {}}]	11	1
30	2024-04-09 04:45:24.27887+00	20	Question object (20)	1	[{"added": {}}]	11	1
31	2024-04-09 04:46:38.251993+00	21	Question object (21)	1	[{"added": {}}]	11	1
32	2024-04-09 04:48:10.106358+00	22	Question object (22)	1	[{"added": {}}]	11	1
33	2024-04-09 04:49:15.907294+00	23	Question object (23)	1	[{"added": {}}]	11	1
34	2024-04-09 04:50:22.278546+00	24	Question object (24)	1	[{"added": {}}]	11	1
35	2024-04-09 04:51:43.151511+00	25	Question object (25)	1	[{"added": {}}]	11	1
36	2024-04-09 04:52:54.432893+00	26	Question object (26)	1	[{"added": {}}]	11	1
37	2024-04-09 04:53:04.530006+00	26	Question object (26)	2	[{"changed": {"fields": ["Title"]}}]	11	1
38	2024-04-09 04:54:37.864092+00	27	Question object (27)	1	[{"added": {}}]	11	1
39	2024-04-09 04:55:42.151529+00	28	Question object (28)	1	[{"added": {}}]	11	1
40	2024-04-09 04:57:33.511443+00	29	Question object (29)	1	[{"added": {}}]	11	1
41	2024-04-09 04:58:30.245561+00	30	Question object (30)	1	[{"added": {}}]	11	1
42	2024-04-09 04:59:34.82199+00	31	Question object (31)	1	[{"added": {}}]	11	1
43	2024-04-09 05:01:08.579999+00	32	Question object (32)	1	[{"added": {}}]	11	1
44	2024-04-09 05:02:13.620432+00	33	Question object (33)	1	[{"added": {}}]	11	1
45	2024-04-15 04:22:04.329354+00	1	Tutorial object (1)	1	[{"added": {}}]	15	1
46	2024-04-15 04:22:12.088263+00	2	Tutorial object (2)	1	[{"added": {}}]	15	1
47	2024-04-15 04:22:17.130114+00	3	Tutorial object (3)	1	[{"added": {}}]	15	1
48	2024-04-15 04:26:19.232222+00	3	English -> Text Details	1	[{"added": {}}]	14	1
81	2024-04-15 19:54:56.24529+00	3	English -> Text Details	2	[{"changed": {"fields": ["Slug"]}}]	14	1
82	2024-04-15 20:16:43.088442+00	34	English -> abc	1	[{"added": {}}]	14	1
83	2024-04-16 21:18:00.264802+00	33	Question object (33)	3		11	1
84	2024-04-16 21:18:00.27156+00	32	Question object (32)	3		11	1
85	2024-04-16 21:18:00.272641+00	31	Question object (31)	3		11	1
86	2024-04-16 21:18:00.273483+00	30	Question object (30)	3		11	1
87	2024-04-16 21:18:00.274195+00	29	Question object (29)	3		11	1
88	2024-04-16 21:18:00.274836+00	28	Question object (28)	3		11	1
89	2024-04-16 21:18:00.275404+00	27	Question object (27)	3		11	1
90	2024-04-16 21:18:00.276364+00	26	Question object (26)	3		11	1
91	2024-04-16 21:18:00.277224+00	25	Question object (25)	3		11	1
92	2024-04-16 21:18:00.277724+00	24	Question object (24)	3		11	1
93	2024-04-16 21:18:00.278188+00	23	Question object (23)	3		11	1
94	2024-04-16 21:18:00.278637+00	22	Question object (22)	3		11	1
95	2024-04-16 21:18:00.279136+00	21	Question object (21)	3		11	1
96	2024-04-16 21:18:00.279654+00	20	Question object (20)	3		11	1
97	2024-04-16 21:18:00.280353+00	19	Question object (19)	3		11	1
98	2024-04-16 21:18:00.280827+00	18	Question object (18)	3		11	1
99	2024-04-16 21:18:00.281249+00	17	Question object (17)	3		11	1
100	2024-04-16 21:18:00.281774+00	16	Question object (16)	3		11	1
101	2024-04-16 21:18:00.282272+00	15	Question object (15)	3		11	1
102	2024-04-16 21:18:00.282844+00	14	Question object (14)	3		11	1
103	2024-04-16 21:18:00.28336+00	13	Question object (13)	3		11	1
104	2024-04-16 21:18:00.283902+00	12	Question object (12)	3		11	1
105	2024-04-16 21:18:00.284361+00	11	Question object (11)	3		11	1
106	2024-04-16 21:18:00.284805+00	10	Question object (10)	3		11	1
107	2024-04-16 21:18:00.285195+00	9	Question object (9)	3		11	1
108	2024-04-16 21:18:00.285631+00	8	Question object (8)	3		11	1
109	2024-04-16 21:18:00.286031+00	7	Question object (7)	3		11	1
110	2024-04-16 21:18:00.286432+00	6	Question object (6)	3		11	1
111	2024-04-16 21:18:00.286821+00	5	Question object (5)	3		11	1
112	2024-04-16 21:18:00.287212+00	4	Question object (4)	3		11	1
113	2024-04-16 21:18:00.287595+00	3	Question object (3)	3		11	1
114	2024-04-16 21:18:00.28797+00	2	Question object (2)	3		11	1
115	2024-04-16 21:18:00.288617+00	1	Question object (1)	3		11	1
116	2024-04-16 21:22:59.076987+00	34	Question object (34)	1	[{"added": {}}]	11	1
117	2024-04-16 21:24:31.541242+00	35	Question object (35)	1	[{"added": {}}]	11	1
118	2024-04-16 21:26:11.216399+00	36	Question object (36)	1	[{"added": {}}]	11	1
119	2024-04-16 21:28:47.986992+00	37	Question object (37)	1	[{"added": {}}]	11	1
120	2024-04-16 21:29:16.328501+00	34	Question object (34)	2	[{"changed": {"fields": ["Title"]}}]	11	1
121	2024-04-16 21:29:24.615711+00	35	Question object (35)	2	[{"changed": {"fields": ["Title"]}}]	11	1
122	2024-04-16 21:29:31.596456+00	36	Question object (36)	2	[{"changed": {"fields": ["Title"]}}]	11	1
123	2024-04-16 21:30:58.336452+00	38	Question object (38)	1	[{"added": {}}]	11	1
124	2024-04-16 21:31:55.039167+00	38	Question object (38)	3		11	1
125	2024-04-16 21:31:55.043392+00	37	Question object (37)	3		11	1
126	2024-04-16 22:04:43.927435+00	39	Question object (39)	1	[{"added": {}}]	11	1
127	2024-04-16 22:08:57.857857+00	40	Question object (40)	1	[{"added": {}}]	11	1
128	2024-04-16 22:14:23.003255+00	41	Question object (41)	1	[{"added": {}}]	11	1
129	2024-04-16 22:14:31.194533+00	40	Question object (40)	2	[]	11	1
130	2024-04-16 22:17:52.245914+00	42	Question object (42)	1	[{"added": {}}]	11	1
131	2024-04-16 22:19:17.52728+00	43	Question object (43)	1	[{"added": {}}]	11	1
132	2024-04-16 22:25:57.603487+00	44	Question object (44)	1	[{"added": {}}]	11	1
133	2024-04-16 22:50:45.813117+00	45	Question object (45)	1	[{"added": {}}]	11	1
134	2024-04-16 23:01:29.738096+00	46	Question object (46)	1	[{"added": {}}]	11	1
135	2024-04-16 23:18:17.404873+00	47	Question object (47)	1	[{"added": {}}]	11	1
136	2024-04-16 23:18:37.456053+00	48	Question object (48)	1	[{"added": {}}]	11	1
137	2024-04-16 23:18:43.038951+00	47	Question object (47)	2	[{"changed": {"fields": ["Title"]}}]	11	1
138	2024-04-16 23:23:18.507729+00	49	Question object (49)	1	[{"added": {}}]	11	1
139	2024-04-16 23:27:07.743566+00	50	Question object (50)	1	[{"added": {}}]	11	1
140	2024-04-16 23:31:01.999775+00	51	Question object (51)	1	[{"added": {}}]	11	1
141	2024-04-17 01:38:49.701946+00	52	Question object (52)	1	[{"added": {}}]	11	1
142	2024-04-17 01:39:49.100064+00	53	Question object (53)	1	[{"added": {}}]	11	1
143	2024-04-17 01:40:45.156893+00	54	Question object (54)	1	[{"added": {}}]	11	1
144	2024-04-17 01:41:45.328903+00	55	Question object (55)	1	[{"added": {}}]	11	1
145	2024-04-17 01:42:47.183427+00	56	Question object (56)	1	[{"added": {}}]	11	1
146	2024-04-17 01:43:38.948441+00	57	Question object (57)	1	[{"added": {}}]	11	1
147	2024-04-17 01:47:25.073104+00	58	Question object (58)	1	[{"added": {}}]	11	1
148	2024-04-17 01:53:35.542755+00	59	Question object (59)	1	[{"added": {}}]	11	1
149	2024-04-17 01:55:23.189388+00	60	Question object (60)	1	[{"added": {}}]	11	1
150	2024-04-17 01:59:01.023814+00	61	Question object (61)	1	[{"added": {}}]	11	1
151	2024-04-17 02:00:22.33872+00	62	Question object (62)	1	[{"added": {}}]	11	1
152	2024-04-17 02:04:30.953994+00	63	Question object (63)	1	[{"added": {}}]	11	1
153	2024-04-17 02:05:30.504242+00	64	Question object (64)	1	[{"added": {}}]	11	1
154	2024-04-17 02:07:03.788466+00	65	Question object (65)	1	[{"added": {}}]	11	1
155	2024-04-17 02:08:41.382469+00	66	Question object (66)	1	[{"added": {}}]	11	1
156	2024-04-17 02:08:48.531715+00	66	Question object (66)	2	[{"changed": {"fields": ["Title"]}}]	11	1
157	2024-04-17 02:10:03.856266+00	67	Question object (67)	1	[{"added": {}}]	11	1
158	2024-04-17 02:11:29.23815+00	68	Question object (68)	1	[{"added": {}}]	11	1
159	2024-04-17 02:21:40.077813+00	69	Question object (69)	1	[{"added": {}}]	11	1
160	2024-04-17 02:23:17.073748+00	70	Question object (70)	1	[{"added": {}}]	11	1
161	2024-04-17 02:25:18.981089+00	71	Question object (71)	1	[{"added": {}}]	11	1
162	2024-04-17 02:27:09.783885+00	72	Question object (72)	1	[{"added": {}}]	11	1
163	2024-04-17 02:29:21.145227+00	73	Question object (73)	1	[{"added": {}}]	11	1
164	2024-04-17 02:30:45.230821+00	74	Question object (74)	1	[{"added": {}}]	11	1
165	2024-04-17 02:30:54.679199+00	74	Question object (74)	2	[{"changed": {"fields": ["Title"]}}]	11	1
166	2024-04-17 02:31:42.51451+00	75	Question object (75)	1	[{"added": {}}]	11	1
167	2024-04-17 02:33:44.27806+00	76	Question object (76)	1	[{"added": {}}]	11	1
168	2024-04-17 02:35:55.957227+00	77	Question object (77)	1	[{"added": {}}]	11	1
169	2024-04-17 02:37:20.702939+00	78	Question object (78)	1	[{"added": {}}]	11	1
170	2024-04-17 02:38:26.205179+00	79	Question object (79)	1	[{"added": {}}]	11	1
171	2024-04-17 02:40:14.417907+00	80	Question object (80)	1	[{"added": {}}]	11	1
172	2024-04-17 02:41:42.323815+00	81	Question object (81)	1	[{"added": {}}]	11	1
173	2024-04-17 02:43:28.773949+00	82	Question object (82)	1	[{"added": {}}]	11	1
174	2024-04-17 02:45:11.69971+00	83	Question object (83)	1	[{"added": {}}]	11	1
175	2024-04-17 02:46:32.531113+00	84	Question object (84)	1	[{"added": {}}]	11	1
176	2024-04-17 02:57:33.388904+00	85	Question object (85)	1	[{"added": {}}]	11	1
177	2024-04-17 03:00:04.191007+00	86	Question object (86)	1	[{"added": {}}]	11	1
178	2024-04-17 03:02:40.914723+00	87	Question object (87)	1	[{"added": {}}]	11	1
179	2024-04-17 03:04:36.357882+00	88	Question object (88)	1	[{"added": {}}]	11	1
180	2024-04-17 03:04:42.060273+00	88	Question object (88)	3		11	1
181	2024-04-17 03:06:40.065297+00	89	Question object (89)	1	[{"added": {}}]	11	1
182	2024-04-17 03:08:36.729594+00	90	Question object (90)	1	[{"added": {}}]	11	1
183	2024-04-17 04:30:48.556492+00	2	Test 1 Module 1	2	[{"changed": {"fields": ["Num questions"]}}]	9	1
184	2024-04-17 04:30:53.824051+00	3	Test 1 Module 2	2	[{"changed": {"fields": ["Num questions"]}}]	9	1
185	2024-04-17 04:31:04.765101+00	4	Test 2 Module 1	1	[{"added": {}}]	9	1
186	2024-04-17 04:31:12.904041+00	5	Test 2 Module 2	1	[{"added": {}}]	9	1
187	2024-04-17 04:34:02.395205+00	91	Question object (91)	1	[{"added": {}}]	11	1
188	2024-04-17 04:35:04.389016+00	92	Question object (92)	1	[{"added": {}}]	11	1
189	2024-04-17 04:36:06.651241+00	93	Question object (93)	1	[{"added": {}}]	11	1
190	2024-04-17 04:37:41.74233+00	94	Question object (94)	1	[{"added": {}}]	11	1
191	2024-04-17 04:38:48.065297+00	95	Question object (95)	1	[{"added": {}}]	11	1
192	2024-04-17 04:40:18.225782+00	96	Question object (96)	1	[{"added": {}}]	11	1
193	2024-04-17 04:42:07.961794+00	97	Question object (97)	1	[{"added": {}}]	11	1
194	2024-04-17 04:43:44.971789+00	98	Question object (98)	1	[{"added": {}}]	11	1
195	2024-04-17 04:45:45.710226+00	99	Question object (99)	1	[{"added": {}}]	11	1
196	2024-04-17 04:45:53.162761+00	99	Question object (99)	2	[{"changed": {"fields": ["Title"]}}]	11	1
197	2024-04-17 04:47:21.417698+00	100	Question object (100)	1	[{"added": {}}]	11	1
198	2024-04-17 04:48:54.284387+00	101	Question object (101)	1	[{"added": {}}]	11	1
199	2024-04-17 04:49:55.175615+00	102	Question object (102)	1	[{"added": {}}]	11	1
200	2024-04-17 04:50:12.006496+00	103	Question object (103)	1	[{"added": {}}]	11	1
201	2024-04-17 04:50:26.803335+00	104	Question object (104)	1	[{"added": {}}]	11	1
202	2024-04-17 04:52:34.496799+00	105	Question object (105)	1	[{"added": {}}]	11	1
203	2024-04-17 04:55:13.837374+00	106	Question object (106)	1	[{"added": {}}]	11	1
204	2024-04-17 04:56:50.21096+00	107	Question object (107)	1	[{"added": {}}]	11	1
205	2024-04-17 04:58:15.582107+00	108	Question object (108)	1	[{"added": {}}]	11	1
206	2024-04-17 05:00:12.386735+00	109	Question object (109)	1	[{"added": {}}]	11	1
207	2024-04-17 05:02:47.435326+00	110	Question object (110)	1	[{"added": {}}]	11	1
208	2024-04-17 05:03:54.502187+00	111	Question object (111)	1	[{"added": {}}]	11	1
209	2024-04-17 05:05:01.468545+00	112	Question object (112)	1	[{"added": {}}]	11	1
210	2024-04-17 05:06:48.636647+00	113	Question object (113)	1	[{"added": {}}]	11	1
211	2024-04-17 05:08:08.107655+00	114	Question object (114)	1	[{"added": {}}]	11	1
212	2024-04-17 05:09:30.919303+00	115	Question object (115)	1	[{"added": {}}]	11	1
213	2024-04-17 05:11:16.323138+00	116	Question object (116)	1	[{"added": {}}]	11	1
214	2024-04-17 05:12:38.380389+00	117	Question object (117)	1	[{"added": {}}]	11	1
215	2024-04-17 05:16:50.220488+00	118	Question object (118)	1	[{"added": {}}]	11	1
216	2024-04-17 05:17:56.880973+00	119	Question object (119)	1	[{"added": {}}]	11	1
217	2024-04-17 05:18:02.114355+00	118	Question object (118)	2	[{"changed": {"fields": ["Query"]}}]	11	1
218	2024-04-17 05:24:53.869877+00	120	Question object (120)	1	[{"added": {}}]	11	1
219	2024-04-17 05:25:32.765231+00	120	Question object (120)	2	[{"changed": {"fields": ["Query"]}}]	11	1
220	2024-04-17 05:25:35.932753+00	119	Question object (119)	2	[]	11	1
221	2024-04-17 05:25:39.492253+00	118	Question object (118)	2	[]	11	1
222	2024-04-17 05:27:02.409479+00	121	Question object (121)	1	[{"added": {}}]	11	1
223	2024-04-17 05:28:01.640997+00	122	Question object (122)	1	[{"added": {}}]	11	1
224	2024-04-17 05:28:01.690966+00	123	Question object (123)	1	[{"added": {}}]	11	1
225	2024-04-17 05:29:02.753917+00	124	Question object (124)	1	[{"added": {}}]	11	1
226	2024-04-17 05:29:19.85578+00	123	Question object (123)	2	[{"changed": {"fields": ["Title"]}}]	11	1
227	2024-04-17 05:29:24.486873+00	124	Question object (124)	2	[{"changed": {"fields": ["Title"]}}]	11	1
228	2024-04-17 05:31:13.133161+00	125	Question object (125)	1	[{"added": {}}]	11	1
229	2024-04-17 05:32:13.775618+00	126	Question object (126)	1	[{"added": {}}]	11	1
230	2024-04-17 05:34:04.497271+00	127	Question object (127)	1	[{"added": {}}]	11	1
231	2024-04-17 05:35:27.531329+00	128	Question object (128)	1	[{"added": {}}]	11	1
232	2024-04-17 05:36:42.013287+00	129	Question object (129)	1	[{"added": {}}]	11	1
233	2024-04-17 05:37:01.139319+00	130	Question object (130)	1	[{"added": {}}]	11	1
234	2024-04-17 05:37:19.594479+00	131	Question object (131)	1	[{"added": {}}]	11	1
235	2024-04-17 05:37:24.852066+00	131	Question object (131)	2	[{"changed": {"fields": ["Title"]}}]	11	1
236	2024-04-17 05:39:47.980542+00	132	Question object (132)	1	[{"added": {}}]	11	1
237	2024-04-17 05:41:03.313678+00	133	Question object (133)	1	[{"added": {}}]	11	1
238	2024-04-17 05:42:39.566959+00	134	Question object (134)	1	[{"added": {}}]	11	1
239	2024-04-17 05:44:07.632438+00	135	Question object (135)	1	[{"added": {}}]	11	1
240	2024-04-17 05:45:11.628823+00	136	Question object (136)	1	[{"added": {}}]	11	1
241	2024-04-17 05:46:16.76817+00	137	Question object (137)	1	[{"added": {}}]	11	1
242	2024-04-17 05:47:32.60197+00	138	Question object (138)	1	[{"added": {}}]	11	1
243	2024-04-17 05:48:23.839707+00	139	Question object (139)	1	[{"added": {}}]	11	1
244	2024-04-17 05:50:00.901726+00	140	Question object (140)	1	[{"added": {}}]	11	1
245	2024-04-17 05:51:33.473219+00	141	Question object (141)	1	[{"added": {}}]	11	1
246	2024-04-17 05:52:48.821898+00	142	Question object (142)	1	[{"added": {}}]	11	1
247	2024-04-17 05:54:05.08966+00	143	Question object (143)	1	[{"added": {}}]	11	1
248	2024-04-17 05:56:08.419541+00	144	Question object (144)	1	[{"added": {}}]	11	1
249	2024-04-17 06:35:42.238957+00	6	Test 3 Module 1	1	[{"added": {}}]	9	1
250	2024-04-17 06:35:50.333629+00	7	Test 3 Module 2	1	[{"added": {}}]	9	1
251	2024-04-17 07:59:46.386824+00	145	Question object (145)	1	[{"added": {}}]	11	1
252	2024-04-17 08:01:31.66829+00	146	Question object (146)	1	[{"added": {}}]	11	1
253	2024-04-17 08:02:54.241084+00	147	Question object (147)	1	[{"added": {}}]	11	1
254	2024-04-17 08:03:13.548339+00	147	Question object (147)	2	[{"changed": {"fields": ["Option A", "Option D", "Correct answer"]}}]	11	1
255	2024-04-17 08:04:14.831895+00	148	Question object (148)	1	[{"added": {}}]	11	1
256	2024-04-17 08:06:07.434828+00	149	Question object (149)	1	[{"added": {}}]	11	1
257	2024-04-17 08:07:07.779088+00	150	Question object (150)	1	[{"added": {}}]	11	1
258	2024-04-17 08:08:31.473342+00	151	Question object (151)	1	[{"added": {}}]	11	1
259	2024-04-17 08:09:19.328787+00	152	Question object (152)	1	[{"added": {}}]	11	1
260	2024-04-17 08:10:37.103499+00	153	Question object (153)	1	[{"added": {}}]	11	1
261	2024-04-17 08:12:05.119793+00	154	Question object (154)	1	[{"added": {}}]	11	1
262	2024-04-17 08:15:03.826536+00	155	Question object (155)	1	[{"added": {}}]	11	1
263	2024-04-17 08:16:15.643279+00	156	Question object (156)	1	[{"added": {}}]	11	1
264	2024-04-17 08:17:14.690003+00	157	Question object (157)	1	[{"added": {}}]	11	1
265	2024-04-17 08:17:32.790601+00	158	Question object (158)	1	[{"added": {}}]	11	1
266	2024-04-17 08:17:45.661164+00	159	Question object (159)	1	[{"added": {}}]	11	1
267	2024-04-17 08:23:06.453083+00	160	Question object (160)	1	[{"added": {}}]	11	1
268	2024-04-17 08:25:41.198843+00	161	Question object (161)	1	[{"added": {}}]	11	1
269	2024-04-17 08:27:07.898122+00	162	Question object (162)	1	[{"added": {}}]	11	1
270	2024-04-17 08:28:10.354161+00	163	Question object (163)	1	[{"added": {}}]	11	1
271	2024-04-17 08:28:21.571481+00	160	Question object (160)	2	[]	11	1
272	2024-04-17 08:29:27.048076+00	164	Question object (164)	1	[{"added": {}}]	11	1
273	2024-04-17 08:30:41.545829+00	165	Question object (165)	1	[{"added": {}}]	11	1
274	2024-04-17 08:31:48.950237+00	166	Question object (166)	1	[{"added": {}}]	11	1
275	2024-04-17 08:33:47.865466+00	167	Question object (167)	1	[{"added": {}}]	11	1
276	2024-04-17 08:37:25.724561+00	168	Question object (168)	1	[{"added": {}}]	11	1
277	2024-04-17 08:39:14.021488+00	169	Question object (169)	1	[{"added": {}}]	11	1
278	2024-04-17 08:40:38.602523+00	170	Question object (170)	1	[{"added": {}}]	11	1
279	2024-04-17 08:43:02.505518+00	171	Question object (171)	1	[{"added": {}}]	11	1
280	2024-04-17 08:45:10.484413+00	172	Question object (172)	1	[{"added": {}}]	11	1
281	2024-04-17 08:46:18.574935+00	173	Question object (173)	1	[{"added": {}}]	11	1
282	2024-04-17 08:47:32.905006+00	174	Question object (174)	1	[{"added": {}}]	11	1
283	2024-04-17 08:48:26.545176+00	175	Question object (175)	1	[{"added": {}}]	11	1
284	2024-04-17 08:49:37.538133+00	176	Question object (176)	1	[{"added": {}}]	11	1
285	2024-04-17 08:50:43.512546+00	177	Question object (177)	1	[{"added": {}}]	11	1
286	2024-04-17 08:51:34.446371+00	178	Question object (178)	1	[{"added": {}}]	11	1
287	2024-04-17 08:52:38.699087+00	179	Question object (179)	1	[{"added": {}}]	11	1
288	2024-04-17 08:53:29.740499+00	180	Question object (180)	1	[{"added": {}}]	11	1
289	2024-04-17 08:55:20.680476+00	181	Question object (181)	1	[{"added": {}}]	11	1
290	2024-04-17 08:56:26.608213+00	182	Question object (182)	1	[{"added": {}}]	11	1
291	2024-04-17 08:57:16.172953+00	183	Question object (183)	1	[{"added": {}}]	11	1
292	2024-04-17 08:57:31.569032+00	184	Question object (184)	1	[{"added": {}}]	11	1
293	2024-04-17 08:57:54.394973+00	185	Question object (185)	1	[{"added": {}}]	11	1
294	2024-04-17 09:01:11.249981+00	186	Question object (186)	1	[{"added": {}}]	11	1
295	2024-04-17 09:03:47.087438+00	187	Question object (187)	1	[{"added": {}}]	11	1
296	2024-04-17 09:05:37.210339+00	188	Question object (188)	1	[{"added": {}}]	11	1
297	2024-04-17 09:06:46.674416+00	189	Question object (189)	1	[{"added": {}}]	11	1
298	2024-04-17 09:09:49.161965+00	190	Question object (190)	1	[{"added": {}}]	11	1
299	2024-04-17 09:10:45.588261+00	191	Question object (191)	1	[{"added": {}}]	11	1
300	2024-04-17 09:12:04.23204+00	192	Question object (192)	1	[{"added": {}}]	11	1
301	2024-04-17 09:13:25.358915+00	193	Question object (193)	1	[{"added": {}}]	11	1
302	2024-04-17 09:15:11.424888+00	194	Question object (194)	1	[{"added": {}}]	11	1
303	2024-04-17 09:18:06.2013+00	195	Question object (195)	1	[{"added": {}}]	11	1
304	2024-04-17 09:21:41.142363+00	196	Question object (196)	1	[{"added": {}}]	11	1
305	2024-04-17 09:22:56.7899+00	197	Question object (197)	1	[{"added": {}}]	11	1
306	2024-04-17 09:24:00.114016+00	198	Question object (198)	1	[{"added": {}}]	11	1
307	2024-04-17 20:18:19.400708+00	8	Test 4 Module 1	1	[{"added": {}}]	9	1
308	2024-04-17 20:18:34.901897+00	9	Test 4 Module 2	1	[{"added": {}}]	9	1
309	2024-04-17 20:31:08.471737+00	199	Question object (199)	1	[{"added": {}}]	11	1
310	2024-04-17 20:32:25.933676+00	200	Question object (200)	1	[{"added": {}}]	11	1
311	2024-04-17 20:33:09.146981+00	201	Question object (201)	1	[{"added": {}}]	11	1
312	2024-04-17 20:34:32.437943+00	202	Question object (202)	1	[{"added": {}}]	11	1
313	2024-04-17 20:37:16.188445+00	203	Question object (203)	1	[{"added": {}}]	11	1
314	2024-04-17 20:38:53.224802+00	204	Question object (204)	1	[{"added": {}}]	11	1
315	2024-04-17 20:39:54.123102+00	205	Question object (205)	1	[{"added": {}}]	11	1
316	2024-04-17 20:41:09.574235+00	206	Question object (206)	1	[{"added": {}}]	11	1
317	2024-04-17 20:42:03.296264+00	207	Question object (207)	1	[{"added": {}}]	11	1
318	2024-04-17 20:43:21.324014+00	208	Question object (208)	1	[{"added": {}}]	11	1
319	2024-04-17 20:44:06.800339+00	209	Question object (209)	1	[{"added": {}}]	11	1
320	2024-04-17 20:45:22.478849+00	210	Question object (210)	1	[{"added": {}}]	11	1
321	2024-04-17 20:46:13.618171+00	211	Question object (211)	1	[{"added": {}}]	11	1
322	2024-04-17 20:46:32.686144+00	212	Question object (212)	1	[{"added": {}}]	11	1
323	2024-04-17 20:46:52.699503+00	213	Question object (213)	1	[{"added": {}}]	11	1
324	2024-04-17 20:48:25.242022+00	214	Question object (214)	1	[{"added": {}}]	11	1
325	2024-04-17 20:50:12.62015+00	215	Question object (215)	1	[{"added": {}}]	11	1
326	2024-04-17 20:50:52.935533+00	216	Question object (216)	1	[{"added": {}}]	11	1
327	2024-04-17 20:51:44.771885+00	217	Question object (217)	1	[{"added": {}}]	11	1
328	2024-04-17 20:57:13.688943+00	218	Question object (218)	1	[{"added": {}}]	11	1
329	2024-04-17 20:59:10.132224+00	219	Question object (219)	1	[{"added": {}}]	11	1
330	2024-04-17 21:01:18.967238+00	220	Question object (220)	1	[{"added": {}}]	11	1
331	2024-04-17 21:03:01.965099+00	221	Question object (221)	1	[{"added": {}}]	11	1
332	2024-04-17 21:05:02.434947+00	222	Question object (222)	1	[{"added": {}}]	11	1
333	2024-04-17 21:06:32.315712+00	223	Question object (223)	1	[{"added": {}}]	11	1
334	2024-04-17 21:07:59.676932+00	224	Question object (224)	1	[{"added": {}}]	11	1
335	2024-04-17 21:09:09.17174+00	225	Question object (225)	1	[{"added": {}}]	11	1
336	2024-04-17 21:11:23.704793+00	226	Question object (226)	1	[{"added": {}}]	11	1
337	2024-04-17 21:12:49.164488+00	227	Question object (227)	1	[{"added": {}}]	11	1
338	2024-04-17 21:13:32.430931+00	228	Question object (228)	1	[{"added": {}}]	11	1
339	2024-04-17 21:14:25.066833+00	229	Question object (229)	1	[{"added": {}}]	11	1
340	2024-04-17 21:15:08.542672+00	230	Question object (230)	1	[{"added": {}}]	11	1
341	2024-04-17 21:15:49.190509+00	231	Question object (231)	1	[{"added": {}}]	11	1
342	2024-04-17 21:17:45.660827+00	232	Question object (232)	1	[{"added": {}}]	11	1
343	2024-04-17 21:19:39.574222+00	233	Question object (233)	1	[{"added": {}}]	11	1
344	2024-04-17 21:23:32.015438+00	234	Question object (234)	1	[{"added": {}}]	11	1
345	2024-04-17 21:24:13.762726+00	235	Question object (235)	1	[{"added": {}}]	11	1
346	2024-04-17 21:25:17.996496+00	236	Question object (236)	1	[{"added": {}}]	11	1
347	2024-04-17 21:26:21.258261+00	237	Question object (237)	1	[{"added": {}}]	11	1
348	2024-04-17 21:27:39.890617+00	238	Question object (238)	1	[{"added": {}}]	11	1
349	2024-04-17 21:27:55.349395+00	239	Question object (239)	1	[{"added": {}}]	11	1
350	2024-04-17 21:28:07.874728+00	240	Question object (240)	1	[{"added": {}}]	11	1
351	2024-04-17 21:30:16.150075+00	241	Question object (241)	1	[{"added": {}}]	11	1
352	2024-04-17 21:31:45.731998+00	242	Question object (242)	1	[{"added": {}}]	11	1
353	2024-04-17 21:32:57.844398+00	243	Question object (243)	1	[{"added": {}}]	11	1
354	2024-04-17 21:35:04.03382+00	244	Question object (244)	1	[{"added": {}}]	11	1
355	2024-04-17 21:36:41.425522+00	245	Question object (245)	1	[{"added": {}}]	11	1
356	2024-04-17 21:37:39.902389+00	246	Question object (246)	1	[{"added": {}}]	11	1
357	2024-04-17 21:38:41.316297+00	247	Question object (247)	1	[{"added": {}}]	11	1
358	2024-04-17 21:39:38.675714+00	248	Question object (248)	1	[{"added": {}}]	11	1
359	2024-04-17 21:40:52.883112+00	249	Question object (249)	1	[{"added": {}}]	11	1
360	2024-04-17 22:01:08.784501+00	250	Question object (250)	1	[{"added": {}}]	11	1
361	2024-04-17 22:02:31.598827+00	251	Question object (251)	1	[{"added": {}}]	11	1
362	2024-04-17 22:03:21.734811+00	252	Question object (252)	1	[{"added": {}}]	11	1
363	2024-04-17 23:06:07.61613+00	58	Question object (58)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Correct answer"]}}]	11	1
364	2024-04-17 23:06:56.177991+00	58	Question object (58)	2	[{"changed": {"fields": ["Context"]}}]	11	1
365	2024-04-17 23:07:29.711873+00	59	Question object (59)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
366	2024-04-17 23:08:47.366364+00	85	Question object (85)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
367	2024-04-17 23:10:08.75568+00	114	Question object (114)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
368	2024-04-17 23:11:48.996096+00	86	Question object (86)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
369	2024-04-17 23:13:16.23934+00	113	Question object (113)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D"]}}]	11	1
370	2024-04-17 23:13:27.323453+00	114	Question object (114)	2	[]	11	1
371	2024-04-17 23:15:55.636476+00	115	Question object (115)	2	[{"changed": {"fields": ["Context", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
372	2024-04-17 23:19:37.626057+00	140	Question object (140)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
373	2024-04-17 23:20:13.667214+00	141	Question object (141)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
374	2024-04-17 23:22:49.920932+00	142	Question object (142)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option D"]}}]	11	1
375	2024-04-17 23:24:23.739529+00	168	Question object (168)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
376	2024-04-17 23:25:09.5728+00	169	Question object (169)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
377	2024-04-17 23:26:31.518244+00	194	Question object (194)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
378	2024-04-17 23:27:31.988717+00	195	Question object (195)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D", "Correct answer"]}}]	11	1
379	2024-04-17 23:29:05.095131+00	196	Question object (196)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Correct answer"]}}]	11	1
380	2024-04-17 23:30:00.703138+00	222	Question object (222)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option C", "Option D"]}}]	11	1
381	2024-04-17 23:31:56.634524+00	223	Question object (223)	2	[{"changed": {"fields": ["Context", "Option A", "Option B", "Option D"]}}]	11	1
382	2024-04-17 23:33:41.27649+00	249	Question object (249)	2	[]	11	1
383	2024-04-17 23:34:13.766874+00	10	Test 5 Module 1	1	[{"added": {}}]	9	1
384	2024-04-17 23:34:19.399046+00	11	Test 5 Module 2	1	[{"added": {}}]	9	1
385	2024-04-17 23:41:12.873976+00	253	Question object (253)	1	[{"added": {}}]	11	1
386	2024-04-17 23:42:08.987195+00	254	Question object (254)	1	[{"added": {}}]	11	1
387	2024-04-17 23:42:52.23487+00	255	Question object (255)	1	[{"added": {}}]	11	1
388	2024-04-17 23:43:35.43008+00	256	Question object (256)	1	[{"added": {}}]	11	1
389	2024-04-17 23:44:48.339398+00	257	Question object (257)	1	[{"added": {}}]	11	1
390	2024-04-17 23:46:08.697439+00	258	Question object (258)	1	[{"added": {}}]	11	1
391	2024-04-17 23:47:18.166303+00	259	Question object (259)	1	[{"added": {}}]	11	1
392	2024-04-17 23:48:09.163742+00	260	Question object (260)	1	[{"added": {}}]	11	1
393	2024-04-17 23:49:07.07343+00	261	Question object (261)	1	[{"added": {}}]	11	1
394	2024-04-17 23:49:59.598206+00	262	Question object (262)	1	[{"added": {}}]	11	1
395	2024-04-17 23:51:01.128415+00	263	Question object (263)	1	[{"added": {}}]	11	1
396	2024-04-17 23:52:11.244111+00	264	Question object (264)	1	[{"added": {}}]	11	1
397	2024-04-17 23:54:26.927237+00	265	Question object (265)	1	[{"added": {}}]	11	1
398	2024-04-17 23:55:06.917602+00	266	Question object (266)	1	[{"added": {}}]	11	1
399	2024-04-17 23:55:21.019406+00	267	Question object (267)	1	[{"added": {}}]	11	1
400	2024-04-17 23:55:35.366582+00	268	Question object (268)	1	[{"added": {}}]	11	1
401	2024-04-17 23:57:00.207924+00	269	Question object (269)	1	[{"added": {}}]	11	1
402	2024-04-17 23:57:54.79709+00	270	Question object (270)	1	[{"added": {}}]	11	1
403	2024-04-17 23:59:06.435582+00	271	Question object (271)	1	[{"added": {}}]	11	1
404	2024-04-17 23:59:49.919033+00	272	Question object (272)	1	[{"added": {}}]	11	1
405	2024-04-18 00:01:15.346035+00	273	Question object (273)	1	[{"added": {}}]	11	1
406	2024-04-18 00:02:11.494859+00	274	Question object (274)	1	[{"added": {}}]	11	1
407	2024-04-18 00:03:11.656641+00	275	Question object (275)	1	[{"added": {}}]	11	1
408	2024-04-18 00:07:43.629497+00	276	Question object (276)	1	[{"added": {}}]	11	1
409	2024-04-18 00:08:33.369006+00	277	Question object (277)	1	[{"added": {}}]	11	1
410	2024-04-18 00:08:39.965239+00	277	Question object (277)	2	[{"changed": {"fields": ["Title"]}}]	11	1
411	2024-04-18 00:09:48.132304+00	278	Question object (278)	1	[{"added": {}}]	11	1
412	2024-04-18 00:11:15.223125+00	279	Question object (279)	1	[{"added": {}}]	11	1
413	2024-04-18 00:12:44.801984+00	280	Question object (280)	1	[{"added": {}}]	11	1
414	2024-04-18 00:13:23.548779+00	281	Question object (281)	1	[{"added": {}}]	11	1
415	2024-04-18 00:16:19.415486+00	282	Question object (282)	1	[{"added": {}}]	11	1
416	2024-04-18 00:17:03.251398+00	283	Question object (283)	1	[{"added": {}}]	11	1
417	2024-04-18 00:17:51.186735+00	284	Question object (284)	1	[{"added": {}}]	11	1
418	2024-04-18 00:18:52.029974+00	285	Question object (285)	1	[{"added": {}}]	11	1
419	2024-04-18 00:20:15.65568+00	286	Question object (286)	1	[{"added": {}}]	11	1
420	2024-04-18 00:21:26.655146+00	287	Question object (287)	1	[{"added": {}}]	11	1
421	2024-04-18 00:22:33.26508+00	288	Question object (288)	1	[{"added": {}}]	11	1
422	2024-04-18 00:23:39.482445+00	289	Question object (289)	1	[{"added": {}}]	11	1
423	2024-04-18 00:25:39.495976+00	290	Question object (290)	1	[{"added": {}}]	11	1
424	2024-04-18 00:28:27.670944+00	291	Question object (291)	1	[{"added": {}}]	11	1
425	2024-04-18 00:29:42.689192+00	292	Question object (292)	1	[{"added": {}}]	11	1
426	2024-04-18 00:30:05.845682+00	293	Question object (293)	1	[{"added": {}}]	11	1
427	2024-04-18 00:30:18.942892+00	294	Question object (294)	1	[{"added": {}}]	11	1
428	2024-04-18 00:32:05.289715+00	295	Question object (295)	1	[{"added": {}}]	11	1
429	2024-04-18 00:33:17.940225+00	296	Question object (296)	1	[{"added": {}}]	11	1
430	2024-04-18 00:35:50.20352+00	297	Question object (297)	1	[{"added": {}}]	11	1
431	2024-04-18 00:40:21.167592+00	298	Question object (298)	1	[{"added": {}}]	11	1
432	2024-04-18 00:41:33.638687+00	299	Question object (299)	1	[{"added": {}}]	11	1
433	2024-04-18 00:42:26.46112+00	300	Question object (300)	1	[{"added": {}}]	11	1
434	2024-04-18 00:43:30.983558+00	301	Question object (301)	1	[{"added": {}}]	11	1
435	2024-04-18 00:44:38.751529+00	302	Question object (302)	1	[{"added": {}}]	11	1
436	2024-04-18 00:46:35.044911+00	303	Question object (303)	1	[{"added": {}}]	11	1
437	2024-04-18 00:48:01.485593+00	304	Question object (304)	1	[{"added": {}}]	11	1
438	2024-04-18 00:48:58.744558+00	305	Question object (305)	1	[{"added": {}}]	11	1
439	2024-04-18 00:49:56.219374+00	306	Question object (306)	1	[{"added": {}}]	11	1
440	2024-04-30 04:05:57.39561+00	34	Question object (34)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
441	2024-04-30 04:06:10.990839+00	35	Question object (35)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
442	2024-04-30 04:06:20.528538+00	36	Question object (36)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
443	2024-04-30 04:06:52.886437+00	39	Question object (39)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
444	2024-04-30 04:07:07.781314+00	40	Question object (40)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
445	2024-04-30 04:07:17.968607+00	41	Question object (41)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
446	2024-04-30 04:07:36.134322+00	42	Question object (42)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
447	2024-04-30 04:07:46.790563+00	43	Question object (43)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
448	2024-04-30 04:07:58.01246+00	44	Question object (44)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
449	2024-04-30 04:08:26.158003+00	45	Question object (45)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
450	2024-04-30 04:08:45.561999+00	46	Question object (46)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
451	2024-04-30 04:09:04.04204+00	47	Question object (47)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
452	2024-04-30 04:09:10.853908+00	48	Question object (48)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
453	2024-04-30 04:09:26.010626+00	47	Question object (47)	2	[{"changed": {"fields": ["Section"]}}]	11	1
454	2024-04-30 04:09:38.753905+00	48	Question object (48)	2	[{"changed": {"fields": ["Section"]}}]	11	1
455	2024-04-30 04:09:54.816758+00	49	Question object (49)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
456	2024-04-30 04:10:14.185765+00	50	Question object (50)	2	[{"changed": {"fields": ["Model", "Section"]}}]	11	1
457	2024-05-05 07:32:28.147415+00	8	Ali Karim	3		8	1
458	2024-05-05 11:25:24.239686+00	11	Alijon Karimberdiev	3		8	1
459	2024-05-05 11:28:22.814719+00	12	Alijon Karimberdiev	3		8	1
460	2024-05-05 11:57:51.686101+00	15	Alijon Karimberdiev	3		8	1
461	2024-05-05 11:57:58.408282+00	14	Alijon Karimberdiev	3		8	1
462	2024-05-05 11:58:03.011044+00	13	Alijon Karimberdiev	3		8	1
463	2024-05-06 03:05:47.836133+00	1	Practice Test 1	1	[{"added": {}}]	18	1
464	2024-05-06 03:05:54.476446+00	2	Practice Test 2	1	[{"added": {}}]	18	1
465	2024-05-06 03:06:01.789009+00	3	Practice Test 3	1	[{"added": {}}]	18	1
466	2024-05-06 03:06:09.043072+00	4	Practice Test 4	1	[{"added": {}}]	18	1
467	2024-05-06 03:06:14.165701+00	5	Practice Test 5	1	[{"added": {}}]	18	1
468	2024-05-06 03:06:58.341678+00	2	Test 1 Module 1	2	[{"changed": {"fields": ["Test"]}}]	9	1
469	2024-05-06 03:07:04.38936+00	3	Test 1 Module 2	2	[{"changed": {"fields": ["Test"]}}]	9	1
470	2024-05-06 03:07:08.966811+00	4	Test 2 Module 1	2	[{"changed": {"fields": ["Test"]}}]	9	1
471	2024-05-06 03:07:12.703442+00	5	Test 2 Module 2	2	[{"changed": {"fields": ["Test"]}}]	9	1
472	2024-05-06 03:07:16.600354+00	6	Test 3 Module 1	2	[{"changed": {"fields": ["Test"]}}]	9	1
473	2024-05-06 03:07:20.028045+00	7	Test 3 Module 2	2	[{"changed": {"fields": ["Test"]}}]	9	1
474	2024-05-06 03:07:23.768119+00	8	Test 4 Module 1	2	[{"changed": {"fields": ["Test"]}}]	9	1
475	2024-05-06 03:07:27.949743+00	9	Test 4 Module 2	2	[{"changed": {"fields": ["Test"]}}]	9	1
476	2024-05-06 03:07:31.226826+00	10	Test 5 Module 1	2	[{"changed": {"fields": ["Test"]}}]	9	1
477	2024-05-06 03:07:34.402467+00	11	Test 5 Module 2	2	[{"changed": {"fields": ["Test"]}}]	9	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	authtoken	token
7	authtoken	tokenproxy
8	user	user
9	core	testmodel
10	core	testresult
11	core	question
12	core	comment
13	core	useranswer
14	core2	section
15	core2	tutorial
16	token_blacklist	blacklistedtoken
17	token_blacklist	outstandingtoken
18	core	test
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-04-07 22:22:07.552375+00
2	contenttypes	0002_remove_content_type_name	2024-04-07 22:22:07.558862+00
3	auth	0001_initial	2024-04-07 22:22:07.588143+00
4	auth	0002_alter_permission_name_max_length	2024-04-07 22:22:07.591875+00
5	auth	0003_alter_user_email_max_length	2024-04-07 22:22:07.595509+00
6	auth	0004_alter_user_username_opts	2024-04-07 22:22:07.599574+00
7	auth	0005_alter_user_last_login_null	2024-04-07 22:22:07.603887+00
8	auth	0006_require_contenttypes_0002	2024-04-07 22:22:07.605761+00
9	auth	0007_alter_validators_add_error_messages	2024-04-07 22:22:07.610405+00
10	auth	0008_alter_user_username_max_length	2024-04-07 22:22:07.613886+00
11	auth	0009_alter_user_last_name_max_length	2024-04-07 22:22:07.617849+00
12	auth	0010_alter_group_name_max_length	2024-04-07 22:22:07.623585+00
13	auth	0011_update_proxy_permissions	2024-04-07 22:22:07.627251+00
14	auth	0012_alter_user_first_name_max_length	2024-04-07 22:22:07.630847+00
15	user	0001_initial	2024-04-07 22:22:07.659139+00
16	admin	0001_initial	2024-04-07 22:22:07.674987+00
17	admin	0002_logentry_remove_auto_add	2024-04-07 22:22:07.680453+00
18	admin	0003_logentry_add_action_flag_choices	2024-04-07 22:22:07.685367+00
19	authtoken	0001_initial	2024-04-07 22:22:07.697339+00
20	authtoken	0002_auto_20160226_1747	2024-04-07 22:22:07.711537+00
21	authtoken	0003_tokenproxy	2024-04-07 22:22:07.714106+00
22	authtoken	0004_alter_tokenproxy_options	2024-04-07 22:22:07.717959+00
23	core	0001_initial	2024-04-07 22:22:07.77516+00
24	sessions	0001_initial	2024-04-07 22:22:07.783585+00
25	user	0002_auto_20240408_1823	2024-04-08 18:24:01.474803+00
26	user	0003_alter_user_subscription_type	2024-04-08 18:42:25.247694+00
27	core	0002_question_title	2024-04-09 03:30:37.284548+00
28	core2	0001_initial	2024-04-15 03:53:11.822415+00
29	core2	0002_rename_tutorialmodule_tutorial	2024-04-15 03:54:54.975755+00
30	core2	0003_alter_section_description	2024-04-15 04:25:54.301224+00
63	core2	0004_section_slug	2024-04-15 19:54:34.851935+00
64	core	0003_alter_testmodel_num_questions	2024-04-16 20:29:08.942206+00
65	core	0004_auto_20240430_0355	2024-04-30 03:55:18.465692+00
66	token_blacklist	0001_initial	2024-05-04 03:29:14.215422+00
67	token_blacklist	0002_outstandingtoken_jti_hex	2024-05-04 03:29:14.222522+00
68	token_blacklist	0003_auto_20171017_2007	2024-05-04 03:29:14.232081+00
69	token_blacklist	0004_auto_20171017_2013	2024-05-04 03:29:14.243598+00
70	token_blacklist	0005_remove_outstandingtoken_jti	2024-05-04 03:29:14.252558+00
71	token_blacklist	0006_auto_20171017_2113	2024-05-04 03:29:14.260101+00
72	token_blacklist	0007_auto_20171017_2214	2024-05-04 03:29:14.288399+00
73	token_blacklist	0008_migrate_to_bigautofield	2024-05-04 03:29:14.325157+00
74	token_blacklist	0010_fix_migrate_to_bigautofield	2024-05-04 03:29:14.3368+00
75	token_blacklist	0011_linearizes_history	2024-05-04 03:29:14.338315+00
76	token_blacklist	0012_alter_outstandingtoken_user	2024-05-04 03:29:14.346134+00
77	core	0005_auto_20240506_0250	2024-05-06 02:50:25.331891+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
dygch6p3l70voi89zgevxz8mw0t6kj55	.eJxVjMEOwiAQRP-FsyHrKrB49O43kF2gUjU0Ke3J-O_SpAc9zsx781aB16WEteU5jEld1FEdfjvh-Mx1G9KD633ScarLPIreEL2vTd-mlF_Xnf07KNxKtz04IUDjbPKE5AQG0wN5LxHBWeuiEObBgEEG5BP7xIxoz8Smy-rzBazeNpQ:1rtawY:tWjIrTFjB22kyMEn56ZXK2DPS0h_wKgjj9yPhzrvPiA	2024-04-21 22:24:54.575101+00
3juc3frymr4h81i6rafwyz8wv28mztnp	.eJxVjMEOwiAQRP-FsyHrKrB49O43kF2gUjU0Ke3J-O_SpAc9zsx781aB16WEteU5jEld1FEdfjvh-Mx1G9KD633ScarLPIreEL2vTd-mlF_Xnf07KNxKtz04IUDjbPKE5AQG0wN5LxHBWeuiEObBgEEG5BP7xIxoz8Smy-rzBazeNpQ:1rwDow:7fC0RG2AZMdyRP6Dhbg3FU7auySNjuH2-_eQprOI8Ug	2024-04-29 04:19:54.311228+00
vrwjt8l83rjcie8pur8cp73x9347s3zv	.eJxVjMEOwiAQRP-FsyHrKrB49O43kF2gUjU0Ke3J-O_SpAc9zsx781aB16WEteU5jEld1FEdfjvh-Mx1G9KD633ScarLPIreEL2vTd-mlF_Xnf07KNxKtz04IUDjbPKE5AQG0wN5LxHBWeuiEObBgEEG5BP7xIxoz8Smy-rzBazeNpQ:1s1ek5:-i1O-eOoOYPROHPThs06LZd6Gz3q9kVwJZtPUbG9Ses	2024-05-14 04:05:21.304058+00
\.


--
-- Data for Name: token_blacklist_blacklistedtoken; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.token_blacklist_blacklistedtoken (id, blacklisted_at, token_id) FROM stdin;
1	2024-05-04 03:40:27.572518+00	1
2	2024-05-05 00:00:42.065746+00	2
\.


--
-- Data for Name: token_blacklist_outstandingtoken; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.token_blacklist_outstandingtoken (id, token, created_at, expires_at, user_id, jti) FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjU2OTk2OSwiaWF0IjoxNzE0NzkzOTY5LCJqdGkiOiJmMGNhZjZmZTNhZjc0MDM1YTUzNWJlNDU5MDE3MDkzMSIsInVzZXJfaWQiOjN9.pp6RDesvPFmm1lc_qoW4Zalih-ylfqRPHD2iRPrDA88	2024-05-04 03:39:29.354732+00	2024-08-02 03:39:29+00	3	f0caf6fe3af74035a535be4590170931
2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY0MzEyNSwiaWF0IjoxNzE0ODY3MTI1LCJqdGkiOiI2YzZmYjY4ZDQ3ZjI0ZmJlYWE2ZjdiMTgyYmJiMTMwNyIsInVzZXJfaWQiOjh9.3UOnowwe4GW0zfXAOAZlrgRazgOmnMm642K3BMSgg0I	2024-05-04 23:58:45.213467+00	2024-08-02 23:58:45+00	\N	6c6fb68d47f24fbeaa6f7b182bbb1307
3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY1MjYwMSwiaWF0IjoxNzE0ODc2NjAxLCJqdGkiOiI4YTJiNjA0MTgwNzM0OGI2YWRmODMwZjE5YTg2OTc3ZiIsInVzZXJfaWQiOjh9.4im3kanDi3tM_Eo1KUlFuYCqMF0rW9FQ_udnQ7C7sRc	2024-05-05 02:36:41.018492+00	2024-08-03 02:36:41+00	\N	8a2b6041807348b6adf830f19a86977f
4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3MDIzNiwiaWF0IjoxNzE0ODk0MjM2LCJqdGkiOiIwMjc4NjQ0MGI1Yzc0N2QwOWIzNjE3ODBlMTVjYjk1NiIsInVzZXJfaWQiOjh9.3lUfLMKdaylvKiXjThrJkFRwU4SRVZiu9AgCqoGyi5s	2024-05-05 07:30:36.072995+00	2024-08-03 07:30:36+00	\N	02786440b5c747d09b361780e15cb956
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3MDcxNSwiaWF0IjoxNzE0ODk0NzE1LCJqdGkiOiI0Yjk3ZWNmYWVmMTA0ZGQwYjlmMTIyNzY4MmE5OTdiZCIsInVzZXJfaWQiOjEwfQ.NV0QuBcmhjk0tTty30bI3HGvdADBoPax4Cr49qepwiM	2024-05-05 07:38:35.38847+00	2024-08-03 07:38:35+00	10	4b97ecfaef104dd0b9f1227682a997bd
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3MTk3MSwiaWF0IjoxNzE0ODk1OTcxLCJqdGkiOiIyN2E2YmUwMWM2OTg0NjM5YmMyMTRjOTc3YTQwMzczNyIsInVzZXJfaWQiOjEwfQ.iY7zuZlPlfP4bQ3-8X2k9ZMvDmUwtGf-Rilwx-Fu6UI	2024-05-05 07:59:31.620123+00	2024-08-03 07:59:31+00	10	27a6be01c6984639bc214c977a403737
7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3MzE3MSwiaWF0IjoxNzE0ODk3MTcxLCJqdGkiOiJhMTNiZTQ4ZGRlNjk0YzMzOTZkZTFlM2QzMTExZDgxYiIsInVzZXJfaWQiOjEwfQ.dZfThTG3WHmhWP9QZx1bU8Ni_YU71nZCSZZoAbqjUn4	2024-05-05 08:19:31.41216+00	2024-08-03 08:19:31+00	10	a13be48dde694c3396de1e3d3111d81b
8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3MzMzOCwiaWF0IjoxNzE0ODk3MzM4LCJqdGkiOiJkMTM1Y2ZiOGJmNDA0ZWI5YTdhZGRhOTc3YzA5ZmY2YiIsInVzZXJfaWQiOjEwfQ.eZelS387GCXHY0exjh1srwI2eXuQEw8Un8mOanLxlVY	2024-05-05 08:22:18.666873+00	2024-08-03 08:22:18+00	10	d135cfb8bf404eb9a7adda977c09ff6b
9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3NDc2MCwiaWF0IjoxNzE0ODk4NzYwLCJqdGkiOiI1YzM3ZDNkNjBjYmQ0ODNiYjEyZGUxNDVlNThkZDk4ZiIsInVzZXJfaWQiOjEwfQ.E6XdRB05JrrjhyUVpIMUgcXZAZH81CF9hTQc0AuUZwo	2024-05-05 08:46:00.175324+00	2024-08-03 08:46:00+00	10	5c37d3d60cbd483bb12de145e58dd98f
10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3Njk3NCwiaWF0IjoxNzE0OTAwOTc0LCJqdGkiOiJmYWY1ZjlhMGU0OGY0ZGQ0YjI0MGY5OTU2NWQ3N2Q0NSIsInVzZXJfaWQiOjEwfQ.VGKuylOgEIF-ycwUkHsLUiT5QKRKG8nn9A1sqQ8w8bs	2024-05-05 09:22:54.717219+00	2024-08-03 09:22:54+00	10	faf5f9a0e48f4dd4b240f99565d77d45
11	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3NzI2MiwiaWF0IjoxNzE0OTAxMjYyLCJqdGkiOiI0NGEyNjY1MTdlYjA0YTBlYWRmOWFhMjUzOTJkMjBmYyIsInVzZXJfaWQiOjEwfQ.4jKsS0bOMUDbyvQxLNHlYo9XJldSe2n4-wUQVPefPYY	2024-05-05 09:27:42.76446+00	2024-08-03 09:27:42+00	10	44a266517eb04a0eadf9aa25392d20fc
12	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3NzgzOSwiaWF0IjoxNzE0OTAxODM5LCJqdGkiOiIxNGFhMjg0NWI2NmM0NmMwYjY4NmM4Mjg3NzNiYWIzZCIsInVzZXJfaWQiOjEwfQ.55m8M6xjDbGxW-9tAftHfYGXAFYj53tuKtOWlnUP74Y	2024-05-05 09:37:19.022852+00	2024-08-03 09:37:19+00	10	14aa2845b66c46c0b686c828773bab3d
13	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3ODE2NywiaWF0IjoxNzE0OTAyMTY3LCJqdGkiOiIxODcyOTQ1N2QwM2E0NDliYjFkMWU0NWY3NWU2MDgzNiIsInVzZXJfaWQiOjEwfQ.aEsP6Ab16sglP5hI4SXVJ6VKR9DFVDp2-z-2lqKsf1c	2024-05-05 09:42:47.142681+00	2024-08-03 09:42:47+00	10	18729457d03a449bb1d1e45f75e60836
14	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY3ODMzMSwiaWF0IjoxNzE0OTAyMzMxLCJqdGkiOiI0NWM1NDAyMjIyMTQ0ZGVlOTI4MTY4NzNlN2QwYjc4MSIsInVzZXJfaWQiOjEwfQ.lPSxYX4S0I9tAyFh2Pt43COhkGOcZFQx_HO591xHfN0	2024-05-05 09:45:31.348155+00	2024-08-03 09:45:31+00	10	45c5402222144dee92816873e7d0b781
15	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY4MTE1NSwiaWF0IjoxNzE0OTA1MTU1LCJqdGkiOiJmMDBkYmEzYTQ0ODE0MGEwODAzMDNkOTFlYzg1MjU5NiIsInVzZXJfaWQiOjEwfQ.vXJfCI7AeXohHb5ap8SAfJ5oDgfqp0JbFdHNJONv3vQ	2024-05-05 10:32:35.05674+00	2024-08-03 10:32:35+00	10	f00dba3a448140a080303d91ec852596
16	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY4MTQ2NywiaWF0IjoxNzE0OTA1NDY3LCJqdGkiOiI0ZWQxY2Y5MGU0ZTA0NzQ1YmFlODZiOTEyZjIzZWIyMyIsInVzZXJfaWQiOjEwfQ.Di966f5XRrIy-zOee-d-1OoFuWcygbgBiC0fTj9GGKE	2024-05-05 10:37:47.914713+00	2024-08-03 10:37:47+00	10	4ed1cf90e4e04745bae86b912f23eb23
17	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY4MzU5OSwiaWF0IjoxNzE0OTA3NTk5LCJqdGkiOiJhNWYzODZiM2M4YTM0ZjgzYmZiYTkyZjY2OGYxYzA3MiIsInVzZXJfaWQiOjEwfQ.H-XC6AlWfI4uNt6MnXT0Vo8rjz1qlNx8eJ0dHKPKMTQ	2024-05-05 11:13:19.633605+00	2024-08-03 11:13:19+00	10	a5f386b3c8a34f83bfba92f668f1c072
18	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjY4ODI5OSwiaWF0IjoxNzE0OTEyMjk5LCJqdGkiOiJmMjRkOGY3YjMzNjU0YTFiOGQ1Nzc3YTVjNTE3ZTNiNCIsInVzZXJfaWQiOjE2fQ.aAY5JqubH_l4ER7VFhARqxOrE6hCEG9O8yft700DiJY	2024-05-05 12:31:39.263544+00	2024-08-03 12:31:39+00	16	f24d8f7b33654a1b8d5777a5c517e3b4
19	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjcyNzcxNywiaWF0IjoxNzE0OTUxNzE3LCJqdGkiOiJiM2Q4ZGJmZGJjYmM0NTQ2OTUwYTJlMzk0MGI1ZTkxMCIsInVzZXJfaWQiOjE2fQ.4JTGDm_JD3716Lngq9F5S8Eu1HG2rGVOWazFJxdNSmI	2024-05-05 23:28:37.501999+00	2024-08-03 23:28:37+00	16	b3d8dbfdbcbc4546950a2e3940b5e910
20	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjczMTgwOSwiaWF0IjoxNzE0OTU1ODA5LCJqdGkiOiI2OTZjMjI4YWY3OTA0N2M2OWY3NzVmMWE1NWYyZWQwYSIsInVzZXJfaWQiOjEwfQ.RoP4cIKDqWJVoCKf482j3kb-Ny6lsEgIwzcWEfQwHZ4	2024-05-06 00:36:49.548511+00	2024-08-04 00:36:49+00	10	696c228af79047c69f775f1a55f2ed0a
21	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjczMTkzOCwiaWF0IjoxNzE0OTU1OTM4LCJqdGkiOiIyMTNhMGVhNDUzZGI0ZDE5YWI1YjZjYjY0MDAxN2ViZSIsInVzZXJfaWQiOjEwfQ.J9uvCz2_5WEeo6knYzZK3HNOm4W9n-EENRuN8dz2Yms	2024-05-06 00:38:58.175918+00	2024-08-04 00:38:58+00	10	213a0ea453db4d19ab5b6cb640017ebe
22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjczMTk0OSwiaWF0IjoxNzE0OTU1OTQ5LCJqdGkiOiJhMmY4N2VkNjIxMGU0OWViYTNiYmM3OTM3MWFkOTVjZSIsInVzZXJfaWQiOjEwfQ.J8edYp_zhDbSJeQZhfaqTNRnd8NYKmRaTiQvsZRB__I	2024-05-06 00:39:09.373906+00	2024-08-04 00:39:09+00	10	a2f87ed6210e49eba3bbc79371ad95ce
23	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjczMjE5MiwiaWF0IjoxNzE0OTU2MTkyLCJqdGkiOiI2NjQ0NmY3MzkyZjA0MjEyYmRkZmIxMzk3YTc2YjZjMSIsInVzZXJfaWQiOjEwfQ.-0djyavLiXfPasf5Op0KmzitjCDkJrHG26G8SXukTac	2024-05-06 00:43:12.463243+00	2024-08-04 00:43:12+00	10	66446f7392f04212bddfb1397a76b6c1
24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjczMjQyMiwiaWF0IjoxNzE0OTU2NDIyLCJqdGkiOiJkYWY2ODMyNGM1Njg0MzYyOTc3YmMzODdmYWVlZTYyMCIsInVzZXJfaWQiOjEwfQ.0Lloi5wzJLbzoIW1VNIyXq9kwEbIkb01FmmcWuBjC00	2024-05-06 00:47:02.591957+00	2024-08-04 00:47:02+00	10	daf68324c5684362977bc387faeee620
25	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MDc4MywiaWF0IjoxNzE0OTY0NzgzLCJqdGkiOiIxY2E2MDgxZmU5NzA0YjZmYjAyZGI4NmRhYzQwZjczOSIsInVzZXJfaWQiOjEwfQ.lwQTusj26PUblq0XWT2pRQ56gd8Hnn7KQ0t09mPnsWc	2024-05-06 03:06:23.690595+00	2024-08-04 03:06:23+00	10	1ca6081fe9704b6fb02db86dac40f739
26	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MTE2NywiaWF0IjoxNzE0OTY1MTY3LCJqdGkiOiI1ZjI0YjY3NWM1OWI0NDk1ODlhZmE3NzY1YmYwZDIyYSIsInVzZXJfaWQiOjEwfQ.EOnipwjLNTJ62T7hqFti4ugdD1hHWcbihR0UW2jp5M8	2024-05-06 03:12:47.247131+00	2024-08-04 03:12:47+00	10	5f24b675c59b449589afa7765bf0d22a
27	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MjM4MSwiaWF0IjoxNzE0OTY2MzgxLCJqdGkiOiJlNTVkZjBhZWEyMjU0YmZjOTFlYjFmOWM3ZGViMmVhMSIsInVzZXJfaWQiOjEwfQ.m873CYPdGaZwnzUElCPOfdbbWzFx5PgftK7pCKv6KOU	2024-05-06 03:33:01.097915+00	2024-08-04 03:33:01+00	10	e55df0aea2254bfc91eb1f9c7deb2ea1
28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MjczNCwiaWF0IjoxNzE0OTY2NzM0LCJqdGkiOiJjNTVjZjQ1MzYwMGQ0NDQwYjlmZmFjNWMyZDdlM2MxNiIsInVzZXJfaWQiOjEwfQ.uNPqBwh71eHLkg1i8V-hmEYqu03wJf8ZiC4-hNoSrLg	2024-05-06 03:38:54.506137+00	2024-08-04 03:38:54+00	10	c55cf453600d4440b9ffac5c2d7e3c16
29	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MjkzOCwiaWF0IjoxNzE0OTY2OTM4LCJqdGkiOiJlZjFiMGQ4MzhkMDE0OGIwODU4OWY5MTQ4ODcwMWRmNiIsInVzZXJfaWQiOjEwfQ.USJ1tvYM8TiV3cywcCwDE56oRvcJvzicMyQv1YNG2CQ	2024-05-06 03:42:18.583973+00	2024-08-04 03:42:18+00	10	ef1b0d838d0148b08589f91488701df6
30	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzI5MCwiaWF0IjoxNzE0OTY3MjkwLCJqdGkiOiIzODQ1MTRhMDI5ZDc0ODQ4YWM1ZTNlY2Y2YzU0YmIzZCIsInVzZXJfaWQiOjEwfQ.L_RgLWug_6twgIoOMf56XhUMXB7p8ijFeV2SbrqSt5o	2024-05-06 03:48:10.484442+00	2024-08-04 03:48:10+00	10	384514a029d74848ac5e3ecf6c54bb3d
31	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzMwNywiaWF0IjoxNzE0OTY3MzA3LCJqdGkiOiI3ZmMyMzczMzNlMTk0M2QzYjAwYTA3MjMwNTQ4NGRjYyIsInVzZXJfaWQiOjEwfQ.bhJ5HinaFrGHdxiM3rCCj03LZ0sTy0SLd7OQCW7Wsc8	2024-05-06 03:48:27.082546+00	2024-08-04 03:48:27+00	10	7fc237333e1943d3b00a072305484dcc
32	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzMyNiwiaWF0IjoxNzE0OTY3MzI2LCJqdGkiOiI5MzZhNTViNTRlYjc0ODkwODIxMmQyYmFhNDAwOGM4ZCIsInVzZXJfaWQiOjEwfQ.GrI2X1r3G_zLc25s2l8fnPKwBkEZK8rf3E7QasgfpuA	2024-05-06 03:48:46.828816+00	2024-08-04 03:48:46+00	10	936a55b54eb748908212d2baa4008c8d
33	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzM0NiwiaWF0IjoxNzE0OTY3MzQ2LCJqdGkiOiJmNzNlNTc2M2I5ZDU0MWEzOTliZWEyOTJhMGU0NzhlMSIsInVzZXJfaWQiOjEwfQ.WYAzgUIvnCMWoQHenqE_8uDPOK7GmzFuw0hxHhNITDM	2024-05-06 03:49:06.707283+00	2024-08-04 03:49:06+00	10	f73e5763b9d541a399bea292a0e478e1
34	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzQyMiwiaWF0IjoxNzE0OTY3NDIyLCJqdGkiOiJmNGMxMDIwZDJhMWE0NDNmYTQ2YWExMmNkY2YzZTU2ZSIsInVzZXJfaWQiOjEwfQ.oB4ZNgj5Dlx1SV8Qio2u9qZNHqv2BCc8D6lzb8E7hIs	2024-05-06 03:50:22.912331+00	2024-08-04 03:50:22+00	10	f4c1020d2a1a443fa46aa12cdcf3e56e
35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzUwNCwiaWF0IjoxNzE0OTY3NTA0LCJqdGkiOiI5OWNjN2Q2MmQ3NTA0MWU3OTY2N2I2MDU2YjlmZGJhZCIsInVzZXJfaWQiOjEwfQ.VSx3HkS4yTVud_wBBgb6O-R43bmxGxioE5mXU0PoA8o	2024-05-06 03:51:44.092072+00	2024-08-04 03:51:44+00	10	99cc7d62d75041e79667b6056b9fdbad
36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0Mzg2NSwiaWF0IjoxNzE0OTY3ODY1LCJqdGkiOiIzZTU0MzhiNmYwNWE0ZWVjODdmOTIwNWRhN2I1MWM1NSIsInVzZXJfaWQiOjEwfQ.MFiLuiP0CSyG2ezrv-ILM0QIwzVXbIyfOi9NtO3TcyE	2024-05-06 03:57:45.85+00	2024-08-04 03:57:45+00	10	3e5438b6f05a4eec87f9205da7b51c55
37	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0MzkxNiwiaWF0IjoxNzE0OTY3OTE2LCJqdGkiOiIzMDNmYmNmZGRkYWM0MWZkYmU3ODBjY2UwYjFlYzMxZiIsInVzZXJfaWQiOjEwfQ.3zmf4gYHYif0Fn7sh7v6qc3d3n_1dQkPJuxJysBU9aw	2024-05-06 03:58:36.307702+00	2024-08-04 03:58:36+00	10	303fbcfdddac41fdbe780cce0b1ec31f
38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0NDE4MywiaWF0IjoxNzE0OTY4MTgzLCJqdGkiOiI4ODEyZjVmMGRkYmU0ZWFkYTRlYTE3YWM5NGE0ZjA1MyIsInVzZXJfaWQiOjEwfQ.C1Iz92UVZTg9CN8w4LR5pAfd-8SBnZXBoo19A43OuDo	2024-05-06 04:03:03.719558+00	2024-08-04 04:03:03+00	10	8812f5f0ddbe4eada4ea17ac94a4f053
39	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc0NDI1MCwiaWF0IjoxNzE0OTY4MjUwLCJqdGkiOiI3MmY1ZDMwODBmNDY0YTZiODc4NjMyZDE0ZTQzYjdlOCIsInVzZXJfaWQiOjEwfQ.U6CgCp0v-ROhzsXcavKarkRp6DFU-LlAzaHH32eBTzs	2024-05-06 04:04:10.444256+00	2024-08-04 04:04:10+00	10	72f5d3080f464a6b878632d14e43b7e8
40	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjc1MTg4OCwiaWF0IjoxNzE0OTc1ODg4LCJqdGkiOiIzYzBkMTIzNGRkMGE0MzE4OGZhZDQ2ZTViMTZlMTE2MyIsInVzZXJfaWQiOjEwfQ.dVnouka2ukOxwEoWOh_V260tbvkWXgJ5c2YBGTW8Wi0	2024-05-06 06:11:28.191071+00	2024-08-04 06:11:28+00	10	3c0d1234dd0a43188fad46e5b16e1163
\.


--
-- Data for Name: user_user; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.user_user (id, password, last_login, is_superuser, email, first_name, last_name, is_active, is_staff, subscription_type) FROM stdin;
16	pbkdf2_sha256$260000$fHSPtqhTQosdPkHGrXCcrM$zgp0yCU1LNPNH9Qvta+8XHTRBuflvLhMvZclxUJs6R0=	\N	f	alijonkarimberdiev23@gmail.com	Alijon	Karimberdiev	t	f	free
3	pbkdf2_sha256$260000$yZk9UDjpGchLTSRR5m1EnI$3A9s54cOr7CzgVF5mT7CCvDClt7j+hDuDfB9rGdj8CA=	\N	f	bob2@gmail.com	Bob	Smith	t	f	free
2	pbkdf2_sha256$260000$Mv0fc6EZ04il2W04RtVgqd$Y8Jgyok9S8H+ww/NxRMp2WJ9ZRU29PqCnz9PywIUN9Q=	2024-04-08 19:19:11+00	f	bob@gmail.com	Bob	Smith	t	f	free
4	pbkdf2_sha256$260000$3VWD6fDixPGptTnCQzDiTh$txgJx08LNUOrpd/pequAnvE8vK3rKtS3qzdL9INWC9A=	\N	f	tylor@gmail.com	Tylor	Jacob	t	f	free
5	pbkdf2_sha256$260000$x8SwL9ub9uWjjuvu8gRmLv$Ig+2x3S/IWER88ZmTrK3LFmRs+b39X2pPRof/NIJgkg=	\N	f	tylor123@gmail.com	Tylor	Jacob	t	f	free
6	pbkdf2_sha256$260000$wN6XfLa5Cl8T39aOe80gIi$rDbvEJlDC/ESUszDptJDEEKXlWbZMUxmt3+tucPTqvk=	\N	f	tylor1234@gmail.com	Tylor	Jacob	t	f	free
1	pbkdf2_sha256$260000$avXDSaUeQTEqSvnQCf3yo7$nYC0rt1/kZ5Y7jSkt7/KOiQbnvG1BPndDovTkj9B3rI=	2024-04-30 04:05:21.299819+00	t	alijonkarimberdi@gmail.com	Alijon	Karimberdiev	t	t	free
7	pbkdf2_sha256$260000$acsCmbJqIueVRLLmL1xgmL$rhoGGCe/XfY9kGFuWW2ex2ni5ZNjSI0St4bDLe603vk=	\N	f	johndoe123@gmail.com	John	Doe	f	f	free
9	pbkdf2_sha256$260000$5CYRJJ3e6cNxJ8mk2ORxDq$PM6tTknwKZyWbIpxMRRt2IjdLYiaZdBOZzMB6QiLoRA=	\N	f	farruhfayziyev6@gmail.com	Tylor	Jacob	t	f	free
10	pbkdf2_sha256$260000$FuMyMNbjNTk0Jf9xh2YW7R$cmBVgqOlsGzPlHaReWyWB/v+nosfIdOLDxhRaS/yzz8=	2024-05-05 11:08:23.308614+00	f	coding802@gmail.com	Alijon	Karimberdiev	t	f	free
\.


--
-- Data for Name: user_user_groups; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.user_user_groups (id, user_id, group_id) FROM stdin;
1	4	2
2	5	2
3	6	2
4	7	2
6	9	2
7	10	2
13	16	2
\.


--
-- Data for Name: user_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.user_user_user_permissions (id, user_id, permission_id) FROM stdin;
1	2	1
2	2	2
3	2	3
4	2	4
5	2	5
6	2	6
7	2	7
8	2	8
9	2	9
10	2	10
11	2	11
12	2	12
13	2	13
14	2	14
15	2	15
16	2	16
17	2	17
18	2	18
19	2	19
20	2	20
21	2	21
22	2	22
23	2	23
24	2	24
25	2	25
26	2	26
27	2	27
28	2	28
29	2	29
30	2	30
31	2	31
32	2	32
33	2	33
34	2	34
35	2	35
36	2	36
37	2	37
38	2	38
39	2	39
40	2	40
41	2	41
42	2	42
43	2	43
44	2	44
45	2	45
46	2	46
47	2	47
48	2	48
49	2	49
50	2	50
51	2	51
52	2	52
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 2, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 64, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 76, true);


--
-- Name: core2_section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core2_section_id_seq', 34, true);


--
-- Name: core2_tutorialmodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core2_tutorialmodule_id_seq', 3, true);


--
-- Name: core_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_comment_id_seq', 1, false);


--
-- Name: core_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_question_id_seq', 306, true);


--
-- Name: core_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_test_id_seq', 5, true);


--
-- Name: core_testmodel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_testmodel_id_seq', 11, true);


--
-- Name: core_testresult_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_testresult_id_seq', 1, false);


--
-- Name: core_useranswer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.core_useranswer_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 477, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 18, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 77, true);


--
-- Name: token_blacklist_blacklistedtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.token_blacklist_blacklistedtoken_id_seq', 2, true);


--
-- Name: token_blacklist_outstandingtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.token_blacklist_outstandingtoken_id_seq', 40, true);


--
-- Name: user_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.user_user_groups_id_seq', 13, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.user_user_id_seq', 16, true);


--
-- Name: user_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.user_user_user_permissions_id_seq', 52, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: core2_section core2_section_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core2_section
    ADD CONSTRAINT core2_section_pkey PRIMARY KEY (id);


--
-- Name: core2_section core2_section_slug_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core2_section
    ADD CONSTRAINT core2_section_slug_key UNIQUE (slug);


--
-- Name: core2_tutorial core2_tutorialmodule_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core2_tutorial
    ADD CONSTRAINT core2_tutorialmodule_pkey PRIMARY KEY (id);


--
-- Name: core_comment core_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_comment
    ADD CONSTRAINT core_comment_pkey PRIMARY KEY (id);


--
-- Name: core_question core_question_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_question
    ADD CONSTRAINT core_question_pkey PRIMARY KEY (id);


--
-- Name: core_test core_test_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_test
    ADD CONSTRAINT core_test_pkey PRIMARY KEY (id);


--
-- Name: core_testmodel core_testmodel_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testmodel
    ADD CONSTRAINT core_testmodel_pkey PRIMARY KEY (id);


--
-- Name: core_testresult core_testresult_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testresult
    ADD CONSTRAINT core_testresult_pkey PRIMARY KEY (id);


--
-- Name: core_useranswer core_useranswer_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_useranswer
    ADD CONSTRAINT core_useranswer_pkey PRIMARY KEY (id);


--
-- Name: core_useranswer core_useranswer_test_result_id_question_id_f137b1aa_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_useranswer
    ADD CONSTRAINT core_useranswer_test_result_id_question_id_f137b1aa_uniq UNIQUE (test_result_id, question_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_pkey PRIMARY KEY (id);


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_token_id_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_token_id_key UNIQUE (token_id);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq UNIQUE (jti);


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outstandingtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outstandingtoken_pkey PRIMARY KEY (id);


--
-- Name: user_user user_user_email_key; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user
    ADD CONSTRAINT user_user_email_key UNIQUE (email);


--
-- Name: user_user_groups user_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_groups
    ADD CONSTRAINT user_user_groups_pkey PRIMARY KEY (id);


--
-- Name: user_user_groups user_user_groups_user_id_group_id_bb60391f_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_groups
    ADD CONSTRAINT user_user_groups_user_id_group_id_bb60391f_uniq UNIQUE (user_id, group_id);


--
-- Name: user_user user_user_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user
    ADD CONSTRAINT user_user_pkey PRIMARY KEY (id);


--
-- Name: user_user_user_permissions user_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_user_permissions
    ADD CONSTRAINT user_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: user_user_user_permissions user_user_user_permissions_user_id_permission_id_64f4d5b8_uniq; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_user_permissions
    ADD CONSTRAINT user_user_user_permissions_user_id_permission_id_64f4d5b8_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: core2_section_module_id_5e9a9e00; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core2_section_module_id_5e9a9e00 ON public.core2_section USING btree (module_id);


--
-- Name: core2_section_slug_a1632b77_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core2_section_slug_a1632b77_like ON public.core2_section USING btree (slug varchar_pattern_ops);


--
-- Name: core_comment_test_id_a88b31fe; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_comment_test_id_a88b31fe ON public.core_comment USING btree (test_id);


--
-- Name: core_comment_user_id_a9a9430c; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_comment_user_id_a9a9430c ON public.core_comment USING btree (user_id);


--
-- Name: core_question_test_id_5701d99d; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_question_test_id_5701d99d ON public.core_question USING btree (test_id);


--
-- Name: core_testmodel_test_id_665c48c6; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_testmodel_test_id_665c48c6 ON public.core_testmodel USING btree (test_id);


--
-- Name: core_testresult_test_id_b6b174b3; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_testresult_test_id_b6b174b3 ON public.core_testresult USING btree (test_id);


--
-- Name: core_testresult_user_id_f583bb94; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_testresult_user_id_f583bb94 ON public.core_testresult USING btree (user_id);


--
-- Name: core_useranswer_question_id_c9ffb295; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_useranswer_question_id_c9ffb295 ON public.core_useranswer USING btree (question_id);


--
-- Name: core_useranswer_test_result_id_23ec053d; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX core_useranswer_test_result_id_23ec053d ON public.core_useranswer USING btree (test_result_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_like ON public.token_blacklist_outstandingtoken USING btree (jti varchar_pattern_ops);


--
-- Name: token_blacklist_outstandingtoken_user_id_83bc629a; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX token_blacklist_outstandingtoken_user_id_83bc629a ON public.token_blacklist_outstandingtoken USING btree (user_id);


--
-- Name: user_user_email_1c6f3d1a_like; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX user_user_email_1c6f3d1a_like ON public.user_user USING btree (email varchar_pattern_ops);


--
-- Name: user_user_groups_group_id_c57f13c0; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX user_user_groups_group_id_c57f13c0 ON public.user_user_groups USING btree (group_id);


--
-- Name: user_user_groups_user_id_13f9a20d; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX user_user_groups_user_id_13f9a20d ON public.user_user_groups USING btree (user_id);


--
-- Name: user_user_user_permissions_permission_id_ce49d4de; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX user_user_user_permissions_permission_id_ce49d4de ON public.user_user_user_permissions USING btree (permission_id);


--
-- Name: user_user_user_permissions_user_id_31782f58; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX user_user_user_permissions_user_id_31782f58 ON public.user_user_user_permissions USING btree (user_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_user_user_id FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core2_section core2_section_module_id_5e9a9e00_fk_core2_tutorial_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core2_section
    ADD CONSTRAINT core2_section_module_id_5e9a9e00_fk_core2_tutorial_id FOREIGN KEY (module_id) REFERENCES public.core2_tutorial(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_comment core_comment_test_id_a88b31fe_fk_core_testmodel_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_comment
    ADD CONSTRAINT core_comment_test_id_a88b31fe_fk_core_testmodel_id FOREIGN KEY (test_id) REFERENCES public.core_testmodel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_comment core_comment_user_id_a9a9430c_fk_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_comment
    ADD CONSTRAINT core_comment_user_id_a9a9430c_fk_user_user_id FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_question core_question_test_id_5701d99d_fk_core_testmodel_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_question
    ADD CONSTRAINT core_question_test_id_5701d99d_fk_core_testmodel_id FOREIGN KEY (test_id) REFERENCES public.core_testmodel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_testmodel core_testmodel_test_id_665c48c6_fk_core_test_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testmodel
    ADD CONSTRAINT core_testmodel_test_id_665c48c6_fk_core_test_id FOREIGN KEY (test_id) REFERENCES public.core_test(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_testresult core_testresult_test_id_b6b174b3_fk_core_testmodel_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testresult
    ADD CONSTRAINT core_testresult_test_id_b6b174b3_fk_core_testmodel_id FOREIGN KEY (test_id) REFERENCES public.core_testmodel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_testresult core_testresult_user_id_f583bb94_fk_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_testresult
    ADD CONSTRAINT core_testresult_user_id_f583bb94_fk_user_user_id FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_useranswer core_useranswer_question_id_c9ffb295_fk_core_question_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_useranswer
    ADD CONSTRAINT core_useranswer_question_id_c9ffb295_fk_core_question_id FOREIGN KEY (question_id) REFERENCES public.core_question(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_useranswer core_useranswer_test_result_id_23ec053d_fk_core_testresult_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.core_useranswer
    ADD CONSTRAINT core_useranswer_test_result_id_23ec053d_fk_core_testresult_id FOREIGN KEY (test_result_id) REFERENCES public.core_testresult(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_user_user_id FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_blacklistedtoken token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk FOREIGN KEY (token_id) REFERENCES public.token_blacklist_outstandingtoken(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: token_blacklist_outstandingtoken token_blacklist_outs_user_id_83bc629a_fk_user_user; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outs_user_id_83bc629a_fk_user_user FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_user_groups user_user_groups_group_id_c57f13c0_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_groups
    ADD CONSTRAINT user_user_groups_group_id_c57f13c0_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_user_groups user_user_groups_user_id_13f9a20d_fk_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_groups
    ADD CONSTRAINT user_user_groups_user_id_13f9a20d_fk_user_user_id FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_user_user_permissions user_user_user_permi_permission_id_ce49d4de_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_user_permissions
    ADD CONSTRAINT user_user_user_permi_permission_id_ce49d4de_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_user_user_permissions user_user_user_permissions_user_id_31782f58_fk_user_user_id; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.user_user_user_permissions
    ADD CONSTRAINT user_user_user_permissions_user_id_31782f58_fk_user_user_id FOREIGN KEY (user_id) REFERENCES public.user_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

