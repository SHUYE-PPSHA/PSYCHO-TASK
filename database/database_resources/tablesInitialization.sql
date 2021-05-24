CREATE TABLE IF NOT EXISTS Public.Task_Status (
  status_id serial NOT NULL,
  name varchar NOT NULL,
  PRIMARY KEY (status_id)
);

CREATE TABLE IF NOT EXISTS Public.Task_Priority (
  priority_id serial NOT NULL,
  name varchar NOT NULL,
  PRIMARY KEY (priority_id)
);

CREATE TABLE IF NOT EXISTS Public.Users (
  user_id serial NOT NULL,
  name varchar NOT NULL,
  surname varchar NOT NULL,
  password varchar NOT NULL,
  max_working_time int NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS Public.Tasks (
  task_id serial NOT NULL,
  name varchar NOT NULL,
  description varchar NOT NULL,
  priority int NOT NULL,
  execution_time int NOT NULL,
  status int NOT NULL,
  PRIMARY KEY (task_id),
  CONSTRAINT Tasks_priority_foreign FOREIGN KEY (priority) REFERENCES Public.Task_Priority (priority_id),
  CONSTRAINT Tasks_status_foreign FOREIGN KEY (status) REFERENCES Public.Task_Status (status_id)
);

CREATE TABLE IF NOT EXISTS Public.User_Tasks (
  user_id int NOT NULL,
  task_id int NOT NULL,
  time_spent int NOT NULL,
  CONSTRAINT UserTasks_user_id_foreign FOREIGN KEY (user_id) REFERENCES Public.Users (user_id),
  CONSTRAINT UserTasks_task_id_foreign FOREIGN KEY (task_id) REFERENCES Public.Tasks (task_id)
);
