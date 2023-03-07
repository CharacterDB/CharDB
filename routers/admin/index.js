
// imports
import express from 'express';
import { connection } from '../../utilities/database.js';

// create router
const router = express.Router();

router.use(express.json());

router.post('/characters', async (req, res, next) => {
    let { id, symbol, transcription, tone, keyword, meanings, primitives } = req.body;
    try {
        await connection.beginTransaction();

        await connection.query('INSERT INTO characters (id, symbol) VALUES (?, ?)', [id, symbol]);

        const [rows, _] = await connection.query('SELECT id FROM characters WHERE symbol = ?', symbol);
        id = rows[0].id;

        await connection.query('INSERT INTO pronunciation (character_id, pronunciation, tone) VALUES (?, ?, ?)', [id, transcription, tone]);
        await connection.query('INSERT INTO meaning (character_id, meaning, keyword) VALUES (?, ?, 1)', [id, keyword]);

        if (meanings.length) {
            meanings = meanings.map((meaning) => [id, meaning, 0]);
            await connection.query('INSERT INTO meaning (character_id, meaning, keyword) VALUES ?', [meanings]);
        }

        if (primitives.length) {
            primitives = primitives.map((primitive) => [id, primitive]);
            await connection.query('INSERT INTO composition (character_id, primitive_id) VALUES ?', [primitives]);
        }

        await connection.commit();
    } catch (e) {
        await connection.rollback();
        console.log(e);
        return next(new Error('Error inserting into database'));
    }
    console.log(id);
    console.log(symbol);
    console.log(transcription);
    console.log(tone);
    console.log(keyword);
    console.log(meanings);
    console.log(primitives);
    res.send({ result: 'success' });
});

router.get('/characters/new', (req, res) => {
    res.render("admin/characters/new");
});

// export router
export { router };