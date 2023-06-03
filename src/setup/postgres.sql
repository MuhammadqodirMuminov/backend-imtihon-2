
CREATE DATABASE pessa;


DROP TABLE IF EXISTS admin;
CREATE TABLE admin(
	id SERIAL ,
	username VARCHAR(40) NOT NULL,
	password VARCHAR(40) NOT NULL
);
INSERT INTO admin(username , password) VALUES ('ali', '123456789');



DROP TABLE IF EXISTS viewpage;
CREATE TABLE viewpage(
	id INT NOT NULL,
	userAgent TEXT NOT NULL,
	ip VARCHAR(100) NOT NULL
);



DROP TABLE IF EXISTS events;
CREATE TABLE events(
	event_id SERIAL PRIMARY KEY,
	event_name VARCHAR(50),
	event_description TEXT,
	event_time VARCHAR(5),
	event_date VARCHAR(50),
	image VARCHAR(100),
	event_activity VARCHAR(8),
	event_link VARCHAR(200),
	author VARCHAR(100),
	author_job VARCHAR(150),
	author_phone VARCHAR(12),
	category CHAR(1),
	subcategory CHAR(1),
	status VARCHAR(32) DEFAULT 'pending',
	view_count INT DEFAULT 0
);
INSERT INTO events( event_name, event_description, event_time, event_date, image, event_activity, event_link, author, author_job, author_phone, category, subcategory) VALUES ('Kod yozmasdan AyTishnik bo''lish mumkinmi?' ,'Navbatdagi master-klass mehmoni QA (Quality Assurance) sohasida 5 yillik tajribaga ega, IMAN Invest tashkilotida Senior QA engineer bo‘lib ishlayotgan, «Najot Ta''lim»da QA kursi ustozi Xasan Valiyev bo''ladilar.','09:30', '2020-05-05','16856125068182.jpg', 'offline', 'https://youtube.com', 'Xasan Valiyev', 'QA injener' , '998999743636' , '3', '5');