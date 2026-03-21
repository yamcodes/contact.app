CREATE TABLE contact (
    id      UUID         PRIMARY KEY,
    slug    VARCHAR(255),
    first   VARCHAR(255),
    last    VARCHAR(255),
    email   VARCHAR(255),
    phone   VARCHAR(255)
);
