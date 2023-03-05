# CharDB api

The CharDB api provides a read only JSON access to CharDB

## Endpoints

`GET: /api/characters/` gives all characters.

`GET: /api/characters/:id/` gives one character of a given character ID.

`GET: /api/characters/:symbol/` gives one character of a given symbol.

`GET: /api/characters/?pronunciation=:pronunciation` delivers all Information on all characters by a given (incomplete) pronunciation.