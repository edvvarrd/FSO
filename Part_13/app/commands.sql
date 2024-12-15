CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('testing author', 'testing url', 'testing title');

INSERT INTO blogs (author, url, title) VALUES ('testing author #2', 'testing url #2', 'testing title #2');