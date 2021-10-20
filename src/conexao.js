const { Pool } = require('pg');
const pool = new Pool({
    user: 'database-transacao',
    host: 'app-424c9947-4aee-4f1d-9faa-f333c73f3af6-do-user-10072902-0.b.db.ondigitalocean.com',
    database: 'database-transacao',
    password: 'W5gTPpglQVD0RnQd',
    port: 25060
});
const query = (text, param) => {
    return pool.query(text, param);
}
module.exports = {
    query    
}