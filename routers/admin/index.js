
// imports
import express from 'express';
import { allowedNodeEnvironmentFlags } from 'process';
import { connection } from '../../utilities/database.js';

// create router
const router = express.Router();

router.get('/', (req, res) => {
    res.render("admin/index");
})



//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

// export router
export { router };