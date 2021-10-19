const { Pool } = require('pg');

const pool = new Pool({
    user: 'unxvhtyvjjkmpo',
    host: 'ec2-52-201-72-91.compute-1.amazonaws.com',
    database: 'dddfrq2qjiv4hh',
    password: 'cd3821c47476567109bce2d4f4ace1ec142aa3cd4b8a4fcf443f398733b76796',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});


const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query    
}