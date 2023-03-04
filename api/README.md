# CharDB api

The CharDB api provides a read only JSON access to CharDB

## Endpoints

`GET: /api/characters` delivers all characters.

`GET: /api/characters/bySymbol/:symbol/` delivers all information on a given character.

`GET: /api/characters/byID/:id/` delivers all information on a given character ID.

`GET: /api/characters/byPronunciation/:pronunciation/` delivers all Information on characters by a given (incomplete) pronunciation.