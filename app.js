
// imports
import express from 'express';
import path from 'path';

// import routers
import { router as APIRouter } from './routers/api/characters.js';
import { router as adminRouter } from './routers/admin/index.js';

// create dirname
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// create app
const app = express();
const port = 8080;

// configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// bind routers
app.use('/api/characters/', APIRouter);
app.use('/admin', adminRouter);

// start app
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})