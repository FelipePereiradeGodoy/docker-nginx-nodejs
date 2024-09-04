const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(dbConfig);

const createTableSQL = `
    CREATE TABLE IF NOT EXISTS people 
    (
        codigo int primary key auto_increment,
        name varchar(255) not null
    )
`;
connection.query(createTableSQL);

const insertSQL = "INSERT INTO people(name) values ('Felipe')";
connection.query(insertSQL);


app.get('/', (req, res) => {
    const selectSQL = "SELECT name FROM people";
    
    connection.query(selectSQL, (error, results) => {
        if(error) throw error;

        const peopleNames = results.map(people => people.name).join(', ');
        
        const response = `
            <h1>Full Cycle Rocks!</h1> 
            <h3>People:</h2>
            <p>${peopleNames}</p>
        `;

        res.send(response);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});