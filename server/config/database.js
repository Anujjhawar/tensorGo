const sql = require("mssql/msnodesqlv8");
const config = require("./config.json");
const dev = 'development'
const env = process.env.NODE_ENV || dev;
const host = env == dev ? '.' : '.';

module.exports = () => {
    var conn = new sql.ConnectionPool({
        user: config[env].username,
        password: config[env].password,
        server: host,
        database: config[env].database,
        options: {
            useUTC: true,   // Maintain 
            dateFirst: 1,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
        /** THIS IS FOR WINDOWS AUTHENTICATION */
        // options: {
        //   trustedConnection: true
        // }
    });
    return conn;
}
