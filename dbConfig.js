const config = {
    user: 'shaswata-admin', // better stored in an app setting such as process.env.DB_USER
    password: 'Shas@7076', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'authentication-db-server.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'authentication-user-db', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}


module.exports = config;