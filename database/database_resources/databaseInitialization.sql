
DROP DATABASE IF EXISTS psycho_task;
DROP USER IF EXISTS psycho_task_user;

CREATE USER psycho_task_user WITH PASSWORD '12345';

CREATE DATABASE psycho_task OWNER psycho_task_user;

\c psycho_task;

\ir tablesInitialization.sql;

\ir initialData.sql;

GRANT ALL PRIVILEGES ON DATABASE psycho_task TO psycho_task_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA PUBLIC TO psycho_task_user;
ALTER TABLE Task_Status OWNER TO psycho_task_user;
ALTER TABLE Task_Priority OWNER TO psycho_task_user;
ALTER TABLE Users OWNER TO psycho_task_user;
ALTER TABLE Tasks OWNER TO psycho_task_user;
ALTER TABLE User_Tasks OWNER TO psycho_task_user;
/*
GRANT ALL PRIVILEGES ON DATABASE psycho_task_test TO psycho_task_user_test;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA PUBLIC TO psycho_task_user_test;
*/