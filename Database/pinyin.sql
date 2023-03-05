-- this view combines the pronunciation with the tones.

USE chardb;

CREATE OR REPLACE VIEW tones AS 
	SELECT
	    'a' AS final,
	    0 AS tone,
	    'a' AS toned
	UNION ALL
	SELECT 'a', 1, 'ā'
	UNION ALL
	SELECT 'a', 2, 'á'
	UNION ALL
	SELECT 'a', 3, 'ǎ'
	UNION ALL
	SELECT 'a', 4, 'à'
	UNION
	SELECT 'o', 0, 'o'
	UNION ALL
	SELECT 'o', 1, 'ō'
	UNION ALL
	SELECT 'o', 2, 'ó'
	UNION ALL
	SELECT 'o', 3, 'ǒ'
	UNION ALL
	SELECT 'o', 4, 'ò'
	UNION
	SELECT 'e', 0, 'e'
	UNION ALL
	SELECT 'e', 1, 'ē'
	UNION ALL
	SELECT 'e', 2, 'é'
	UNION ALL
	SELECT 'e', 3, 'ě'
	UNION ALL
	SELECT 'e', 4, 'è'
	UNION
	SELECT 'i', 0, 'i'
	UNION ALL
	SELECT 'i', 1, 'ī'
	UNION ALL
	SELECT 'i', 2, 'í'
	UNION ALL
	SELECT 'i', 3, 'ǐ'
	UNION ALL
	SELECT 'i', 4, 'ì'
	UNION
	SELECT 'u', 0, 'u'
	UNION ALL
	SELECT 'u', 1, 'ū'
	UNION ALL
	SELECT 'u', 2, 'ú'
	UNION ALL
	SELECT 'u', 3, 'ǔ'
	UNION ALL
	SELECT 'u', 4, 'ù'
	UNION
	SELECT 'ü', 0, 'ü'
	UNION ALL
	SELECT 'ü', 1, 'ǖ'
	UNION ALL
	SELECT 'ü', 2, 'ǘ'
	UNION ALL
	SELECT 'ü', 3, 'ǚ'
	UNION ALL
	SELECT 'ü', 4,
'Ǜ'; 

CREATE OR REPLACE VIEW transcription AS 
	SELECT
	    characters.id,
	    symbol,
	    CASE
	        WHEN pronunciation LIKE '%a%' THEN
	        REPLACE (
	                pronunciation,
	                'a', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'a'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            WHEN pronunciation LIKE '%o%' THEN
	        REPLACE (
	                pronunciation,
	                'o', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'o'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            WHEN pronunciation LIKE '%iu%' THEN
	        REPLACE (
	                pronunciation,
	                'u', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'u'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            WHEN pronunciation LIKE '%e%' THEN
	        REPLACE (
	                pronunciation,
	                'e', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'e'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            WHEN pronunciation LIKE '%i%' THEN
	        REPLACE (
	                pronunciation,
	                'i', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'i'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            WHEN pronunciation LIKE '%u%' THEN
	        REPLACE (
	                pronunciation,
	                'u', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'u'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            WHEN pronunciation LIKE '%u%' THEN
	        REPLACE (
	                pronunciation,
	                'ü', (
	                    SELECT
	                        toned
	                    FROM
	                        tones
	                    WHERE
	                        tones.final = 'ü'
	                        AND tones.tone = pronunciation.tone
	                )
	            )
	            ELSE ''
	    END AS pinyin
	FROM characters
	    LEFT JOIN pronunciation ON characters.id = pronunciation.character_id; 