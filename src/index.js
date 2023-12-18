const express = require('express'); //external module for using express
const { Client } = require('pg') //external module for using postgres with node
const config = require('./config.js'); // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

// await client.connect() //connecting to our database

const getLanguages = async () => {
    await client.connect() //connecting to our database
    const result = await client.query('SELECT * FROM programming_languages');
    console.log(result.rows);
    await client.end() //ending the connection to our database
    return result.rows;
}

const getLanguage = async (id) => {
    await client.connect() //connecting to our database
    const result = await client.query(`SELECT * FROM programming_languages WHERE id = ${id}`)
    console.log(result.rows);
    await client.end() //ending the connection to our database
    return result.rows;
}

const deleteLanguage = async(id) => {
    await client.connect() //connecting to our database
    const result = await client.query(`DELETE FROM programming_languages WHERE id = ${id}`)
    console.log(result.rows);
    await client.end() //ending the connection to our database
    return result;
}

app.get('/get-languages', async (req, res) => {
    const languages = await getLanguages();
    res.send(languages);
});

app.get('/get-language/:id', async (req, res) => {
    const language = await getLanguage(req.params.id);
    res.send(language);
});

app.delete("/delete-language/:id", async (req, res) => {
    const deletedLanguage = await deleteLanguage(req.params.id);
    res.send(deletedLanguage);
});

app.listen(port, () => {
    console.log(`Nocturne's super duper cool app is now listening at http://localhost:${port}`);
});

// await client.end() //ending the connection to our database

// Next Steps
// For your lab, you will build on this project by adding a POST for adding a new language and a DELETE for removing a language.