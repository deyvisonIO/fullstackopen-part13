CREATE TABLE blogs(id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INT DEFAULT 0);
INSERT INTO blogs(author, url, title) values ('author1', 'url1', 'title1');
INSERT INTO blogs(author, url, title) values ('author2', 'url2', 'title2');
