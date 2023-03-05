-- preseed the database with traditional hanzi for testing purpose

USE chardb;

INSERT INTO characters (id, symbol) VALUES (1, '一');

INSERT INTO
    pronunciation (
        character_id,
        pronunciation,
        tone
    )
VALUES (1, 'yi', 1);

INSERT INTO
    meaning (character_id, meaning, keyword)
VALUES (1, 'one', 1), (1, 'floor', 0), (1, 'ceiling', 0);


INSERT INTO characters (id, symbol) VALUES (2, '二'), (3, '三'), (4, '四'), (1503, 'A');
INSERT INTO
    pronunciation (
        character_id,
        pronunciation,
        tone
    )
VALUES (2, 'er', 4), (3, 'san', 1), (4, 'si', 4);

INSERT INTO
    meaning (character_id, meaning, keyword)
VALUES (2, 'two', 1), (3, 'three', 1), (4, 'four', 1), (1503, 'animal legs', 1);
