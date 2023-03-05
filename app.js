
// imports
import express from 'express';

// import routers
import { router as APIRouter } from './routers/api/characters.js';

// create app
const app = express();
const port = 8080;

// bind routers
app.use('/api/characters/', APIRouter);

// start app
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})