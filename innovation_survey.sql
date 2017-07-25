CREATE TABLE surveyData (
	id int NOT NULL AUTO_INCREMENT,
	q1 boolean NOT NULL,
	q2 boolean NOT NULL,
	q3 varchar(50) NOT NULL,
	q4 boolean NOT NULL,
	q4_1 text,
	q5 text,
	PRIMARY KEY(id)
);

CREATE TABLE countSurveyView (
	id int NOT NULL AUTO_INCREMENT,
	element varchar(50),
	count int NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO countSurveyView (element, count) VALUES ('surveyView', 1);

UPDATE countSurveyView SET count = count + 1 WHERE element = 'surveyView';