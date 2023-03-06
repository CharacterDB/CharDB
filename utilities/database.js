
import mysql from 'mysql2/promise';

// connect to database
var connection = await mysql.createConnection({
    host: 'localhost',
    user: 'chardb',
    password: 'DJQePMN3CJNadoifXMt3',
    database: 'chardb'
});

export { connection };