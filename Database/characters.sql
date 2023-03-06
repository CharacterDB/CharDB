-- easily access all information about characters by pronunciation and LIMIT

CREATE PROCEDURE get_characters(IN search_term VARCHAR(10), IN limit_param INT)
BEGIN 
	SELECT
        id,
        symbol,
        transcription,
        meaning,
        keyword,
        NULL AS primitive
	FROM (
	        SELECT *
	        FROM transcription
	        WHERE
	            transcription LIKE CONCAT('%', search_term, '%')
	        ORDER BY id
	        LIMIT
	            limit_param
	    ) transcription
    JOIN meaning ON transcription.id = meaning.character_id
    UNION
    SELECT
        id,
        symbol,
        transcription,
        NULL AS meaning,
        NULL AS keyword,
        primitive_id AS primitive
	FROM (
	        SELECT *
	        FROM transcription
	        WHERE
	            transcription LIKE CONCAT('%', search_term, '%')
	        ORDER BY id
	        LIMIT
	            limit_param
	    ) transcription
        JOIN composition composition ON transcription.id = composition.character_id;
END; 

CALL get_characters('i', 4);