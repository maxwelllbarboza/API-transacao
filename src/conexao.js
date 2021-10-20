const { Pool } = require('pg');

const pool = new Pool({
    user: 'database-transacao',
    host: 'app-2878e29b-f1ab-49c9-a7ec-a1d9e4845d73-do-user-10072902-0.b.db.ondigitalocean.com',
    database: 'database-transacao',
    password: 'fl7bnVcg1ytumyzv',
    port: 25060
});


const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query    
}