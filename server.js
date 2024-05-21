// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
// const cors = require('cors');
const config = require('./dbConfig'); 
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
// app.use(cors());

// Database connection
sql.connect(config, (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database.');
  }
});

// User registration route
app.post('/api/user/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, aadharNo } = req.body;

    // Insert user record into the database
    const result = await sql.query`
      INSERT INTO users (first_name, last_name, email, password, aadhar_no)
      VALUES (${firstName}, ${lastName}, ${email}, ${password}, ${aadharNo})
    `;

    res.status(200).send('User registered successfully');
  } catch (err) {
    console.error('Error occurred during user registration:', err);
    res.status(500).send('Error occurred during user registration');
  }
});

app.post('/api/user/login', async (req, res) => {
    try {
        const { userName, password } = req.body;

        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('email', sql.NVarChar, userName)
            .query(`
                SELECT [Id]
                    ,[first_name]
                    ,[last_name]
                    ,[email]
                    ,[password]
                    ,[aadhar_no]
                    ,[last_login]
                    ,[created_date]
                    ,[password_reset_token]
                    ,[reset_token_generation_time]
                    ,[reset_token_expairy_time]
                FROM [dbo].[users] 
                WHERE [email] = @email
            `);

        if (result.recordset.length > 0) {
            console.log(result.recordset[0]);
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).send('User is not registered. Please register yourself first.');
        }
    } catch (err) {
        console.error('Error occurred during user login:', err);
        res.status(500).send('Error occurred during user login');
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"src","build","index.html"))
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
