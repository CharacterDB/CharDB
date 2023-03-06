CREATE DATABASE chardb;

CREATE USER 'chardb'@'localhost' IDENTIFIED BY 'DJQePMN3CJNadoifXMt3';

GRANT ALL PRIVILEGES ON chardb.* TO 'chardb'@'localhost';

USE chardb;

CREATE TABLE
    characters (
        id INT NOT NULL AUTO_INCREMENT,
        symbol CHAR(1) NOT NULL UNIQUE,
        PRIMARY KEY (id)
    );

CREATE TABLE
    meaning (
        character_id INT NOT NULL,
        meaning VARCHAR(100) NOT NULL,
        keyword BIT NOT NULL DEFAULT 0,
        PRIMARY KEY (character_id, meaning),
        FOREIGN KEY (character_id) REFERENCES characters(id),
    );

CREATE TABLE
    pronunciation (
        character_id INT NOT NULL,
        pronunciation VARCHAR(10) NOT NULL,
        tone TINYINT DEFAULT 0,
        PRIMARY KEY (character_id),
        FOREIGN KEY (character_id) REFERENCES characters(id)
    );

CREATE TABLE
    composition (
        character_id INT NOT NULL,
        primitive_id INT NOT NULL,
        PRIMARY KEY (character_id, primitive_id),
        FOREIGN KEY (character_id) REFERENCES characters(id),
        FOREIGN KEY (primitive_id) REFERENCES characters(id),
        CONSTRAINT no_self_reference CHECK (character_id <> primitive_id)
    );