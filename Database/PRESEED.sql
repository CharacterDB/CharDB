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

INSERT INTO
    characters (id, symbol)
VALUES (2, '二'), (3, '三'), (4, '四'), (5, '五'), (6, '六'), (7, '七'), (8, '八'), (9, '九'), (10, '十'), (11, '口'), (1503, 'C'), (1526, 'Z');

INSERT INTO
    pronunciation (
        character_id,
        pronunciation,
        tone
    )
VALUES (2, 'er', 4), (3, 'san', 1), (4, 'si', 4), (5, 'wu', 3), (6, 'liu', 4), (7, 'qi', 1), (8, 'ba', 1), (9, 'jiu', 3), (10, 'shi', 2), (11, 'kou', 3);

INSERT INTO
    meaning (character_id, meaning, keyword)
VALUES (2, 'two', 1), (3, 'three', 1), (4, 'four', 1), (5, 'five', 1), (6, 'six', 1), (7, 'seven', 1), (7, 'diced', 0), (8, 'eight', 1), (8, 'all encompassing', 0), (9, 'nine', 1), (9, 'bowler', 0), (9, 'bowling', 0), (9, 'bowling alley', 0), (10, 'ten', 1), (10, 'needle', 0), (11, 'mouth', 1), (11, 'estuary', 0), (1503, 'animal legs', 1), (1526, 'top hat', 1);

INSERT INTO
    composition (character_id, primitive_id)
VALUES (4, 11), (4, 1503), (6, 1526), (6, 1503);

