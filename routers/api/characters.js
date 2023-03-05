
// imports
import express from 'express';
import mysql from 'mysql2/promise';

// create router
const router = express.Router();

// connect to database
var connection = await mysql.createConnection({
    host: 'localhost',
    user: 'chardb',
    password: 'DJQePMN3CJNadoifXMt3',
    database: 'chardb'
});

// bind routes
router.get('/', async (req, res) => {
    const { pronunciation = '' } = req.query;
    let [rows, _] = await connection.query('SELECT id, symbol, pinyin, meaning, keyword FROM transcription LEFT JOIN meaning ON transcription.id = meaning.character_id WHERE pinyin LIKE ?', `%${pronunciation}%`);
    const data = rows.reduce((acc, { id, symbol, pinyin, meaning, keyword }) => {
        acc[id] = acc[id] || { id, symbol, pinyin, meanings: [] };
        acc[id].meanings.push(meaning);
        return acc;
    }, {});
    res.send(data);
});

router.get('/:id(\\d+)/', async (req, res) => {
    const { id } = req.params;
    let [rows, _] = await connection.query('SELECT id, symbol, pinyin, meaning, keyword FROM transcription LEFT JOIN meaning ON transcription.id = meaning.character_id WHERE character_id=?', id);
    const data = rows.reduce((acc, { id, symbol, pinyin, meaning, keyword }) => {
        acc = acc || { id, symbol, pinyin, meanings: [] };
        acc.meanings.push(meaning);
        return acc;
    }, null);
    res.send(data);
});

router.get('/:symbol/', async (req, res) => {
    const { symbol } = req.params;
    let [rows, _] = await connection.query('SELECT id, symbol, pinyin, meaning, keyword FROM transcription LEFT JOIN meaning ON transcription.id = meaning.character_id WHERE symbol=?', symbol);
    const data = rows.reduce((acc, { id, symbol, pinyin, meaning, keyword }) => {
        acc = acc || { id, symbol, pinyin, meanings: [] };
        acc.meanings.push(meaning);
        return acc;
    }, null);
    res.send(data);
})

// export router
export { router };