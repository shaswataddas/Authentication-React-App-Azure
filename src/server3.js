const sql = require('mssql');

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

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`SELECT TOP (1000) [PersonId]
        ,[FirstName]
        ,[MiddelInitial]
        ,[LastName]
        ,[DateOfBirth]
        FROM [dbo].[Person]`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s\t%s\t%s\t%s", row.PersonId, row.FirstName,row.MiddelInitial, row.LastName,row.DateOfBirth);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.log('pringing Error');
        console.error(err);
        console.error(err.message);
    }
}