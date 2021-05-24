INSERT INTO Task_Priority VALUES
  (default, 'Низький'),
  (default, 'Середній'),
  (default, 'Високий');

INSERT INTO Task_Status VALUES
  (default, 'В процесі виконання'),
  (default, 'Завершено');

INSERT INTO Users VALUES
  (default, 'Тарас', 'Барабаш', 'jenf', 600),
  (default, 'Євген', 'Родичев', 'ooiw', 500),
  (default, 'Назарій', 'Киричук', 'owed', 620),
  (default, 'Ігор', 'Вихорь', 'mswv', 530),
  (default, 'Варфоломій', 'Лимоненко', 'mswb', 550);

INSERT INTO Tasks VALUES
  (default, 'Лоботомія', 'лоботомія', 2, 1200, 1),
  (default, 'Галоперидол', 'галоперидол', 3, 1400, 1),
  (default, 'Шокова терапія', 'шокова терапія', 2, 1100, 1),
  (default, 'Групова терапія', 'Групова терапія', 1, 1450, 1);

INSERT INTO User_Tasks VALUES
  (1, 2, 120),
  (1, 3, 150),
  (2, 4, 60),
  (2, 1, 190),
  (2, 4, 145),
  (3, 3, 185),
  (4, 2, 125),
  (4, 4, 160),
  (5, 1, 140);
