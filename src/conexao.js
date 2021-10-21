const { Pool } = require('pg');
const pool = new Pool({
    user: 'nfhvwtmhzqdczi',
    host: 'ec2-44-195-240-222.compute-1.amazonaws.com',
    database: 'd677d83s19v5hp',
    password: '347b00e116fff1fadb26f54306020297df51fe54d5fc24cb87dd429eba28f7f5',
    port: 5432,
    ssl:{
        rejectUnauthorized: false
    }

});
const query = (text, param) => {
    return pool.query(text, param);
}
module.exports = {
    query    
}