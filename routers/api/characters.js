
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
    const limit = 100;
    let [[rows, __], _] = await connection.query('CALL get_characters(?, ?)', [`%${pronunciation}%`, limit]);
    const data = rows.reduce((acc, { id, symbol, transcription, meaning, keyword, primitive }) => {
        acc[id] = acc[id] || { id, symbol, transcription, keyword: null, meanings: [], primitives: [] };
        if (keyword && keyword.equals(Buffer.from([1])) && meaning) acc[id].keyword = meaning;
        else if (meaning) acc[id].meanings.push(meaning);
        if (primitive) acc[id].primitives.push(primitive);
        return acc;
    }, {});
    res.send(data);
});

router.get('/:id(\\d+)/', async (req, res) => {
    const { id } = req.params;
    let [rows, _] = await connection.query('SELECT id, symbol, transcription FROM transcription WHERE id=?', id);
    const data = rows[0];
    [rows, _] = await connection.query('SELECT meaning, keyword FROM meaning WHERE character_id = ?', id);
    data.meanings = [];
    for (let row of rows) {
        if (row.keyword.equals(Buffer.from([1]))) data.keyword = row.meaning;
        else data.meanings.push(row.meaning);
    }
    [rows, _] = await connection.query('SELECT primitive_id AS primitive FROM composition WHERE character_id = ?', id);
    data.primitives = [];
    for (let row of rows) {
        data.primitives.push(row.primitive);
    }
    res.send(data);
});

router.get('/:symbol/', async (req, res) => {
    const { symbol } = req.params;
    let [rows, _] = await connection.query('SELECT id, symbol, transcription FROM transcription WHERE symbol = ?', symbol);
    const data = rows[0];
    [rows, _] = await connection.query('SELECT meaning, keyword FROM meaning WHERE character_id = ?', data.id);
    data.meanings = [];
    for (let row of rows) {
        if (row.keyword.equals(Buffer.from([1]))) data.keyword = row.meaning;
        else data.meanings.push(row.meaning);
    }
    [rows, _] = await connection.query('SELECT primitive_id AS primitive FROM composition WHERE character_id = ?', data.id);
    data.primitives = [];
    for (let row of rows) {
        data.primitives.push(row.primitive);
    }
    res.send(data);
})

// export router
export { router };